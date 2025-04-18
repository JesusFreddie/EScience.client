import { AxiosError } from "axios";
import { z } from "zod";
import {
  useArticleCreate as MutArticleCreate
} from "~/src/shared/api/generate/article";
import { useErrorToast } from "~/src/shared/composable/useErrorToast";

export function useArticleCreate() {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    isPrivate: z.boolean(),
  });

  const articleMutation = MutArticleCreate({
    mutation: {
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
    articleMutation,
    isPending: articleMutation.isPending,
  };
}
