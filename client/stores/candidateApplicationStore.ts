import { FrameApplicationStatus, ICandidateApplication } from "~/types/types";

export const useCandidateApplicationStore = defineStore("CandidateApplicationStore", () => {
  
  const allCandidateApplications = ref<ICandidateApplication[]>();
  const personalCandidateApplication = ref<ICandidateApplication>();

  const getStatusById = (id: number) => {
    //по id кандидата ищем заявку в базе и возвращаем статус
    //status.value = 'reject'
    //status.value = 'wait'
    //if (listCandidatesApplications.value[id]) return listCandidatesApplications.value[id].status
    
  };

  async function getCandidateApplicationById(id: number) {
    const { data: fetchedApplications, error } = await useApiFetch<
      ICandidateApplication,
      Error,
      string,
      "post" | "get"
    >(`applications/getCandidateApplicationById/${id}`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      personalCandidateApplication.value = fetchedApplications.value;
    }
    console.log(personalCandidateApplication.value)
  }

  async function getAllCandidateApplications() {
    const { data: fetchedApplications, error } = await useApiFetch<
      ICandidateApplication[],
      Error,
      string,
      "post" | "get"
    >(`applications/getAllCandidateApplications`, {
      method: "GET",
    });
    if (fetchedApplications.value) {
      allCandidateApplications.value = fetchedApplications.value;
    }
  }

  async function createCandidateApplication(application: ICandidateApplication) {
    const { data: newApplication } = await useApiFetch<
      ICandidateApplication,
      Error,
      string,
      "post" | "get"
    >(`applications/createCandidateApplication`, {
      method: "POST",
      body: application,
    });
    console.log(newApplication.value);
  }

  async function submitCandidateApplication(applicationId: number, status: FrameApplicationStatus) {
    const { data: newApplication } = await useApiFetch<
      ICandidateApplication,
      Error,
      string,
      "put"
    >(
      `applications/submitCandidateApplication/${applicationId}?status=${status}`,
      {
        method: "PUT",
      }
    );
  }

  return {
    createCandidateApplication,
    submitCandidateApplication,
    allCandidateApplications,
    getAllCandidateApplications,
    getCandidateApplicationById,
    personalCandidateApplication,
  }
});

