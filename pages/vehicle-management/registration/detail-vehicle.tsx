import React, {useEffect, useState, useCallback, useRef} from 'react';
import {GetServerSideProps} from 'next';
import {observer, inject} from 'mobx-react';
import getVehicleInventoryDetailApi from '@api/vehicle/getVehicleInventoryDetailApi';
import {
  formattedDate,
  getCommas,
  getOnlyNumber,
  getOnlyNumberDot,
  graphQLClientMultipleRequest,
  onReplaceDrivenWheels,
  onReplaceFuelTypeA,
  onReplaceTransmissionType
} from '@modules/replaceStrings';
import Section from '@components/molecules/Section';
import theme from '@public/theme';
import {Wrapper, Line, Select, Input, Txt, Image, Btn} from '@components/atoms';
import InputUnit from '@components/atoms/InputUnit';
import {CalendarWrapper} from '@components/atoms/Input';
import DatePicker from 'react-datepicker';
import {parseCookies} from 'nookies';
import useInput from '@modules/hooks/useInput';
import getJatoDetail from '@api/vehicle/getJatoDetailApi';
import {getTotalCost2} from '@modules/calculateCosts';
import {useRouter} from 'next/router';
import {Toast} from '@components/organisms';
import styled from '@emotion/styled';
import temporarySaveApi from '@api/vehicle/temporarySaveApi';
import previewVehicleApi from '@api/vehicle/previewVehicleApi';
import getCorporationPartnerApi from '@api/vehicle/getCorporationPartnerApi';
import getTrimListApi from '@api/vehicle/getTrimListApi';
import deleteVehicleApi from '@api/vehicle/deleteVehicleApi';
import usePopup from '@hooks/usePopup';
import DetailVehiclePerformance from '@components/organisms/DetailVehiclePerformance';
import VehicleRegPopup from '@components/organisms/VehicleRegPopup';
import saleRegistration from '@api/vehicle/saleRegistration';
import updateVehicleSaleHoldStatusApi from '@api/vehicle/updateVehicleSaleHoldStatusApi';
import getVehicleInspectionRecordApi from '@api/vehicle/getVehicleInspectionRecordApi';
import Button from '@components/atoms/Button';
import PostCodePopup from '@container/auth/PostCodePopup';
// import AccidentHistoryPopup from '@container/vehicle-management/detail-vehicle/Center/AccidentHistoryPopup';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.query.id);
  const getGql = true;
  const response = await graphQLClientMultipleRequest(
    [getVehicleInventoryDetailApi(id, {getGql}), getCorporationPartnerApi({getGql}), getTrimListApi(id, {getGql}), getVehicleInspectionRecordApi(id, {getGql})],
    context
  );
  // console.log('response', response.props.response.getVehicleInventoryDetail);
  return response;
};

const INPUT_WIDTH = '100%';
const INPUT_HEIGHT = '42px';
interface IRowItem {
  title: string;
  contentTxt?: string;
  first?: boolean;
  children?: any;
  large?: boolean;
  colSpan?: number;
  font?: string;
  color?: string;
}
const financialExpensesType = [
  {
    value: 'FINANCE',
    label: '????????? ??????'
  },
  {
    value: 'COMPANY',
    label: '?????? ??????'
  }
];

function RowItem({title, contentTxt, first, children, large, colSpan, font, color}: IRowItem) {
  return (
    <>
      <th
        style={{
          width: '142px',
          background: '#f9fafa',
          borderRight: '1px inset #d8d8d8',
          borderLeft: !first ? '1px solid #d8d8d8' : '',
          height: `${large ? '70px' : '42px'}`,
          verticalAlign: 'middle',
          textAlign: 'left',
          fontSize: '14px',
          paddingLeft: '15px',
          color: '#444444',
          fontFamily: 'SpoqaHanSansNeo-Regular'
        }}
      >
        {title}
      </th>
      <td
        colSpan={colSpan}
        style={{
          color: color || theme.color[3],
          padding: '0 10px',
          verticalAlign: 'middle',
          fontSize: '14px',
          fontFamily: font || theme.font.regular
        }}
      >
        {!contentTxt ? children : contentTxt}
      </td>
    </>
  );
}

function Row({top, children}: {top?: boolean; children?: any}) {
  return <tr style={{borderBottom: '1px inset #d8d8d8', borderTop: `${top ? '1px solid #d8d8d8' : ''}`}}>{children}</tr>;
}

