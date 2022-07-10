import {useEffect, useState, KeyboardEvent, useRef, ReactElement} from 'react';
import {Text, Input, Wrapper, Button, Line, Image} from '@components/atoms';
import {Accordion} from '@components/molecules';
import styled from '@emotion/styled';
import theme from '@public/theme';
import useInput from '@modules/hooks/useInput';
import registerVehicle from '@api/vehicle/registerVehicleApi';
import Dialog from '@components/organisms/Dialog';
import {useRouter} from 'next/router';
import upsertVehicleLedgerOwnerNameApi from '@api/mypage/upsertVehicleLedgerOwnerNameApi';
import Cookies from 'js-cookie';
import Popup, {PopupType} from '@components/organisms/Popup';
import Section from '@components/molecules/Section';
import {parseCookies} from 'nookies';
import Toast from '@components/organisms/Toast';
import {filterVehicleSort} from '@modules/replaceStrings';

const _QuickRegist = (): ReactElement => {
  const [carNo, onChangeCarNo, setCarNo] = useInput('');
  const [ownerName, onChangeOwnerName, setOwnerName] = useInput('');
  const [loadingReg, setLoadingReg] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const [dialogContent, setDialogContent] = useState('');
  const [ownerError, setOwnerError] = useState(false);
  const [enableReg, setEnableReg] = useState(true);
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const router = useRouter();
  const ownerNameRef: any = useRef(null);
  const user = Cookies.get('carPartnerUserInfo');
  const JSONUser = user && JSON.parse(user);
  const [toast, setToast] = useState<string>('');
  const [carNoGroup, onChangeCarNoGroup, setCarNoGroup] = useInput('');
  const [successToast, setSuccessToast] = useState<string>('');

  useEffect(() => {
    router.query.editOwner && setOwnerError(true);
    router.query.editOwner && ownerNameRef.current && ownerNameRef.current.focus();
  }, []);

  useEffect(() => {
    setOwnerName(JSONUser.vehicleLedgerOwnerName);
    setCarNo('');
  }, []);

  useEffect(() => {
    loadingSave || loadingReg || (dialogContent ? (dialogContent === '등록이 완료되었습니다.' ? setDialogNum(1) : setDialogNum(2)) : setDialogNum(undefined));
  }, [loadingSave, loadingReg]);

  useEffect(() => {
    ownerError ? setEnableReg(false) : setEnableReg(true);
  }, [ownerError]);

  useEffect(() => {
    // const user: any = localStorage.getItem('user');
    const cookies = parseCookies();
    const user = cookies?.carPartnerUserInfo;
    JSON.parse(user)?.vehicleLedgerOwnerName === ownerName ? setEnableReg(true) : setEnableReg(false);
  }, [ownerError, ownerName, carNo]);

  const onClickReg = async () => {
    if (carNo && ownerName) {
      setLoadingReg(true);
      setOwnerError(false);
      const filterVehicleSortMessage = filterVehicleSort(carNo);
      if (!filterVehicleSortMessage) {
        const result = await registerVehicle({number: carNo, ownerName});
        result.registerVehicle?.id ? setDialogContent('등록이 완료되었습니다.') : setDialogContent(result?.response?.errors[0]?.message);
        !result.registerVehicle?.id && (result?.errors[0]?.message?.includes('소유주') || result?.errors[0]?.message?.includes('소유자'))
          ? setOwnerError(true)
          : setOwnerError(false);
        !result.registerVehicle?.id && setDialogContent(result?.errors[0]?.message);
      } else {
        setToast(filterVehicleSortMessage);
      }
      setLoadingReg(false);
    } else {
      setOwnerError(true);
      carNo || setDialogContent('등록할 차량번호를 입력해주세요');
      ownerName || setDialogContent('대표차량 소유주명을 입력해주세요');
      setDialogNum(1);
    }
  };

  const onClickRegGroup = async () => {
    console.info('일괄 등록');
    carNoGroup.split(' ').forEach(async (car: string) => {
      // console.log('car,ownerName', car, ownerName);
      if (car && ownerName) {
        setLoadingReg(true);
        setOwnerError(false);
        const filterVehicleSortMessage = filterVehicleSort(car);
        filterVehicleSort(car) && console.error('     등록 실패', car, filterVehicleSort(car));
        if (!filterVehicleSortMessage) {
          const result = await registerVehicle({number: car, ownerName});
          result?.registerVehicle?.id ? console.info('  등록 성공', car) : console.error('     등록 실패', car, result?.errors[0]?.message);
          result?.registerVehicle?.id ? setSuccessToast('등록이 완료되었습니다.') : setToast(result?.errors[0]?.message);
          !result.registerVehicle?.id && (result?.errors[0]?.message?.includes('소유주') || result?.errors[0]?.message?.includes('소유자'))
            ? setOwnerError(true)
            : setOwnerError(false);
          !result.registerVehicle?.id && setDialogContent(result?.errors[0]?.message);
          // if (result.registerVehicle?.id) i += 1;
        } else {
          setToast(filterVehicleSortMessage);
        }
        setLoadingReg(false);
      } else {
        setOwnerError(true);
        carNo || setDialogContent('등록할 차량번호를 입력해주세요');
        ownerName || setDialogContent('대표차량 소유주명을 입력해주세요');
        setDialogNum(1);
      }
    });
  };

  const onChangeOwnerNameCheck = (e: any) => {
    onChangeOwnerName(e);
  };

  const onChangeCarNoCheck = (e: any) => {
    onChangeCarNo(e);
  };

  const onClickSave = async () => {
    if (ownerName) {
      if (JSONUser.vehicleLedgerOwnerName === ownerName) {
        setDialogContent('대표차량 소유주명을 변경해주세요.');
        setDialogNum(1);
      } else {
        setLoadingSave(true);
        const upsertVehicleLedgerOwnerName = await upsertVehicleLedgerOwnerNameApi(ownerName);
        if (upsertVehicleLedgerOwnerName.upsertVehicleLedgerOwnerName) {
          setDialogContent('저장이 완료되었습니다.');
          JSONUser.vehicleLedgerOwnerName = ownerName;
          Cookies.set('carPartnerUserInfo', JSON.stringify(JSONUser));
          setEnableReg(true);
        } else {
          // console.log('upsertVehicleLedgerOwnerName', upsertVehicleLedgerOwnerName);
          setDialogContent(upsertVehicleLedgerOwnerName?.errors[0]?.message);
        }
        setLoadingSave(false);
      }
    } else {
      setOwnerError(true);
      setDialogContent('대표차량 소유주명을 입력해주세요');
      setDialogNum(1);
    }
  };

  const regByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickReg();
  };

  const regGroupByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickRegGroup();
  };

  const saveByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickSave();
  };

  const drawer = (
    <Wrapper height={110 + (ownerError ? 15 : 0)}>
      <Line mt={20} />
      <Wrapper h mt={20}>
        <Wrapper width="123px" mr="8px">
          <Text>대표차량 소유주명</Text>
        </Wrapper>
        <Input
          mr="10px"
          value={ownerName}
          ref={ownerNameRef}
          onChange={onChangeOwnerNameCheck}
          type="squareInputLarge"
          width="254px"
          placeholder="예) 오토허브*상품용"
          onKeyPress={saveByEnter}
          tabIndex={-1}
        />
        <Button
          mr="10px"
          type="squareButtonBlue"
          width="92px"
          children="저장"
          loadingDialogMessage="대표차량 소유주명을 저장하는 중입니다"
          onClick={onClickSave}
          loadingDialog={loadingSave}
          tabIndex={-1}
        />
        <Button mr="10px" type="squareButtonWhite" width="92px" children="예시보기" onClick={() => setPopupContent(exampleImg)} tabIndex={-1} />
      </Wrapper>
      <Text type="sectionInfo" mt={15}>
        * 자동차등록원부 상 자주 사용하시는 소유주명을 입력해주시기 바랍니다
      </Text>
      {ownerError && (
        <Text type="sectionInfo" mt={'5px'} color="#ff6a6a !important">
          * 차량의 소유주명과 대표 차량 소유주명이 달라, 조회가 불가합니다. 대표 차량 소유주명을 수정하신 후에 조회해주시기 바랍니다
        </Text>
      )}
    </Wrapper>
  );

  const exampleImg = () => (
    <Wrapper width="100%" height="100%" h column>
      <Text ml="23px" mr="auto" mb="10px" size="16px" type="sectionTableHeader">
        소속 상사에서 주로 사용하시는 빨간색 박스 내 최종 소유주명을 입력해주세요.
      </Text>
      <Image width="700px" height="460px" src="/images/owner_name_example.png" />
    </Wrapper>
  );

  return (
    <>
      <_Section>
        <Text weight="3" size="42px" pt={15}>
          매입 차량 <span style={{fontFamily: theme.font['5']}}>간편하게 등록</span>하세요!
        </Text>
        <Text size={theme.fontSize.sm} color={theme.color.darkgray} mt={30} lineHeight="28px">
          카머스 IMS를 이용하시면 자동차등록원부 상 정보를 바탕으로,
          <br />
          매입하신 차량의 제원, 옵션 등 다양한 정보가 자동으로 입력됩니다.
        </Text>
        <Text size={theme.fontSize.sm} color={theme.color.black} mt={30}>
          클릭 한 번으로 매물 리스팅이 가능하도록 도와주는 카머스 IMS에서 차량을 등록해보세요
        </Text>
        <Wrapper h mt={50} mb={20}>
          <Wrapper mr="8px" width="123px">
            <Text>차량번호</Text>
          </Wrapper>
          <Input mr="10px" maxLength={8} onKeyPress={regByEnter} value={carNo} onChange={onChangeCarNoCheck} type="squareInputLarge" width="254px" placeholder="예) 11하3342" />
          <Button
            mr="10px"
            loadingDialog={loadingReg}
            width="92px"
            height="50px"
            children="등록"
            onClick={() => (enableReg ? onClickReg() : {})}
            type={enableReg ? 'squareButtonBlue' : 'disable'}
            loadingDialogMessage="차량 정보를 불러오는 중입니다"
          />
        </Wrapper>
        {(process.env.NEXT_PUBLIC_DOMAIN?.includes('dev') || process.env.NEXT_PUBLIC_DOMAIN?.includes('localhost')) && (
          <Wrapper h mt={10} mb={20}>
            <Wrapper mr="8px" width="123px">
              <Text>일괄 등록</Text>
            </Wrapper>
            <Input
              mr="10px"
              maxLength={1000}
              onKeyPress={regGroupByEnter}
              value={carNoGroup}
              onChange={onChangeCarNoGroup}
              type="squareInputLarge"
              width="254px"
              placeholder="예) 11하3342 22하3456 44하7890..."
            />
            <Button
              mr="10px"
              loadingDialog={loadingReg}
              width="92px"
              height="50px"
              children="등록"
              // onClick={() => (enableReg ? onClickReg() : {})}
              onClick={() => onClickRegGroup()}
              type={enableReg ? 'squareButtonBlue' : 'disable'}
              loadingDialogMessage="차량 정보를 불러오는 중입니다"
            />
          </Wrapper>
        )}
        <Text type="sectionInfo" mt={15} mb={20}>
          * 원부 상 소유주명이 상호명(상품용), 상호명*상품용… 인 경우 차량번호 입력 만으로 등록 가능합니다 <br />* 소유주명이 위 형식과 다를 경우, 우측의 대표 차량 소유주명 등록
          기능을 사용해주세요
        </Text>
        <Accordion title="소유주명 저장" content={drawer} className={'vehicle-registration-accordion'} openTrigger={ownerError} />
        {/* <Button onClick={() => router.replace('/vehicle-management/registration')} /> */}
      </_Section>
      {(dialogNum || dialogNum === 0) && (
        <Dialog
          title="알림"
          dialogOpen={dialogNum}
          setDialogClose={setDialogNum}
          onClickDialogEnter={() => {
            if (dialogContent === '등록이 완료되었습니다.') {
              router.asPath === '/vehicle-management/registration' ? router.reload() : router.push('/vehicle-management/registration', undefined, {shallow: true});
              setDialogNum(undefined);
            } else {
              setDialogNum(undefined);
            }
          }}
          disableClose
        >
          {dialogContent}
        </Dialog>
      )}
      {
        <Popup
          title="대표 차량 소유주명 등록 값 예시"
          content={popupContent}
          setContent={setPopupContent}
          width="800px"
          height="630px"
          onClickPopupEnter={() => setPopupContent(undefined)}
        />
      }
      <Toast toast={successToast} setToast={setSuccessToast} type="success" />
      <Toast toast={toast} setToast={setToast} type="error" />
    </>
  );
};

export default _QuickRegist;

const _Section = styled(Section)`
  padding: 25px 30px;
  background: #fff;
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    width: 212px;
    height: 161px;
    position: absolute;
    right: 30px;
    top: 25px;
    background: url(/images/icon-car.svg) no-repeat;
    background-size: contain;
  }

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  .vehicle-registration-accordion .accordion-head {
    width: 180px;
    float: right;
  }

  .vehicle-registration-accordion .accordion-body {
    padding-bottom: 12px;
  }
`;
