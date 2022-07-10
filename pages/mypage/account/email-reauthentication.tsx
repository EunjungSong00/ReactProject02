import {Button, Text, Wrapper} from '@components/atoms';
import router from 'next/router';
import {useEffect, useState} from 'react';
import Header from '@components/organisms/Header';

const EmailReauthentication = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(countdown);
        // localStorage.clear();
        router.push('/login');
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <>
      <Header />
      <Wrapper w h column>
        <Wrapper flex mt={40}>
          <Text size="26px" letterSpacing="-0.65px" weight="5">
            인증 메일이 발송
          </Text>
          <Text size="26px" letterSpacing="-0.65px">
            되었습니다
          </Text>
        </Wrapper>

        <Wrapper mt={10}>
          <Text textAlign="center" letterSpacing="-0.35px" color="#6d6e71" lineHeight="1.71">
            <p>고객님 계정을 활성화하기 위해서 이메일 인증이 필요합니다</p>
            <p>인증 메일을 발송드리오니 계정을 활성화하여 주시기 바랍니다</p>
            <p>인증 메일은 30분 동안 유효하며, 메일 발송 후 30분 초과 시에는 다시 가입 신청을 해야 합니다</p>
          </Text>
        </Wrapper>

        <Wrapper column h mt={30}>
          <Button width="196px" onClick={() => router.push('/login')}>
            메인 페이지로 이동
          </Button>

          <Text mt={10} size="12px" color="#93969f">
            ※ {seconds}초 뒤 자동으로 메인 페이지로 이동됩니다
          </Text>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default EmailReauthentication;
