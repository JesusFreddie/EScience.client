import {z} from "zod";
import {postAuthRegister, usePostAuthRegister} from "~/src/shared/api/generate/auth";
import ROUTE from "~/src/shared/consts/ROUTE";

export function useRegisterForm() {
    const { t } = useI18n();

    const schema = z.object({
        email: z.string().email(t('AUTH.ERROR.INVALID_EMAIL')),
        name: z.string().min(2),
        password: z.string().min(6),
        repeatPassword: z.string().min(6)
    })

    const loginMutation = usePostAuthRegister({
        mutation: {
            mutationFn: postAuthRegister,
            onSuccess() {
                navigateTo(ROUTE.HOME)
            }
        }
    })

    return {
        schema,
        loginMutation,
        isPending: loginMutation.isPending,
    }
}