import {
  Direction,
  FrameApplicationFilter,
  FrameApplicationStatus,
  IFrameApplication,
  IUser,
  MentorStatus,
  TraineeOnFrameApplication,
  TraineeStatus,
} from "~/types/types";
import { useUserStore } from "~/stores/userStore";

export const useFrameApplicationsStore = defineStore("applications", () => {
  const userStore = useUserStore();
  const personalFrameApplications = ref<IFrameApplication[]>([]);
  const allFrameApplications = ref<IFrameApplication[]>([]);
  const allApprovedFrameApplications = ref<IFrameApplication[]>([]);
  let currentApplication: IFrameApplication[] = [];
  const filteredApplications = ref<IFrameApplication[]>([]);
  const mentorApplications = ref<IFrameApplication[]>([]);
  const traineeFrameApplicationIds = ref<number[]>([]);
  const traineeFrameApplications = ref<TraineeOnFrameApplication[]>([]);
  const creationApplication = ref<IFrameApplication>({
    organization: userStore.user?.organization ?? {
      name: "",
      address: "",
      coordinates: [0, 0],
    },
    position: "",
    description: "",
    workExperience: [],
    frameId: userStore.user!.userId!,
  });
  const mentors = ref<IUser[]>([]);
  const approvedFrameApplications = computed(() => {
    return personalFrameApplications.value.filter(
      (app) => app.status === FrameApplicationStatus.APPROVED
    );
  });

  async function getMentorApplications(mentorId: number) {
    const { data: fetchedApplications } = await useApiFetch<
      IFrameApplication[]
    >(`applications/frame-application/mentor/${mentorId}`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      mentorApplications.value = fetchedApplications.value;
    }
  }

  async function getMentorsByDirection(direction: Direction) {
    const { data: fetchedMentors } = await useApiFetch<IUser[]>(
      "applications/frame-application/mentors",
      {
        method: "GET",
        query: { direction: direction },
      }
    );
    if (fetchedMentors.value) {
      mentors.value = fetchedMentors.value;
    }
  }

  async function getTraineeFrameApplications(traineeId: number) {
    const { data: fetchedApplications, error } = await useApiFetch<
      TraineeOnFrameApplication[]
    >(`applications/frame-application/trainee/${traineeId}`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      traineeFrameApplicationIds.value = fetchedApplications.value.map(
        (application) => application.applicationId
      );
      traineeFrameApplications.value = fetchedApplications.value;
    }
  }

  async function frameSubmitApplication(
    applicationId: number,
    traineeId: number,
    status: TraineeStatus
  ) {
    const { data: newApplication } = await useApiFetch<
      number,
      Error,
      string,
      "put"
    >(
      `applications/frame-application/${applicationId}/frame-submit/${traineeId}`,
      {
        method: "PUT",
        query: { status: status },
      }
    );
  }

  function getApplicationStatus(applicationId: number) {
    const application = traineeFrameApplications.value.filter(
      (application) => application.applicationId === applicationId
    )[0];
    if (application.mentorStatus === MentorStatus.PENDING) {
      return "На рассмотрении у наставника";
    } else if (application.mentorStatus === MentorStatus.DECLINED) {
      return "Не одобрена наставником";
    } else if (
      application.mentorStatus === MentorStatus.APPROVED &&
      application.traineeStatus === TraineeStatus.PENDING
    ) {
      return "На рассмотрении у кадра";
    } else if (application.traineeStatus === TraineeStatus.APPROVED) {
      return "Одобрена кадром";
    } else return "Не одобрена кадром";
  }

  async function getApplicationResult(applicationId: number) {
    return traineeFrameApplications.value.filter(
      (application) => application.applicationId === applicationId
    )[0].result;
  }

  function getFilteredFrameApplications(
    filter: FrameApplicationFilter
  ): IFrameApplication[] {
    if (allApprovedFrameApplications.value) {
      if (filter === FrameApplicationFilter.SENDED) {
        currentApplication = allApprovedFrameApplications.value.filter(
          (application) =>
            traineeFrameApplicationIds.value.includes(
              application.applicationId!
            )
        );
        return currentApplication;
      } else
        return allApprovedFrameApplications.value.filter(
          (application) => !currentApplication.includes(application)
        );
    }
    return [];
  }

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
    );
  });

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
    const { data: appId } = await useApiFetch<
      number,
      Error,
      string,
      "post" | "get"
    >(`applications/frame-application`, {
      method: "POST",
      body: application,
    });

    creationApplication.value = {
      organization: userStore.user?.organization ?? {
        name: "",
        address: "",
        coordinates: [0, 0],
      },
      position: "",
      description: "",
      workExperience: [],
      frameId: userStore.user!.userId!,
    };
    return appId.value;
    // if (newApplication.value) {
    //   newApplication.value.status = FrameApplicationStatus.PENDING;
    //   personalFrameApplications.value.push(newApplication.value);
    // }
  }

  async function deleteApplication(id: number) {
    await useApiFetch<IFrameApplication[], Error, string, "delete">(
      `/applications/frame-application/${id}`,
      {
        method: "DELETE",
      }
    );
    await useApiFetch(`/tests/test/${id}`, { method: "DELETE" });
    personalFrameApplications.value.splice(
      personalFrameApplications.value.findIndex(
        (elem) => elem.applicationId === id
      ),
      1
    );
  }

  async function submitCuratorRespond(
    applicationId: number,
    status: FrameApplicationStatus
  ) {
    const { data: newApplication } = await useApiFetch<
      IFrameApplication,
      Error,
      string,
      "put"
    >(
      `applications/frame-application/${applicationId}/submit?status=${status}`,
      {
        method: "PUT",
      }
    );
    allFrameApplications.value.splice(
      allFrameApplications.value.findIndex(
        (application) => application.applicationId === applicationId
      ),
      1
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
    getMentorsByDirection,
    mentors,
    getTraineeFrameApplications,
    getFilteredFrameApplications,
    creationApplication,
    traineeFrameApplicationIds,
    getApplicationStatus,
    getApplicationResult,
    getMentorApplications,
    mentorApplications,
    frameSubmitApplication,
    currentApplication,
  };
});