function DetailVehicle(props: any) {
  const router = useRouter();
  const cookies = parseCookies();
  const now = new Date();
  const user = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const corporationPartner = props?.pageProps?.response?.getCorporationPartner;
  const [exchageAmount, setExchageAmount] = useState(0);
  const [sheetMetalAmount, setSheetMetalAmount] = useState(0);
  const [corrosionAmount, setCorossionAmount] = useState(0);
  const vehicleInspectionRecord = props?.pageProps?.response?.getVehicleInspectionRecord;
  const corrosionArr = vehicleInspectionRecord && getAccidentAmount(vehicleInspectionRecord, 'corrosion');
  const exchangeArr = vehicleInspectionRecord && getAccidentAmount(vehicleInspectionRecord, 'exchange');
  const sheetMetalArr = vehicleInspectionRecord && getAccidentAmount(vehicleInspectionRecord, 'sheetMetal');

  useEffect(() => {
    exchangeArr &&
      exchangeArr.forEach((exchange: string) => {
        if (exchange) {
          setExchageAmount((val) => val + 1);
        }
      });
    sheetMetalArr &&
      sheetMetalArr.forEach((sheetMetal: string) => {
        if (sheetMetal) {
          setSheetMetalAmount((val) => val + 1);
        }
      });
    corrosionArr &&
      corrosionArr.forEach((corrosion: string) => {
        if (corrosion) {
          setCorossionAmount((val) => val + 1);
        }
      });
  }, []);
  const corporationPartners = corporationPartner?.map((item: any) => ({
    label: `${user?.position === 'OWNER' ? item.dealer?.companyName : item.name} ${item.loginId}`,
    value: item.id
  }));
  const trims = props?.pageProps?.response?.getTrimList;
  const res = props?.pageProps?.response;
  const data = res?.getVehicleInventoryDetail;
  const [dealer, setDealer] = useState(data?.partner?.id);
  const inspectionRecordImg = res?.getVehicleInspectionRecord?.inspectionRecordImageList;
  const [inputDisabled, setInputDisabled] = useState<boolean>();
  const jatoDetail = data?.jatoDetail;

  const [financialExpense, setFinancialExpense] = useState<any>([]);

  const [trim, setTrim] = useState(props.pageProps.query.vehicleId);
  const [salePrice, onChangeSalePrice, setSalePrice] = useInput(data?.salePrice || '', 'number');
  const [startDate, setStartDate] = useState<any>(data?.purchaseDate || undefined);
  const [endDate, setEndDate] = useState<any>(data?.saleDate || undefined);
  const [partner, setPartner] = useState(data?.partner?.id);
  const [appearanceType, setAppearanceType] = useState<any>(data?.appearanceType);
  const [purchase, setPurchase] = useState<any>(data?.vehicleInventory?.purchase || '');
  const [transferCost, setTransferCost] = useState<any>(data?.vehicleInventory?.transferCost || '');

  const [mileage, setMileage] = useState(data?.mileage || 0);
  const [parkingLocation, onChangeParkingLocation, setParkingLocation] = useInput(data?.parkingLocation || '');
  const [sheetMetal, onChangeSheetMetal, setSheetMetal] = useInput(data?.vehicleInventory?.sheetMetal, 'number');
  const [inspection, onChangeInspection, setInspection] = useInput(data?.vehicleInventory?.inspection, 'number');
  const [consignment, onChangeConsignment, setConsignment] = useInput(data?.vehicleInventory?.consignment, 'number');
  const [etc, onChangeEtc, setEtc] = useInput(data?.vehicleInventory?.etc, 'number');

  const [modelTrim, setModelTrim] = useState(data?.modelTrim);
  const [factoryPrice, setFactoryPrice] = useState(data?.factoryPrice); // ?????????
  const [transmission, setTransmission] = useState(data?.transmission); // ?????????
  const [fuel, setFuel] = useState(data?.fuel); // ??????
  const [maxPower, setMaxPower] = useState(data?.maxPower); // ?????? ??????
  const [fuelConsumption, setFuelConsumption] = useState(data?.fuelConsumption); // ??????
  const [engineDisplacement, setEngineDisplacement] = useState(data?.engineDisplacement); // ?????????
  const [wheelDrive, setWheelDrive] = useState(data?.wheelDrive); // ??????
  const [apiLoading, setApiLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warn' | 'error'>('warn');
  const [okToast, setOkToast] = useState('');
  const [setPopup, PopupElement] = usePopup();
  const [setAccidentHistoryPopup, AccidentHistoryPopupElement] = usePopup();
  const [deletePopup, setDeletePopup] = useState(false);
  const [saleStatus, setSaleStatus] = useState(data?.status);
  const [isPreview, setIsPreview] = useState(false);
  const [pickupZipCode, setPickupZipCode] = useState(data?.pickupZipCode || user?.corporation?.zipCode || '');
  const [pickupAddress, setPickupAddress] = useState(data?.pickupAddress || user?.corporation?.address || '');
  const [pickupAddressDetail, setPickupAddressDetail] = useState('');
  const [pickupLatitude, setPickupLatitude] = useState();
  const [pickupLongitude, setPickupLongitude] = useState();
  const salePriceRef = useRef<HTMLInputElement>(null);
  const performanceCheckRef = useRef<HTMLInputElement>(null);
  const {asPath} = router;
  const vehicleDetailData = {
    id: data?.id,
    jatoVehicleId: trim.replace('/preview', ''),
    mileage,
    purchaseDate: startDate,
    saleDate: endDate,
    salePrice,
    purchase,
    transferCost,
    parkingLocation,
    sheetMetal,
    inspection,
    consignment,
    etc,
    vehicleFinanceList: financialExpense,
    dealerId: dealer,
    pickupZipCode,
    pickupAddress,
    pickupAddressDetail: parkingLocation,
    pickupLatitude,
    pickupLongitude
  };

  useEffect(() => {
    if (data) {
      const {vehicleFinanceList} = data;
      const list = vehicleFinanceList && vehicleFinanceList.map((item: any) => ({...item, date: new Date(item.date)}));
      if (list) setFinancialExpense(list);
    }
  }, [data?.vehicleFinanceList]);

  useEffect(() => {
    setSaleStatus(data?.status);
    if (data?.status === 'SALE') setInputDisabled(true);
  }, [data?.status]);

  useEffect(() => {
    if (asPath.includes('preview')) {
      setIsPreview(true);
      setInputDisabled(true);
    } else {
      setIsPreview(false);
      setInputDisabled(data?.status !== 'REGISTER' || (data?.partner?.id !== user?.id && user?.position !== 'OWNER'));
    }
  }, [asPath]);

  const onChangeTrimOptions = (response: any) => {
    if (response) {
      const {price, transmission, fuel, maxPower, fuelConsumption, engineDisplacement, wheelDrive} = response.getJatoDetail;
      setFactoryPrice(price);
      setTransmission(transmission);
      setFuel(fuel);
      setMaxPower(maxPower);
      setFuelConsumption(fuelConsumption);
      setEngineDisplacement(engineDisplacement);
      setWheelDrive(wheelDrive);
    }
  };

  const onChangeFinancialType = (e: any, i: number) => {
    const {value} = e.target;
    if (value === 'COMPANY') {
      // console.log('user', user);
      const {companyName} = user?.dealer;
      setFinancialExpense(financialExpense.map((item: any, index: number) => (index === i ? {...item, type: value, company: companyName} : item)));
    } else {
      setFinancialExpense(financialExpense.map((item: any, index: number) => (index === i ? {...item, type: value, company: ''} : item)));
    }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, i?: number) => {
    const {name, value} = e.target;
    if (name === 'company') {
      setFinancialExpense(financialExpense.map((item: any, index: number) => (index === i ? {...item, [name]: value} : item)));
    } else if (name === 'interestRate') {
      setFinancialExpense(financialExpense.map((item: any, index: number) => (index === i ? {...item, [name]: getOnlyNumberDot(e)} : item)));
    } else {
      setFinancialExpense(financialExpense.map((item: any, index: number) => (index === i ? {...item, [name]: getOnlyNumber(e)} : item)));
    }
  };

  const onChangeDatePic = (d: any, index: number) => {
    setFinancialExpense(financialExpense.map((item: any, i: number) => (i === index ? {...item, date: d} : item)));
  };

  const getInterest = (startDate: any, loan: number, interestRate: number) => {
    const date: any = new Date(startDate);
    const difDay: any = Math.floor(Math.abs(+new Date() - date) / (1000 * 3600 * 24));
    const interestCost = Math.round((((loan * interestRate) / 100) * difDay) / 360);
    return interestCost;
  };

  const addCost = () => {
    setFinancialExpense([
      ...financialExpense,
      {
        company: null,
        date: new Date(now.setHours(0, 0, 0)),
        interestRate: 0,
        loan: 0,
        type: 'FINANCE'
      }
    ]);
  };

  const removeCost = (i: number) => {
    setFinancialExpense(financialExpense.filter((item: any, index: number) => index !== i));
  };

  const totalCost = getTotalCost2(
    {
      sheetMetal: Number(getOnlyNumber(sheetMetal) || 0),
      inspection: Number(getOnlyNumber(inspection) || 0),
      consignment: Number(getOnlyNumber(consignment) || 0),
      etc: Number(getOnlyNumber(etc) || 0)
    },
    Number(getOnlyNumber(purchase) || 0),
    Number(getOnlyNumber(transferCost) || 0),
    financialExpense
  );

  const onInitialization = () => {
    setMileage(data?.registeredLedgerMileage || 0);
    setSalePrice(0);
    setPurchase(0);
    setTransferCost(0);
    setParkingLocation('');
    setSheetMetal(0);
    setInspection(0);
    setConsignment(0);
    setEtc(0);
    setFinancialExpense([]);
    setStartDate(undefined);
  };

  const onSaveValueCheck = () => {
    if (financialExpense.length > 0) {
      let sumLoan = 0;
      // eslint-disable-next-line no-return-assign
      financialExpense.map((item: any) => (sumLoan += item.loan));
      if (sumLoan > purchase) {
        setToastType('warn');
        setToast('??????????????? ?????? ?????????????????? ?????? ??? ??? ????????????.');
        return false;
      }
    }
    if (mileage < data?.registeredLedgerMileage) {
      setToastType('warn');
      setToast('??????????????? ??????????????? ????????? ????????? ????????? ?????????.');
      return false;
    }
    if (!salePrice) {
      setToastType('warn');
      setToast('??????????????? ??????????????????.');
      salePriceRef?.current?.focus();
      return false;
    }
    if (!inspectionRecordImg?.length) {
      setToast('??????????????? ????????? ??????????????????.');
      // performanceCheckRef?.current?.focus();
      document.getElementById('performanceCheck')?.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
      return false;
    }
    return true;
  };

  const onClickTemporarySave = async () => {
    // if (onSaveValueCheck()) {
    setApiLoading(true);
    await temporarySaveApi(vehicleDetailData).then((res) => {
      if (res?.errors) alert(res?.errors[0]?.message);
      else {
        setOkToast('??????????????? ?????????????????????.');
      }
    });
    setApiLoading(false);
    // }
  };
  const onClickVehicleSaleHoldStatus = async () => {
    if (saleStatus !== 'SALE') {
      if (!onSaveValueCheck()) return;
    }

    setApiLoading(true);
    await updateVehicleSaleHoldStatusApi(data.id).then((res: any) => {
      if (res?.errors) alert(res?.errors[0]?.message);
      else {
        setSaleStatus(res.updateVehicleSaleHoldStatus.status);
      }
    });
    setApiLoading(false);
  };

  const onClickPreview = async () => {
    if (!onSaveValueCheck()) return;
    setApiLoading(true);
    await previewVehicleApi(vehicleDetailData).then((res) => {
      if (res?.errors) alert(res?.errors[0]?.message);
      else {
        router.push(`${router.asPath}/preview`).then(() => document.getElementById('top')?.scrollIntoView(true));
        setToastType('success');
        setToast('??????????????? ?????????????????????.');
      }
    });
    setApiLoading(false);
  };

  const onClickUpdatePreview = async () => {
    if (!onSaveValueCheck()) return;
    setApiLoading(true);
    await saleRegistration(vehicleDetailData).then((res) => {
      if (res?.errors) alert(res?.errors[0]?.message);
      else {
        router.push(`${router.asPath}/preview`).then(() => document.getElementById('top')?.scrollIntoView(true));
        setToastType('success');
        setToast('?????? ????????? ??????????????? ?????????????????????.');
      }
    });
    setApiLoading(false);
  };

  const onClickUpdate = () => {
    setIsPreview(false);
    setInputDisabled(false);
    router.back();
    document.getElementById('top')?.scrollIntoView(true);
  };

  const onClickRegi = async () => {
    setApiLoading(true);
    if (typeof window !== 'undefined') {
      if (!pickupLatitude) {
        const {kakao} = window as any;
        // eslint-disable-next-line new-cap
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(pickupAddress, async (result: any, status: any) => {
          if (status === kakao?.maps.services.Status.OK) {
            console.log('kakao result', result);
            setPickupLatitude(result[0].y);
            setPickupLongitude(result[0].x);
            await saleRegistration({...vehicleDetailData, pickupLatitude: result[0].y, pickupLongitude: result[0].x}).then((res) => {
              if (res?.errors) {
                setToastType('warn');
                setToast(res?.errors[0]?.message);
                if (res?.errors[0]?.message === '?????? ????????? ???????????????.') {
                  setTimeout(() => router.push('/account'), 2500);
                }
              } else {
                setToastType('success');
                setToast('?????????????????????');
                router.push('/vehicle-management/registration');
              }
            });
          }
        });
      } else {
        await saleRegistration(vehicleDetailData).then((res) => {
          if (res?.errors) {
            setToastType('warn');
            setToast(res?.errors[0]?.message);
            if (res?.errors[0]?.message === '?????? ????????? ???????????????.') {
              setTimeout(() => router.push('/account'), 2500);
            }
          } else {
            setToastType('success');
            setToast('?????????????????????');
            router.push('/vehicle-management/registration');
          }
        });
      }
    }
    setApiLoading(false);
  };

  const closePopup = useCallback(() => {
    setPopup(undefined);
  }, []);

  // console.log('accidentExchangeHistoryQuery', accidentExchangeHistoryQuery);
  // let i = 0;
  // console.log(
  //   'Exchange',
  //   Object.entries(accidentExchangeHistoryQuery).map((el) => el[0].includes('Exchange') && el[1] && i++)
  // );
  // console.log('i', i);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChangeAddress = useCallback((full: string, zip: string) => {
    setPickupZipCode(zip);
    setPickupAddress(full);

    if (typeof window !== 'undefined') {
      const {kakao} = window as any;
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(full, (result: any, status: any): void => {
        if (status === kakao.maps.services.Status.OK) {
          console.log('kakao result', result);
          setPickupLatitude(result[0].y);
          setPickupLongitude(result[0].x);
        }
      });
    }
  }, []);
  const closePostCode = useCallback(() => {
    setIsPopupOpen(false);
  }, []);
  return (
    <div id="top">
      {data ? (
        <>
          <Section border="1px solid #cccccc">
            <Wrapper w column width="100%">
              <Txt fontSize="24px" type="medium" letterSpacing="-1.0px">
                {`?????? ?????? ?????? ${isPreview ? '(????????????)' : ''}`}
              </Txt>
              <Wrapper h mt="6px" width="100%">
                <Wrapper width="50%" flex>
                  <Image width="10px" src="/images/ic-star-1.svg" mr="5px" />
                  <Txt type="regular" color="#fd3636" fontSize="13px">
                    ??????{' '}
                    <Txt span color={theme.color[5]}>
                      ??? ???????????? ???????????????.
                    </Txt>
                  </Txt>
                </Wrapper>
                <Wrapper width="50%" flex justifyContent="right">
                  <Txt type="regular" fontSize="13px" color={theme.color[3]}>
                    ????????? ?????? ????????? ????????? ?????????????
                  </Txt>
                  <Txt pointer underline type="regular" fontSize="13px" color="#0073e8" ml="5px" onClick={() => router.push('/mypage/qna/create')}>
                    ??????
                  </Txt>
                </Wrapper>
              </Wrapper>
              <Line height="1px" background={theme.color[3]} m="21px 0 30px" />
              <Box>
                <Wrapper flex between>
                  <Wrapper width="265px">
                    <Wrapper flex h mb="10px">
                      <Txt type="bold" fontSize="15px" color={theme.color[3]}>
                        ?????? ??????
                      </Txt>
                      <Image width="10px" src="/images/ic-star-1.svg" ml="5px" mb="5px" />
                    </Wrapper>
                    <InputUnit
                      ref={salePriceRef}
                      boxShadow
                      background="white"
                      disabled={inputDisabled}
                      notOpacity={inputDisabled}
                      fontFamily={theme.font.regular}
                      unitFont={theme.font.medium}
                      unitColor={theme.color[1]}
                      fontSize="18px"
                      warningBorder={!salePrice}
                      border={salePrice && 'solid 1px #888'}
                      value={getCommas(salePrice)}
                      onChange={onChangeSalePrice}
                      unit="??????"
                      width="100%"
                      height="49px"
                    />
                  </Wrapper>
                  <Wrapper width="265px">
                    <Txt type="bold" fontSize="15px" color={theme.color[3]} mb="10px">
                      ?????????
                      <Txt span color={theme.color[7]} fontSize="13px" type="regular">
                        (??????/??????????????? ?????? ?????? ???????????????.)
                      </Txt>
                    </Txt>
                    <InputUnit
                      boxShadow
                      background="white"
                      fontFamily={theme.font.regular}
                      unitFont={theme.font.medium}
                      unitColor={theme.color[1]}
                      fontSize="18px"
                      disabled
                      notOpacity={inputDisabled}
                      unit="??????"
                      width="100%"
                      height="49px"
                      border={inputDisabled && salePrice && 'solid 1px #888'}
                      value={getCommas(totalCost)}
                    />
                  </Wrapper>
                  <Wrapper width="265px">
                    <Txt type="bold" fontSize="15px" color={theme.color[3]} mb="10px">
                      ?????? ??????
                    </Txt>
                    <InputUnit
                      border="solid 1px #888"
                      background="white"
                      boxShadow
                      disabled
                      notOpacity
                      fontFamily={theme.font.regular}
                      unitFont={theme.font.medium}
                      unitColor={theme.color[1]}
                      fontSize="18px"
                      unit="??????"
                      width="100%"
                      height="49px"
                      value={getCommas((salePrice - totalCost - salePrice * 0.022).toFixed(0))}
                    />
                  </Wrapper>
                </Wrapper>

                <Txt type="regular" fontSize="12px" color={theme.color[3]} mt="10px" textAlign="right">
                  ????????? 2.2%
                </Txt>
              </Box>
            </Wrapper>
          </Section>

          <Section border="1px solid #cccccc">
            <>
              <table style={{width: '100%', borderTop: 'solid 3px #666666'}}>
                <colgroup>
                  <col width={'142px'} />
                  <col width="calc(50% - 142px)" />
                  <col width={'142px'} />
                  <col width="calc(50% - 142px)" />
                </colgroup>
                <Caption>?????? ??????</Caption>
                <tbody>
                  <Row>
                    <RowItem
                      first
                      large
                      title="??????"
                      colSpan={3}
                      color={theme.color[4]}
                      contentTxt={data?.modelYear && data?.manufacturer && data?.modelDetail ? `${data?.modelYear} ${data?.manufacturer} ${data?.modelDetail}` : '-'}
                      font={theme.font.medium}
                    />
                  </Row>
                  <Row>
                    <RowItem colSpan={3} first large title="?????? ??????">
                      <Select
                        disabled={inputDisabled}
                        width="100%"
                        height={INPUT_HEIGHT}
                        options={trims}
                        value={trim || ''}
                        onChange={async (e: any) => {
                          setTrim(e.target.value);
                          // console.log('trim', e.target.value);
                          const temp = await getJatoDetail(e.target.value);
                          onChangeTrimOptions(temp);
                        }}
                        // TODO: ?????? ????????? ?????? ??? ??????
                      />
                    </RowItem>
                  </Row>
                  <Row>
                    <RowItem first title="?????? ??????" contentTxt={data?.number || '-'} />
                    <RowItem large={!inputDisabled} title="?????????">
                      {data?.partner?.id === user?.id || user?.position === 'OWNER' ? (
                        <Select
                          disabled={inputDisabled}
                          height={INPUT_HEIGHT}
                          options={corporationPartners}
                          value={dealer}
                          onChange={(e) => {
                            setDealer(e.target.value);
                          }}
                        />
                      ) : (
                        data?.partner?.name
                      )}
                    </RowItem>
                    {/* <RowItem title="?????????" contentTxt={data?.partner?.name || '-'} /> */}
                  </Row>
                  <Row>
                    <RowItem first title="?????????" contentTxt={(factoryPrice && `${getCommas(String(factoryPrice).substring(0, String(factoryPrice).length - 4))} ??????`) || '-'} />
                    <RowItem title="?????? ??????" contentTxt={data?.vehicleIdentityNumber || '-'} />
                  </Row>
                  <Row>
                    <RowItem first title="?????????" contentTxt={transmission || '-'} />
                    <RowItem title="??????" contentTxt={fuel || '-'} />
                  </Row>
                  <Row>
                    <RowItem first title="?????? ??????" contentTxt={`${maxPower || '-'} hp/ps`} />
                    <RowItem title="??????" contentTxt={`${fuelConsumption || '-'} km/L`} />
                  </Row>
                  <Row>
                    <RowItem first title="?????????" contentTxt={`${getCommas(engineDisplacement) || '-'} cc`} />
                    <RowItem title="??????" contentTxt={wheelDrive || '-'} />
                  </Row>
                  <Row>
                    <RowItem first title="??????" contentTxt={data?.color || '-'} />
                    <RowItem title="????????????" contentTxt={appearanceType || '-'} />
                  </Row>
                  <Row>
                    <RowItem first large title="????????????">
                      <>
                        <InputUnit
                          disabled={inputDisabled}
                          notOpacity={inputDisabled}
                          fontFamily={theme.font.regular}
                          fontSize="14px"
                          warningBorder={!mileage || mileage < data?.registeredLedgerMileage}
                          maxLength={7}
                          unit={'km'}
                          height={INPUT_HEIGHT}
                          width={INPUT_WIDTH}
                          value={getCommas(mileage) || ''}
                          onChange={(e: any) => setMileage(getOnlyNumber(e))}
                          // message={mileage < data?.mileage ? '??????????????? ??????????????? ????????? ????????? ????????? ?????????' : ''}
                        />
                        {/* {mileage < data?.mileage && (
                        <Txt type="medium" style={{marginTop: '4px', fontSize: '10px', color: 'red'}}>{`* ??????????????? ??????????????? ????????? ???(${getCommas(
                          data?.mileage
                        )} km)?????? ????????? ?????????`}</Txt>
                      )} */}
                      </>
                    </RowItem>
                    <RowItem large title="?????????">
                      <Input
                        disabled={inputDisabled}
                        maxDate={(data?.createdDate && new Date(data?.createdDate)) || undefined}
                        width={INPUT_WIDTH}
                        height={INPUT_HEIGHT}
                        type="calendar"
                        date={(startDate && new Date(startDate)) || undefined}
                        placeholder="????????? ??????"
                        setDate={setStartDate}
                      />
                    </RowItem>
                  </Row>
                  <Row>
                    <RowItem colSpan={3} first large title="????????????">
                      <Wrapper height={42} between flex>
                        <InputUnit
                          notOpacity
                          disabled
                          maxLength={70}
                          placeholder=" "
                          width="83%"
                          fontFamily={theme.font.regular}
                          fontSize="14px"
                          height={INPUT_HEIGHT}
                          value={pickupAddress || ''}
                          onChange={onChangeParkingLocation}
                        />
                        <Button disabled={inputDisabled} type={inputDisabled ? 'disable' : 'primary'} onClick={() => setIsPopupOpen(true)} width="16%" height={42}>
                          ??????
                        </Button>
                      </Wrapper>
                    </RowItem>
                  </Row>
                  <Row>
                    <RowItem colSpan={3} first large title="">
                      <InputUnit
                        disabled={inputDisabled}
                        notOpacity={inputDisabled}
                        maxLength={70}
                        placeholder="?????? ??????????????? ??????????????????."
                        unit={
                          <Txt opacity={0.4} type="regular" color={theme.color[3]}>
                            <Txt span color="#0061df">
                              {parkingLocation.length}
                            </Txt>
                            /70???
                          </Txt>
                        }
                        fontFamily={theme.font.regular}
                        fontSize="14px"
                        height={INPUT_HEIGHT}
                        value={parkingLocation || ''}
                        onChange={onChangeParkingLocation}
                      />
                    </RowItem>
                  </Row>
                </tbody>
              </table>
            </>
          </Section>

          <Section border="1px solid #cccccc">
            <Wrapper flex h mb="10px">
              <Txt type="bold" fontSize="15px" color={theme.color[3]}>
                ?????? ??????
              </Txt>
              <Image width="10px" src="/images/ic-star-1.svg" ml="5px" mb="8px" />
            </Wrapper>
            {!(isPreview || data?.status === 'SALE_COMPLETED' || data?.status === 'SALE_COMPLETED_OUT_PLATFORM') && (
              <>
                <Line m="10px 0 16px 0" color="d8d8d8" />
                <Wrapper height="58px" flex between>
                  <Wrapper flex>
                    <Wrapper w h width="64px" height="26px" borderRadius="12px" border="solid 1px #fd3636" mr="11px" mt="9px">
                      <Txt fontSize="12px" type="medium" color="#fd3636">
                        ??????
                      </Txt>
                    </Wrapper>

                    <Wrapper mt="9px">
                      <Txt lineHeight="17px" type="regular" fontSize="13px">
                        ??????????????? ???????????? ?????? ???????????? ??? ?????? ????????? ????????? ?????? ??? ????????????. (PC ????????? ??????)
                      </Txt>
                      <Txt lineHeight="17px" type="regular" fontSize="13px" mt="6px" color="#fd3636">
                        ?????????????????? ???????????? ???????????? ?????????????????? ????????? ???????????? ??????????????? ????????? ??????????????????.
                      </Txt>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper style={{cursor: 'pointer'}} w h width="215px" height="58px" borderRadius="4px" background="#0073e8">
                    <Image mr="15px" width="19px" height="20px" src={'/images/ic-download.svg'} />
                    <Txt type="bold" fontSize="16px" color="white">
                      ???????????? ??? ????????????
                    </Txt>
                  </Wrapper>
                </Wrapper>
              </>
            )}

            <Line m="10px 0 16px 0" color="d8d8d8" />
            <Wrapper flex between>
              {['??????1', '??????2', '??????3', '??????4'].map((item: string, index: number) => {
                const eachImage: any = {
                  ??????1: data.imageList.filter((img: any) => img.type === 'MAIN')?.[0]?.name,
                  ??????2: data.imageList.filter((img: any) => img.type === 'OUTSIDE_90')?.[0]?.name,
                  ??????3: data.imageList.filter((img: any) => img.type === 'OUTSIDE_180')?.[0]?.name,
                  ??????4: data.imageList.filter((img: any) => img.type === 'OUTSIDE_270')?.[0]?.name
                };

                return (
                  <React.Fragment key={index}>
                    <Wrapper width="222px" column h>
                      <Wrapper w h background={'black'} width={'100%'} height={147}>
                        <Image
                          height={'100%'}
                          src={
                            data.imageList?.length && eachImage[item] ? `https://dev-api.carmerce.co.kr/dev/cloud/storage?name=${eachImage[item]}` : '/images/gr-photo-frame-1.svg'
                          }
                        />
                      </Wrapper>
                      <Txt type="regular" color={theme.color[6]} fontSize="12px" m="10px 0">
                        {item}
                      </Txt>
                    </Wrapper>
                  </React.Fragment>
                );
              })}
            </Wrapper>
            <Wrapper flex between>
              {['??????1', '??????2', '??????3', '??????4', '??????5', '??????6'].map((item: string, index: number) => {
                const eachImage: any = {
                  ??????1: data.imageList.filter((img: any) => img.type === 'INSIDE_SEAT')?.[0]?.name,
                  ??????2: data.imageList.filter((img: any) => img.type === 'INSIDE_CLUSTER')?.[0]?.name,
                  ??????3: data.imageList.filter((img: any) => img.type === 'INSIDE_GEAR')?.[0]?.name,
                  ??????4: data.imageList.filter((img: any) => img.type === 'INSIDE_HANDLE')?.[0]?.name,
                  ??????5: data.imageList.filter((img: any) => img.type === 'INSIDE_NAVIGATION')?.[0]?.name,
                  ??????6: data.imageList.filter((img: any) => img.type === 'INSIDE_GAS')?.[0]?.name
                };

                return (
                  <React.Fragment key={index}>
                    <Wrapper width="150px" column h>
                      <Wrapper w h background={'black'} width={'100%'} height={98}>
                        <Image
                          height={'100%'}
                          src={
                            data.imageList?.length && eachImage[item] ? `https://dev-api.carmerce.co.kr/dev/cloud/storage?name=${eachImage[item]}` : '/images/gr-photo-frame-2.svg'
                          }
                        />
                      </Wrapper>
                      <Txt type="regular" color={theme.color[6]} fontSize="12px" m="10px 0">
                        {item}
                      </Txt>
                    </Wrapper>
                  </React.Fragment>
                );
              })}
            </Wrapper>
            <Wrapper flex between>
              {['??????1', '??????2', '??????3', '??????4', '?????????', '?????????'].map((item: string, index: number) => {
                const eachImage: any = {
                  ??????1: data.imageList.filter((img: any) => img.type === 'SEAT_DRIVER_DOOR_OPEN')?.[0]?.name,
                  ??????2: data.imageList.filter((img: any) => img.type === 'SEAT_PASSENGER_DOOR_OPEN')?.[0]?.name,
                  ??????3: data.imageList.filter((img: any) => img.type === 'SEAT_REAR_SEAT_DOOR_OPEN')?.[0]?.name,
                  ??????4: data.imageList.filter((img: any) => img.type === 'SEAT_DRIVER_CONTROL_BUTTON')?.[0]?.name,
                  ?????????: data.imageList.filter((img: any) => img.type === 'ENGINE_ROOM')?.[0]?.name,
                  ?????????: data.imageList.filter((img: any) => img.type === 'TIRE_FRONT_RIGHT')?.[0]?.name
                };
                return (
                  <React.Fragment key={index}>
                    <Wrapper width="150px" column h>
                      <Wrapper w h background={'black'} width={'100%'} height={98}>
                        <Image
                          height={'100%'}
                          src={
                            data.imageList?.length && eachImage[item] ? `https://dev-api.carmerce.co.kr/dev/cloud/storage?name=${eachImage[item]}` : '/images/gr-photo-frame-2.svg'
                          }
                        />
                      </Wrapper>
                      <Txt type="regular" color={theme.color[6]} fontSize="12px" m="10px 0">
                        {item}
                      </Txt>
                    </Wrapper>
                  </React.Fragment>
                );
              })}
            </Wrapper>
          </Section>

          <Section border="1px solid #cccccc" color={theme.color[3]}>
            <Wrapper
              id="performanceCheck"
              style={{cursor: !inputDisabled ? 'pointer' : 'default'}}
              flex
              p="0 20px"
              h
              height="65px"
              border={inspectionRecordImg?.length ? 'solid 1px #d8d8d8' : 'solid 2px #fd3636'}
              borderRadius="4px"
              onClick={!inputDisabled ? () => router.push(`${router.pathname}/vehicle-inspection-record?id=${router.query.id}&vehicleId=${router.query.vehicleId}`) : () => null}
            >
              <Wrapper flexNum={1} color={inputDisabled ? '#d1d1d1' : ''}>
                <Txt type="bold" fontSize="15px">
                  ?????? ?????? ?????? {'>'}
                  <Txt span color="#fd3636">
                    &nbsp; *
                  </Txt>
                </Txt>
              </Wrapper>

              <Wrapper flexNum={1} color={inputDisabled ? '#d1d1d1' : ''} flex justifyContent="right">
                <Txt type="regular" fontSize="13px" mr="15px">
                  ??? ?????? :{' '}
                  <Txt span type="medium">
                    {exchageAmount} ???
                  </Txt>
                </Txt>
                <Txt type="regular" fontSize="13px" mr="15px">
                  ??? ?????? :{' '}
                  <Txt span type="medium">
                    {sheetMetalAmount} ???
                  </Txt>
                </Txt>
                <Txt type="regular" fontSize="13px">
                  ??? ?????? :{' '}
                  <Txt span type="medium">
                    {corrosionAmount} ???
                  </Txt>
                </Txt>
              </Wrapper>
            </Wrapper>

            {(isPreview || data?.status === 'SALE_COMPLETED' || data?.status === 'SALE_COMPLETED_OUT_PLATFORM') && (
              <Wrapper mt={10}>
                <DetailVehiclePerformance response={data} />
              </Wrapper>
            )}

            <Wrapper
              style={{cursor: !inputDisabled ? 'pointer' : 'default'}}
              p="0 20px"
              h
              height="65px"
              border="solid 1px #d8d8d8"
              borderRadius="4px"
              mt="25px"
              onClick={!inputDisabled ? () => setPopup(<DetailVehiclePerformance response={data} />) : () => null}
              color={inputDisabled ? '#d1d1d1' : ''}
            >
              <Txt type="bold" fontSize="15px">
                ?????? ?????? ?????? {'>'}
              </Txt>
            </Wrapper>
            {/* insuranceHistory */}
            <Wrapper
              style={{cursor: 'default'}}
              // style={{cursor: !checkAuthority ? 'pointer' : 'default'}}
              // onClick={
              //   !checkAuthority
              //     ? data?.insuranceHistory
              //       ? () => setAccidentHistoryPopup(<AccidentHistoryPopup data={data} />)
              //       : () => alert('?????? ?????? ????????? ????????????.')
              //     : () => null
              // }
              p="0 20px"
              h
              height="65px"
              border="solid 1px #d8d8d8"
              borderRadius="4px"
              mt="25px"
            >
              {/* <Wrapper flexNum={1} color={checkAuthority ? '#d1d1d1' : ''}> */}
              <Wrapper flexNum={1} color={'#d1d1d1'}>
                <Txt type="bold" fontSize="15px">
                  ?????? ?????? ?????? ?????? {'>'}{' '}
                  <Txt type="medium" color="red" fontSize="13px" span ml="12px">
                    ????????? ??????????????????
                  </Txt>
                </Txt>
              </Wrapper>
              <Wrapper flexNum={1} color={inputDisabled ? '#d1d1d1' : ''} flex justifyContent="right">
                <Txt type="regular" fontSize="13px" mr="15px">
                  ??? ?????? ?????? :{' '}
                  <Txt span type="medium">
                    _ ???
                  </Txt>
                </Txt>
                <Txt type="regular" fontSize="13px">
                  ??? ?????? ?????? :{' '}
                  <Txt span type="medium">
                    _ ???
                  </Txt>
                </Txt>
              </Wrapper>
            </Wrapper>
          </Section>

          <Section border="1px solid #cccccc">
            <Txt mb="10px" type="bold" fontSize="16px" color={theme.color[3]}>
              ?????? ??????
            </Txt>
            <>
              <table width="100%">
                <tbody>
                  <Row top>
                    <RowItem first large title="?????? ?????????">
                      <InputUnit
                        disabled={inputDisabled}
                        notOpacity={inputDisabled}
                        unit="??????"
                        height={INPUT_HEIGHT}
                        value={getCommas(purchase)}
                        onChange={(e: any) => {
                          setPurchase(getOnlyNumber(e));
                        }}
                      />
                    </RowItem>
                    <RowItem large title="?????? ????????????">
                      <InputUnit
                        disabled={inputDisabled}
                        notOpacity={inputDisabled}
                        unit="??????"
                        height={INPUT_HEIGHT}
                        value={getCommas(transferCost)}
                        onChange={(e: any) => {
                          setTransferCost(getOnlyNumber(e));
                        }}
                      />
                    </RowItem>
                  </Row>
                </tbody>
              </table>
            </>
            <Txt mt="30px" mb="10px" type="bold" fontSize="16px" color={theme.color[3]}>
              ?????? ??????
              <Txt span type="regular" fontSize="13px" color={theme.color[3]}>
                &nbsp; (???????????????, ??????????????? ??????)
              </Txt>
            </Txt>
            <>
              <table width="100%">
                <tbody>
                  <Row top>
                    <RowItem first large title="??????/?????????">
                      <InputUnit
                        disabled={inputDisabled}
                        notOpacity={inputDisabled}
                        unit="??????"
                        height={INPUT_HEIGHT}
                        value={getCommas(sheetMetal)}
                        onChange={onChangeSheetMetal}
                      />
                    </RowItem>
                    <RowItem large title="???????????????">
                      <InputUnit
                        disabled={inputDisabled}
                        notOpacity={inputDisabled}
                        unit="??????"
                        height={INPUT_HEIGHT}
                        value={getCommas(inspection)}
                        onChange={onChangeInspection}
                      />
                    </RowItem>
                  </Row>
                  <Row>
                    <RowItem first large title="?????????">
                      <InputUnit
                        disabled={inputDisabled}
                        notOpacity={inputDisabled}
                        unit="??????"
                        height={INPUT_HEIGHT}
                        value={getCommas(consignment)}
                        onChange={onChangeConsignment}
                      />
                    </RowItem>
                    <div style={{flex: 1}}></div>
                  </Row>
                </tbody>
              </table>
            </>
            <Txt mt="30px" mb="10px" type="bold" fontSize="16px" color={theme.color[3]}>
              ????????? ??????
              <Txt span type="regular" fontSize="13px" color={theme.color[3]}>
                &nbsp; (???????????????, ??????????????? ??????)
              </Txt>
            </Txt>
            <>
              <table width="100%">
                <colgroup>
                  <col width={'142px'} />
                  <col />
                  <col width={'50%'} />
                </colgroup>
                <tbody>
                  <Row top>
                    <RowItem first large title="????????????">
                      <InputUnit disabled={inputDisabled} notOpacity={inputDisabled} unit="??????" height={INPUT_HEIGHT} value={getCommas(etc)} onChange={onChangeEtc} />
                    </RowItem>
                  </Row>
                </tbody>
              </table>
            </>
          </Section>

          <Section border="1px solid #cccccc">
            <Wrapper between flex>
              <Txt type="bold" fontSize="15px" color={theme.color[3]}>
                ?????? ??????
              </Txt>
              <Wrapper>
                {!inputDisabled && financialExpense.length < 2 && (
                  <>
                    <Txt onClick={addCost} style={{cursor: 'pointer'}} type="bold" fontSize="15px" color="#0073e8">
                      + ????????????
                    </Txt>
                    <Line height="1px" background="#0073e8" mt="5px" />
                  </>
                )}
              </Wrapper>
            </Wrapper>
            <Line mt="10px" background="#aaaaaa" />
            <Wrapper flex mt="48px">
              <Wrapper width="100%" column>
                {financialExpense.map((item: any, index: number) => (
                  <Wrapper key={index} mb={financialExpense.length - 1 === index ? '0px' : '50px'}>
                    <Wrapper>
                      <Wrapper flex height="80px">
                        <Wrapper style={{flex: 1}}>
                          <Txt mb="10px" letterSpacing={-1} fontSize="15px" type="medium" color={theme.color[3]}>
                            ??????
                          </Txt>
                          <Select
                            disabled={inputDisabled}
                            // p="1px 2px 1px 0px"
                            height="44px"
                            options={financialExpensesType}
                            value={financialExpense[index].type || ''}
                            onChange={(e: any) => onChangeFinancialType(e, index)}
                          />
                        </Wrapper>
                        <Wrapper style={{flex: 1}} padding="0px 10px">
                          <Txt mb="10px" letterSpacing={-1} fontSize="15px" type="medium" color={theme.color[3]}>
                            ?????? ??????
                          </Txt>
                          <InputUnit
                            notOpacity
                            background={financialExpense[index].type === 'COMPANY' ? '#f9f9f9' : ''}
                            placeholder=" "
                            disabled={financialExpense[index].type === 'COMPANY' || inputDisabled}
                            height={INPUT_HEIGHT}
                            value={financialExpense[index].type === 'COMPANY' ? user.dealer.companyName : financialExpense[index].company ? financialExpense[index].company : ''}
                            name="company"
                            onChange={(e: any) => onChangeValue(e, index)}
                          />
                        </Wrapper>
                        <Wrapper style={{flex: 1}} padding="0px 10px">
                          <Txt mb="10px" letterSpacing={-1} fontSize="15px" type="medium" color={theme.color[3]}>
                            ?????? ??????
                          </Txt>
                          <InputUnit
                            disabled={inputDisabled}
                            notOpacity={inputDisabled}
                            fontFamily={theme.font.regular}
                            fontSize="14px"
                            height={INPUT_HEIGHT}
                            unit="??????"
                            value={financialExpense[index].loan ? getCommas(financialExpense[index].loan) : ''}
                            name="loan"
                            onChange={(e: any) => onChangeValue(e, index)}
                          />
                        </Wrapper>
                        {!inputDisabled && (
                          <Wrapper column alignItems="end" style={{flex: 0.5}}>
                            <>
                              <Txt style={{cursor: 'pointer'}} textAlign="right" type="bold" fontSize="15px" color={theme.color[3]} onClick={() => removeCost(index)}>
                                - ????????????
                              </Txt>
                              <Line justifyContent="flex-end" height="1px" width="67px" background="#555555" mt="5px" />
                            </>
                          </Wrapper>
                        )}
                        {/* )} */}
                      </Wrapper>
                      <Wrapper flex height="80px" mt="20px">
                        <Wrapper style={{flex: 1}}>
                          <Txt mb="10px" letterSpacing={-1} fontSize="15px" type="medium" color={theme.color[3]}>
                            ?????????
                          </Txt>
                          <CalendarWrapper width="100%" height="44px">
                            <DatePicker
                              disabled={inputDisabled}
                              // notOpacity={inputDisabled}
                              maxDate={new Date()}
                              value={formattedDate(financialExpense[index].date)}
                              selected={financialExpense[index].date}
                              onChange={(date: any) => onChangeDatePic(date, index)}
                              locale="ko"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                          </CalendarWrapper>
                        </Wrapper>
                        <Wrapper style={{flex: 1}} padding="0px 10px">
                          <Txt mb="10px" letterSpacing={-1} fontSize="15px" type="medium" color={theme.color[3]}>
                            ????????????
                          </Txt>
                          <InputUnit
                            disabled={inputDisabled}
                            notOpacity={inputDisabled}
                            fontFamily={theme.font.regular}
                            fontSize="14px"
                            height={INPUT_HEIGHT}
                            unit="%"
                            maxLength={4}
                            value={financialExpense[index].interestRate ?? financialExpense[index].interestRate}
                            name="interestRate"
                            onChange={(e: any) => onChangeValue(e, index)}
                          />
                        </Wrapper>
                        <Wrapper style={{flex: 1}} padding="0px 10px">
                          <Txt mb="10px" letterSpacing={-1} fontSize="15px" type="medium" color={theme.color[3]}>
                            ??????
                          </Txt>
                          <InputUnit
                            background="#f9f9f9"
                            height={INPUT_HEIGHT}
                            unit="??????"
                            notOpacity
                            disabled
                            value={`${
                              getInterest(financialExpense[index].date, Number(getOnlyNumber(financialExpense[index].loan)), financialExpense[index].interestRate) &&
                              getCommas(getInterest(financialExpense[index].date, Number(getOnlyNumber(financialExpense[index].loan)), financialExpense[index].interestRate))
                            }`}
                          />
                        </Wrapper>

                        {!inputDisabled && <Wrapper h style={{flex: 0.5}}></Wrapper>}
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                ))}
              </Wrapper>
            </Wrapper>
          </Section>

          {data?.status !== 'SALE_COMPLETED' && data?.status !== 'SALE_COMPLETED_OUT_PLATFORM' && !inputDisabled && (
            <Wrapper>
              <div style={{width: '100%', height: '3px', background: '#333333', margin: '30px 0 27px'}} />
            </Wrapper>
          )}
          {isPreview && data?.status === 'REGISTER' && (
            <>
              <Wrapper height="58px" flex>
                <Wrapper w h width="64px" height="26px" borderRadius="12px" border="solid 1px #fd3636" mr="11px" mt="9px">
                  <Txt fontSize="12px" type="medium" color="#fd3636">
                    ??????
                  </Txt>
                </Wrapper>

                <Wrapper mt="9px">
                  <Txt type="regular" fontSize="13px" color="#fd3636">
                    ?????? ????????? ???????????? ?????? ????????? ?????????.
                  </Txt>
                  <Txt type="regular" fontSize="13px" mt="6px" color="#fd3636">
                    ??????????????? ?????? ???????????? ?????? ??????(??????, ?????? ???)??? ?????? ????????? ??????????????? ????????????.
                  </Txt>
                </Wrapper>
              </Wrapper>
            </>
          )}
          {data?.status !== 'REGISTER' && data?.status !== 'SALE_COMPLETED' && data?.status !== 'SALE_COMPLETED_OUT_PLATFORM' && inputDisabled && (
            <Wrapper mt="20px" mb="40px" between w>
              <Wrapper flexNum={2}>
                {inputDisabled && !isPreview && (
                  <>
                    <Btn mr="10px" type="squareButtonWhite" onClick={() => setDeletePopup(true)}>
                      ??????
                    </Btn>
                    <Btn mr="10px" type="squareButtonWhite" onClick={onClickVehicleSaleHoldStatus} loading={apiLoading}>
                      {saleStatus === 'SALE' ? '????????????' : '?????????'}
                    </Btn>
                    {saleStatus === 'SALE_HOLD' && (
                      <Btn
                        type="squareButtonWhite"
                        onClick={() => {
                          document.getElementById('top')?.scrollIntoView(true);
                          setInputDisabled(false);
                        }}
                      >
                        ??????
                      </Btn>
                    )}
                  </>
                )}
              </Wrapper>
              <Wrapper flexNum={1} justifyContent="end" flex>
                {inputDisabled ? (
                  <Btn loading={apiLoading} type="squareButtonBlack" onClick={() => router.push('/vehicle-management/registration')}>
                    ??????
                  </Btn>
                ) : (
                  <Btn loading={apiLoading} type="squareButtonBlack" onClick={onClickUpdatePreview}>
                    ????????????
                  </Btn>
                )}
              </Wrapper>
            </Wrapper>
          )}

          {!inputDisabled && (data?.status === 'REGISTER' || saleStatus === 'SALE_HOLD') && (
            <Wrapper mt="20px" mb="40px" between w>
              <Wrapper flexNum={1}>
                <Btn mr="10px" type="squareButtonWhite" onClick={() => setDeletePopup(true)}>
                  {/* <Btn mr="10px" type="squareButtonWhite" onClick={() => deleteVehicleApi(data?.id)}> */}
                  ??????
                </Btn>
                <Btn type="squareButtonWhite" onClick={onInitialization}>
                  ?????????
                </Btn>
              </Wrapper>
              <Wrapper flexNum={1} justifyContent="end" flex>
                <Btn loading={apiLoading} type="squareButtonWhite" onClick={onClickTemporarySave} mr="10px">
                  ????????????
                </Btn>
                <Btn loading={apiLoading} type="squareButtonBlack" onClick={onClickPreview}>
                  ????????????
                </Btn>
              </Wrapper>
            </Wrapper>
          )}
          {isPreview && data?.status === 'REGISTER' && (
            <Wrapper mt="20px" mb="40px" between w>
              <Wrapper flexNum={1}></Wrapper>
              <Wrapper flexNum={1} justifyContent="end" flex>
                <Btn loading={apiLoading} type="squareButtonWhite" onClick={onClickUpdate} mr="10px">
                  ??????
                </Btn>
                <Btn loading={apiLoading} type="squareButtonBlack" onClick={onClickRegi}>
                  ??????
                </Btn>
              </Wrapper>
            </Wrapper>
          )}
          {isPopupOpen && <PostCodePopup closePostCode={closePostCode} handleChangeAddress={handleChangeAddress} />}
          <Toast toast={toast} setToast={setToast} position="top-center" type={toastType} delay={2500} />
          <Toast toast={okToast} setToast={setOkToast} position="top-center" delay={1500} onClose={() => router.back()} />

          <PopupElement
            title={'???????????? ????????????'}
            titleSize={'20px'}
            titleAlign={'left'}
            width={'985px'}
            height={'80%'}
            nonButton
            // okText={'??????'}
            onClickPopupEnter={() => closePopup()}
            // onClickPopupEnter={setContent(undefined)}
          />
          <AccidentHistoryPopupElement
            title={''}
            // titleSize={'20px'}
            // titleAlign={'left'}
            width={'985px'}
            height={'80%'}
            nonButton
            // okText={'??????'}
            onClickPopupEnter={() => closePopup()}
            // onClickPopupEnter={setContent(undefined)}
          />
          <VehicleRegPopup
            visible={deletePopup}
            title="?????? ??????"
            content="?????? ????????? ?????????????????????????"
            data={data}
            onClose={() => setDeletePopup(false)}
            onOk={() => deleteVehicleApi(data?.id).then(() => router.back())}
          />
        </>
      ) : (
        <>{res?.errors && res?.errors[0]?.message}</>
      )}
    </div>
  );
}
export default inject('detailVehicleMgtStore')(observer(DetailVehicle));

