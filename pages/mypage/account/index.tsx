import {EasyVehicleRegistration, Dialog, Popup} from '@components/organisms';
import {Section} from '@components/molecules';
import {Text, Input, Button, Wrapper, Line, Txt} from '@components/atoms';
import useInput from '@hooks/useInput';
import {KeyboardEvent, useRef, useState, useEffect, ReactElement} from 'react';
import {useRouter} from 'next/router';
import checkPartnerApi from '@api/mypage/checkPartnerApi';
import {StyledInputValidation} from '@components/atoms/Input';
import {parseCookies, setCookie} from 'nookies';
import {primary, white} from '@public/theme';
import useButtonEl from '@modules/hooks/useButtonEl';

const Index = (): ReactElement => {
  const router = useRouter();
  const cookies = parseCookies();
  const user = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const [password, onChangePassword] = useInput('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dialogContent, setDialogContent] = useState<string | React.ReactElement>('');
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState('');
  const [validateMessage, setValidateMessage] = useState(false);
  const SubmitButton = useButtonEl('확인');

  useEffect(() => {
    setUserId(user?.loginId);
  }, []);

  useEffect(() => {
    password && setValidateMessage(false);
  }, [password]);

  const onLogin = async () => {
    setLoading(true);
    if (checkInput() === 'pass') {
      const result = await checkPartnerApi({loginId: userId, password});
      // if (res?.errors) {
      //   setDialogContent(res?.errors[0]?.message);
      //   setDialogNum(1);
      if (result) {
        if (result?.errors) {
          setDialogContent(result?.errors[0]?.message);
          setDialogNum(1);
          setLoading(false);
          return;
        }
        setCookie(null, 'carPartnerUserInfo', JSON.stringify(result.checkPartner), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
        router.push('/mypage/account/account-management');
      }
    }
    setLoading(false);
  };

  const checkInput = () => {
    if (!(/^[a-zA-Z0-9\_\`\~\․\!\@\\\#\$\%\^\&\*\(\)\-\+\=\[\]\[\]\|\;\:\'\"\<\>\,\.\?\/\{\}\"\']{8,15}$/.test(password) && /^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/.test(password))) {
      return setValidateMessage(true);
    }
    return 'pass';
  };

  const submitByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onLogin();
  };

  const onClickDialogEnter = () => {
    if (typeof dialogContent === 'string') {
      passwordRef.current && passwordRef.current.focus();
      setDialogNum(undefined);
    } else {
      setDialogNum(undefined);
    }
  };

  return (
    <>
      <EasyVehicleRegistration />
      <Section border="1px solid #cccccc" padding="30px 36px">
        <Wrapper h width="100%">
          <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
            계정정보 관리
          </Txt>
        </Wrapper>
        <Line sectionTitleLine />
        <Text type="sectionBodyText" textAlign={'center'} mt={120}>
          회원님의 정보 보호를 위해 비밀번호를 한번 더 입력해 주세요.
        </Text>
        <Wrapper width="400px" margin={'80px auto 200px'}>
          <Input mt={10} version="b" whcbr={['100%', 50, white]} value={userId} disabled />
          {/* 아이디/비밀번호 자동완성때문에 보유차량조회 input에 아이디가 입력되는 버그 CARMERCE-585 */}
          <Input style={{display: 'none'}} />
          <Input
            mt={10}
            version="b"
            whcbr={['100%', 50, white]}
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
            ref={passwordRef}
            onKeyPress={submitByEnter}
          />
          {validateMessage && <StyledInputValidation>비밀번호를 확인해주세요.</StyledInputValidation>}
          {/* <Button children={'확인'} mt={20} loading={loading} onClick={() => onLogin()} /> */}
          <SubmitButton mt={20} whcbr={['100%', 50, primary]} loading={loading} onClick={onLogin} />
        </Wrapper>
      </Section>
      {(dialogNum || dialogNum === 0) && (
        <Dialog title={'알림'} onClickDialogEnter={() => onClickDialogEnter()} dialogOpen={dialogNum} setDialogClose={setDialogNum}>
          {dialogContent}
        </Dialog>
      )}
    </>
  );
};

export default Index;
