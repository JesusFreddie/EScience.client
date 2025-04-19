import {z} from "zod";
import {useBranchCreate} from "~/src/shared/api/generate/article-branch";
import {AxiosError} from "axios";
import {useErrorToast} from "~/src/shared/composable/useErrorToast";

export function useCreateBranch() {
    const schema = z.object({
        name: z.string(),
        parentId: z.string(),
    })
''
    const branchMutation = useBranchCreate({
        mutation: {
            onError(error) {
                if (error instanceof AxiosError) {
                    useErrorToast({
                        message: error!.response?.data,
                        status: error.status!
                    })
                }
            }
        }
    })

    return {
        schema,
        branchMutation,
        isPending: branchMutation.isPending,
    }
}