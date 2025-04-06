import { AxiosError } from "axios";
import { z } from "zod";
import { useAuthRegister } from "~/src/shared/api/generate/auth";
import { useErrorToast } from "~/src/shared/composable/useErrorToast";
import ROUTE from "~/src/shared/consts/ROUTE";

export function useRegisterForm() {
  const { t } = useI18n();

  const schema = z.object({
    email: z.string().email(t("AUTH.ERROR.INVALID_EMAIL")),
    name: z.string().min(2),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
  });

  const loginMutation = useAuthRegister({
    mutation: {
      onSuccess() {
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
  };
}
