export const URL_DATA = import.meta.env.VITE_URL_DATA;
export const enableInitialFakeData =
  import.meta.env.VITE_ENABLE_INITIAL_FAKE_DATA === "true" ? true : false;

if (!URL_DATA) {
  throw new Error("No URL_DATA");
}

let refetchInterval = parseInt(import.meta.env.VITE_REFETCH_INTERVAL ?? "1000");
if (isNaN(refetchInterval)) refetchInterval = 1000;
export { refetchInterval };

console.log({ URL_DATA, enableInitialFakeData, refetchInterval });
