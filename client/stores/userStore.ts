export const useUserStore = defineStore("counter", () => {
  const firstName = ref("");
  const secondName = ref("");
  const role = ref("");

  return { firstName, secondName, role };
});
