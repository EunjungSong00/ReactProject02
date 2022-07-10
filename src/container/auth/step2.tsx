import React, {memo, useCallback, useState} from 'react';
import {Text, Wrapper, Input} from '@components/atoms';
import styled from '@emotion/styled';
import useInput from '@hooks/useInput';
import {corporationTypeArr, dealersAssociationTypeArr, positionArr} from '@public/selectArr';
import {checkBusinessNumber} from '@modules/checkValidity';
import {autoCompanyHypen, autoCorporationHypen, autoDealerHypen, formattedDate} from '@modules/replaceStrings';
import signUpPartnerApi from '@api/auth/signUpPartnerApi';
import authenticateDealerApi from '@api/auth/authenticateDealerApi';
import Select from '@components/atoms/Select';
import PostCodePopup from '@container/auth/PostCodePopup';
import ButtonNew from '@components/atoms/ButtonNew';
import {StyledInputValidation, StyledInputValidationSuccess} from '@components/atoms/Input';
import {Dialog} from '@components/organisms';
import theme from 'public/theme';
import Button from '@components/atoms/Button';
import certificationCorporationApi from '@api/auth/certificationCorporationApi';

const Step2 = ({...props}) => {
  const [representativeName, onChangeRepresentativeName] = useInput(''); // 대표자명
  const [corporationNumber, setCorporationNumber] = useState(''); // 법인번호
  const [businessNumber, setBusinessNumber] = useState(''); // 사업자등록번호
  const [startDate, setStartDate] = useState<any>(null); // 개업연월일
  const [address, setAddress] = useState(''); // 매매상사 주소
  const [detailAddress, onChangeDetailAddress] = useInput(''); // 상세 주소
  const [dealersAssociationType, setDealersAssociationType] = useState<any>(0); // 소속매매조합
  const [corporationType, setCorporationType] = useState<number | string>(0); // 법인유형
  const [position, setPosition] = useState(0); // 종사원 구분
  const [dealerNum, setDealerNum] = useState(''); // 사원 번호
  const [vehicleLedgerOwnerName, onChangeVehicleLedgerOwnerName] = useInput(''); // 대표 차량 소유주명
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [corporationId, setCorporationId] = useState(''); // 법인(상사) 아이디
  const [dealerId, setDealerId] = useState(''); // 딜러 아이디
  const [zipCode, setZipCode] = useState(''); // 매매상사 우편번호
  const [corporationResult, setCorporationResult] = useState<any>(null); // 소속법인 인증
  const [dealerResult, setDealerResult] = useState<any>(null); // 종사원 인증
  const [dialogAlert, setDialogAlert] = useState<number | undefined>(undefined);
  const [dialogText, setDialogText] = useState('');
  const [loadCorporation, setLoadCorporation] = useState(false);
  const [loadDealer, setLoadDealer] = useState(false);
  const envState = process.env.NEXT_PUBLIC_NAME;

  const {name, id} = props.user;
  const [dealerName, onChangeDealerName] = useInput(name); // 사원명
  const identityAuthenticationId = id; // 본인인증 아이디

  const Title = useCallback(
    (val: string) => (
      <Text size={'md'} mb={'20px'} weight={'4'}>
        {val}
      </Text>
    ),
    []
  );

  const handleChangeDealersAssociationType = useCallback(
    (event: any) => {
      setDealersAssociationType(event.target.value);
      const result = autoDealerHypen(dealerNum, event.target.value);
      // console.info('result', result);
      setDealerNum(result);
    },
    [dealerNum]
  );

  const handleChangeCorporationType = useCallback(
    (event: any) => {
      setCorporationType(event.target.value);
      if (event.target.value === 'PRIVATE') setCorporationNumber('');
    },
    [dealerNum]
  );

  const handleChangePosition = useCallback((event: any) => {
    setPosition(event.target.value);
  }, []);

  const handleChangeAddress = useCallback((full: string, zip: string) => {
    setAddress(full);
    setZipCode(zip);
  }, []);

  // 팝업창 열기
  const openPostCode = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  // 팝업창 닫기
  const closePostCode = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const onChangeCorporationNumber = useCallback((value) => {
    const result = autoCorporationHypen(value.target.value);
    setCorporationNumber(result);
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

  const ClickCorporation = useCallback(() => {
    const typeCheckNum = Number(businessNumber.substring(4, 6));
    if (typeCheckNum === 80 || typeCheckNum === 89) {
      setDialogText('가입 대상이 아닙니다.');
      setDialogAlert(1);
    } else if (corporationType === 'PRIVATE' && typeCheckNum < 89 && typeCheckNum > 80) {
      setDialogText(' 해당 사업자는 법인사업자 입니다. 법인 유형이 자동으로 변경됩니다');
      setDialogAlert(1);
      setCorporationType('CORPORATION');
    } else if (corporationType === 'CORPORATION' && (typeCheckNum < 80 || typeCheckNum > 89)) {
      setDialogText(' 해당 사업자는 개인사업자 입니다. 법인 유형이 자동으로 변경됩니다');
      setDialogAlert(1);
      setCorporationType('PRIVATE');
    } else if (
      representativeName &&
      businessNumber &&
      startDate &&
      corporationType &&
      ((corporationType === 'CORPORATION' && corporationNumber) || corporationType === 'PRIVATE')
    ) {
      if (checkBusinessNumber(businessNumber)) {
        setLoadCorporation(true);
        const startDateValue = formattedDate(startDate).replaceAll('-', '');
        const query = {
          representativeName,
          businessNumber,
          startDate: startDateValue,
          corporationType,
          corporationNumber: corporationNumber.replaceAll('-', '')
        };
        certificationCorporationApi(query).then((res: any) => {
          setLoadCorporation(false);
          if (res) {
            if (res?.certificationCorporation?.id) {
              setCorporationId(res?.certificationCorporation?.id);
              setCorporationResult(true);
            } else {
              setDialogText(res?.errors[0]?.message);
              setDialogAlert(1);
              setCorporationResult(false);
            }
          } else {
            setDialogText('문의바랍니다.');
            setDialogAlert(1);
          }
        });
      } else {
        setDialogText('사업자등록번호를 올바르게 입력하세요.');
        setDialogAlert(1);
      }
    } else {
      setDialogText('법인유형, 법인번호(법인사업자), 대표자명, 사업자등록번호, 개업일시를 입력하세요.');
      setDialogAlert(1);
    }
  }, [representativeName, businessNumber, startDate, corporationType, corporationNumber]);

  const ClickDealerAuth = useCallback(() => {
    if (dealersAssociationType !== 0 && dealerName && dealerNum) {
      setLoadDealer(true);
      const query = {
        dealersAssociationType,
        dealerName,
        dealerNum
      };
      authenticateDealerApi(query).then((res) => {
        setLoadDealer(false);
        if (res) {
          if (res?.errors) {
            setDialogText(res?.errors[0]?.message);
            setDialogAlert(1);
            setDealerResult(false);
          } else {
            setDealerId(res?.authenticateDealer?.id);
            setDealerResult(true);
          }
        } else {
          setDialogText('문의바랍니다.');
          setDialogAlert(1);
        }
      });
    } else {
      setDialogText('소속매매조합, 사원증 번호를 입력하세요.');
      setDialogAlert(1);
    }
  }, [dealersAssociationType, dealerName, dealerNum]);

  const clickNextBtn = useCallback(() => {
    if (corporationId) {
      if (dealerId) {
        if (address && detailAddress && identityAuthenticationId && position !== 0 && zipCode) {
          const query = {
            address,
            corporationId,
            dealerId,
            detailAddress,
            identityAuthenticationId,
            position,
            vehicleLedgerOwnerName,
            zipCode
          };
          signUpPartnerApi(query).then((res) => {
            if (res) {
              if (res?.errors) {
                setDialogText(res?.errors[0]?.message);
                setDialogAlert(1);
              } else {
                props.setStepNum(2);
              }
            } else {
              setDialogText('문의바랍니다.');
              setDialogAlert(1);
            }
          });
        } else {
          setDialogText('값을 모두 입력하세요.');
          setDialogAlert(1);
        }
      } else {
        setDialogText('딜러 인증을 하세요.');
        setDialogAlert(1);
      }
    } else {
      setDialogText('소속법인 인증을 하세요.');
      setDialogAlert(1);
    }
  }, [address, corporationId, dealerId, detailAddress, identityAuthenticationId, position, vehicleLedgerOwnerName, zipCode]);

  return (
    <>
      {dialogAlert && (
        <Dialog title="알림" dialogOpen={dialogAlert} setDialogClose={setDialogAlert}>
          {dialogText}
        </Dialog>
      )}
      {/*  FIXME : 소속법인 인증 후 값 수정시 처리? 인증 -> disable? */}
      <Wrapper left width={'400px'} margin={'40px auto'}>
        <Wrapper mb={30}>
          {Title('소속법인 인증')}
          <Wrapper flex left h justifyContent={'space-between'} mb={2}>
            <Wrapper flexNum={1}>
              <Select value={corporationType} onChange={handleChangeCorporationType} placeholder={'법인 유형'} options={corporationTypeArr} />
            </Wrapper>
          </Wrapper>
          {corporationType === 'CORPORATION' && (
            <Wrapper mb={2}>
              <Wrapper flexNum={1}>
                <Input placeholder="법인 번호" value={corporationNumber} color={'white'} onChange={onChangeCorporationNumber} />
              </Wrapper>
            </Wrapper>
          )}
          <Wrapper flex left h justifyContent={'space-between'} mb={2}>
            <Wrapper flexNum={1}>
              <Input placeholder="대표자명" value={representativeName} color={'white'} onChange={onChangeRepresentativeName} />
            </Wrapper>
          </Wrapper>
          <Wrapper mb={2}>
            <Wrapper flexNum={1}>
              <Input placeholder="사업자 등록번호" value={businessNumber} color={'white'} onChange={onChangeBusinessNumber} />
            </Wrapper>
          </Wrapper>
          <Wrapper mb={2} left h justifyContent={'space-between'} position={'relative'}>
            <Wrapper backgroundColor={'white'}>
              <Input type="calendar" placeholder={'개업연월일'} date={startDate} setDate={setStartDate} width={'400px'} height={'50px'} paddingRight={'60px'} />
            </Wrapper>
          </Wrapper>
          <Wrapper flexNum={1} mb={2} p="0px 1px">
            {/* <ButtonNew children={'인증'} line flex onClick={ClickCorporation} /> */}
            <Button loadingDialog={loadCorporation} type="squareButtonBlue" onClick={() => ClickCorporation()}>
              인증
            </Button>
          </Wrapper>
          {corporationResult !== null ? (
            <Wrapper mb={20}>
              {corporationResult ? <StyledInputValidationSuccess>인증 완료</StyledInputValidationSuccess> : <StyledInputValidation>인증 실패</StyledInputValidation>}
            </Wrapper>
          ) : null}
          <Wrapper mb={2} mt={4} left h justifyContent={'space-between'}>
            <Wrapper flexNum={0.75}>
              <Input placeholder="매매상사 주소" value={address} color={'white'} disabled />
            </Wrapper>
            <Wrapper flexNum={0.23}>
              <AddressButton onClick={openPostCode}>
                <Wrapper w h>
                  <Text size={'xs'}>주소찾기</Text>
                </Wrapper>
              </AddressButton>
              {isPopupOpen && (
                <>
                  <PostCodePopup closePostCode={closePostCode} handleChangeAddress={handleChangeAddress} />
                </>
              )}
            </Wrapper>
          </Wrapper>
          <Wrapper mb={2}>
            <Wrapper flexNum={1}>
              <Input placeholder="상세주소 입력" value={detailAddress} color={'white'} onChange={onChangeDetailAddress} />
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper mb={30}>
          {Title('딜러 인증')}
          <Wrapper left h mb={2}>
            <Wrapper flexNum={1}>
              <Select value={dealersAssociationType} onChange={handleChangeDealersAssociationType} placeholder={'소속 매매 조합'} options={dealersAssociationTypeArr} />
            </Wrapper>
          </Wrapper>
          <Wrapper left h mb={2}>
            <Wrapper flexNum={1}>
              <Select value={position} onChange={handleChangePosition} placeholder={'회원 구분'} options={positionArr} />
            </Wrapper>
          </Wrapper>
          <Wrapper left h mb={2}>
            <Wrapper flexNum={1}>
              <Input value={dealerName} onChange={onChangeDealerName} disabled={envState === 'PRODUCTION'} />
            </Wrapper>
          </Wrapper>
          <InfoText>※ 사원명은 회원가입 시 본인인증하신 이름과 동일해야 합니다.</InfoText>
          <Wrapper left h justifyContent={'space-between'} mb={2}>
            <Wrapper flexNum={0.82}>
              <Input placeholder="딜러 번호" value={dealerNum} color={'white'} onChange={onChangeDealerNum} />
            </Wrapper>
            <Wrapper flexNum={0.16}>
              {/* <ButtonNew children={'인증'} line flex onClick={ClickDealerAuth} /> */}
              <Button loadingDialog={loadDealer} type="squareButtonWhite" onClick={() => ClickDealerAuth()}>
                인증
              </Button>
            </Wrapper>
          </Wrapper>
          <InfoText>※ 본 정보는 딜러 여부 확인을 위해 보관됩니다.</InfoText>
          {dealerResult !== null ? (
            <Wrapper mb={2}>
              {dealerResult ? <StyledInputValidationSuccess>인증 완료</StyledInputValidationSuccess> : <StyledInputValidation>인증 실패</StyledInputValidation>}
            </Wrapper>
          ) : null}
        </Wrapper>

        <Wrapper mb={30}>
          {Title('기타')}
          <Wrapper mb={2}>
            <Wrapper flexNum={1}>
              <Input placeholder="대표 차량 소유주명" value={vehicleLedgerOwnerName} color={'white'} onChange={onChangeVehicleLedgerOwnerName} />
            </Wrapper>
            <InfoText>
              ※ 소속 매매상사 차량의 차동차등록원부 상 소유주명을 의미합니다.
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;미리 입력해두시면 보다 편리하게 매물등록을 할 수 있습니다.
            </InfoText>
          </Wrapper>
        </Wrapper>
        <Wrapper left width={'400px'} margin={'40px auto'}>
          <Wrapper flex>
            <Wrapper flexNum={1} mr={'4px'}>
              <ButtonNew white flex large arrowLeft onClick={() => props.setStepNum(0)}>
                이전
              </ButtonNew>
            </Wrapper>
            <Wrapper flexNum={1} ml={'4px'}>
              <ButtonNew flex large arrowRight onClick={() => clickNextBtn()}>
                다음
              </ButtonNew>
            </Wrapper>
          </Wrapper>
          <InfoText>※ 소속법인 인증 인증완료, 딜러 인증 완료 시에만 다음 단계로 진행할 수 있습니다.</InfoText>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default memo(Step2);

const AddressButton = styled.button<any>`
  width: 100%;
  height: 49px;
  background-color: ${theme.color.white};
  border: 1px solid #e2e6ee;
  border-radius: 3px;
  cursor: pointer;
`;

const InfoText = styled.p<any>`
  font-family: 'SpoqaHanSansNeo-light';
  margin: 8px 0;
  font-size: 12px;
  color: #93969f;
  line-height: 18px;
`;
