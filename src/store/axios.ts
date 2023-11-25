import axios, { AxiosInstance } from "axios";

const axios_: AxiosInstance = axios.create({
  baseURL: "https://womenprotection.onrender.com"
});

// Retry fetching if failed
const fetchDataWithRetry = async (fetchFunction: () => Promise<void>) => {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      console.log(`${fetchFunction.name} fetching...`);

      await fetchFunction();
      return;
    } catch (error) {
      console.error(`${fetchFunction.name} failed, retrying...`);
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  console.error(`All retries failed for : ${fetchFunction.name}`);
};

export { axios_, fetchDataWithRetry };
