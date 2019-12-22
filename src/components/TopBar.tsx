import React, { useRef } from 'react';
import styled from 'styled-components';
import supportedLanguages from 'react-syntax-highlighter/dist/esm/languages/hljs/supported-languages';

type Props = {
  language: string;
  url: string;
  onLanguageChange: Function;
};

const TopBar: React.FC<Props> = ({ language, onLanguageChange, url }) => {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const copyUrlToClipboard = (): void => {
    const urlInput = urlInputRef.current;

    if (urlInput) {
      urlInput.select();
      document.execCommand('copy');
    }
  };

  return (
    <BarContainer>
      <Bar>
        <span>pastehaste</span>
        <LanguageSelect value={language} onChange={(e): void => onLanguageChange(e.target.value)}>
          <option value="text">text</option>
          {supportedLanguages.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </LanguageSelect>
      </Bar>
      <Bar>
        <UrlArea>
          <GeneratedUrl ref={urlInputRef} value={url} spellCheck={false} />
          <CopyUrlButton onClick={copyUrlToClipboard}>copy url</CopyUrlButton>
        </UrlArea>
      </Bar>
    </BarContainer>
  );
};

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 100;
  top: 0;
  width: 100%;
  position: fixed;
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
  // position: fixed;
  // top: 0;
  // width: 100%;
  // z-index: 100;
  overflow: hidden;
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
  // padding: 0 0.5em;
  padding: 0 0.5em 0 0;
  color: #ffffff;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const LanguageSelect = styled.select`
  margin: 0 0 0 0.5em;
  padding: 0 0.5em;
  // flex: 0.5;
  // appearance: none;
  border: 0;
`;

export default TopBar;
