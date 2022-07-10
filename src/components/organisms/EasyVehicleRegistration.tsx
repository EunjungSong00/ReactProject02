import {Text, Input, Button, Wrapper} from '@components/atoms';
import {Section} from '@components/molecules';
import styled from '@emotion/styled';
import useInput from '@modules/hooks/useInput';
import {useState, useEffect, KeyboardEvent, useCallback, ReactElement} from 'react';
import registerVehicle from '@api/vehicle/registerVehicleApi';
import {useRouter} from 'next/router';
import {filterVehicleSort, formattedDate} from '@modules/replaceStrings';
import FakeInput from '@components/atoms/FakeInput';
import {parseCookies} from 'nookies';
import Popup, {PopupType} from './Popup';
import Toast from './Toast';

const EasyVehicleRegistration = (): ReactElement => {
  const [carNumber, onChangeCarNumber] = useInput(''); // 간편차량등록
  const [carNo, onChangeCarNo] = useInput(''); // 보유차량조회
  const [ownerName, , setOwnerName] = useInput('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cookies = parseCookies();
  const user = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const isRegularMember = user?.level === 'REGULAR';
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const [errprPopupContent, setErrprPopupPopupContent] = useState<PopupType>(undefined);
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    const user: any = localStorage.getItem('user');
    setOwnerName(JSON.parse(user)?.vehicleLedgerOwnerName);
  }, []);

  const onClickReg = async () => {
    if (carNumber) {
      setLoading(true);
      const filterVehicleSortMessage = filterVehicleSort(carNumber);
      if (!filterVehicleSortMessage) {
        const result = await registerVehicle({number: carNumber, ownerName});
        if (result.registerVehicle?.id) {
          setPopupContent('등록이 완료되었습니다.');
        } else if (result?.errors[0]?.message?.includes('소유자') || result?.errors[0]?.message?.includes('소유주')) {
          setPopupContent('차량의 소유주명과 대표 차량 소유주명이 달라, 조회가 불가합니다. 대표 차량 소유주명을 수정하신 후에 조회해주시기 바랍니다. 소유주명을 변경하시겠습니까?');
        } else {
          setPopupContent(result?.errors[0]?.message);
        }
      } else {
        setToast(filterVehicleSortMessage);
      }

      setLoading(false);
    } else {
      setPopupContent('차량 번호를 입력해주세요');
    }
  };

  const onClickSearch = async () => {
    if (carNo) {
      router.push(`/vehicle-management/registration?keyword=${carNo}`);
    } else {
      setPopupContent('차량 번호를 입력해주세요');
    }
  };

  const regByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickReg();
  };

  const searchByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickSearch();
  };

  const onClickPopupEnter = () => {
    if (popupContent === '등록이 완료되었습니다') {
      setPopupContent(undefined);
      router.push('/vehicle-management/registration');
    } else if (
      typeof popupContent === 'string' &&
      popupContent === '차량의 소유주명과 대표 차량 소유주명이 달라, 조회가 불가합니다. 대표 차량 소유주명을 수정하신 후에 조회해주시기 바랍니다. 소유주명을 변경하시겠습니까?'
    ) {
      setPopupContent(undefined);
      router.push('/vehicle-management/registration?editOwner=true');
    } else {
      setPopupContent(undefined);
    }
  };

  const pushToRecentSaled = useCallback(() => {
    const now = new Date();
    const ago = new Date(new Date().setMonth(new Date().getMonth() - 1));
    router.push(`/vehicle-management/sales-completion?start=${formattedDate(ago)}&end=${formattedDate(now)}`);
  }, [router]);

  return (
    <>
      <Wrapper
        onClick={() => {
          if (!isRegularMember) {
            setErrprPopupPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?');
          }
        }}
        // style={{pointerEvents: isRegularMember ? 'all' : 'none'}}
      >
        <Wrapper column>
          {/* <Wrapper column style={{pointerEvents: isRegularMember ? 'all' : 'none'}}> */}
          <Section h justifyContent="space-between" mb="10px">
            <Wrapper h width="42%">
              <Text pr={15}>간편차량등록</Text>
              <Input
                type="roundInput"
                width="48%"
                minWidth="180px"
                mr={10}
                placeholder="예) 12가1234"
                maxLength={8}
                value={carNumber}
                onKeyPress={regByEnter}
                onChange={onChangeCarNumber}
              />
              <Button type="roundButton" width="66px" children="등록" onClick={onClickReg} loadingDialogMessage="차량 정보를 불러오는 중입니다" loadingDialog={loading} />
            </Wrapper>
            <Wrapper h width="42%" display="flex">
              <Text pr={15}>보유차량조회</Text>
              <Input
                type="roundInputSearch"
                width="48%"
                minWidth="180px"
                mr={10}
                placeholder="차량번호 또는 모델명"
                value={carNo}
                onChange={onChangeCarNo}
                onKeyPress={searchByEnter}
                maxLength={20}
              />
              <Button type="roundButton" width="66px" children="조회" onClick={onClickSearch} />
              {/* 아이디/비밀번호 자동완성때문에 보유차량조회 input에 아이디가 입력되는 버그 CARMERCE-585 */}
              <FakeInput />
            </Wrapper>
            <Wrapper h width="16%" display="flex" style={{cursor: 'pointer'}} onClick={pushToRecentSaled}>
              <Icon />
              <Text pl={10}>최근판매차량</Text>
            </Wrapper>
          </Section>
          <Popup
            title={popupContent && popupContent.toString().includes('달라') ? '소유주명 불일치' : '알림'}
            content={popupContent}
            height={typeof popupContent === 'string' && popupContent.includes('소유주명') ? '205px' : undefined}
            setContent={setPopupContent}
            onClickPopupEnter={onClickPopupEnter}
            disableClose={popupContent === '등록이 완료되었습니다'}
          />
        </Wrapper>
      </Wrapper>
      <Popup
        title="추가인증이 필요합니다"
        content={errprPopupContent}
        setContent={setErrprPopupPopupContent}
        okText="인증"
        cancelText="닫기"
        onClickPopupEnter={() => router.push('/auth')}
      />
      <Toast toast={toast} setToast={setToast} type="error" />
    </>
  );
};
export default EasyVehicleRegistration;

const Icon = styled.span`
  display: inline-block;
  position: relative;
  width: 28px;
  height: 18px;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: -3px;
    left: 0;
    width: 28px;
    height: 26px;
    background: url(/images/icon-sell@2x.png) no-repeat;
    background-size: contain;
  }
`;
