export const detectLanguage = async (inputText, setError, setDetectedLanguage) => {
  if (inputText.trim() === '') {
    setError('Please enter some text');
    return;
  }

  setError(''); // Clear any previous errors

  try {
    const apiToken = import.meta.env.VITE_LANGUAGE_API_TOKEN;
    const apiOrigin = import.meta.env.VITE_API_ORIGIN;
    console.log('self.ai:', self.ai); // Debug AI API availability

    if (!self.ai || !self.ai.languageDetector) {
      setError('Language detection API is not available.');
      return;
    }
    
    
    console.log('API Token:', apiToken);
    console.log('API Origin:', apiOrigin);

    if (!apiToken) {
      setError('Missing API token. Check your .env file.');
      return;
    }

    const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
    console.log('Language Detector Capabilities:', languageDetectorCapabilities);

    const canDetect = languageDetectorCapabilities.capabilities;
    let detector;

    if (canDetect === 'no') {
      setError('Language detector is not available.');
      return;
    }

    if (canDetect === 'readily') {
      detector = await self.ai.languageDetector.create({
          token: apiToken,
          origin: apiOrigin,
      });
    } else {
      detector = await self.ai.languageDetector.create({
          token: apiToken,
          origin: apiOrigin,
          monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
          },
      });
      await detector.ready;
    }

    // Detect language
    const detectedLang = await detector.detect(inputText);
    console.log('Full Detection Output:', detectedLang); // Debug log
    setDetectedLanguage(detectedLang[0]?.detectedLanguage || 'Unknown'); // Select the first detected language
  } catch (err) {
    console.error('Language detection error:', err);
    setError('Error detecting language: ' + err.message);
  }
};
