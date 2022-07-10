import React, {useState} from 'react';
import styled from '@emotion/styled';
import {Text, Line, Wrapper} from '@components/atoms';
import {Dialog} from '@components/organisms/index';
import TermsOfService from 'public/texts/TermsOfService';
import theme from '../../../public/theme';

type InfoProps = {
  text: string;
  onClickMore?: React.MouseEventHandler<any>;
};

const _Footer = () => {
  const [dialogNum, setDialogNum] = useState(0);
  function InfoMore({text, onClickMore}: InfoProps) {
    return (
      <>
        <InfoTxt style={{margin: '0 15px 0 0'}} onClick={onClickMore}>
          {text}
        </InfoTxt>
      </>
    );
  }
  return (
    <>
      <Wrapper display="flex" column>
        <Line mr="auto" ml="auto" width="1240px" />
        <Wrapper column center width={'100%'} pt={40}>
          <Text size="xs" weight="2">
            업체명: (주) 핸들 &nbsp;&nbsp;|&nbsp;&nbsp; 주소 : 용인시 기흥구 중부대로 242 오토허브 1F 09호 &nbsp;&nbsp;|&nbsp;&nbsp; 사업자 등록번호 : 312-81-87267
            &nbsp;&nbsp;|&nbsp;&nbsp; 대표이사 : 안인성 &nbsp;&nbsp;|&nbsp;&nbsp; e-mail : isahn@autohub.co.kr
          </Text>
          <Text size="xs" weight="2" mt={15}>
            <InfoMore text={'개인정보 처리방침'} onClickMore={() => setDialogNum(1)} />
            |&nbsp;&nbsp;&nbsp; Copyright © 2021
            <span style={{color: '#231f20', fontFamily: theme.font[3]}}> Carmerce Inc </span>
            ALL RIGHTS RESERVED
          </Text>
        </Wrapper>
      </Wrapper>
      {dialogNum > 0 && (
        <Dialog title="개인정보 처리방침" dialogOpen={dialogNum} setDialogClose={setDialogNum} width={500} height={800}>
          <TermsOfService content="개인정보 수집 및 이용 동의" />
        </Dialog>
      )}
    </>
  );
};

export default _Footer;

export const InfoTxt = styled.span`
  font: ${theme.font['3']};
  letter-spacing: -0.68px;
  color: ${theme.color.main};
  margin-top: 16px;
  cursor: pointer;
  &:hover {
    color: #0c85f5;
  }
`;
