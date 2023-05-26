import { FrameApplicationStatus } from "~/types/types";

export const useMentorApplicationStore = defineStore("mentorApplicationStore", () => {
    
    async function mentorSubmitApplication(applicationId: number, traineeId: number, status: FrameApplicationStatus) {
        const { data: newApplication } = await useApiFetch<
            number,
            Error,
            string,
            "put"
        >(`applications/frame-application/${applicationId}/mentor-submit/${traineeId}`, {
            method: "PUT",
            query: {"status": status},
        });
        
    }

    return {
        mentorSubmitApplication,
    }

})