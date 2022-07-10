import {useEffect, useCallback, useState, memo} from 'react';
import Link from 'next/link';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import findIdApi from '@api/login/findIdApi';
import {Wrapper, Text, Input, Button} from '@components/atoms';
import {validateEmail} from '@modules/checkValidity';
import theme from 'public/theme';
import {Dialog} from 'src/components/organisms';
import {Header} from '@components/organisms';
import {useRouter} from 'next/router';
import {INPUT_MAX_WIDTH} from '.';

const FindId = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput('');
  const [passAll, setPassAll] = useState(false);
  const [resultId, setResultId] = useState<[] | null>([]);
  const [openResultId, setOpenResultId] = useState(false);
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);

  const {asPath} = router;
  /* 가입한 아이디가 없을 경우 */
  useEffect(() => {
    if (!asPath.includes('notfound')) setOpenResultId(false);
  }, [asPath]);

  const onClickOk = useCallback(() => {
    findIdApi(email).then((res) => {
      if (res) {
        setResultId(res);
        setOpenResultId(true);
      } else {
        router.push(`${asPath}?notfound`);
        setResultId(null);
        setOpenResultId(true);
      }
    });
  }, [email]);

  const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (email && passAll) {
        onClickOk();
      } else {
        setDialogNum(1);
      }
    }
  };

  useEffect(() => {
    email && !validateEmail(email) ? setPassAll(true) : setPassAll(false);
  }, [email]);

  const onClickYet = () => {
    setDialogNum(1);
  };

  return (
    <Wrapper h column background="#f1f3f5" color="#303236" width="100%" height="100vh">
      <Header title="아이디 찾기" />

      <Wrapper column h mt={60}>
        <Text weight="5" size="32px">
          아이디 찾기
        </Text>
        <Text size="16x" mt={15}>
          가입 시 등록하신 정보를 입력해 주세요
        </Text>
      </Wrapper>
      {(dialogNum || dialogNum === 0) && (
        <Dialog title="알림" dialogOpen={dialogNum} setDialogClose={setDialogNum}>
          이메일을 확인해주세요.
        </Dialog>
      )}
      {!openResultId ? (
        <>
          <IdWrapper flex width={INPUT_MAX_WIDTH} mt={50}>
            <Input
              mr="8px"
              width="326px"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
              message={validateEmail(email)}
              onKeyPress={(e) => submitByEnter(e)}
              className="id-input"
            />
            <Button width="66px" height="50px" type="primary" onClick={() => (passAll ? onClickOk() : onClickYet())}>
              확인
            </Button>
          </IdWrapper>

          <Wrapper width={INPUT_MAX_WIDTH}>
            <Text mt={20} size="15px" weight="3" width="100%" textAlign="left">
              계정이 없으신가요?
              <Link href="/login/signup">
                <LinkText>가입하기</LinkText>
              </Link>
            </Text>
          </Wrapper>
        </>
      ) : (
        <>
          {/* <Text mt={62} size={theme.fontSize.sm} weight="2" width="100%" textAlign="left">
            조회 된 회원님의 아이디입니다.
          </Text> */}
          <FindIdResult column h mt={50}>
            {resultId && (
              <Text size="14px" letterSpacing="-0.35px">
                회원가입시 등록한 회원님의 아이디를 찾을 수 있습니다
              </Text>
            )}
            <Wrapper mt={resultId && 20}>
              {resultId ? (
                resultId.map((id, index) => (
                  <Text key={index} color={theme.color.main} weight="5" lineHeight="28px">
                    {id}
                  </Text>
                ))
              ) : (
                <Text size="14px">입력하신 이메일로 가입한 계정을 찾을 수 없습니다</Text>
              )}
            </Wrapper>
          </FindIdResult>

          <Wrapper mt={30} mb={30}>
            {resultId ? (
              <>
                <Link href="/login/find-password">
                  <FindIdResultBtn type="white">비밀번호 찾기</FindIdResultBtn>
                </Link>
                <Link href="/login">
                  <FindIdResultBtn>로그인</FindIdResultBtn>
                </Link>
              </>
            ) : (
              <>
                <FindIdResultBtn type="white" onClick={() => router.back()}>
                  재조회
                </FindIdResultBtn>
                <Link href="/login/signup">
                  <FindIdResultBtn>회원가입</FindIdResultBtn>
                </Link>
              </>
            )}
          </Wrapper>
        </>
      )}
    </Wrapper>
  );
};

export default memo(FindId);

const IdWrapper = styled(Wrapper)`
  .id-input {
    span {
      width: ${INPUT_MAX_WIDTH}px;
    }
  }
`;

const LinkText = styled.a<any>`
  margin-left: 5px;
  color: ${({theme}) => theme.color.primary};
  cursor: pointer;
  &:hover {
    font-family: ${({theme}) => theme.font['3']};
  }
`;
const FindIdResult = styled(Wrapper)`
  width: 400px;
  min-height: 177px;
  background: #ffffff;
  padding: 40px 0;
  overflow: scroll;
`;

const FindIdResultBtn = styled(Button)`
  width: 195px;
  height: 56px;
  margin: 0 7.5px 0 0;
  padding: 15px 40.5px 16px 39.5px;
  border: solid 1px #d1d3d4;
`;
