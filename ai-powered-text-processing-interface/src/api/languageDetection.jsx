// src/api/languageDetection.js
export const detectLanguage = async (inputText, setError, setDetectedLanguage) => {
    if (inputText.trim() === '') {
      setError('Please enter some text');
      return;
    }
  
    setError(''); // Clear any previous errors
  
    try {
      const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;
      let detector;
  
      if (canDetect === 'no') {
        setError('Language detector is not available.');
        return;
      }
  
      if (canDetect === 'readily') {
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
            //   console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }
  
      // Detect language
    const detectedLang = await detector.detect(inputText);
    console.log('Full Detection Output:', detectedLang); // Debug log
    setDetectedLanguage(detectedLang[0].detectedLanguage); // Select the first detected language for simplicity
  } catch (err) {
      setError('Error detecting language: ' + err.message);
    }
  };
  