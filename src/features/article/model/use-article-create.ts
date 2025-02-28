import {z} from "zod";
import {postArticlesCreate, usePostArticlesCreate} from "~/src/shared/api/generate/article";

export function useArticleCreate() {
    const { t } = useI18n()
    const schema = z.object({
        title: z.string(),
        description: z.string().optional(),
        isPrivate: z.boolean(),
    })

    const articleMutation = usePostArticlesCreate({
        mutation: {
            mutationFn: postArticlesCreate,
        }
    })

    return {
        schema,
        articleMutation,
        isPending: articleMutation.isPending,
    }
}