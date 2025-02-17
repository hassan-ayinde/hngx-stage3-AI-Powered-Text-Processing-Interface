export const detectLanguage = async (inputText, setError, setDetectedLanguage) => {
    if (inputText.trim() === '') {
      setError('Please enter some text');
      return;
    }
  
    setError(''); // Clear any previous errors
  
    try {
      // Assuming 'self.ai.languageDetector' is globally accessible or imported correctly
      const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;
      let detector;
  
      // If language detection is unavailable, return early
      if (canDetect === 'no') {
        setError('Language detector is not available.');
        return;
      }
  
      // If language detection is readily available, create the detector
      if (canDetect === 'readily') {
        detector = await self.ai.languageDetector.create();
      } else {
        // Handle downloading the model if needed
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
            //   console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready; // Wait for the model to be ready
      }
  
      // Detect the language of the input text
      const detectedLang = await detector.detect(inputText);
      setDetectedLanguage(detectedLang.language); // Set the detected language
      console.log()
  
    } catch (err) {
      setError('Error detecting language: ' + err.message); // Handle any errors
    }
  };
  