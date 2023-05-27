import { defineStore } from "pinia";
import { IQuestion, ITest } from "~/types/types";

export const useTestStore = defineStore("test_store", () => {
  const creationTest = ref<IQuestion[]>([]);
  const personalTestResult = ref(-1);
  const currentTest = ref<IQuestion[]>([]);

  async function createTest(applicationId: number, questions: IQuestion[]) {
    await useApiFetch(`tests/test/${applicationId}`, {
      method: "POST",
      body: questions,
    });
  }
  async function getTestByFrameApplicationId(id: number) {
    const { data: test } = await useApiFetch<ITest>(`tests/test/${id}`, {
      method: "GET",
    });
    console.log("test", test.value);
    if (test.value) currentTest.value = test.value.questions;
  }

  async function applyTestResult(
    applicationId: number,
    traineeId: number,
    result: number
  ) {
    await useApiFetch(`tests/test-answer/${applicationId}/${traineeId}`, {
      method: "POST",
      query: { result: result },
    });
  }

  return {
    creationTest,
    createTest,
    getTestByFrameApplicationId,
    currentTest,
    personalTestResult,
  };
});
