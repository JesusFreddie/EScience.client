import { AxiosError } from "axios";
import { z } from "zod";
import { useAuthLogin } from "~/src/shared/api/generate/auth";
import { useErrorToast } from "~/src/shared/composable/useErrorToast";
import ROUTE from "~/src/shared/consts/ROUTE";

export function useLoginForm() {
  const { t } = useI18n();

  const schema = z.object({
    email: z.string().email(t("AUTH.ERROR.INVALID_EMAIL")),
    password: z.string().min(6),
  });

  const loginMutation = useAuthLogin({
    mutation: {
      onSuccess(data) {
        navigateTo(ROUTE.HOME);
      },
      onError(error) {
        if (error instanceof AxiosError) {
          useErrorToast({
            message: error.response?.data,
            status: error.status!,
          });
        }
      },
    },
  });

  return {
    schema,
    loginMutation,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
  };
}
