import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  if (userStore.user === null) {
    await userStore.getUser();
    console.log(userStore.user);
    if (!userStore.user) {
      if (to.path === "/auth") return ;
      else return navigateTo("/auth");
    }
  }
});
