import { AxiosError } from "axios";
import { useVersionSave as MutVersionSave } from "~/src/shared/api/generate/article-version";
import { useErrorToast } from "~/src/shared/composable/useErrorToast";

export function useVersionSave() {
    const articleMutation = MutVersionSave({
        mutation: {
            onError(error: unknown) {
                if (error instanceof AxiosError) {
                  useErrorToast({
                    message: error.response?.data,
                    status: error.status!,
                  });
                }
              },
              onSuccess() {
                const toast = useToast()
                toast.add({
                  title: "Сохранено",
                  timeout: 1500
                })
              }
        }
    })

    return {
        mutation: articleMutation.mutate
    }
}