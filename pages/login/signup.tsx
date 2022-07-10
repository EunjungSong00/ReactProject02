import {Wrapper, Text, Line, Input, Button, Image} from '@components/atoms';
import {AgreeCheck} from 'src/components/molecules';
import {Dialog} from 'src/components/organisms';
import Header from '@components/organisms/Header';
import theme from 'public/theme';
import React, {useState, useEffect, useCallback} from 'react';
import {useRouter} from 'next/router';
import {validateId, validateEmail, validatePassword, validatePasswordCheck} from 'src/modules/checkValidity';
import TermsOfService from 'public/texts/TermsOfService';
import signupApi from 'src/api/login/signupApi';
import loginApi from 'src/api/login/loginApi';
import {observer, inject} from 'mobx-react';
import styled from '@emotion/styled';
import checkDuplicatedId from '@api/login/checkDuplicatedIdApi';
import FakeInput from '@components/atoms/FakeInput';
import {INPUT_MAX_WIDTH} from '.';

const Signup = inject('authStore')(
  observer(({authStore}: any) => {
    const [step, setStep] = useState(0);
    const [recommenderId, setRecommenderId] = useState('');
    const [allAgree, setAllAgree] = useState(false);
    const [agreeItems, setAgreeItems] = useState([
      // {title: '이용약관', checked: false, content: <TermsOfService content="이용약관" />},
      {title: '서비스 이용약관(필수)', checked: false, content: <TermsOfService content="서비스 이용약관" />},
      {title: '개인정보 수집 및 이용 동의(필수)', checked: false, content: <TermsOfService content="개인정보 수집 및 이용 동의" />},
      {title: '개인정보 제3자 제공 동의(필수)', checked: false, content: <TermsOfService content="개인정보 제3자 제공 동의" />}
    ]);
    const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
    // const okButtonText = ['확인', '인증 확인', '로그인'];
    // const [id, onChangeId] = useInput('');
    // const [email, onChangeEmail] = useInput('');
    // const [password, onChangePassword] = useInput('');
    // const [passwordCheck, onPasswordCheckChange] = useInput('');
    const [passAll, setPassAll] = useState(false);
    const [seconds, setSeconds] = useState(10);
    const [loading, setLoading] = useState(false);
    const [checkDupIdLoading, setCheckDupIdLoading] = useState(false);
    const [idUniqueMessage, setIdUniqueMessage] = useState('아이디 중복을 확인해주세요');
    const router = useRouter();

    useEffect(() => {
      if (router.query.resultCode === 'SUCCESS' && router.query.email) {
        /* 추천인 */
        localStorage.setItem('recommenderInfo', JSON.stringify(router.query));
        router.replace('/login/signup');
      } else {
        const recommenderInfo = localStorage.getItem('recommenderInfo');
        // console.info('recommenderInfo', recommenderInfo);
        if (recommenderInfo) {
          /* 추천인 */
          const data = JSON.parse(recommenderInfo);
          authStore.setEmail(data.email);
          setRecommenderId(data.recommenderLoginId);
        } else {
          authStore.setId('');
          authStore.setEmail('');
          authStore.setPassword('');
          authStore.setPasswordCheck('');
        }
      }
    }, [router.query]);

    /* 이용약관에 모두 동의합니다 체크 */
    useEffect(() => {
      let checkAll = true;
      agreeItems.map((item) => {
        if (!item.checked) checkAll = false;
      });
      setAllAgree(checkAll);
    }, [agreeItems]);

    /* 모든 입력값 pass 체크 */
    useEffect(() => {
      setPassAll(onPassCheck());
    }, [allAgree, authStore.id, idUniqueMessage, authStore.email, authStore.password, authStore.passwordCheck]);

    useEffect(() => {
      authStore.id.includes('admin')
        ? setIdUniqueMessage('admin은 로그인 아이디로 사용하실 수 없습니다.')
        : authStore.id.includes('help')
        ? setIdUniqueMessage('help는 로그인 아이디로 사용하실 수 없습니다.')
        : setIdUniqueMessage('아이디 중복을 확인해주세요');
    }, [authStore.id]);

    useEffect(() => {
      if (step === 1) {
        const countdown = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
          if (seconds === 0) {
            clearInterval(countdown);
            router.push('/login');
          }
        }, 1000);
        return () => clearInterval(countdown);
      }
    }, [seconds, step]);

    const onClickAllAgree = (): void => {
      setAgreeItems(agreeItems.map((item) => ({...item, checked: !allAgree})));
      setAllAgree(!allAgree);
    };

    const onClickAgreeCheck = useCallback(
      (_index: number) => {
        setAgreeItems(agreeItems.map((item, index) => (index === _index ? {...item, checked: !item.checked} : item)));
      },
      [agreeItems]
    );

    const onPassCheck = (): boolean => {
      const isPass =
        allAgree &&
        authStore.id &&
        authStore.email &&
        authStore.password &&
        authStore.passwordCheck &&
        !(
          idUniqueMessage !== '사용할 수 있는 아이디입니다' ||
          validateId(authStore.id) ||
          validateEmail(authStore.email) ||
          validatePassword(authStore.password, authStore.id) ||
          validatePasswordCheck(authStore.passwordCheck, authStore.password)
        );
      return isPass;
    };

    const onClickOk = async () => {
      setLoading(true);
      // eslint-disable-next-line default-case
      switch (step) {
        case 0: {
          // 1. 회원가입
          const signupResult = await signupApi(authStore.email, authStore.id, authStore.password, recommenderId, `${process.env.NEXT_PUBLIC_DOMAIN}/login`);
          if (signupResult) setStep(step + 1);
          setLoading(false);
          break;
        }
        case 1: {
          // 2. 메일인증 확인
          const loginResult = await loginApi(authStore.id, authStore.password);
          if (loginResult) setStep(step + 1);
          setLoading(false);
          break;
        }
        case 2: {
          // 3. 가입 완료
          localStorage.removeItem('recommenderInfo'); // 추천인 정보 삭제
          router.push('/login');
        }
      }
    };

    const onClickYet = () => {
      setDialogNum(5);
    };

    const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && onClickOk();
      // e.code === 'Backquote' && setPassAll(true); // test용
      // e.code === 'Backquote' && setStep(step + 1); // test용
    };

    const canUseId = async (id: string) => {
      setCheckDupIdLoading(true);
      const isDup = await checkDuplicatedId(id);
      setCheckDupIdLoading(false);
      !isDup ? setIdUniqueMessage('사용할 수 있는 아이디입니다') : setIdUniqueMessage('다른 아이디를 이용해주세요');
    };

    return (
      <Wrapper h column background="#f1f3f5" width="100%" height="100vh" minHeight={1000}>
        <Header title={step === 0 ? '파트너스 가입' : '이메일 주소 인증'} />
        <Wrapper flex mt={60}>
          <Wrapper column h mr={40}>
            <Image width={80} height={80} src={step === 0 ? '/images/img-signup-step-1-on.svg' : '/images/img-signup-step-1-off.svg'} />
            <Text mt={10} size="13px" color={step === 0 ? '#303236' : 'lightgray'} letterSpacing="-0.33px">
              약관정보입력
            </Text>
          </Wrapper>
          <Wrapper column h>
            <Image width={80} height={80} src={step === 1 ? '/images/img-signup-step-2-on.svg' : '/images/img-signup-step-2-off.svg'} />
            <Text mt={10} size="13px" color={step === 1 ? '#303236' : 'lightgray'} letterSpacing="-0.33px">
              이메일 인증
            </Text>
          </Wrapper>
        </Wrapper>

        {step === 0 ? (
          <>
            <Wrapper width="90%" maxWidth={INPUT_MAX_WIDTH} mt={40}>
              <IdWrapper flex>
                <FakeInput />
                <FakeInput password />
                <Input
                  placeholder="아이디"
                  value={authStore.id}
                  onChange={(e) => authStore.setId(e.target.value)}
                  message={authStore.id ? (validateId(authStore.id) ? validateId(authStore.id) : idUniqueMessage) : ''}
                  onKeyPress={(e) => passAll && submitByEnter(e)}
                  width="calc(100% - 100px)"
                  className={idUniqueMessage === '사용할 수 있는 아이디입니다' ? 'id-input success' : 'id-input'}
                />
                <Button
                  loading={checkDupIdLoading}
                  onClick={() => authStore.id && !validateId(authStore.id) && idUniqueMessage === '아이디 중복을 확인해주세요' && canUseId(authStore.id)}
                  className="check-dup-btn"
                  type="white"
                  height="50px"
                  width="92px"
                  ml="8px"
                >
                  <Text weight="3" size="xs" color={theme.color.main}>
                    중복확인
                  </Text>
                </Button>
              </IdWrapper>
              <Input
                placeholder="사용자 이메일"
                value={authStore.email}
                disabled={!!recommenderId}
                onChange={(e) => authStore.setEmail(e.target.value)}
                message={authStore.email ? validateEmail(authStore.email) : ''}
                onKeyPress={(e) => passAll && submitByEnter(e)}
                mt={14}
              />
              <Input
                placeholder="비밀번호"
                type="password"
                value={authStore.password}
                onChange={(e) => authStore.setPassword(e.target.value)}
                message={authStore.password ? validatePassword(authStore.password, authStore.id) : ''}
                onKeyPress={(e) => passAll && submitByEnter(e)}
                mt={14}
              />
              <Input
                placeholder="비밀번호 확인"
                type="password"
                value={authStore.passwordCheck}
                onChange={(e) => authStore.setPasswordCheck(e.target.value)}
                message={authStore.passwordCheck ? validatePasswordCheck(authStore.passwordCheck, authStore.password) : ''}
                onKeyPress={(e) => passAll && submitByEnter(e)}
                mt={14}
              />
              {recommenderId ? (
                <Wrapper mt={30}>
                  <InputTitle type="sectionBodyText">추천인 아이디</InputTitle>
                  <Input disabled value={recommenderId} mt={14} />
                </Wrapper>
              ) : null}
            </Wrapper>

            <Wrapper width="90%" maxWidth={INPUT_MAX_WIDTH} mt={31}>
              <AgreeCheck detail={false} weight="3" name="all" check={allAgree} labelText="이용약관에 모두 동의합니다" onClickCheckbox={onClickAllAgree} />
              <Line mt={15} background="#d1d3d4" />
              {agreeItems.map((item, index) => (
                <AgreeCheck
                  mt={20}
                  key={item.title}
                  name={item.title}
                  check={item.checked}
                  labelText={item.title}
                  onClickCheckbox={() => onClickAgreeCheck(index)}
                  onClickRight={() => setDialogNum(index)}
                />
              ))}
            </Wrapper>

            <Wrapper flex width="90%" maxWidth={INPUT_MAX_WIDTH} mt={40}>
              <Wrapper pr="4px" width="50%">
                <Button onClick={() => router.back()} type="white">
                  <Wrapper w>
                    <Image src="/images/ico-arrow-before.svg" mt="2px" />
                    <Text weight="3" size="sm" ml="8px">
                      이전
                    </Text>
                  </Wrapper>
                </Button>
              </Wrapper>

              <Wrapper pl="4px" width="50%">
                <Button loading={loading} onClick={() => (passAll ? onClickOk() : onClickYet())} type="primary">
                  <Wrapper w>
                    <Text weight="3" size="sm" mr="8px">
                      다음
                    </Text>
                    <Image src="/images/ico-arrow-next.svg" mt="2px" />
                  </Wrapper>
                </Button>
              </Wrapper>
            </Wrapper>
          </>
        ) : (
          <>
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
                <span style={{fontFamily: theme.font['5']}}>{authStore.id}</span> 고객님 계정을 활성화하기 위해서 이메일 인증이 필요합니다
              </Text>
              <Text textAlign="center" letterSpacing="-0.35px" color="#6d6e71" lineHeight="1.71">
                <span style={{color: theme.color.main}}>{authStore.email}</span>로 인증 메일을 발송드리오니 계정을 활성화하여 주시기 바랍니다
                <br />
                인증 메일은 30분 동안 유효하며, 메일 발송 후 30분 초과 시에는 다시 가입 신청을 해야 합니다
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
          </>
        )}

        {(dialogNum || dialogNum === 0) && (
          <Dialog
            title={dialogNum !== 5 ? agreeItems[dialogNum].title : '알림'}
            dialogOpen={dialogNum}
            setDialogClose={setDialogNum}
            width={dialogNum !== 5 && 550}
            height={dialogNum !== 5 && 800}
          >
            {dialogNum !== 5 ? agreeItems[dialogNum].content : '입력값을 확인해주세요.'}
          </Dialog>
        )}
      </Wrapper>
    );
  })
);
export default Signup;
const InputTitle = styled(Text)`
  margin: 15px 0 8px;
`;
const IdWrapper = styled(Wrapper)<any>`
  .check-dup-btn {
    border-color: ${theme.color.main};
  }
  .id-input {
    span {
      width: calc(100% + 100px);
    }
  }
  .id-input.success {
    span {
      background: #16b70a0d;
      color: #16b70a;
      border-color: rgba(22 183 10 / 0.2);
      &::after {
        background: url(/images/icon-ok@2x.png) no-repeat;
        background-size: contain;
      }
    }
  }
`;
