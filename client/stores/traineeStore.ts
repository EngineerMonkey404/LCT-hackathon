import {
  IFrameApplication,
  FrameApplicationStatus,
  ITrainee,
} from "~/types/types";

export const useTraineeStore = defineStore("traineeStore", () => {
  const allFrameApplications = ref<IFrameApplication[]>([]);
  useApiFetch<IFrameApplication[], Error, string, "post" | "get">(
    `applications/frame-applications`,
    {
      method: "GET",
    }
  ).then((res) => (allFrameApplications.value = res.data.value ?? []));
  console.log(allFrameApplications);

  const personalApprovedFrameApplications = computed(() => {
    //frames poka chto
    return allFrameApplications.value.filter(
      (element) => element.status === FrameApplicationStatus.APPROVED
    );
  });

  async function submitTraineeRespond(
    applicationId: number,
    traineeId: number
  ) {
    const { data: newApplication } = await useApiFetch<
      number,
      Error,
      string,
      "put"
    >(`applications/frame-application/${applicationId}/submit/${traineeId}`, {
      method: "PUT",
    });
  }
  //need traineesId[] in frameApplication как будет сделаю получение заявок из стора со статусом апрувд
  // и далее геттеры для таких заявок
  /* function submitTraineeRespond(application: IFrameApplication, traineeId: number) {
        if (application.traineesId) {
            application.traineesId.push(traineeId)
        } else {
            application.traineesId = [traineeId]
        }
        console.log(application)
    } */

  function getApplicationsByTraineeId(traineeId: number) {
    return allFrameApplications.value?.filter((element) =>
      element.traineesId?.includes(traineeId)
    );
  }

  function getApplicationsWithoutTrainee(traineeId: number) {
    return allFrameApplications.value?.filter(
      (element) => !element.traineesId?.includes(traineeId)
    );
  }

  async function getTraineesByApplicationId(applicationId: number) {
    const { data: fetchedTrainees } = await useApiFetch<
      ITrainee[],
      Error,
      string,
      "get"
    >(`applications/frame-application/${applicationId}/trainees`, {
      method: "GET",
    });
    return fetchedTrainees.value;
  }

  /* const getTraineesByApplicationId = computed((applicationId: number) => {
        let application = allFrameApplications.value.filter(elem => elem.applicationId = applicationId);
        return application[0].traineesId
    }) */

  return {
    submitTraineeRespond,
    getTraineesByApplicationId,
    getApplicationsByTraineeId,
    getApplicationsWithoutTrainee,
    allFrameApplications,
    personalApprovedFrameApplications,
  };
});
