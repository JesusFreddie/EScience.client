import { useVersionGetLast } from "~/src/shared/api/generate/article-version";

export function mergeBranches(articleId: string, baseBranchId: string, targetBranchId: string) {    
    var baseContent = useVersionGetLast(articleId, baseBranchId)
    var targetContent = useVersionGetLast(articleId, targetBranchId)

    var 
}
