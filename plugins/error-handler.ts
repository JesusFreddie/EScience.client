import {errorHandler} from "ioredis/built/redis/event_handler";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        const toast = useToast();
        toast.add({
            title: $t("ERROR.ERROR"),
            description: $t('ERROR.SERVER_ERROR'),
            color: 'red'
        });
    }
    nuxtApp.hook("vue:error", (er) => {
        // const toast = useToast();
        // toast.add({
        //     title: $t("ERROR.ERROR"),
        //     description: $t('ERROR.SERVER_ERROR'),
        //     color: 'red'
        // });
    })
})