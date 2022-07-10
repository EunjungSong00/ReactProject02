import {useEffect, useCallback, useState, ReactElement} from 'react';
import useInput from '@hooks/useInput';
import {Wrapper, Text, Input, Button} from '@components/atoms';
import {Header} from '@components/organisms';
import {validatePassword, validatePasswordCheck} from 'src/modules/checkValidity';
import resetPasswordApi from '@api/login/resetPasswordApi';
import {useRouter} from 'next/router';
import {Dialog} from 'src/components/organisms';
import Toast from '@components/organisms/Toast';
import {INPUT_MAX_WIDTH} from '.';

const ResetPassword = (): ReactElement => {
  const [passAll, setPassAll] = useState(false);
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [token, setToken] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const [id, setId] = useState<string>('');
  const [toast, setToast] = useState<string>();
  const [successToast, setSuccessToast] = useState<string>();
  const [warnToast, setWarnToast] = useState<string>();

  useEffect(() => {
    const code = router.query.resultCode;
    const {token} = router.query;
    typeof router.query.loginId === 'string' && setId(router.query.loginId);

    if (code) {
      if (code === 'SUCCESS') setToast('이메일 인증 완료');
      else setWarnToast(router.query.resultCode?.toString());
    }
    setToken(token);
  }, [router.query.resultCode]);

  const onClickOk = useCallback(async (): Promise<void> => {
    setLoading(true);
    await resetPasswordApi(password, token).then((res) => {
      if (res) {
        setSuccessToast('비밀번호가 성공적으로 변경되었습니다.');
      }
      setLoading(false);
    });
  }, [password, passwordCheck, token]);

  const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickOk();
  };

  useEffect(() => {
    password && passwordCheck && !(validatePassword(password, id) || validatePasswordCheck(passwordCheck, password)) ? setPassAll(true) : setPassAll(false);
  }, [password, passwordCheck]);

  const onClickYet = () => {
    setDialogNum(1);
  };

  return (
    <Wrapper h column background="#f1f3f5" color="#303236" width="100%" height="100vh">
      <Header title="비밀번호 재설정" />
      <Wrapper column h mt={60}>
        <Text weight="5" size="32px">
          비밀번호 재설정
        </Text>
        <Text size="16x" mt={15}>
          가입 시 등록하신 정보를 입력해 주세요
        </Text>
      </Wrapper>
      {(dialogNum || dialogNum === 0) && (
        <Dialog title="알림" dialogOpen={dialogNum} setDialogClose={setDialogNum}>
          입력값을 확인해주세요.
        </Dialog>
      )}
      {token && (
        <Wrapper width={INPUT_MAX_WIDTH} mt={50}>
          <Input placeholder="비밀번호" type="password" value={password} onChange={onChangePassword} message={validatePassword(password, id)} onKeyPress={submitByEnter} mt={14} />
          <Input
            placeholder="비밀번호 확인"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            message={validatePasswordCheck(passwordCheck, password)}
            onKeyPress={submitByEnter}
            mt={14}
          />
          <Button loading={loading} type="primary" mt={10} onClick={() => (passAll ? onClickOk() : onClickYet())}>
            확인
          </Button>
        </Wrapper>
      )}
      <Toast toast={toast} setToast={setToast} />
      <Toast toast={successToast} setToast={setSuccessToast} onClose={() => router.push('/login')} />
      <Toast type="warn" toast={warnToast} setToast={setWarnToast} />
    </Wrapper>
  );
};

export default ResetPassword;
