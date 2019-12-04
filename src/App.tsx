import React, { useState } from 'react';
import CssBaseline from './components/CssBaseline';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
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
  caret-color: rgba(0, 0, 0, 1);
  line-height: 1.5;
`;

const HighlightedText = styled(SyntaxHighlighter)`
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  line-height: 1.5;
`;

const App: React.FC = () => {
  const [code, setCode] = useState("puts 'Hello, world!'");

  return (
    <>
      <CssBaseline />
      <Wrapper>
        <TextArea value={code} onChange={(e): void => setCode(e.currentTarget.value)} />
        <HighlightedText language="ruby">{code}</HighlightedText>
      </Wrapper>
    </>
  );
};

export default App;