const getAccidentAmount = (vehicleInspectionRecord: any, sort: string) => [
  vehicleInspectionRecord?.hoodOuterPanel && vehicleInspectionRecord?.hoodOuterPanel[sort],
  vehicleInspectionRecord?.frontLeftFenderOuterPanel && vehicleInspectionRecord?.frontLeftFenderOuterPanel[sort],
  vehicleInspectionRecord?.frontRightFenderOuterPanel && vehicleInspectionRecord?.frontRightFenderOuterPanel[sort],
  vehicleInspectionRecord?.frontLeftDoorOuterPanel && vehicleInspectionRecord?.frontLeftDoorOuterPanel[sort],
  vehicleInspectionRecord?.frontRightDoorOuterPanel && vehicleInspectionRecord?.frontRightDoorOuterPanel[sort],
  vehicleInspectionRecord?.rearLeftDoorOuterPanel && vehicleInspectionRecord?.rearLeftDoorOuterPanel[sort],
  vehicleInspectionRecord?.rearRightDoorOuterPanel && vehicleInspectionRecord?.rearRightDoorOuterPanel[sort],
  vehicleInspectionRecord?.trunkLidOuterPanel && vehicleInspectionRecord?.trunkLidOuterPanel[sort],
  vehicleInspectionRecord?.radiatorOuterPanel && vehicleInspectionRecord?.radiatorOuterPanel[sort],
  vehicleInspectionRecord?.roofOuterPanel && vehicleInspectionRecord?.roofOuterPanel[sort],
  vehicleInspectionRecord?.quarterLeftOuterPanel && vehicleInspectionRecord?.roofOuterPanel[sort],
  vehicleInspectionRecord?.quarterLeftOuterPanel && vehicleInspectionRecord?.quarterLeftOuterPanel[sort],
  vehicleInspectionRecord?.quarterRightOuterPanel && vehicleInspectionRecord?.quarterRightOuterPanel[sort],
  vehicleInspectionRecord?.sideSillLeftOuterPanel && vehicleInspectionRecord?.sideSillLeftOuterPanel[sort],
  vehicleInspectionRecord?.sideSillRightOuterPanel && vehicleInspectionRecord?.sideSillRightOuterPanel[sort],
  vehicleInspectionRecord?.frontPanelChassis && vehicleInspectionRecord?.frontPanelChassis[sort],
  vehicleInspectionRecord?.crossMemberChassis && vehicleInspectionRecord?.frontPanelChassis[sort],
  vehicleInspectionRecord?.crossMemberChassis && vehicleInspectionRecord?.crossMemberChassis[sort],
  vehicleInspectionRecord?.insideLeftPanelChassis && vehicleInspectionRecord?.insideLeftPanelChassis[sort],
  vehicleInspectionRecord?.insideRightPanelChassis && vehicleInspectionRecord?.insideRightPanelChassis[sort],
  vehicleInspectionRecord?.rearPanelChassis && vehicleInspectionRecord?.rearPanelChassis[sort],
  vehicleInspectionRecord?.trunkFloorChassis && vehicleInspectionRecord?.trunkFloorChassis[sort],
  vehicleInspectionRecord?.frontLeftSideMemberChassi && vehicleInspectionRecord?.rearPanelChassis[sort],
  vehicleInspectionRecord?.trunkFloorChassis && vehicleInspectionRecord?.trunkFloorChassis[sort],
  vehicleInspectionRecord?.frontLeftSideMemberChassis && vehicleInspectionRecord?.frontLeftSideMemberChassis[sort],
  vehicleInspectionRecord?.frontRightSideMemberChassis && vehicleInspectionRecord?.frontRightSideMemberChassis[sort],
  vehicleInspectionRecord?.rearLeftSideMemberChassis && vehicleInspectionRecord?.rearLeftSideMemberChassis[sort],
  vehicleInspectionRecord?.rearRightSideMemberChassis && vehicleInspectionRecord?.rearRightSideMemberChassis[sort],
  vehicleInspectionRecord?.frontLeftWheelHouseChassis && vehicleInspectionRecord?.frontLeftWheelHouseChassis[sort],
  vehicleInspectionRecord?.frontRightWheelHouseChassis && vehicleInspectionRecord?.frontRightWheelHouseChassis[sort],
  vehicleInspectionRecord?.rearLeftWheelHouseChassis && vehicleInspectionRecord?.rearLeftWheelHouseChassis[sort],
  vehicleInspectionRecord?.rearRightWheelHouseChassis && vehicleInspectionRecord?.rearRightWheelHouseChassis[sort],
  vehicleInspectionRecord?.pillarLeftPanelAChassis && vehicleInspectionRecord?.pillarLeftPanelAChassis[sort],
  vehicleInspectionRecord?.pillarRightPanelAChassis && vehicleInspectionRecord?.pillarRightPanelAChassis[sort],
  vehicleInspectionRecord?.pillarLeftPanelBChassis && vehicleInspectionRecord?.pillarLeftPanelBChassis[sort],
  vehicleInspectionRecord?.pillarRightPanelBChassis && vehicleInspectionRecord?.pillarRightPanelBChassis[sort],
  vehicleInspectionRecord?.pillarLeftPanelCChassis && vehicleInspectionRecord?.pillarLeftPanelCChassis[sort],
  vehicleInspectionRecord?.pillarRightPanelCChassis && vehicleInspectionRecord?.pillarRightPanelCChassis[sort],
  vehicleInspectionRecord?.packageTrayChassis && vehicleInspectionRecord?.packageTrayChassis[sort],
  vehicleInspectionRecord?.dashPanelChassis && vehicleInspectionRecord?.dashPanelChassis[sort],
  vehicleInspectionRecord?.floorPanelChassis && vehicleInspectionRecord?.floorPanelChassis[sort],
  vehicleInspectionRecord?.dashPanelChassis && vehicleInspectionRecord?.dashPanelChassis[sort],
  vehicleInspectionRecord?.floorPanelChassis && vehicleInspectionRecord?.floorPanelChassis[sort]
];

const Box = styled.div`
  width: 100%;
  height: 159px;
  padding: 35px 29px 21px 30px;
  border-radius: 4px;
  border: solid 1px #d8d8d8;
  background-color: #f9fafa;
`;
const Caption = styled.caption({
  textAlign: 'left',
  marginBottom: '10px',
  fontFamily: theme.font.bold,
  fontSize: '15px',
  color: theme.color[3]
});
