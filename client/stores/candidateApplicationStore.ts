export const useApplicationStore = defineStore("application", () => {
  const application = ref<IApplication>({});
  const listCandidatesApplications = ref<IApplication[]>([]);

  const getStatusById = (id: number) => {
    //по id кандидата ищем заявку в базе и возвращаем статус
    //status.value = 'reject'
    //status.value = 'wait'
    if (listCandidatesApplications.value[id]) return listCandidatesApplications.value[id].status
    
  };



  const createApplication = (newApplication: IApplication) => {
    //по id кандидата создаем заявку и задаем статус ждать
    newApplication.status = "wait";
    listCandidatesApplications.value.push(newApplication)
  };
  return { application, listCandidatesApplications, getStatusById, createApplication };
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
