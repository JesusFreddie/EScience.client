import { useVersionGetLast } from "~/src/shared/api/generate/article-version";
import { useMerge as useMergeVersion } from "~/src/shared/api/generate/merge";

interface MergeState {
  baseBranchId: string;
  targetBranchId: string;
  baseContent: string;
  targetContent: string;
  mergedContent: string;
  diff: {
    added: string[];
    removed: string[];
    unchanged: string[];
  };
}

type useMergeProps = {
  articleId: string, 
  targetBranchId: string, 
  baseBranchId: string, 
  baseContent: string, 
  targetContent: string
}

export function useMerge({
    articleId,
    baseBranchId,
    baseContent,
    targetBranchId,
    targetContent,
  }: useMergeProps) {

  const mergeState = ref<MergeState>({
    baseBranchId: baseBranchId,
    targetBranchId: targetBranchId,
    baseContent: baseContent,
    targetContent: targetContent,
    mergedContent: '',
    diff: {
      added: [],
      removed: [],
      unchanged: []
    }
  });


  const calculateDiff = () => {
    // TODO: заменить алогорити на другой
    const base = mergeState.value.baseContent.split(' ');
    const target = mergeState.value.targetContent.split(' ');
    
    mergeState.value.diff = {
      added: target.filter(word => !base.includes(word)),
      removed: base.filter(word => !target.includes(word)),
      unchanged: base.filter(word => target.includes(word))
    };
  };

  const updateEditedContent = (content: string) => {
    mergeState.value.mergedContent = content;
  };

  const { mutate: saveMergedVersion, isPending: isSaving } = useMergeVersion()
  
  const saveMerge = async () => {
    try {
      await saveMergedVersion({
        articleId,
        branchId: mergeState.value.baseBranchId,
        data: {
          text: mergeState.value.mergedContent,
        }
      });
      return true;
    } catch (error) {
      console.error('Merge save failed:', error);
      return false;
    }
  };

  return {
    mergeState,
    isSaving,
    calculateDiff,
    updateEditedContent,
    saveMerge
  }
}
