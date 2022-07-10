import React, {ReactElement, useState} from 'react';
import styled from '@emotion/styled';
import {Section} from '@components/molecules';

interface IBanner {
  children: React.ReactElement;
}

interface IDisable {
  disable: boolean;
}

export default function Banner({children}: IBanner): ReactElement {
  const [disable, setDisable] = useState(false);
  function CloseButton() {
    return <_CloseButton src="/images/472.svg" onClick={() => setDisable(true)} />;
  }

  return (
    <_Banner disable={disable}>
      {children}
      <CloseButton />
    </_Banner>
  );
}

const _Banner = styled(Section)<IDisable>`
  ${({disable}) => disable && 'display:none;'}
  padding: 0;
`;

const _CloseButton = styled.img`
  position: absolute;
  right: 26px;
  top: 24px;
  width: 14px;
  height: 14px;
  cursor: pointer;
  z-index: 10;
`;
