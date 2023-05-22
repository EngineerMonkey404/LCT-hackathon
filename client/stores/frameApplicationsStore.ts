import {
  IUser,
  IFrameApplication,
  FrameApplicationStatus,
} from "~/types/types";

export const useFrameApplicationsStore = defineStore("applications", () => {
  const personalFrameApplications = ref<IFrameApplication[]>([]);
  const allFrameApplications = ref<IFrameApplication[]>([]);

  async function getApplicationsByFrameId(id: number) {
    const { data: fetchedApplications, error } = await useApiFetch<
      IFrameApplication[],
      Error,
      string,
      "post" | "get"
    >(`applications/getFrameApplications/${id}`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      personalFrameApplications.value = fetchedApplications.value;
    }
  }

  async function getFrameApplications() { //not working 404
    const { data: fetchedApplications, error } = await useApiFetch<
      IFrameApplication[],
      Error,
      string,
      "post" | "get"
    >(`applications/getFrameApplications/`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      allFrameApplications.value = fetchedApplications.value;
    }
  }

  // async function getCuratorApplications(id: number) {
  //   const { data: fetchedApplications, error } = await useApiFetch<
  //     IFrameApplication[],
  //     Error,
  //     string,
  //     "post" | "get"
  //   >(`applications/getFrameApplications/${id}`, {
  //     method: "GET",
  //   });
  //   if (fetchedApplications.value) {
  //     applications.value = fetchedApplications.value;
  //   }
  // }

  async function createApplication(application: IFrameApplication) {
    const { data: newApplication } = await useApiFetch<
      IFrameApplication,
      Error,
      string,
      "post" | "get"
    >(`applications/createFrameApplication`, {
      method: "POST",
      body: application,
    });
    if (newApplication.value) {
      newApplication.value.status = FrameApplicationStatus.PENDING;
      personalFrameApplications.value.push(newApplication.value);
    }
  }

  async function deleteApplication(id: number) {
    await useApiFetch<
      IFrameApplication[],
      Error,
      string,
      "delete"
    >(`/applications/deleteFrameApplication/${id}`, {
      method: "DELETE",
    });
  }

  async function submitCuratorRespond(application_id: number, curator_id: number, status: FrameApplicationStatus) {
    const { data: newApplication } = await useApiFetch<
      IFrameApplication,
      Error,
      string,
      "put"
    >(`applications/submitCuratorRespond/${application_id}/${curator_id}?status=${status}`, {
      method: "PUT",
    });
    
  }

  return {
    createApplication,
    personalFrameApplications,
    getApplicationsByFrameId,
    allFrameApplications,
    getFrameApplications,
    deleteApplication,
    submitCuratorRespond,
  };
});
