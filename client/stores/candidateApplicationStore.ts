import { ICandidateApplication } from "~/types/types";

export const useCandidateApplicationStore = defineStore("CandidateApplicationStore", () => {
  
  const listCandidatesApplications = ref<IApplication[]>([]);

  const getStatusById = (id: number) => {
    //по id кандидата ищем заявку в базе и возвращаем статус
    //status.value = 'reject'
    //status.value = 'wait'
    if (listCandidatesApplications.value[id]) return listCandidatesApplications.value[id].status
    
  };



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

  return {
    createCandidateApplication,
  }
});

export interface IApplication {
  birthday?: string;
  citizenship?: string;
  town?: string;
  education?: string;
  course?: string;
  workExpirence?: string;
  jobs?: string[];
  status?: string;
}
