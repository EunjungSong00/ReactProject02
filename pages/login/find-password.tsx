import {useEffect, useCallback, useState, memo} from 'react';
import Link from 'next/link';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import findPasswordApi from '@api/login/findPasswordApi';
import {Wrapper} from '@components/atoms';
import Text from '@components/atoms/Text';
import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';
import {validateEmail, validateId} from '@modules/checkValidity';
import {Header, Popup} from '@components/organisms';
import {Dialog} from 'src/components/organisms';
import theme from 'public/theme';
import {PopupType} from '@components/organisms/Popup';
import {INPUT_MAX_WIDTH} from '.';

const FindPassword = () => {
  const [id, onChangeId] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [passAll, setPassAll] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const [popupContent, setPopupContent] = useState<PopupType>();

  useEffect(() => {
    id && email && !(validateId(id) || validateEmail(email)) ? setPassAll(true) : setPassAll(false);
  }, [id, email]);

  const onClickOk = useCallback(() => {
    setLoading(true);
    findPasswordApi(id, email, `${process.env.NEXT_PUBLIC_DOMAIN}/login/reset-password`).then((res: any) => {
      res && res.response && res.response.errors[0] ? setPopupContent(res.response.errors[0].message.toString()) : setIsSuccess(true);
      setLoading(false);
    });
  }, [id, email]);

  const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickOk();
  };

  const onClickYet = () => {
    setDialogNum(1);
  };

  return (
    <Wrapper h column background="#f1f3f5" color="#303236" width="100%" height="100vh">
      <Header title="비밀번호 찾기" />
      <Wrapper column h mt={60}>
        <Text weight="5" size="32px">
          비밀번호 찾기
        </Text>
        <Text size="16x" mt={15}>
          가입 시 등록하신 정보를 입력해 주세요
        </Text>
      </Wrapper>{' '}
      {(dialogNum || dialogNum === 0) && (
        <Dialog title="알림" dialogOpen={dialogNum} setDialogClose={setDialogNum}>
          입력값을 확인해주세요.
        </Dialog>
      )}
      {!isSuccess ? (
        <>
          <Wrapper width={INPUT_MAX_WIDTH} mt={50}>
            <Input placeholder="아이디" value={id} onChange={onChangeId} message={validateId(id)} onKeyPress={(e) => passAll && submitByEnter(e)} />
            <Input placeholder="이메일" value={email} onChange={onChangeEmail} message={validateEmail(email)} onKeyPress={(e) => passAll && submitByEnter(e)} mt="8px" />
            <Button loading={loading} type="primary" mt={10} onClick={() => (passAll ? onClickOk() : onClickYet())}>
              확인
            </Button>
          </Wrapper>

          <Wrapper width={INPUT_MAX_WIDTH}>
            <Text mt={20} size="15px" weight="3" width="100%" textAlign="left">
              계정이 없으신가요?
              <Link href="/login/signup">
                <LinkText>가입하기</LinkText>
              </Link>
            </Text>
          </Wrapper>
          <Popup content={popupContent} setContent={setPopupContent} />
        </>
      ) : (
        <>
          <FindIdResult column w h mt={50}>
            <Text size="16px" weight="5" letterSpacing="-0.35px" color={theme.color.main}>
              {email}
            </Text>
            <Text size="14px" mt={20} lineHeight="1.43">
              위의 이메일 주소로 비밀번호 재설정을 위한
            </Text>
            <Text size="14px" lineHeight="1.43">
              이메일이 발송되었습니다
            </Text>
            <Text size="14px" lineHeight="1.43">
              보내드린 이메일은 30분간 유효합니다
            </Text>
          </FindIdResult>

          <Wrapper width={INPUT_MAX_WIDTH} mt={30}>
            <Link href="/login">
              <Button>확인</Button>
            </Link>
          </Wrapper>
        </>
      )}
    </Wrapper>
  );
};

export default memo(FindPassword);

const LinkText = styled.a<any>`
  margin-left: 5px;
  color: ${({theme}) => theme.color.primary};
  cursor: pointer;
  &:hover {
    font-family: ${({theme}) => theme.font['3']};
  }
`;

const FindIdResult = styled(Wrapper)`
  width: ${INPUT_MAX_WIDTH}px;
  min-height: 99px;
  background: #ffffff;
  padding: 40px 0;
`;
