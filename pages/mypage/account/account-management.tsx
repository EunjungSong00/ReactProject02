import {Section} from '@components/molecules';
import {Text, Wrapper, Input, Select, Button, Line} from '@components/atoms';
import styled from '@emotion/styled';
import useInput from '@hooks/useInput';
import React, {useCallback, useEffect, useRef, ReactElement, useState} from 'react';
import {Dialog, EasyVehicleRegistration} from '@components/organisms';
import {validatePassword, validatePasswordCheck, validateEmail, checkBusinessNumber} from '@modules/checkValidity';
import getNiceCheckFailApi from '@api/auth/getNiceCheckFailApi';
import getNiceCheckRequestApi from '@api/auth/getNiceCheckRequestApi';
import {StyledInputValidation, StyledInputValidationSuccess} from '@components/atoms/Input';
import PostCodePopup from '@container/auth/PostCodePopup';
import reauthenticateEmailApi from '@api/mypage/reauthenticateEmailApi';
import {useRouter} from 'next/router';
import authenticateDealerApi from '@api/auth/authenticateDealerApi';
import updatePartnerApi from '@api/mypage/updatePartnerApi';
import {dealersAssociationTypeArr} from '@public/selectArr';
import {formattedDate, autoCompanyHypen, autoDealerHypen, autoCorporationHypen} from '@modules/replaceStrings';
import theme, {primary, white, whiteBlue} from '@public/theme';
import {parseCookies} from 'nookies';
import usePopup from '@hooks/usePopup';
import Txt from '@components/atoms/Txt';
import updateAssociatePartnerApi from '@api/mypage/updateAssociatePartnerApi';
import certificationCorporationApi from '@api/auth/certificationCorporationApi';
import FakeInput from '@components/atoms/FakeInput';
import useCalendar from '@hooks/useCalendarEl/index';
import useButtonEl from '@modules/hooks/useButtonEl';
import useSelectEl from '@modules/hooks/useSelectEl';
import Toast from '@components/organisms/Toast';
import MypageConfirmPopup from '@components/organisms/MypageConfirmPopup';
import updateNiceCheckVerificationApi from '@api/auth/updateNiceCheckVerificationApi';

