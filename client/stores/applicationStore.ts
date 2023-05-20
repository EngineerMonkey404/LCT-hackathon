export const useApplicationStore = defineStore("application", () => {
    const application = ref<IApplication>();
    
    const getStatusById = (id: number) => {
        //по id кандидата ищем заявку в базе и возвращаем статус
        //status.value = 'confirm'
        //status.value = 'reject'
        //status.value = 'wait'
        if (application.value) return application.value.status
        
    }

    const createApplication = (newApplication: IApplication) => {
        //по id кандидата создаем заявку и задаем статус ждать
        application.value = newApplication
        application.value.status = 'wait'
    }
    return { application, getStatusById, createApplication };
  });

  interface IApplication {
    birthday?: string;
    citizenship?: string;
    education?: string;
    course?: string;
    workExpirence?: string;
    jobs?: string[];
    status?: string;
  }