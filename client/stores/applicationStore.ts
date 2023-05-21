// import { IFrameApplication } from "~/types/types";
//
// export const useApplicationStore = defineStore("application", () => {
//   const application = ref<IFarApplication>({});
//
//   const getStatusById = (id: number) => {
//     //по id кандидата ищем заявку в базе и возвращаем статус
//     application.value.status = "confirm";
//     //status.value = 'reject'
//     //status.value = 'wait'
//     if (application.value) return application.value.status;
//   };
//
//   const createApplication = (newApplication: IFrameApplication) => {
//     //по id кандидата создаем заявку и задаем статус ждать
//     application.value = newApplication;
//     application.value.status = "confirm";
//   };
//   return { application, getStatusById, createApplication };
// });
