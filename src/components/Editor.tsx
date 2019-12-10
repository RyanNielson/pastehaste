import React, { useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  language: string;
  code: string;
  onCodeChange: Function;
};

const Editor: React.FC<Props> = ({ code, language, onCodeChange }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Resize editor when code changes to make sure textarea doesn't have any scrollbars.
  // TODO: We also want to do this on window resize to fix some edge cases.
  useEffect((): void => {
    const textAreaInput = textAreaRef.current;
    const wrapperDiv = wrapperRef.current;

    if (textAreaInput && wrapperDiv) {
      textAreaInput.style.cssText = 'height:' + textAreaInput.scrollHeight + 'px';
      wrapperDiv.style.cssText = 'height:' + textAreaInput.scrollHeight + 'px';
    }
  }, [code]);

  return (
    <Wrapper ref={wrapperRef}>
      <TextArea
        ref={textAreaRef}
        value={code}
        onChange={(e): void => onCodeChange(e.target.value)}
        spellCheck={false}
      />
      {/* <TextAreaWrapper>
        <TextArea
          ref={textAreaRef}
          value={code}
          onChange={(e): void => onCodeChange(e.target.value)}
          spellCheck={false}
        />
      </TextAreaWrapper> */}
      <HighlightedText language={language} style={monokai}>
        {code}
      </HighlightedText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // position: absolute;
  // top: 2em;
  // left: 0;
  // right: 0;
  // bottom: 0;
  position: relative;
  height: 100%;
  overflow: hidden;
  margin-top: 2em;
`;

// TODO: Clean up these wrappers, this one might not be needed.
const TextAreaWrapper = styled.div`
  padding: 0.5em;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
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
  line-height: 1.5em;
  border: 0;
  outline: none;
  // overflow: hidden;

  // padding: 0;
  overflow: hidden;
`;

const HighlightedText = styled(SyntaxHighlighter)`
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  line-height: 1.5em;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: hidden;
`;

export default Editor;
