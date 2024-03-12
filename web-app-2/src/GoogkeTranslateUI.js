import React, { useState } from 'react';

const GoogleTranslateUI = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');

  const handleTranslate = () => {
    // Implement translation logic here
    // This is just a placeholder
    setTranslatedText(`Translated text for "${sourceText}" from ${sourceLanguage} to ${targetLanguage}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Google Translate</h1>
      <div className="flex mb-4">
        <textarea
          className="flex-1 border border-gray-300 rounded-md p-2 mr-2 resize-none"
          placeholder="Enter text to translate"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleTranslate}
        >
          Translate
        </button>
      </div>
      <div className="flex">
        <select
          className="border border-gray-300 rounded-md p-2 mr-2"
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          {/* Add more languages as needed */}
        </select>
        <select
          className="border border-gray-300 rounded-md p-2"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="fr">French</option>
          <option value="en">English</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Translated Text:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default GoogleTranslateUI;
