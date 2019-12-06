import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  language: string;
  code: string;
  onCodeChange: Function;
};
const Editor: React.FC<Props> = ({ code, language, onCodeChange }) => {
  return (
    <Wrapper>
      <TextArea value={code} onChange={(e): void => onCodeChange(e.target.value)} spellCheck={false} autoFocus />
      <HighlightedText language={language} style={monokai}>
        {code}
      </HighlightedText>
    </Wrapper>
  );
};

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

export default Editor;
