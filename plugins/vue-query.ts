import {VueQueryPlugin, VueQueryPluginOptions} from "@tanstack/vue-query";
import ROUTE from "~/src/shared/consts/ROUTE";

export default defineNuxtPlugin(( nuxtApp ) => {
    const { $i18n } = useNuxtApp()

    const vueQueryOptions: VueQueryPluginOptions = {
        queryClientConfig: {
            defaultOptions: {
                queries: {
                    retry: false,
                },
                mutations: {
                    onError(error) {
                        ErrorHandler(error);
                    }
                },
            }
        }
    }

    const ErrorHandler = (error: unknown) => {
        if (i500Error(error)) {
            const t = $i18n.t;
            const toast = useToast();
            toast.add({
                title: t("ERROR.ERROR"),
                description: t('ERROR.SERVER_ERROR'),
                color: 'red'
            })
        }
        if (i400Error(error, 401)) {
            navigateTo(ROUTE.LOGIN)
        }
    }

    const i500Error = (error: unknown): boolean => {
        if (error instanceof Error && 'response' in error) {
            const response = (error as any).response;
            return response?.status === 500;
        }
        return false;
    }
    const i400Error = (error: unknown, code: number = 400): boolean => {
        if ('response' in error) {
            const response = (error as any).response;
            return response?.status === code;
        }
        return false;
    }

    nuxtApp.vueApp.use(VueQueryPlugin, vueQueryOptions);
})