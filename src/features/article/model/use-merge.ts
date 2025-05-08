import { useGetMergeRequest } from "~/src/shared/api/generate/merge"

type UseMergeProps = {
  articleId: string
}

export function useMerge({ articleId } : UseMergeProps) {

  const baseBranchId = ref<string>()
  const currentBranchId = ref<string>()

  const { data, mutate } = useGetMergeRequest()  

  function deleteItem(index: number) {
    // if (!article.value)
    //   return
  
    //   article.value.splice(index, 1)
  }
  

  return {
    data,
    mutate,
    baseBranchId,
    deleteItem,
    currentBranchId
  }

}
