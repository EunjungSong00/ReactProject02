import React, {ReactElement, useState} from 'react';
import styled from '@emotion/styled';
import {Wrapper, Txt, Btn} from '@components/atoms';

const DetailVehiclePerformance = ({response}: {response: any}): ReactElement => {
  const {basicOption} = response;
  const exteriorList = basicOption?.exterior;
  const interiorList = basicOption?.interior;
  const safetyList = basicOption?.safety;
  const utilityMultimediaList = basicOption?.utilityMultimedia;

  const exteriorResult = exteriorList?.map((item: any) => ({
    ...item,
    exist: item.exist,
    optionName: item.optionName
  }));

  const interiorResult = interiorList?.map((item: any) => ({
    ...item,
    exist: item.exist,
    optionName: item.optionName
  }));

  const safetyResult = safetyList?.map((item: any) => ({
    ...item,
    exist: item.exist,
    optionName: item.optionName
  }));

  const utilityMultimediaResult = utilityMultimediaList?.map((item: any) => ({
    ...item,
    exist: item.exist,
    optionName: item.optionName
  }));
  return (
    <Wrapper>
      <Wrapper flex mb={'22px'}>
        <InfoIcon>안내</InfoIcon>
        <Txt type={'medium'} fontSize={'13px'} color={'#fd3636'} lineHeight={'1.6'}>
          카머스 제원정보를 통해 불러온 옵션 정보로 수정이 불가합니다. <br />
          추가 옵션 저장 및 관리 서비스 준비 중입니다.
        </Txt>
      </Wrapper>
      <ContainerWrap>
        <Container w h>
          <Left>
            <p>외관</p>
          </Left>
          <Right>
            {exteriorResult?.map((item: any) => (
              <p style={{color: item.exist === false ? '#cdcdcd' : '#3ba0ff'}}>{item.optionName}</p>
            ))}
          </Right>
        </Container>
        <Container w h>
          <Left>
            <p>내장</p>
          </Left>
          <Right>
            {interiorResult?.map((item: any) => (
              <p style={{color: item.exist === false ? '#cdcdcd' : '#3ba0ff'}}>{item.optionName}</p>
            ))}
          </Right>
        </Container>
        <Container w h>
          <Left>
            <p>안전</p>
          </Left>
          <Right>
            {safetyResult?.map((item: any) => (
              <p style={{color: item.exist === false ? '#cdcdcd' : '#3ba0ff'}}>{item.optionName}</p>
            ))}
          </Right>
        </Container>
        <Container w h>
          <Left>
            <p>편의/멀티미디어</p>
          </Left>
          <Right>
            {utilityMultimediaResult?.map((item: any) => (
              <p style={{color: item.exist === false ? '#cdcdcd' : '#3ba0ff'}}>{item.optionName}</p>
            ))}
          </Right>
        </Container>
      </ContainerWrap>
    </Wrapper>
  );
};

export default DetailVehiclePerformance;

const ContainerWrap = styled.div`
  border-top: 3px solid #444;
`;
const Container = styled(Wrapper)`
  font-family: 'SpoqaHanSansNeo-Regular';
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  align-items: stretch;
  color: #444;

  p {
    line-height: 1;
  }
`;

const Left = styled.div`
  width: 15%;
  font-family: 'SpoqaHanSansNeo-Medium';
  vertical-align: middle;
  background: #f9fafa;
  border-right: 1px solid #ccc;
  text-align: center;
  position: relative;

  p {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '';
    display: inline-block;
    clear: both;
  }
`;

const Right = styled.div<any>`
  width: 85%;
  padding: 16px 6px;
  min-height: 66px;

  p {
    width: 25%;
    padding: 10px 12px 2px;
    display: inline-block;
    float: left;
    height: 48px;
    letter-spacing: -0.8px;

    &::after {
      content: '';
      display: table;
      clear: both;
    }
    @media only screen and (min-width: 320px ) {
      width: 50%;
      line-height: 1.5;
    }
    @media only screen and (min-width: 900px ) {
      width: 33.333%;
    }
    @media only screen and (min-width: 1400px ) {
      height: fit-content;
      padding: 10px 12px;
      width: 25%
    }
  }
`;

const InfoIcon = styled.div`
  font-family: 'SpoqaHanSansNeo-Medium';
  color: #fd3636;
  font-size: 12px;
  display: inline-block;
  width: 64px;
  height: 25px;
  padding: 5px 0;
  margin-right: 9px;
  text-align: center;
  vertical-align: middle;
  line-height: 1;
  border-radius: 12.5px;
  border: solid 1px #fd3636;
`;
