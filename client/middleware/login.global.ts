import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  if (userStore.user === null) {
    await userStore.getUser();
    if (!userStore.user) {
      if (to.path.includes("/registration")) return;
      else if (to.path === "/auth") return;
      else return navigateTo("/auth");
    }
  }
});
