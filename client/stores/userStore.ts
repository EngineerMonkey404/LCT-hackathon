import { IUser, RegisterData, Role } from "~/types/types";
import { defineStore } from "pinia";

export const useUserStore = defineStore("counter", () => {
  const user = ref<IUser | null>(null);

  async function registerUser(registerData: RegisterData, path?: string) {
    const user = ref();
    if (path) {
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
    } catch {}
  }

  async function getUserById(id: number) {
    const { data: user } = await useApiFetch<IUser>(`auth/user/${id}`, {
      method: "GET",
    });
    return user.value;
  }

  async function checkEmail(email: string) {
    const { data: exists } = await useApiFetch<boolean>(
      `auth/user/check-email/${email}`,
      {
        method: "GET",
      }
    );
    return !exists.value;
  }

  return { user: user, login, getUser, registerUser, getUserById, checkEmail };
});
