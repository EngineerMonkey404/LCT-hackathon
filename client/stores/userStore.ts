import { IUser, RegisterData, Role } from "~/types/types";
import { defineStore } from "pinia";

export const useUserStore = defineStore("counter", () => {
  const user = ref<IUser | null>(null);

  async function registerUser(registerData: RegisterData, path?: string) {
    const user = ref();
    if (path) {
      console.log("with path");
      const { data: data } = await useApiFetch<
        IUser,
        Error,
        string,
        "post" | "get"
      >(`auth/register/${path}`, {
        method: "POST",
        body: registerData,
      });
      user.value = data.value;
    } else {
      const { data: data } = await useApiFetch<
        IUser,
        Error,
        string,
        "post" | "get"
      >("auth/register", {
        method: "POST",
        body: registerData,
      });
      user.value = data.value;
    }
    if (registerData.image.file && user.value) {
      const formData = new FormData();
      formData.append("file", registerData.image.file);
      await useApiFetch(`image/${user.value.userId}`, {
        method: "POST",
        body: formData,
      });
    }
  }

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
  return { user: user, login, getUser, registerUser };
});
