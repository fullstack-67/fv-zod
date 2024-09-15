export const URL_DATA = import.meta.env.VITE_URL_DATA;
export const enableInitialFakeData =
  import.meta.env.VITE_ENABLE_INITIAL_FAKE_DATA === "true" ? true : false;

if (!URL_DATA) {
  throw new Error("No URL_DATA");
}

console.log({ URL_DATA, enableInitialFakeData });
