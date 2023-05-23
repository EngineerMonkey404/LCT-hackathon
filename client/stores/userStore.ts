import { IUser } from "~/types/types";
import { defineStore } from "pinia";

export const useUserStore = defineStore("counter", () => {
  const user = ref<IUser | null>(null);

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

      console.log("fetchedUser", fetchedUser.value);
    } catch {}
  }
  return { user: user, login, getUser };
});
