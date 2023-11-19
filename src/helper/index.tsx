// Retry fetching if failed
const fetchDataWithRetry = async (fetchFunction: () => Promise<void>) => {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      await fetchFunction();
      return;
    } catch (error) {
      console.error("Fetch failed, retrying...");
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  console.error(`All retries failed for : ${fetchFunction.name}`);
};

export { fetchDataWithRetry };
