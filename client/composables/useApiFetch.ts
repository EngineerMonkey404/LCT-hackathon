export const useApiFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();

  console.log({
    baseURL: config.public.baseURL,
    ...opts,
    credentials: "include",
  });
  return useFetch(request, {
    baseURL: config.public.baseURL,

    credentials: "include",
    ...opts,
  });
};
