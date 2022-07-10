import {Text, Image, Wrapper} from '@components/atoms';
import React, {useCallback, useState} from 'react';
import styled from '@emotion/styled';
import Step1 from '@container/auth/step1';
import Step2 from '@container/auth/step2';
import Step3 from '@container/auth/step3';
import {Header} from '@components/organisms';

const stepArr = [
  {
    title: '본인인증',
    on: '/images/auth/step1_on.png',
    off: '/images/auth/step1_off.png'
  },
  {
    title: '사업자 및 딜러 인증',
    on: '/images/auth/step2_on.png',
    off: '/images/auth/step2_off.png'
  },
  {
    title: '가입완료',
    on: '/images/auth/step3_on.png',
    off: '/images/auth/step3_off.png'
  }
];

const Auth = (props: any) => {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(null);

  const setStepNum = useCallback((value: number) => {
    setStep(value);
  }, []);

  const setNiceUser = useCallback((value: any) => {
    setUser(value);
  }, []);

  return (
    <Wrapper center background={'#f1f3f5'} height={'100vh'} overflowY="scroll">
      <Header title={stepArr[step].title} />
      <Wrapper pt={60}>
        {stepArr.map((val, index) => (
          <Step key={val.title}>
            <Image width={80} height={80} src={step === index ? val.on : val.off} />
            <Text size={'xs'} mt={10} color={step === index ? 'black' : 'lightgray'}>
              {val.title}
            </Text>
          </Step>
        ))}
      </Wrapper>
      {step === 0 ? <Step1 setStepNum={setStepNum} setNiceUser={setNiceUser} /> : step === 1 ? <Step2 setStepNum={setStepNum} user={user} /> : <Step3 />}
    </Wrapper>
  );
};

export default Auth;

const Step = styled.div<any>`
  display: inline-block;
  text-align: center;
  padding: 0 20px;
`;
