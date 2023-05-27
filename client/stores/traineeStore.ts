import {
  IFrameApplication,
  FrameApplicationStatus,
  ITrainee,
} from "~/types/types";
import { useFrameApplicationsStore } from "./frameApplicationsStore";

export const useTraineeStore = defineStore("traineeStore", () => {
  const frameApplicationsStore = useFrameApplicationsStore();
  const allFrameApplications = ref<IFrameApplication[]>(
    frameApplicationsStore.allApprovedFrameApplications
  );

  async function submitTraineeRespond(
    applicationId: number,
    traineeId: number,
    result?: number
  ) {
    if (result !== -1) {
      await useApiFetch<number, Error, string, "put">(
        `applications/frame-application/${applicationId}/submit/${traineeId}`,
        {
          method: "PUT",
          query: { result: result },
        }
      );
    } else
      await useApiFetch<number, Error, string, "put">(
        `applications/frame-application/${applicationId}/submit/${traineeId}`,
        {
          method: "PUT",
        }
      );
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

  async function getTraineesForMentorByApplicationId(applicationId: number) {
    const { data: fetchedTrainees } = await useApiFetch<
      ITrainee[],
      Error,
      string,
      "get"
    >(`applications/frame-application/${applicationId}/mentor-trainees`, {
      method: "GET",
    });
    return fetchedTrainees.value;
  }

  async function getTraineesForFrameByApplicationId(applicationId: number) {
    const { data: fetchedTrainees } = await useApiFetch<
      ITrainee[],
      Error,
      string,
      "get"
    >(`applications/frame-application/${applicationId}/frame-trainees`, {
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
    getTraineesForMentorByApplicationId,
    getTraineesForFrameByApplicationId,
    getApplicationsByTraineeId,
    getApplicationsWithoutTrainee,
    allFrameApplications,
  };
});
