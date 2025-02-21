// Initialize and reuse summarizer
export const initializeSummarizer = async (setError) => {
    try {
      const apiToken = import.meta.env.VITE_SUMMARIZER_API_TOKEN;
      console.log(apiToken)
      const apiOrigin = import.meta.env.VITE_SUMMARIZER_API_ORIGIN;
  
      if (!apiToken) {
        setError("Missing API token. Check your .env file.");
        return null;
      }
  
      if (!self.ai?.summarizer?.capabilities) {
        setError("Summarizer API is not available.");
        return null;
      }
  
      const capabilities = await self.ai.summarizer.capabilities();
      if (capabilities.available === "no") {
        setError("Summarizer is not supported in this environment.");
        return null;
      }
  
      const options = {
        token: apiToken,
        origin: apiOrigin,
        
      };
  
      // Create and preload summarizer
      const summarizer = await self.ai.summarizer.create(options);
  
      if (capabilities.available === "possibly") {
        summarizer.addEventListener("downloadprogress", (e) => {
          console.log(`Downloading model: ${e.loaded} of ${e.total}`);
        });
        await summarizer.ready; // Ensure the model is fully loaded
      }
  
      return summarizer;
    } catch (err) {
      setError("Error initializing summarizer: " + err.message);
      return null;
    }
  };
  
  // Summarize using preloaded summarizer
  export const summarizeText = async (inputText, summarizer, setError) => {
    try {
      if (!summarizer) throw new Error("Summarizer not available.");
  
      const summaryResult = await summarizer.summarize(inputText);
      return summaryResult;
    } catch (err) {
      setError("Error summarizing text: " + err.message);
      return "";
    }
  };
  