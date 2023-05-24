import {
  IFrameApplication,
  FrameApplicationStatus,
  ITrainee,
} from "~/types/types";

export const useTraineeStore = defineStore("traineeStore", () => {
  const allFrameApplications = ref<IFrameApplication[]>([]);
  useApiFetch<IFrameApplication[], Error, string, "post" | "get">(
    `applications/getFrameApplications`,
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
      number[],
      Error,
      string,
      "get"
    >(`applications/frame-application/${applicationId}/trainees`, {
      method: "GET",
    });
    // эмулирую приход юзер(стажер) объектов
    const arrTrainnes: ITrainee[] = [];
    fetchedTrainees.value?.forEach((element) =>
      arrTrainnes.push({
        firstName: "userName",
        secondName: "userSecondname",
        thirdName: "userThirdName",
        age: 20,
        userId: element,
        nationality: "nationality",
        city: "city",
        experience: true,
        position: [
          { applicationId: 1, positionId: 1, value: "gruzchik" },
          { applicationId: 2, positionId: 2, value: "stroitel" },
        ],
        education: "Voenmeh",
        course: "44 course",
      })
    );
    return arrTrainnes;
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
