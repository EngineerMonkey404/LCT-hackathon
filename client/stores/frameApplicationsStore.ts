import {
  IUser,
  IFrameApplication,
  FrameApplicationStatus,
} from "~/types/types";

export const useFrameApplicationsStore = defineStore("applications", () => {
  const applications = ref<IFrameApplication[]>([]);

  async function getApplications(id: number) {
    const { data: fetchedApplications, error } = await useApiFetch<
      IFrameApplication[],
      Error,
      string,
      "post" | "get"
    >(`applications/getFrameApplications/${id}`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      applications.value = fetchedApplications.value;
    }
  }

  async function createApplication(application: IFrameApplication) {
    const { data: newApplication } = await useApiFetch<
      IFrameApplication,
      Error,
      string,
      "post" | "get"
    >(`applications/createApplication`, {
      method: "POST",
      body: application,
    });
    if (newApplication.value) {
      newApplication.value.status = FrameApplicationStatus.PENDING;
      applications.value.push(newApplication.value);
    }
  }
  return { createApplication, applications, getApplications };
});
