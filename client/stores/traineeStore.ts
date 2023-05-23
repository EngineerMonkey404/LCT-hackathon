import { IFrameApplication } from "~/types/types";

export const useTraineeStore = defineStore("traineeStore", () => {
    const allFrameApplications = ref<IFrameApplication[]>([]);
     useApiFetch<
        IFrameApplication[],
        Error,
        string,
        "post" | "get"
    >(`applications/getFrameApplications`, {
        method: "GET",
    }).then((res) => allFrameApplications.value = res.data.value ?? []);
    console.log(allFrameApplications)

    /* async function submitTraineeRespond(applicationId: number, traineeId: number) {
        const { data: newApplication } = await useApiFetch<
            number,
            Error,
            string,
            "put"
        >(
            `applications/submitTraineeRespond/${applicationId}/${traineeId}`,
            {
                method: "PUT",
            }
        );`
    } */
    function submitTraineeRespond(application: IFrameApplication, traineeId: number) {
        if (application.traineesId) {
            application.traineesId.push(traineeId)
        } else {
            application.traineesId = [traineeId]
        }
        console.log(application)
    }

    function getApplicationsByTraineeId(traineeId: number) {
        return allFrameApplications.value?.filter(element => element.traineesId?.includes(traineeId))
    }

    function getApplicationsWithoutTrainee(traineeId: number) {
        return allFrameApplications.value?.filter(element => !element.traineesId?.includes(traineeId))
    }
    

    async function getTraineesByApplicationId(applicationId: number) {
        const { data: fetchedTrainees } = await useApiFetch<
            number[],
            Error,
            string,
            "get"
        >(
            `applications/getTraineesByApplicationId/${applicationId}`,
            {
                method: "GET",
            }
        );
        return fetchedTrainees.value
    }

    return {
        submitTraineeRespond,
        getTraineesByApplicationId,
        getApplicationsByTraineeId,
        getApplicationsWithoutTrainee,
        allFrameApplications,
    }
})