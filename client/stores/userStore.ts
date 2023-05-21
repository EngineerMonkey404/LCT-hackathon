import { IUser } from "~/types/types";

export const useUserStore = defineStore("counter", () => {
  const user = ref<IUser>({});

  async function login(loginData: { email: string; password: string }) {
    const { data: fetchedUser } = await useApiFetch<
      IUser,
      Error,
      string,
      "post" | "get"
    >("auth/login", {
      method: "POST",
      body: loginData,
    });
    if (fetchedUser.value) {
      user.value = fetchedUser.value;
    }
  }

  async function getUser() {
    try {
      const { data: fetchedUser } = await useApiFetch("auth/login", {
        method: "GET",
      });
      if (fetchedUser.value) {
        user.value = fetchedUser.value;
      }

      console.log("УСПЕХ");
    } catch {}
  }
  return { user: readonly(user), login, getUser };
});
