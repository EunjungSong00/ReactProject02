import {Section} from '@components/molecules';
import {Wrapper, Text, Line, Checkbox} from '@components/atoms';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import theme from '@public/theme';
import useTextarea from '@hooks/useTextarea';
import Input, {StyledInputValidation} from '@components/atoms/Input';
import useInput from '@hooks/useInput';
import Button from '@components/atoms/Button';
import Popup, {PopupType} from '@components/organisms/Popup';
import {useRouter} from 'next/router';
import withdrawalPartnerApi from '@api/mypage/withdrawalPartnerApi';
import {parseCookies, destroyCookie} from 'nookies';
import Toast from '@components/organisms/Toast';

const withdrawal = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const user = cookies.carPartnerUserInfo;
  const [improvementList, setImprovementList] = useState<string[]>([]); // 개선사항
  const [satisfactionList, setSatisfactionList] = useState<string[]>([]); // 가장 만족했던 서비스
  const [shortcomingList, setShortcomingList] = useState<string[]>([]); // 부족한 서비스
  // 개선사항
  const [inconvenientService, setInconvenientService] = useState(false); // 서비스 불편함
  const [noAdditionalFeatures, setNoAdditionalFeatures] = useState(false); // 추가 기능 부족
  const [noRequiredInfo, setNoRequiredInfo] = useState(false); // 필요 정보 없음
  // 가장 만족했던 서비스
  const [automaticRegistration, setAutomaticRegistration] = useState(false); // 차량 자동 등록
  const [identifyTrend, setIdentifyTrend] = useState(false); // 매입 추세 파악
  const [inventoryManagement, setInventoryManagement] = useState(false); // 재고관리 데이터
  // 부족한 서비스
  const [noAutomaticRegistration, setNoAutomaticRegistration] = useState(false); // 차량 자동 등록
  const [noIdentifyTrend, setNoIdentifyTrend] = useState(false); // 매입추세 파악
  const [noInventoryManagement, setNoInventoryManagement] = useState(false); // 재고관리 데이터
  const [opinion, onChangeOpinion] = useTextarea('');
  const [password, onChangePassword] = useInput(''); // 비밀번호
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [improveError, setImproveError] = useState(false);
  const [satisfactionError, setSatisfactionError] = useState(false);
  const [shortcomingError, setShortcomingError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [withdrawalContent, setWithdrawalContent] = useState<PopupType>(undefined);
  const [alertContent, setAlertContent] = useState<PopupType>(undefined);
  const [toast, setToast] = useState('');

  // 개선사항
  const onChangeInconvenientService = () => {
    setInconvenientService(!inconvenientService);
  };
  const onChangeNoAdditionalFeature = () => {
    setNoAdditionalFeatures(!noAdditionalFeatures);
  };
  const onChangeNoRequiredInfo = () => {
    setNoRequiredInfo(!noRequiredInfo);
  };

  // 가장 만족했던 서비스
  const onChangeAutomaticRegistration = () => {
    setAutomaticRegistration(!automaticRegistration);
  };
  const onChangeIdentifyTrend = () => {
    setIdentifyTrend(!identifyTrend);
  };
  const onChangeInventoryManagement = () => {
    setInventoryManagement(!inventoryManagement);
  };

  // 부족한 서비스
  const onChangeNoAutomaticRegistration = () => {
    setNoAutomaticRegistration(!noAutomaticRegistration);
  };
  const onChangeNoIdentifyTrend = () => {
    setNoIdentifyTrend(!noIdentifyTrend);
  };
  const onChangeNoInventoryManagement = () => {
    setNoInventoryManagement(!noInventoryManagement);
  };

  // 필수사항 글씨 표시
  useEffect(() => {
    const resultCondition = !inconvenientService && !noAdditionalFeatures && !noRequiredInfo;
    resultCondition ? setImproveError(true) : setImproveError(false);
  }, [inconvenientService, noAdditionalFeatures, noRequiredInfo]);

  // 필수사항 글씨 표시
  useEffect(() => {
    !automaticRegistration && !identifyTrend && !inventoryManagement ? setSatisfactionError(true) : setSatisfactionError(false);
  }, [automaticRegistration, identifyTrend, inventoryManagement]);

  // 필수사항 글씨 표기
  useEffect(() => {
    !noAutomaticRegistration && !noIdentifyTrend && !noInventoryManagement ? setShortcomingError(true) : setShortcomingError(false);
  }, [noAutomaticRegistration, noIdentifyTrend, noInventoryManagement]);

  // 개선사항
  useEffect(() => {
    const tempArr: string[] = [];
    inconvenientService && tempArr.push('서비스 불편함');
    noAdditionalFeatures && tempArr.push('추가 기능이 부족함');
    noRequiredInfo && tempArr.push('필요한 정보가 없음');
    // console.info('tempArr1', tempArr);
    setImprovementList(tempArr);
  }, [inconvenientService, noAdditionalFeatures, noRequiredInfo]);

  // 가장 만족했던 서비스
  useEffect(() => {
    const tempArr: string[] = [];
    automaticRegistration && tempArr.push('차량 자동 등록');
    identifyTrend && tempArr.push('매입 추세 파악');
    inventoryManagement && tempArr.push('재고관리 데이터');
    // console.info('tempArr1', tempArr);
    setSatisfactionList(tempArr);
  }, [automaticRegistration, identifyTrend, inventoryManagement]);

  // 부족한 서비스
  useEffect(() => {
    const tempArr: string[] = [];
    noAutomaticRegistration && tempArr.push('차량 자동 등록');
    noIdentifyTrend && tempArr.push('매입 추세 파악');
    noInventoryManagement && tempArr.push('재고관리 데이터');
    // console.info('tempArr1', tempArr);
    setShortcomingList(tempArr);
  }, [noAutomaticRegistration, noIdentifyTrend, noInventoryManagement]);

  useEffect(() => {
    // console.info('improvementList', improvementList);
  }, [improvementList]);

  useEffect(() => {
    setUserName(JSON.parse(user).identityAuthentication?.name);
    setUserId(JSON.parse(user).loginId);
  }, []);

  const getWithdrawal = () => {
    setWithdrawalContent(undefined);
    withdrawalPartnerApi({improvementList, satisfactionList, shortcomingList, opinion, password})
      .then((res) => {
        if (res && res?.errors) {
          setAlertContent(res?.errors[0]?.message);
          if (res?.errors[0]?.extensions?.uniqueCode === '22') {
            setPasswordError(true);
          } else if (res?.errors[0]?.extensions?.uniqueCode === '43') {
            setImproveError(true);
          } else if (res?.errors[0]?.extensions?.uniqueCode === '44') {
            setSatisfactionError(true);
          } else if (res?.errors[0]?.extensions?.uniqueCode === '45') {
            setShortcomingError(true);
          }
        } else {
          setToast('회원탈퇴가 완료되었습니다.');
          destroyCookie(null, 'carPartnerUserInfo', {path: '/'});
          destroyCookie(null, 'carPartnerAccessToken', {path: '/'});
          destroyCookie(null, 'carPartnerRefreshToken', {path: '/'});
          router.push('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Section>
        <Wrapper h width="100%">
          <Text type="sectionHeading4">회원탈퇴</Text>
        </Wrapper>
        <Line sectionTitleLine />
        <Wrapper mt={40}>
          <Text type="sectionSubTitle">회원 탈퇴 안내</Text>
          <NoticeText type="sectionBodyText" padding={'20px 0 30px'}>
            <span className="blueText">{userName} 고객님,</span> 지금까지 카머스를 이용해 주셔서 감사합니다. <br />
            카머스에 행여나 부족한 점이 있었다면 너그러운 양해 바라며, 아래의 사항을 확인하시고,
            <span className="blueText"> 개선해야 할 점이 있다면 남겨주세요.</span> <br />
            고객님의 의견을 적극 반영하여 앞으로의 이용에 불편이 없도록 개선하겠습니다. <br /> <br />
            <span className="warning">회원 탈퇴시 주의할 점 </span>
            1. 사용하고 계신 아이디(<span className="blueText"> {userId} </span>)는 탈퇴할 경우 재사용이 불가능 합니다. <br />
            2. 탈퇴 이후 등록한 정보(차량 정보, 재고 정보) 등 이용기록이 모두 삭제됩니다.
          </NoticeText>

          <Line />
        </Wrapper>
        <Wrapper mt={50}>
          <Text type="sectionSubTitle" mb={20}>
            개선 사항을 선택해 주세요&nbsp;&nbsp;
            <span style={{fontFamily: '$theme.font.[3]', display: 'inline-block', fontSize: 14}}>(복수선택 가능)</span>
          </Text>
          <Text size="16px">
            개선사항
            {improveError && <ErrorMsg>필수 선택 사항입니다.</ErrorMsg>}
          </Text>

          <CheckWrapper h mt={20}>
            <Checkbox labelText="서비스 불편함" isChk={inconvenientService} onChange={onChangeInconvenientService} name="INCONVENIENT_SERVICE" />
            <Checkbox labelText="추가 기능이 부족함" isChk={noAdditionalFeatures} onChange={onChangeNoAdditionalFeature} name="LACK_OF_ADDITIONAL_FEATURES" />
            <Checkbox labelText="필요한 정보가 없음" isChk={noRequiredInfo} onChange={onChangeNoRequiredInfo} name="NO_REQUIRED_INFORMATION" />
          </CheckWrapper>
        </Wrapper>
        <Wrapper mt={35}>
          <Text size="16px">
            가장 만족했던 서비스
            {satisfactionError && <ErrorMsg>필수 선택 사항입니다.</ErrorMsg>}
          </Text>
          <CheckWrapper h mt={20}>
            <Checkbox labelText="차량 자동 등록" isChk={automaticRegistration} onChange={onChangeAutomaticRegistration} name="AUTOMATIC_VEHICLE_REGISTRATION"/>
            <Checkbox labelText="매입 추세 파악" isChk={identifyTrend} onChange={onChangeIdentifyTrend} name="IDENTIFY_BUYING_TRENDS" />
            <Checkbox labelText="재고관리 데이터" isChk={inventoryManagement} onChange={onChangeInventoryManagement} name="INVENTORY_MANAGEMENT" />
          </CheckWrapper>
        </Wrapper>
        <Wrapper mt={35}>
          <Text size="16px">
            부족한 서비스
            {shortcomingError && <ErrorMsg> 필수 선택 사항입니다.*</ErrorMsg>}
          </Text>
          <CheckWrapper h mt={20}>
            <Checkbox labelText="차량 자동 등록" isChk={noAutomaticRegistration} onChange={onChangeNoAutomaticRegistration} name="NO_AUTOMATIC_VEHICLE_REGISTRATION" />
            <Checkbox labelText="매입 추세 파악" isChk={noIdentifyTrend} onChange={onChangeNoIdentifyTrend} name="NO_IDENTIFY_BUYING_TRENDS" />
            <Checkbox labelText="재고관리 데이터" isChk={noInventoryManagement} onChange={onChangeNoInventoryManagement} name="NO_INVENTORY_MANAGEMENT" />
          </CheckWrapper>
        </Wrapper>
        <Wrapper mt={50}>
          <Text type="sectionSubTitle" mb={15}>
            카머스에 개선사항이 있다면 의견을 남겨주세요&nbsp;&nbsp;
            <span style={{fontFamily: '$theme.font.[3]', display: 'inline-block', fontSize: 14}}>(1000자 이내)</span>
          </Text>
          <TextArea value={opinion} onChange={onChangeOpinion} placeholder={'내용을 입력해 주세요'} maxLength={1000} />
        </Wrapper>
        <Wrapper mt={35}>
          <Text type="sectionBodyText">비밀번호 입력</Text>
          <Wrapper width="330px" mt={10}>
            <Input type="password" value={password} onChange={onChangePassword} />
            {passwordError && <StyledInputValidation> 비밀 번호를 입력하세요</StyledInputValidation>}
          </Wrapper>
        </Wrapper>
        <Wrapper w mt={50} mb={50}>
          <Button width="170px" children="회원 탈퇴하기" onClick={() => setWithdrawalContent('정말로 탈퇴하시겠습니까?')} />
        </Wrapper>
      </Section>

      {alertContent && <Popup content={alertContent} setContent={setAlertContent} />}

      {withdrawalContent && <Popup title="알림" content={withdrawalContent} setContent={setWithdrawalContent} onClickPopupEnter={() => getWithdrawal()} />}
      <Toast type={'success'} toast={toast} setToast={setToast} />
    </>
  );
};
export default withdrawal;

const NoticeText = styled(Text)`
  .blueText {
    color: ${theme.color.main};
    font-family: ${theme.font['5']};
  }

  .warning {
    display: block;
    font-family: ${theme.font['5']};
  }
`;

const ErrorMsg = styled.span`
  color: ${theme.color.red};
  padding-left: 10px;
  font-family: ${theme.font['4']};
  font-size: 12px;
`;

const TextArea = styled.textarea`
  font-family: ${theme.font['3']};
  color: ${theme.color.black};
  font-size: 14px;
  resize: none;
  width: 100%;
  height: 386px;
  overflow-y: auto;
  border: solid 1px #e2e6ee;
  border-radius: 4px;
  padding: 12px 15px;
  tab-size: 4;
  line-height: 1.42;
  margin-top: 8px;

  &::placeholder {
    color: #93969f;
  }
  &:focus {
    outline: none;
    border: 1px solid ${theme.color.primary};
  }
`;

const CheckWrapper = styled(Wrapper)`
  label {
    margin-right: 30px;
  }
`;
