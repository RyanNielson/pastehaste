import React, { useState, useEffect, useRef } from 'react';
import CssBaseline from './components/CssBaseline';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Base64 } from 'js-base64';
import supportedLanguages from 'react-syntax-highlighter/dist/esm/languages/hljs/supported-languages';

const Wrapper = styled.div`
  position: absolute;
  top: 2em;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5em;
  background: transparent;
  color: transparent;
  caret-color: #ffffff;
  line-height: 1.5;
  border: 0;
  outline: none;
`;

const HighlightedText = styled(SyntaxHighlighter)`
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const Bar = styled.div`
  color: #ffffff;
  padding: 0 0.5em;
  height: 2em;
  vertical-align: middle;
  line-height: 2em;
  background-color: #4a5568;
  display: flex;
  justify-content: space-between;
`;

const UrlArea = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const CopyUrlButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  padding: 0;
`;

const GeneratedUrl = styled.input.attrs({ type: 'text', spellcheck: 'false', readOnly: true })`
  appearance: none;
  background: none;
  border: none;
  text-decoration: none;
  outline: none;
  flex: 1;
  text-align: right;
  padding: 0 0.5em;
  color: #ffffff;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LanguageSelect = styled.select`
  margin: 0 0.5em;
  padding: 0 0.5em;
  // appearance: none;
  border: 0;
`;

const App: React.FC = () => {
  const [code, setCode] = useState(Base64.decode(window.location.hash.substring(1)));
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('text');
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TODO: Might be able to improve this using compression like https://www.npmjs.com/package/lz-string
    setUrl(code ? `${window.location.origin}#${Base64.encodeURI(code)}` : '');
  }, [code]);

  const copyUrlToClipboard = (): void => {
    const urlInput = urlInputRef.current;

    if (urlInput) {
      urlInput.select();
      document.execCommand('copy');
    }
  };

  return (
    <>
      <CssBaseline />
      <Bar>
        <span>pastehaste</span>
        <LanguageSelect value={language} onChange={(e): void => setLanguage(e.target.value)}>
          <option value="text">text</option>
          {supportedLanguages.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </LanguageSelect>
        <UrlArea>
          <GeneratedUrl ref={urlInputRef} value={url} spellCheck={false} />
          <CopyUrlButton onClick={copyUrlToClipboard}>copy url</CopyUrlButton>
        </UrlArea>
      </Bar>
      <Wrapper>
        <TextArea value={code} onChange={(e): void => setCode(e.target.value)} spellCheck={false} autoFocus />
        <HighlightedText language={language} style={monokai}>
          {code}
        </HighlightedText>
      </Wrapper>
    </>
  );
};

export default App;
