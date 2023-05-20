export const useVacancieStore = defineStore("vacancie", () => {
    //const vacancie = ref<IVacancie | null>();
    const vacancieList = ref<IVacancie[]>([]);
    
    const getVacancieList = () => {
        //список заявок от кадров из базы
        return vacancieList.value 
    }

    const createVacancie = (newVacancie: IVacancie) => {
        newVacancie.status = 'checked'
        vacancieList.value.push(newVacancie);
    }
    return { vacancieList, getVacancieList, createVacancie };
  });

interface IVacancie {
    job: string,
    organization: string,
    adress: string,
    description: string,
    workExpirience: string[],
    status?: string,
}