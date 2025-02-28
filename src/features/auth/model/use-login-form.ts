import {z} from "zod";
import {postAuthLogin, usePostAuthLogin} from "~/src/shared/api/generate/auth";
import ROUTE from "~/src/shared/consts/ROUTE";

export function useLoginForm() {
    const { t } = useI18n();

    const schema = z.object({
        email: z.string().email(t('AUTH.ERROR.INVALID_EMAIL')),
        password: z.string().min(6),
    })

    const loginMutation = usePostAuthLogin({
        mutation: {
            mutationFn: postAuthLogin,
            onSuccess() {
                navigateTo(ROUTE.HOME)
            }
        },
    })

    return {
        schema,
        loginMutation,
        isPending: loginMutation.isPending,
    }
}