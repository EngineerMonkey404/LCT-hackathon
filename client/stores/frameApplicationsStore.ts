import {
  IUser,
  IFrameApplication,
  FrameApplicationStatus,
} from "~/types/types";

export const useFrameApplicationsStore = defineStore("applications", () => {
  const personalFrameApplications = ref<IFrameApplication[]>([]);
  const allFrameApplications = ref<IFrameApplication[]>([]);
  const allApprovedFrameApplications = ref<IFrameApplication[]>([])

  const approvedFrameApplications = computed(() => {
    return personalFrameApplications.value.filter(
      (app) => app.status === FrameApplicationStatus.APPROVED
    );
  });

  async function getApplicationsByFrameId(id: number) {
    const { data: fetchedApplications, error } = await useApiFetch<
      IFrameApplication[],
      Error,
      string,
      "post" | "get"
    >(`applications/frame-applications/${id}`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      personalFrameApplications.value = fetchedApplications.value;
    }
  }

  const personalApprovedApplications = computed(() => {
    return personalFrameApplications.value.filter(
      (element) => element.status === FrameApplicationStatus.APPROVED
    )
  })

  async function getFrameApplications() {
    const { data: fetchedApplications, error } = await useApiFetch<
      IFrameApplication[],
      Error,
      string,
      "post" | "get"
    >(`applications/frame-applications`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      allFrameApplications.value = fetchedApplications.value;
    }
  }

  async function getApprovedFrameApplications() {
    if (!allFrameApplications.value.length) {
      await getFrameApplications();
    }
    allApprovedFrameApplications.value = allFrameApplications.value.filter(
      (element) => element.status === FrameApplicationStatus.APPROVED
    );
  }

  async function getFrameApplicationById(id: number) {
    const { data: fetchedApplication, error } =
      await useApiFetch<IFrameApplication>(
        `applications/frame-application/${id}`,
        {
          method: "GET",
        }
      );
    return fetchedApplication.value;
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
    >(`applications/frame-application`, {
      method: "POST",
      body: application,
    });
    if (newApplication.value) {
      newApplication.value.status = FrameApplicationStatus.PENDING;
      personalFrameApplications.value.push(newApplication.value);
    }
  }

  async function deleteApplication(id: number) {
    await useApiFetch<IFrameApplication[], Error, string, "delete">(
      `/applications/frame-application/${id}`,
      {
        method: "DELETE",
      }
    );
    personalFrameApplications.value.splice(
      personalFrameApplications.value.findIndex(
        (elem) => elem.applicationId === id
      ),
      1
    );
  }

  async function submitCuratorRespond(
    application_id: number,
    status: FrameApplicationStatus
  ) {
    const { data: newApplication } = await useApiFetch<
      IFrameApplication,
      Error,
      string,
      "put"
    >(
      `applications/frame-application/${application_id}/submit?status=${status}`,
      {
        method: "PUT",
      }
    );
  }

  async function updateFrameApplication(application: IFrameApplication) {
    const { data: newApplication } = await useApiFetch<
      IFrameApplication,
      Error,
      string,
      "put"
    >(`applications/frame-application/${application.applicationId}`, {
      method: "PUT",
      body: application,
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
    approvedFrameApplications,
    getFrameApplicationById,
    updateFrameApplication,
    getApprovedFrameApplications,
    allApprovedFrameApplications,
    personalApprovedApplications,
  };
});
