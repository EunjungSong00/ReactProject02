import {Text, Image, Input, Button, Checkbox, Line, Wrapper, Txt} from '@components/atoms';
import {useState, useRef, KeyboardEvent, useEffect, ReactElement} from 'react';
import {useRouter} from 'next/router';
import useInput from '@hooks/useInput';
import loginApi from '@api/login/loginApi';
import {Dialog, Toast} from '@components/organisms';
import Popup, {PopupType} from '@components/organisms/Popup';
import ButtonNew from '@components/atoms/ButtonNew';
import styled from '@emotion/styled';
import TermsOfService from 'public/texts/TermsOfService';
import {destroyCookie, parseCookies, setCookie} from 'nookies';
import theme from '@public/theme';
import nookies from 'nookies';
export const INPUT_MAX_WIDTH = 400;

const Index = (): ReactElement => {
  const cookies = parseCookies();
  const savedId = cookies.carPartnerUserLoginInfo;
  const [saveLoginInfo, setSaveLoginInfo] = useState<boolean>(false);
  const [id, onChangeId] = useInput(savedId || '');
  const [password, onChangePassword] = useInput('');
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const [dialogContent, setDialogContent] = useState<string | React.ReactElement>('');
  const [loading, setLoading] = useState(false);
  // const [popupInspectionContent, setInspectionContent] = useState<PopupType>(undefined);
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const [popupContentPw, setPopupContentPw] = useState<PopupType>(undefined);
  const [popupContentLk, setPopupContentLk] = useState<PopupType>(undefined);
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    const cookies = parseCookies();
    const savedId = cookies.carPartnerUserLoginInfo;

    // setInspectionContent(
    //   <Txt color={theme.color.darkgray} type="regular" fontSize="12px">
    //     {' '}
    //     카머스 APP 런칭에 앞서 파트너스 회원 여러분의 상품을 원활하게 <br />
    //     연결하기 위한 최종 점검이 있을 예정입니다. <br />
    //     <br /> 점검 시간에는 서비스 이용 및 접속이 불가한 점 양해 부탁드립니다.
    //     <br />
    //     작업 일정에 따라 점검 시간이 조정 될 수 있습니다.
    //     <br />
    //     <br />
    //     <Txt type="light" color={theme.color.red}>
    //       점검시간 : 2022-04-21(목) 17:00 ~ 2022-04-22(금) 17:00
    //     </Txt>
    //   </Txt>
    // );
    setSaveLoginInfo(savedId !== undefined);
  }, []);

  /* 회원가입 후 진입 했을 경우 */
  useEffect(() => {
    const code = router?.query?.resultCode;
    if (code) {
      if (code === 'SUCCESS') setToast('회원가입이 완료되었습니다');
      else if (code !== 'SUCCESS') setPopupContent(router.query.resultMessage?.toString());
    }
  }, [router && router.query && router.query.resultCode]);

  const onLogin = async () => {
    function PasswordMiss() {
      return (
        <>
          <Text type="sectionInfo" size="13px!important">
            비밀번호가 일치하지 않습니다.
            <br /> 비밀번호를 다시 입력해주세요.
          </Text>
          <Text type="sectionInfo" size="12px!important">
            *5회 불일치 시, 비밀번호를 재설정하셔야 합니다.
          </Text>
        </>
      );
    }
    function LoginLock() {
      return (
        <Wrapper width="100%" height={200}>
          <Text type="sectionInfo" size="13px!important">
            로그인 정보 5회 불일치로 인해 계정이 비활성화되었습니다. <br /> 아이디 찾기를 통해 아이디를 확인하시고 비밀번호 찾기를 통해 비밀번호를 재설정 해주십시오.
          </Text>
        </Wrapper>
      );
    }
    setLoading(true);
    if (checkInput() === 'pass') {
      const result = await loginApi(id, password);
      if (result.signIn) {
        setCookie(null, 'carPartnerUserInfo', JSON.stringify(result.signIn.partner), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
        setCookie(null, 'carPartnerAccessToken', result.signIn.accessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
        setCookie(null, 'carPartnerRefreshToken', result.signIn.refreshToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
        if (saveLoginInfo) {
          setCookie(null, 'carPartnerUserLoginInfo', id, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
        }
        router.replace('/home');
      } else {
        result.response.errors[0].message.includes('비밀번호가 일치하지 않습니다.')
          ? setPopupContentPw(<PasswordMiss />)
          : result.response.errors[0].message === 'LOCK'
          ? setPopupContentLk(<LoginLock />)
          : setPopupContent(result.response.errors[0].message);
      }
    } else {
      setDialogContent(checkInput());
      setDialogNum(1);
    }
    setLoading(false);
  };

  const onClickSaveLoginInfo = () => {
    setSaveLoginInfo(!saveLoginInfo);
    if (saveLoginInfo) {
      destroyCookie(null, 'carPartnerUserLoginInfo', {path: '/'});
    }
  };

  const checkInput = () => {
    if (!(/^[a-z0-9]{6,10}$/.test(id) && /^(?=.*[a-z]).{6,10}$/.test(id))) {
      return '아이디를 확인해주세요.\n아이디는 6~10자의 소문자 영문(필수)과 숫자(선택) 조합입니다.';
    }
    if (
      !(
        /^[a-zA-Z0-9\_\`\~\․\!\@\\\#\$\%\^\&\*\(\)\-\+\=\[\]\[\]\|\;\:\'\"\<\>\,\.\?\/\{\}\"\']{8,15}$/.test(password) &&
        /^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/.test(password) &&
        !password.includes(id)
      )
    ) {
      return '비밀번호를 확인해주세요.\n비밀번호는 8~15자의 영문과 숫자가 포함됩니다(아이디 포함 불가).';
    }
    return 'pass';
  };

  const submitByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onLogin();
  };

  function LinkAuth({href, text}: {href: string; text: string}) {
    return (
      <ButtonNew text color="#93969f" onClick={() => router.push(href)}>
        {text}
      </ButtonNew>
    );
  }

  const onClickTos = () => {
    setDialogContent(<TermsOfService content="개인정보처리방침" />);
    setDialogNum(2);
  };

  const onClickDialogEnter = () => {
    if (typeof dialogContent === 'string') {
      if (!dialogContent.includes('비밀번호')) {
        idRef.current && idRef.current.focus();
        setDialogNum(undefined);
      } else {
        passwordRef.current && passwordRef.current.focus();
        setDialogNum(undefined);
      }
    } else {
      setDialogNum(undefined);
    }
  };

  const clickSaveLoginCheckbox = (e: any) => {
    if (e.code === 'Space') {
      setSaveLoginInfo(!saveLoginInfo);
    }
  };

  return (
    <>
      {/* TODO: Form, style="ime-mode:inactive" 사용하여 enterSubmit, 영어 입력화 하기  */}
      <Wrapper w h column background="#f1f3f5" width="100%" height="100vh">
        <LoginWrapper h column>
          <>
            <Image width={300} height={46} mt={80} src="/images/carmerce_login_logo.svg" />
            <Text mt={28} weight="3" size="16px" color="#303236">
              카머스 파트너스 로그인
            </Text>
          </>

          <Wrapper width="90%" maxWidth={INPUT_MAX_WIDTH}>
            <Input placeholder="아이디" width="100%" mt={44} value={id} onChange={onChangeId} ref={idRef} onKeyPress={submitByEnter} />
            <Input placeholder="비밀번호" width="100%" mt={16} type="password" value={password} onChange={onChangePassword} ref={passwordRef} onKeyPress={submitByEnter} />
            <Button mt={16} loading={loading} onClick={onLogin}>
              로그인
            </Button>

            <Wrapper margin="15px 0px">
              <Checkbox labelText="아이디 저장" name="save" isChk={saveLoginInfo} onChange={onClickSaveLoginInfo} onKeyPress={clickSaveLoginCheckbox} />
              <Line mt={13} width="100%" />
            </Wrapper>
          </Wrapper>

          <Wrapper flex between width={240}>
            <LinkAuth href="/login/signup" text="회원가입" />
            <Line vertical />
            <LinkAuth href="/login/find-id" text="아이디 찾기" />
            <Line vertical />

            <LinkAuth href="/login/find-password" text="비밀번호 찾기" />
          </Wrapper>
        </LoginWrapper>

        <Wrapper width="96%" maxWidth={540} mt={18} between>
          <Text size="9px" weight="2" color="#808285">
            Copyright © 2021 Carmerce Inc. All rights reserved
          </Text>
          <Text size="9px" hover color="#6d6e71" onClick={() => onClickTos()}>
            개인정보처리방침
          </Text>
        </Wrapper>
      </Wrapper>
      {(dialogNum || dialogNum === 0) && (
        <Dialog
          title={dialogNum !== 1 ? '개인정보처리방침' : '알림'}
          // blueText="확인"
          onClickDialogEnter={() => onClickDialogEnter()}
          dialogOpen={dialogNum}
          setDialogClose={setDialogNum}
          width={dialogNum !== 1 ? 550 : undefined}
          height={dialogNum !== 1 ? 800 : undefined}
        >
          {dialogContent}
        </Dialog>
      )}
      {/* <Popup
        height="320px"
        width="420px"
        content={popupInspectionContent}
        setContent={setInspectionContent}
        // okText="다시 보지 않기"
        // onClickPopupEnter={() => {
        //   nookies.set(null, 'popupInspectionCarmerce', 'OFF', {
        //     maxAge: 30 * 24 * 60 * 60,
        //     path: '/'
        //   });
        //   setInspectionContent(undefined);
        // }}
        // cancelText="닫기"
      /> */}
      <Popup content={popupContent} setContent={setPopupContent} />
      <Popup content={popupContentPw} setContent={setPopupContentPw} height="210px" />
      <Popup content={popupContentLk} setContent={setPopupContentLk} height="210px" width="400px" onClickPopupEnter={() => router.push('/login/find-password')} cancelText="닫기" />
      <Toast toast={toast} setToast={setToast} />
    </>
  );
};

export default Index;

const LoginWrapper = styled(Wrapper)`
  background: #ffffff;
  max-width: 540px;
  width: 96%;
  height: 574px;
  border-radius: 3px;
  border: solid 1px #e2e6ee;
`;