// TODO: SSR 실행 원인 체크
const AccountManagement = ({...props}): ReactElement => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.carPartnerAccessToken;
  const user = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const isRegularMember = user?.level === 'REGULAR';
  const [userId, setUserId] = useState<string>(''); // 아이디
  const [name, setName] = useState();
  const [identityAuthenticationId, setIdentityAuthenticationId] = useState(user?.identityAuthentication?.id);
  const [passAll, setPassAll] = useState<boolean | null>(false);
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const [dialogContent, setDialogContent] = useState<string | React.ReactElement>('');
  const [loading, setLoading] = useState(false);
  const [password, onChangePassword] = useInput(''); // 비밀번호
  const [nullPasswordMessage, setNullPasswordMessage] = useState(''); // 비밀번호 nullPasswordMessage
  const [passwordCheck, onChangePasswordCheck] = useInput(''); // 비밀번호 재확인
  const [email, onChangeEmail] = useInput<string | undefined>(user.email); // 이메일
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(); // 전화번호
  const [banksAccount, setBanksAccount] = useState<string>(''); // 정산대금입금계좌
  const [representativeName, onChangeRepresentativeName, setRepresentativeName] = useInput(''); // 대표자명
  const [businessNumber, setBusinessNumber] = useState(''); // 사업자 번호
  const [zipCode, setZipCode] = useState(''); // 우편번호
  const [address, setAddress] = useState(''); // 매매상사 주소
  const [detailAddress, onChangeDetailAddress, setDetailAddress] = useInput(''); // 매매상사 상세 주소
  const [dealersAssociationType, setDealersAssociationType] = useState(0); // 소속매매조합
  const [dealerName, onChangeSetDealerName, setDealerName] = useInput(''); // 종사원 이름
  const [dealerNum, setDealerNum] = useState(''); // 종사원 번호
  const [vehicleLedgerOwnerName, onChangeVehicleLedgerOwnerName, setVehicleLedgerOwnerName] = useInput(''); // 대표 소유주명 관리
  const [encode, setEncode] = useState('');
  const [success, setSuccess] = useState('');
  const [fail, setFail] = useState('');
  const [corporationId, setCorporationId] = useState(0); // 법인(상사) 아이디
  const [corporationResult, setCorporationResult] = useState<any>(null); // 소속법인 인증 결과값
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dealerResult, setDealerResult] = useState<any>(null); // 종사원 인증 결과값
  const [dealerId, setDealerId] = useState('');
  const [setPopup, PopupElement] = usePopup();
  const [popupMessage, setPopupMessage] = useState('');
  const [openDate, OpenDateEl, setOpenDate] = useCalendar(new Date());
  const Recertificate = useButtonEl('재인증');
  const TotalSubmit = useButtonEl('확인');
  const AccountEdit = useButtonEl('수정');
  const AddressFind = useButtonEl('주소찾기');
  const [select, SelectEl, setSelect] = useSelectEl();
  const [toastErr, setToastErr] = useState('');
  const [finalConfirm, setFinalConfirm] = useState(false);
  const [withdrawalConfirm, setWithdrawalConfirm] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const popTitle = 'carmerceNice';
  const {corporation, dealer} = user;
  // console.log('user', user);

  // 기존 저장된 정보
  useEffect(() => {
    const {corporation, dealer} = user;

    console.log('corporation', user.corporation);

    setUserId(user?.loginId);
    setName(user?.identityAuthentication?.name);
    setPhoneNumber(user?.identityAuthentication?.phoneNumber);
    const bankName = `${user?.corporation?.corporationSettlementAccount?.bank?.name || ''}`;
    const bankNumb = `${user?.corporation?.corporationSettlementAccount?.number || ''}`;
    const banksAccountStr = String(`${bankName} ${bankNumb}`);
    setBanksAccount(banksAccountStr);

    console.info('cookie', cookies.carPartnerUserInfo);
    if (corporation) {
      // console.log('1234', corporation);
      setVehicleLedgerOwnerName(user?.vehicleLedgerOwnerName);
      setRepresentativeName(corporation?.representativeName);
      setBusinessNumber(autoCompanyHypen(corporation?.businessNumber));
      setZipCode(corporation?.zipCode);
      setAddress(corporation?.address);
      setDetailAddress(corporation?.detailAddress);
      setOpenDate(new Date(corporation?.startDate));
      setCorporationId(corporation?.id);
    }
    if (dealer) {
      setDealersAssociationType(dealer?.assocType);
      setSelect(dealer?.assocType);
      setDealerName(dealer?.dealerName);
      setDealerNum(dealer?.dealerNum);
      setDealerId(dealer?.id);
    }
  }, []);

  // 휴대폰번호 재인증
  useEffect(() => {
    const receiveMessage = async (e: any) => {
      // eslint-disable-next-line no-prototype-builtins
      if (e.data.hasOwnProperty('EncodeData')) {
        setSuccess(e.data.EncodeData);
      }
      // eslint-disable-next-line no-prototype-builtins
      if (e.data.hasOwnProperty('niceError')) {
        setFail(e.data.niceError);
      }
    };
    window.addEventListener('message', receiveMessage, false);
    document.addEventListener('message', receiveMessage, false);

    return () => {
      window.removeEventListener('message', receiveMessage, false);
      document.removeEventListener('message', receiveMessage);
    };
  }, []);

  useEffect(() => {
    if (success) {
      niceCheckSuccess();
    }
  }, [success]);

  useEffect(() => {
    if (fail) {
      niceCheckFail();
    }
  }, [fail]);

  useEffect(() => {
    password && passwordCheck && !(validatePassword(password, userId) || validatePasswordCheck(passwordCheck, password)) ? setPassAll(true) : setPassAll(false);
  }, [password, passwordCheck]);

  // 재인증 메일 버튼 동작
  // TODO: 인증 api 변경
  const ClickReauthenticateEmail = useCallback(() => {
    // console.info('ClickReauthenticateEmail', email);
    setLoading(true);
    if (email) {
      if (validateEmail(email) === '') {
        // console.info('reauthenticateEmailApi');
        reauthenticateEmailApi(`${process.env.NEXT_PUBLIC_DOMAIN}/login`, email).then((res) => {
          if (res) {
            // console.info(res);
            if (res?.errors) {
              openDialog(res?.errors[0].message);
            } else {
              router.push('/mypage/account/email-reauthentication');
            }
          }
        });
      }
    }
    setLoading(false);
  }, [email]);

  // 입금계좌 수정하기
  const accountEdit = useCallback(() => {
    router.push('/account');
  }, []);

  // 사업자 정보 재인증 버튼
  const ClickCorporation = useCallback(() => {
    setDialogNum(undefined);
    if (representativeName && businessNumber && openDate) {
      if (checkBusinessNumber(businessNumber)) {
        setLoading(true);
        const query = {
          representativeName,
          businessNumber,
          startDate: formattedDate(openDate).replaceAll('-', ''),
          corporationType: 'PRIVATE'
          // FIXME: 임시 (yong))
        };
        certificationCorporationApi(query)
          .then((res: any) => {
            setLoading(false);
            // console.info('authenticateCorporationApi', res);
            if (res?.authenticateCorporation?.id) {
              setCorporationId(res.authenticateCorporation.id);
              setCorporationResult(true);
            } else if (res?.errors) {
              openDialog(res?.errors[0]?.message?.includes('400 Bad Request') ? '일시적인 서버 오류가 발생했습니다.' : res?.errors[0]?.message);
              setCorporationResult(false);
            }
          })
          .catch((e: any) => {
            setLoading(false);
            console.error('certificationCorporationApi error', e);
          });
      } else {
        openDialog('사업자등록번호를 올바르게 입력하세요.');
      }
    } else {
      !representativeName ? openDialog('대표자명을 입력하세요.') : !businessNumber ? openDialog('사업자등록번호를 입력하세요.') : openDialog('개업일시를 입력하세요.');
    }
  }, [representativeName, businessNumber, openDate]);

  // 종사원 번호 재인증
  const ClickReauthenticateDealerNum = useCallback(() => {
    // 종사원 번호 인증 버튼을 누르면
    if (dealersAssociationType !== 0 && dealerName && dealerNum) {
      // console.info('dealersAssociationType', dealersAssociationType);
      setLoading(true);
      const dealerQuery = {dealersAssociationType, dealerName, dealerNum};
      // authenticateDealerApi(Number(dealersAssociationType) - 1, dealerName, dealerNum).then((res) => {
      authenticateDealerApi(dealerQuery).then((res) => {
        setLoading(false);
        console.info('authenticateDealerApi res', res);
        if (res) {
          if (res.authenticateDealer) {
            setDealerNum(res?.authenticateDealer?.dealerNum);
            setDealerResult(true);
          } else {
            setDialogNum(1);
            setDialogContent(res?.errors[0]?.message);
            setDealerResult(false);
          }
        } else {
          setDialogNum(1);
          setDialogContent('소속매매조합, 사원증 번호를 확인해주세요.');
        }
      });
    }
  }, [dealerNum, dealersAssociationType, dealerName]);

  // 확인 버튼
  const onClickOk = useCallback(() => setFinalConfirm(true), [finalConfirm]);

  const updatePartner = useCallback(async (): Promise<void> => {
    const query = {address, corporationId, dealerId, detailAddress, identityAuthenticationId, vehicleLedgerOwnerName, zipCode, password};
    if (query) {
      // confirm('수정된 회원정보를 저장하시겠습니까? \n 확인 버튼을 누르시면 메인 페이지로 이동합니다.') &&
      updatePartnerApi(query).then((res) => {
        if (res?.errors) {
          setFinalConfirm(false);
          setDialogContent(res?.errors[0]?.message);
          setDialogNum(1);
        } else {
          router.push('/home');
        }
      });
    }
  }, [address, corporationId, dealerId, detailAddress, identityAuthenticationId, vehicleLedgerOwnerName, zipCode, password, passwordCheck, token]);

  const onClickYet = () => {
    setToastErr('입렵값을 확인하세요.');
  };

  // 주소변경
  const handleChangeAddress = useCallback((full: string, zip: string) => {
    setAddress(full);
    setZipCode(zip);
  }, []);

  //  소속매매조합
  const handleChangeDealersAssociationType = useCallback((event: any) => {
    setDealersAssociationType(event.target.value);
    // const result = autoDealerHypen(dealerNum, event.target.value);
    // setDealerNum(result);
  }, []);

  const onChangeBusinessNumber = useCallback((value) => {
    const result = autoCompanyHypen(value.target.value);
    setBusinessNumber(result);
  }, []);

  const onChangeDealerNum = useCallback(
    (value) => {
      const result = autoDealerHypen(value.target.value, dealersAssociationType);
      setDealerNum(result);
    },
    [dealersAssociationType]
  );

  // 팝업창 열기
  const openPostCode = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  // 팝업창 닫기
  const closePostCode = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  // 본인인증 성공시
  const niceCheckSuccess = useCallback(() => {
    // console.info('success', success);
    updateNiceCheckVerificationApi(success)
      .then((res) => {
        // console.log(res);
        if (res?.errors) {
          setDialogContent(res?.errors[0]?.message);
          setDialogNum(1);
        } else {
          setDialogContent('재인증 되었습니다.');
          setDialogNum(1);
          setName(res?.updateNiceCheckVerification?.name);
          setPhoneNumber(res?.updateNiceCheckVerification?.phoneNumber);
        }
        // setIdentityAuthenticationId(res?.getNiceCheckSuccess?.id);
        // props.setNiceUser(res.getNiceCheckSuccess);
        // setPhoneNumber(user.phoneNumber);
      })
      .catch((err) => {
        // console.info('catch');
        console.log(err);
      });
  }, [success]);

  // 본인인증 실패시
  const niceCheckFail = useCallback(() => {
    // console.info('fail', fail);
    getNiceCheckFailApi(fail)
      .then((res) => {
        console.log(res);
        if (res?.errors) {
          console.log(res.errors);
          setDialogContent(res?.errors[0]?.message);
          setDialogNum(1);
        }
      })
      .catch((err) => {
        // console.info(err);
        console.log('err', err);
      });
  }, [fail]);

  // 본인인증 버튼 클릭시
  const checkNiceBtn = useCallback(() => {
    setLoading(true);
    getNiceCheckRequestApi()
      .then((res) => {
        // encode data;
        // console.info(res);
        const encodeData = res.getNiceCheckRequest;
        setEncode(encodeData);
        window.open('', popTitle, 'width=500,height=500');
        formRef.current && formRef.current.submit();
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  }, []);

  // 회원탈퇴
  const withdrawalTxt: any = (
    <Txt type={'medium'} mt={34} textAlign={'center'}>
      {' '}
      회원 탈퇴를 진행하시겠습니까?{' '}
    </Txt>
  );
  const onClickWithdrawal = () => {
    // setPopup(popupMessage);
    // setPopupMessage(withdrawalTxt);
    setWithdrawalConfirm(true);
  };

  const openDialog = (dialogContent: string | React.ReactElement, dialogNum?: number) => {
    setDialogNum(dialogNum ?? 1);
    setDialogContent(dialogContent);
  };

  const emailCheck = useCallback(() => {
    if (user) {
      if (email === user.email) {
        setToastErr('변경된 사항이 없습니다. 입력값을 확인해주세요.');
      } else {
        ClickReauthenticateEmail();
      }
    }
  }, [email, user]);

  // 준회원 비밀번호 변경
  const onClickUpdateAssociatePartnerApi = async () => {
    // console.log(validatePasswordCheck(passwordCheck, password));

    if (password && passwordCheck && !validatePasswordCheck(passwordCheck, password)) {
      await updateAssociatePartnerApi(password).then((res: any) => {
        // console.log('res', res);
        if (res?.errors) {
          setDialogContent(res?.errors[0]?.message);
          setDialogNum(1);
        } else {
          router.push('/home');
        }
      });
    } else {
      setToastErr('변경사항이 없습니다.');
    }
  };

  return (
    <>
      <Toast type={'error'} toast={toastErr} setToast={setToastErr} />
      <EasyVehicleRegistration />
      <Section border="1px solid #cccccc" padding="30px 36px">
        <Wrapper w h between width="100%">
          <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
            계정정보 관리
          </Txt>
          <InfoTxt onClick={() => onClickWithdrawal()}>회원탈퇴</InfoTxt>
        </Wrapper>
        <Line sectionTitleLine />
        {/* 계정 정보 */}
        <Text type="sectionSubTitle" mt={35}>
          계정정보
        </Text>
        <InputWrapper>
          <InputTitle type="sectionBodyText">아이디</InputTitle>
          {/* <Input type="sqaureInput" value={userId} disabled /> */}
          <Input version="b" whcbr={['100%', 50, white]} value={userId} disabled />
          {token && (
            <Wrapper w between>
              <Wrapper width="49%">
                <InputTitle type="sectionBodyText">비밀번호</InputTitle>
                <FakeInput password />
                <Input
                  type="password"
                  version="b"
                  whcbr={['100%', 50, white]}
                  value={password}
                  onChange={onChangePassword}
                  message={password ? validatePassword(password, userId) : nullPasswordMessage}
                  onKeyUp={() => password || setNullPasswordMessage('변경할 비밀번호를 입력해주세요')}
                  autoComplete="false"
                />
              </Wrapper>
              <Wrapper width="49%">
                <InputTitle type="sectionBodyText">비밀번호 확인</InputTitle>
                <Input
                  type="password"
                  version="b"
                  whcbr={['100%', 50, white]}
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  message={passwordCheck ? validatePasswordCheck(passwordCheck, password) : nullPasswordMessage}
                  onKeyUp={() => passwordCheck || setNullPasswordMessage('변경할 비밀번호를 입력해주세요')}
                />
              </Wrapper>
            </Wrapper>
          )}
        </InputWrapper>
        {/* 개인 정보 */}
        <Text type="sectionSubTitle" mt={50}>
          개인정보
        </Text>
        <InputWrapper>
          <InputTitle type="sectionBodyText">{isRegularMember ? '이름' : '이메일'}</InputTitle>
          {isRegularMember ? (
            <Input value={name} version="b" whcbr={['100%', 50, white]} disabled />
          ) : (
            <>
              <Wrapper w between>
                <Input version="b" whcbr={['100%', 50, white]} mr="8px" value={email} onChange={onChangeEmail} message={email ? validateEmail(email) : ''} />
                <Recertificate whcbr={[79, 50, whiteBlue]} onClick={emailCheck} loading={loading} />
              </Wrapper>
              <Wrapper mt={30} mb={55} w>
                <TotalSubmit
                  whcbr={[170, 50, primary]}
                  loading={loading}
                  onClick={onClickUpdateAssociatePartnerApi}
                  disabled={!(password && passwordCheck && !validatePassword(password, userId) && !validatePasswordCheck(passwordCheck, password))}
                />
              </Wrapper>
            </>
          )}
        </InputWrapper>
        {isRegularMember ? (
          <InputWrapper w between>
            <Wrapper width="49%">
              <InputTitle type="sectionBodyText">휴대폰번호</InputTitle>
              <Wrapper w between>
                <Input version="b" whcbr={['100%', 50, white]} mr="8px" value={phoneNumber} disabled />
                <Recertificate whcbr={[79, 50, whiteBlue]} onClick={checkNiceBtn} loading={loading} />
                {/* nice 서버에 submit할 form */}
                <form name="form_chk" method="post" ref={formRef} target={popTitle} action={'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb'}>
                  <input type="hidden" name="m" value="checkplusService" />
                  <input type="hidden" name="EncodeData" value={encode} />
                </form>
              </Wrapper>
            </Wrapper>
            <Wrapper width="49%">
              <InputTitle type="sectionBodyText">이메일주소</InputTitle>
              <Wrapper w between>
                <Input version="b" whcbr={['100%', 50, white]} mr="8px" value={email} onChange={onChangeEmail} message={email ? validateEmail(email) : ''} />
                <Recertificate whcbr={[79, 50, whiteBlue]} onClick={emailCheck} loading={loading} />
              </Wrapper>
            </Wrapper>
          </InputWrapper>
        ) : (
          <></>
        )}

        {isRegularMember ? (
          <>
            {/* 정산대금 입금계좌 */}
            <Text type="sectionSubTitle" mt={50}>
              정산대금 입금계좌
            </Text>
            <InputWrapper>
              <InputTitle type="sectionBodyText">정산대금 입금계좌</InputTitle>
              <Wrapper w between>
                <Input value={banksAccount} version="b" whcbr={['100%', 50, white]} mr="8px" disabled />
                <AccountEdit whcbr={[92, 50, whiteBlue]} onClick={accountEdit} loading={loading} />
              </Wrapper>
            </InputWrapper>

            {/* 사업자 정보 */}
            <Text type="sectionSubTitle" mt={50}>
              사업자 정보
            </Text>
            <InputWrapper>
              {/* 대표자명 */}
              <InputTitle type="sectionBodyText">법인 유형</InputTitle>
              <Input disabled value={corporation?.corporationType === 'CORPORATION' ? '법인사업자' : '개인사업자'} version="b" whcbr={['100%', 50, white]} mr="8px" />
              <InputTitle type="sectionBodyText">대표자명</InputTitle>
              <Wrapper w between>
                <Input disabled value={representativeName} onChange={onChangeRepresentativeName} version="b" whcbr={['100%', 50, white]} mr="8px" />
                {/* <Recertificate
                  whcbr={[92, 50, whiteBlue]}
                  onClick={() =>
                    representativeName === user.corporation?.representativeName &&
                    businessNumber === user.corporation?.businessNumber &&
                    openDate === new Date(user.corporation?.startDate)
                      ? openDialog('변경된 사항이 없습니다. 입력값을 확인해주세요.')
                      : openDialog('수정하시겠습니까?', 2)
                  }
                  loading={loading}
                /> */}
              </Wrapper>
              {corporationResult !== null ? (
                <Wrapper mb={2}>
                  {corporationResult ? <StyledInputValidationSuccess>인증 완료</StyledInputValidationSuccess> : <StyledInputValidation>인증 실패</StyledInputValidation>}
                </Wrapper>
              ) : null}

              {/* 사업자 등록 번호 & 개업일시 */}
              <Wrapper w between>
                <Wrapper width="49%">
                  <InputTitle type="sectionBodyText">사업자 등록번호</InputTitle>
                  <Input disabled version="b" whcbr={['100%', 50, white]} value={businessNumber} onChange={onChangeBusinessNumber} />
                </Wrapper>
                <Wrapper width="49%">
                  <InputTitle type="sectionBodyText">개업일시</InputTitle>
                  {/* <CalendarInput type="calendar" date={date} setDate={setDate} height="50px" width="100%" /> */}
                  <OpenDateEl disabled height="50px" width="100%" />
                </Wrapper>
              </Wrapper>
              {corporation?.corporationType === 'CORPORATION' && (
                <>
                  <InputTitle type="sectionBodyText">법인 번호</InputTitle>
                  <Input disabled value={autoCorporationHypen(corporation?.corporationNumber)} version="b" whcbr={['100%', 50, white]} mr="8px" />
                </>
              )}
              <InputTitle type="sectionBodyText">매매상사 주소</InputTitle>
              <Wrapper w between>
                <Input version="b" whcbr={['100%', 50, white]} mr="8px" value={address} disabled readOnly />
                <AddressFind whcbr={[92, 50, whiteBlue]} onClick={openPostCode} />
              </Wrapper>
              <Input version="b" whcbr={['100%', 50, white]} mt="8px" value={detailAddress} onChange={onChangeDetailAddress} />

              {isPopupOpen && (
                <>
                  <PostCodePopup closePostCode={closePostCode} handleChangeAddress={handleChangeAddress} />
                </>
              )}

              {/* 소속 매매조합 & 종사원명 */}
              <Wrapper w between mt={35}>
                <Wrapper width="49%">
                  <InputTitle type="sectionBodyText">소속 매매 조합</InputTitle>
                  {/* <SelectEl whcbr={['100%', 50, white]} placeholder={'매매 조합을 선택해주세요'} options={dealersAssociationTypeArr} /> */}
                  <Select
                    placeholder={'매매 조합을 선택해주세요'}
                    options={dealersAssociationTypeArr}
                    value={dealersAssociationType}
                    onChange={handleChangeDealersAssociationType}
                  />
                </Wrapper>
                <Wrapper width="49%">
                  <InputTitle type="sectionBodyText">종사원명</InputTitle>
                  <Input version="b" whcbr={['100%', 50, white]} onChange={onChangeSetDealerName} value={dealerName} />
                </Wrapper>
              </Wrapper>

              {/* 종사원 번호 */}
              <InputTitle type="sectionBodyText">종사원 번호</InputTitle>
              <Wrapper w between>
                <Input version="b" whcbr={['100%', 50, white]} mr="8px" value={dealerNum} onChange={onChangeDealerNum} />
                <Recertificate
                  whcbr={[92, 50, whiteBlue]}
                  onClick={() =>
                    dealerNum === user.dealer.dealerNum && dealerName === user.dealer.dealerName && dealersAssociationType === user.dealer.assocType
                      ? openDialog('변경된 사항이 없습니다. 입력값을 확인해주세요.')
                      : ClickReauthenticateDealerNum()
                  }
                  loading={loading}
                />
              </Wrapper>
              {dealerResult !== null ? (
                <Wrapper mb={2}>
                  {dealerResult ? <StyledInputValidationSuccess>인증 완료</StyledInputValidationSuccess> : <StyledInputValidation>인증 실패</StyledInputValidation>}
                </Wrapper>
              ) : null}
            </InputWrapper>

            {/* 대표 소유주명 관리 */}
            <Text type="sectionSubTitle" mt={50}>
              대표 소유주명 관리
            </Text>
            <InputWrapper>
              <InputTitle type="sectionBodyText">대표 소유주명 관리</InputTitle>
              <Wrapper w between>
                <Input version="b" whcbr={['100%', 50, white]} value={vehicleLedgerOwnerName} onChange={onChangeVehicleLedgerOwnerName} />
              </Wrapper>
            </InputWrapper>
            <Wrapper mt={30} mb={55} w>
              <TotalSubmit
                whcbr={[170, 50, primary]}
                loading={loading}
                onClick={() => (!password && !passwordCheck ? onClickOk() : password && passwordCheck && passAll ? onClickOk() : onClickYet())}
                // disabled
              />
            </Wrapper>
          </>
        ) : (
          <></>
        )}
      </Section>

      {(dialogNum || dialogNum === 0) && (
        <Dialog title="알림" dialogOpen={dialogNum} setDialogClose={setDialogNum} onClickDialogEnter={dialogNum === 2 ? ClickCorporation : false}>
          {dialogContent}
        </Dialog>
      )}

      {finalConfirm && (
        <MypageConfirmPopup
          visible={finalConfirm}
          title={'알림'}
          content={
            <span>
              수정된 회원정보를 저장하시겠습니까? <br /> 확인 버튼을 누르시면 메인 페이지로 이동합니다.
            </span>
          }
          onClose={() => setFinalConfirm(false)}
          onOk={updatePartner}
        />
      )}

      {withdrawalConfirm && (
        <MypageConfirmPopup
          visible={withdrawalConfirm}
          title={'알림'}
          content={withdrawalTxt}
          onOk={() => router.push('/mypage/account/withdrawal')}
          onClose={() => setWithdrawalConfirm(false)}
          negativeBtn={true}
        />
      )}

      <PopupElement
        width={'460px'}
        height={'280px'}
        okText={'확인'}
        cancelText={'취소'}
        // TODO: 팝업 > 탈퇴페이지 넘어갈때 확인하는거 + 수정할때 팝업
        onClickPopupEnter={() => router.push('/mypage/account/withdrawal')}
      />
    </>
  );
};

const InputWrapper = styled(Wrapper)`
  max-width: 100%;
  min-width: 566px;
  padding: 8px 195px 0;
  .calendar input {
    border-radius: 4px;
  }
`;

const InputTitle = styled(Text)`
  margin: 15px 0 8px;
`;

export const EditButton = styled(Button)`
  background-color: ${theme.color.white};
  height: 50px;
  border: 1px solid ${theme.color.primary};
  color: ${theme.color.primary};
  padding: 0 10px;
  &:hover {
    background-color: ${theme.color.hoverWhite};
  }
`;
export const InfoTxt = styled.span`
  letter-spacing: -0.68px;
  font-size: 13px;
  color: ${theme.color.lightgray};
  cursor: pointer;
  position: relative;
  padding-right: 12px;
  display: inline-block;
  vertical-align: bottom;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 7px;
    background: ${theme.color.lightgray};
    transform: rotate(-45deg);
  }
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 2px;
    right: 0;
    width: 2px;
    height: 7px;
    background: ${theme.color.lightgray};
    transform: rotate(45deg);
  }
  &:hover {
    opacity: 0.8;
  }
`;
export default AccountManagement;
