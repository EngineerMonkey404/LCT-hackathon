import { FrameApplicationStatus, ICandidateApplication } from "~/types/types";

export const useCandidateApplicationStore = defineStore(
  "CandidateApplicationStore",
  () => {
    const allCandidateApplications = ref<ICandidateApplication[]>();
    const personalCandidateApplication = ref<ICandidateApplication | null>(
      null
    );

    const getStatusById = (id: number) => {
      //по id кандидата ищем заявку в базе и возвращаем статус
      //status.value = 'reject'
      //status.value = 'wait'
      //if (listCandidatesApplications.value[id]) return listCandidatesApplications.value[id].status
    };

    async function getCandidateApplicationById(id: number) {
      const { data: fetchedApplication, error } = await useApiFetch<
        ICandidateApplication,
        Error,
        string,
        "post" | "get"
      >(`applications/candidate-application/${id}`, {
        method: "GET",
      });
      if (fetchedApplication.value) {
        personalCandidateApplication.value = fetchedApplication.value;

        return fetchedApplication.value;
      }
    }

    async function getAllCandidateApplications() {
      const { data: fetchedApplications, error } = await useApiFetch<
        ICandidateApplication[],
        Error,
        string,
        "post" | "get"
      >(`applications/candidate-applications`, {
        method: "GET",
      });
      if (fetchedApplications.value) {
        allCandidateApplications.value = fetchedApplications.value;
      }
    }

    async function getPendingCandidateApplications() {
      const { data: fetchedApplications, error } = await useApiFetch<
        ICandidateApplication[],
        Error,
        string,
        "post" | "get"
      >(`applications/candidate-applications`, {
        method: "GET",
        query: { status: FrameApplicationStatus.PENDING },
      });
      if (fetchedApplications.value) {
        allCandidateApplications.value = fetchedApplications.value;
      }
    }

    async function createCandidateApplication(
      application: ICandidateApplication
    ) {
      const { data: newApplication } = await useApiFetch<
        ICandidateApplication,
        Error,
        string,
        "post" | "get"
      >(`applications/candidate-application`, {
        method: "POST",
        body: application,
      });
      personalCandidateApplication.value = application ?? null;
    }

    async function submitCandidateApplication(
      applicationId: number,
      status: FrameApplicationStatus
    ) {
      const { data: newApplication } = await useApiFetch<
        ICandidateApplication,
        Error,
        string,
        "put"
      >(
        `applications/candidate-application/submit/${applicationId}?status=${status}`,
        {
          method: "PUT",
        }
      );
    }

    async function russianLanguage(applicationId: number, result: number) {
      await useApiFetch<number, Error, string, "put">(
        `applications/candidate-application/russian-language/${applicationId}?result=${result}`,
        {
          method: "PUT",
        }
      );
      if (personalCandidateApplication.value)
        personalCandidateApplication.value.russianLanguageTestResult = result;
    }

    async function computerLiteracy(applicationId: number, result: number) {
      await useApiFetch<number, Error, string, "put">(
        `applications/candidate-application/computer-literacy/${applicationId}?result=${result}`,
        {
          method: "PUT",
        }
      );
      if (personalCandidateApplication.value)
        personalCandidateApplication.value.computerLiteracyTestResult = result;
    }

    async function informationAnalysis(applicationId: number, result: number) {
      await useApiFetch<number, Error, string, "put">(
        `applications/candidate-application/information-analysis/${applicationId}?result=${result}`,
        {
          method: "PUT",
        }
      );
      if (personalCandidateApplication.value)
        personalCandidateApplication.value.informationAnalysisTestResult =
          result;
    }

    return {
      createCandidateApplication,
      submitCandidateApplication,
      allCandidateApplications,
      getAllCandidateApplications,
      getCandidateApplicationById,
      personalCandidateApplication,
      russianLanguage,
      computerLiteracy,
      informationAnalysis,
      getPendingCandidateApplications,
    };
  }
);
