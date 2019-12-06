import React, { useState, useEffect } from 'react';
import CssBaseline from './components/CssBaseline';
import { Base64 } from 'js-base64';

import TopBar from './components/TopBar';
import Editor from './components/Editor';

const App: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('text');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const data = {
      code,
      language,
    };

    // TODO: Might be able to improve this using compression like https://www.npmjs.com/package/lz-string
    // TODO: Stringify might be slow here and result in lag, profile this.
    setUrl(code ? `${window.location.origin}#${Base64.encodeURI(JSON.stringify(data))}` : '');
  }, [code, language]);

  useEffect(() => {
    const hash = Base64.decode(window.location.hash.substring(1));
    if (hash) {
      const { code, language } = JSON.parse(hash);
      setCode(code);
      setLanguage(language);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <TopBar language={language} url={url} onLanguageChange={(value): void => setLanguage(value)} />
      <Editor code={code} language={language} onCodeChange={(value): void => setCode(value)} />
    </>
  );
};

export default App;
