import { z } from "zod"
import { useArticleSetParticipant } from "~/src/shared/api/generate/article"
import { useParticipantInvite } from "~/src/shared/api/generate/article-participant"
import { ArticlePermissionLevel } from "~/src/shared/api/model"

export function useParticipantCreate() {
    const { t } = useI18n()

    const schema = z.object({
        email: z.string().email(t("AUTH.ERROR.INVALID_EMAIL")),
        permissionLevel: z.coerce.number()
            .int()
            .min(0)
            .max(4)
            .transform(val => val as ArticlePermissionLevel)
    })

    var mutation = useParticipantInvite()

    return {
        schema,
        mutation: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error
    }
}