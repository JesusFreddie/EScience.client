import type { ProfileDto } from "~/src/shared/api/model";
import ROUTE from "~/src/shared/consts/ROUTE";

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('session-middleware')
  const { data, error, refresh } = await useFetch<ProfileDto>(
    `/api/account/session`,
    {
      headers: { "Content-Type": "application/json" },
      server: false,
    },
  );

  if (error.value) {
    return navigateTo(ROUTE.LOGIN);
  }

  return true;
});
