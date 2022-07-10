import React, {useCallback, useEffect, useRef, useState} from 'react';
import Text from '@components/atoms/Text';
import {EasyVehicleRegistration, Toast} from '@components/organisms';
import theme from '@public/theme';
import {Wrapper, Input, Select, Btn, Image, Txt} from '@components/atoms';
import Section from '@components/molecules/Section';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import {GetServerSideProps} from 'next';
import {getCommas, getParsedResponse} from '@modules/replaceStrings';
import getVehicleInspectionRecordApi from '@api/vehicle/getVehicleInspectionRecordApi';
import CheckboxRed from '@components/atoms/CheckboxRed';
import {useRouter} from 'next/router';
import VehicleInspectionRecordNotice from '@container/vehicle-management/detail-vehicle/Center/VehicleInspectionRecordNotice';
import setVehicleInspectionRecordApi from '@api/vehicle/setVehicleInspectionRecordApi';
import setTemporaryVehicleInspectionRecordApi from '@api/vehicle/setTemporaryVehicleInspectionRecordApi';
import AccidentExchangeHistory from '@components/organisms/AccidentExchangeHistory';
import {inject, observer} from 'mobx-react';
import OverallStateOfVehicle from '@components/organisms/OverallStateOfVehicle';
import VehicleDetails from '@components/organisms/VehicleDetails';
import VehicleOtherInformation from '@components/organisms/VehicleOtherInformation';
import {parseCookies} from 'nookies';

// 변속기종류
export enum InspectionTransmissionType {
  AUTOMATIC,
  MANUAL,
  SEMI_AUTOMATIC,
  CVT,
  ETC
}

// 사용연료
export enum InspectionFuelType {
  GASOLINE,
  DIESEL,
  LPG,
  HYBRID,
  ELECTRICITY,
  HYDROGEN_ELECTRICITY,
  ETC
}

// 보증유형
export enum warrantyType {
  SELF,
  INSURANCE
}

// 주행거리 상태
export enum InspectionMileageType {
  HIGH,
  MIDDLE,
  LOW
}

// 차대번호 표기
export enum InspectionVehicleIdentityNumberType {
  CORROSION,
  DAMAGE,
  DIFFERENT,
  FALSIFY,
  GOOD,
  HIDDEN
}

// 색상
export enum InspectionColorType {
  ACHROMATIC,
  CHROMATIC
}

// 리콜 대상
export enum InspectionRecallStatusType {
  FINISHED,
  UNFINISHED
}

export enum GoodBadType {
  GOOD,
  BAD
}

export enum NoYesType {
  NO,
  YES
}

export enum InspectionOilStatusType {
  NONE,
  MICRO_LEAKAGE,
  LEAKAGE
}

export enum InspectionLevelType {
  APPROPRIATE,
  SHORTAGE
}

export enum InspectionTransmissionOilLevelType {
  APPROPRIATE,
  SHORTAGE,
  MUCH
}

export enum InspectionBasePricingType {
  KOREA_AUTOMOBILE_DIAGNOSIS_GUARANTEE_ASSOCIATION,
  TECHNOLOGY_SOCIETY
}

export enum InspectionRecallType {
  NONE,
  RECALL
}

// 후드 이상 여부 - 외판부위 1랭크
export type InpectionRankType = {
  corrosion?: boolean; // 부식
  damage?: boolean; // 손상
  exchange?: boolean; // 교환(교체)
  scratch?: boolean; // 흠집
  sheetMetal?: boolean; // 판금/용접
  uneven?: boolean; // 요철
};

// 성능점검지 이미지 타입
export type VehicleInspectionRecordImageType = {
  id?: number;
  name?: string;
  originFilename?: string;
};

// 변속기종류
const transmissionTypeArr = [
  {label: '자동', value: InspectionTransmissionType[0]},
  {label: '수동', value: InspectionTransmissionType[1]},
  {label: '세미오토', value: InspectionTransmissionType[2]},
  {label: '무단변속기', value: InspectionTransmissionType[3]},
  {label: '기타', value: InspectionTransmissionType[4]}
];

// 사용연료
const fuelTypeArr = [
  {label: '가솔린', value: InspectionFuelType[0]},
  {label: '디젤', value: InspectionFuelType[1]},
  {label: 'LPG', value: InspectionFuelType[2]},
  {label: '하이브리드', value: InspectionFuelType[3]},
  {label: '전기', value: InspectionFuelType[4]},
  {label: '수소전기', value: InspectionFuelType[5]},
  {label: '기타', value: InspectionFuelType[6]}
];

// 차대번호 표기
export const vehicleIdentityNumberStatusArr = [
  {label: '양호', value: InspectionVehicleIdentityNumberType[0]},
  {label: '부식,', value: InspectionVehicleIdentityNumberType[1]},
  {label: '훼손(오손)', value: InspectionVehicleIdentityNumberType[2]},
  {label: '상이', value: InspectionVehicleIdentityNumberType[3]},
  {label: '변조(변타)', value: InspectionVehicleIdentityNumberType[4]},
  {label: '도말', value: InspectionVehicleIdentityNumberType[5]}
];

const signatureYearArr = [2020, 2021, 2022];
const signatureMonthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const changePeriodTextDash = (value: string) => (value ? value.replace(/-/g, '') : '');

type VehicleInspectRecordType = {
  vehicleInspectionRecordStore: any;
  pageProps: any;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const contextQuery = context.query;
  const response = getVehicleInspectionRecordApi(Number(contextQuery.id), {context});
  return response;
};

const VehicleInspectionRecord = inject('vehicleInspectionRecordStore')(
  observer(({vehicleInspectionRecordStore: store, pageProps}: VehicleInspectRecordType) => {
    const propsData = pageProps?.response?.getVehicleInspectionRecord;
    const router = useRouter();
    const id = pageProps?.query?.id;
    const [domReady, setDomReady] = useState(false);

    /* 성능점검 기록부 리스트 시작 */
    const [enrollNumber, onChangeEnrollNumber] = useInput(propsData?.enrollNumber || '', 'number'); // 제시번호
    const [inspectionRecordNumberFront, onChangeInspectionRecordNumberFront] = useInput(propsData?.inspectionRecordNumberFront || '', 'number'); // 발행번호 - 앞
    const [inspectionRecordNumberMiddle, onChangeInspectionRecordNumberMiddle] = useInput(propsData?.inspectionRecordNumberMiddle || '', 'number'); // 발행번호 - 중간
    const [inspectionRecordNumberBack, onChangeInspectionRecordNumberBack] = useInput(propsData?.inspectionRecordNumberBack || '', 'number'); // 발행번호 - 뒤
    const [pricingCheck, setPricingCheck] = useState(!!propsData?.pricingCheck || false); // 자동차가격조사 산정 선택
    const name = propsData?.name || '-'; // 차명
    const modelYear = propsData?.modelYear || '-'; // 연식
    const number = propsData?.number || '-'; // 자동차등록번호
    const [validPeriodStart, onChangeValidPeriodStart] = useInput<string>(changePeriodTextDash(propsData?.validPeriodStart), 'number'); // 검사유효기간 - 시작
    const [validPeriodEnd, onChangeValidPeriodEnd] = useInput<string>(changePeriodTextDash(propsData?.validPeriodEnd), 'number'); // 검사유효기간 - 종료
    const firstRegisterDate = propsData?.firstRegisterDate || '-'; // 최초등록일
    const [transmissionType, setTransmissionType] = useState(propsData?.transmissionType || 0); // 변속기 종류
    const checkTransmissionType = (value: any) => ![InspectionTransmissionType[1]].includes(value);
    const checkAutoTransmissionType = (value: any) => [InspectionTransmissionType[1]].includes(value);
    const [transmissionAutoTypeDisabled, setTransmissionAutoTypeDisabled] = useState(propsData?.transmissionType ? checkAutoTransmissionType(propsData?.transmissionType) : true);
    const [transmissionTypeDisabled, setTransmissionTypeDisabled] = useState(propsData?.transmissionType ? checkTransmissionType(propsData?.transmissionType) : true); // 변속기 종류
    const [fuelType, setFuelType] = useState(propsData?.fuelType || 0); // 사용연료
    const checkFuelType = (value: any) => ![InspectionFuelType[3], InspectionFuelType[4], InspectionFuelType[5]].includes(value);
    const [fuelTypeDisabled, setFuelTypeDisabled] = useState(propsData?.fuelType ? checkFuelType(propsData?.fuelType) : true); // 사용연료
    const vehicleIdentityNumber = propsData?.vehicleIdentityNumber || '-'; // 차대번호
    const [warranty, setWarranty] = useState(propsData?.warranty || undefined); // 보증유형
    const [basePricingCalculating, onChangeBasePricingCalculating] = useInput(propsData?.basePricingCalculating || '', 'number'); // 가격산정 기준가격
    const motorType = propsData?.motorType || '-'; // 원동기형식

    /* 종합상태 */
    const [color, setColor] = useState(propsData?.color || undefined); // 색상 체크박스
    const [fullPainting, setFullPainting] = useState(!!propsData?.fullPainting); // 색상 - 전체도색
    const [colorChange, setColorChange] = useState(!!propsData?.colorChange); // 색상 - 색상변경
    const [feature, setFeature] = useState(propsData?.feature || undefined); // 주요옵션 체크박스
    // const [featureDisabled, setFeatureDisabled] = useState(propsData?.feature ? propsData?.feature === NoYesType[0] : false); // 주요옵션 Disabled
    const [featureETC, setFeatureETC] = useState(!!propsData?.featureETC); // 주요옵션 - 기타
    const [featureSunroof, setFeatureSunroof] = useState(!!propsData?.featureSunroof); // 주요옵션 - 선루프
    const [featureNavigation, setFeatureNavigation] = useState(!!propsData?.featureNavigation); // 주요옵션 - 네비게이션
    const [inspectionRecordVersion, setInspectionRecordVersion] = useState(propsData?.inspectionRecordVersion ? propsData?.inspectionRecordVersion === 'VERSION_531' : false); // 이전성능기록부로 등록 전환시

    /* 세부사항 - 변속기 */
    const [oilLeakageAutomatic, setOilLeakageAutomatic] = useState<InspectionOilStatusType | undefined>(propsData?.oilLeakageAutomatic || undefined); // A/T - 오일누유
    const [oilLeakageAutomaticSpecialty, setOilLeakageAutomaticSpecialty] = useState(propsData?.oilLeakageAutomaticSpecialty || ''); // A/T - 오일누유 특이사항
    const [oilLevelAutomatic, setOilLevelAutomatic] = useState<InspectionTransmissionOilLevelType | undefined>(propsData?.oilLevelAutomatic || undefined); // A/T - 오일유량 및 상태
    const [oilLevelAutomaticSpecialty, setOilLevelAutomaticSpecialty] = useState(propsData?.oilLevelAutomaticSpecialty || ''); // A/T - 오일유량 및 상태 특이사항
    const [idlingAutomatic, setIdlingAutomatic] = useState<GoodBadType | undefined>(propsData?.idlingAutomatic || undefined); // A/T - 작동상태(공회전)
    const [idlingAutomaticSpecialty, setIdlingAutomaticSpecialty] = useState(propsData?.idlingAutomaticSpecialty || ''); // A/T - 작동상태(공회전) 특이사항
    const [oilLeakageManual, setOilLeakageManual] = useState<InspectionOilStatusType | undefined>(propsData?.oilLeakageManual || undefined); // M/T - 오일누유
    const [oilLeakageManualSpecialty, setOilLeakageManualSpecialty] = useState(propsData?.oilLeakageManualSpecialty || ''); // M/T - 오일누유 특이사항
    const [gearShiftManual, setGearShiftManual] = useState<GoodBadType | undefined>(propsData?.gearShiftManual || undefined); // M/T - 기어변속장치
    const [gearShiftManualSpecialty, setGearShiftManualSpecialty] = useState(propsData?.gearShiftManualSpecialty || ''); // M/T - 기어변속장치 특이사항
    const [oilLevelManual, setOilLevelManual] = useState<InspectionTransmissionOilLevelType | undefined>(propsData?.oilLevelManual || undefined); // M/T - 오일유량 및 상태
    const [oilLevelManualSpecialty, setOilLevelManualSpecialty] = useState(propsData?.oilLevelManualSpecialty || ''); // M/T - 오일유량 및 상태 특이사항
    const [idlingManual, setIdlingManual] = useState<GoodBadType | undefined>(propsData?.idlingManual || undefined); // M/T - 작동상태(공회전)
    const [idlingManualSpecialty, setIdlingManualSpecialty] = useState(propsData?.idlingManualSpecialty || ''); // M/T - 작동상태(공회전) 특이사항
    /* 세부사항 - 고전원전기장치 */
    const [highVoltagePricing, onChangeHighVoltagePricing, setHighVoltagePricing] = useInput(propsData?.highVoltagePricing || '', 'number'); // 고전원전기장치 - 가격조사 산정액
    const [chargingPort, setChargingPort] = useState(propsData?.chargingPort || undefined); // 충전구 절연 상태
    const [chargingPortSpecialty, setChargingPortSpecialty] = useState(propsData?.chargingPortSpecialty || ''); // 충전구 절연 상태 특이사항
    const [regenerativeSystem, setRegenerativeSystem] = useState(propsData?.regenerativeSystem || undefined); // 구동축전지 격리 상태
    const [regenerativeSystemSpecialty, setRegenerativeSystemSpecialty] = useState(propsData?.regenerativeSystemSpecialty || ''); // 구동축전지 격리 상태 특이사항
    const [highVoltageWire, setHighVoltageWire] = useState(propsData?.highVoltageWire || undefined); // 고전원전기배선 상태
    const [highVoltageWireSpecialty, setHighVoltageWireSpecialty] = useState(propsData?.highVoltageWireSpecialty || ''); // 고전원전기배선 상태 특이사항
    const [basePricingType, setBasePricingType] = useState<InspectionBasePricingType>(propsData?.basePricingType || undefined); // 기준서

    /* 최종가격조사 산정금액 */
    const today = new Date();
    const [signatureYear, setSignatureYear] = useState(propsData?.signatureDate ? new Date(propsData?.signatureDate).getFullYear() : today.getFullYear()); // 년도
    const [signatureMonth, setSignatureMonth] = useState(propsData?.signatureDate ? new Date(propsData?.signatureDate).getMonth() + 1 : today.getMonth() + 1); // 월
    const [signatureDay, setSignatureDay] = useState(propsData?.signatureDate ? new Date(propsData?.signatureDate).getDate() : today.getDate()); // 일
    const [signatureDayArr, setSignatureDayArr] = useState([]); // 일 배열
    const [inspectorName, onChangeInspectorName] = useInput(propsData?.inspectorName || ''); // 성능 상태점검자
    const [pricingPersonnelName, onChangePricingPersonnelName] = useInput(propsData?.pricingPersonnelName || ''); // 가격조사산정자
    const [reportPersonnelName, onChangeReportPersonnelName] = useInput(propsData?.reportPersonnelName || ''); // 중고자동차 성능 상태 고지자
    const [finalPricing, onChangeFinalPricing] = useInput(propsData?.finalPricing || '', 'number'); // 취종 가격조사 산정금액
    const [imgList, setImgList] = useState<VehicleInspectionRecordImageType[]>(propsData?.inspectionRecordImageList || []); // 차량점검지 필수
    const imgRef = useRef<any>();
    const [toast, setToast] = useState('');
    const [toastErr, setToastErr] = useState('');

    useEffect(() => {
      // 선택한 달에 맞춰 일 계산
      const lastDay = new Date(signatureYear, signatureMonth, 0).getDate();
      const dayArr: any = [];
      for (let i = 0; i < lastDay; i += 1) {
        dayArr.push(i + 1);
      }
      setSignatureDayArr(dayArr);
    }, [signatureYear, signatureMonth]);

    useEffect(() => {
      setDomReady(true);
    }, []);

    const onChangePricingCheck = useCallback(() => {
      if (pricingCheck) {
        setColor(undefined);
        setFullPainting(false);
        setColorChange(false);
        setFeature(undefined);
        setFeatureETC(false);
        setFeatureSunroof(false);
        setFeatureNavigation(false);
      }
      setPricingCheck(!pricingCheck);
    }, [pricingCheck]);

    const onChangeTransmissionType = useCallback((e: any) => {
      // 자동차 기본정보 - 변속기 종류
      setTransmissionType(e.target.value);
      setTransmissionTypeDisabled(checkTransmissionType(e.target.value));
      setTransmissionAutoTypeDisabled(checkAutoTransmissionType(e.target.value));
      if (transmissionTypeDisabled) {
        // 수동아닐때
        setOilLeakageManual(undefined);
        setOilLeakageManualSpecialty('');
        setGearShiftManual(undefined);
        setGearShiftManualSpecialty('');
        setOilLevelManual(undefined);
        setOilLevelManualSpecialty('');
        setIdlingManual(undefined);
        setIdlingManualSpecialty('');
      }
      // 수동 변속기 일때
      if (transmissionAutoTypeDisabled) {
        setOilLeakageAutomatic(undefined);
        setOilLeakageAutomaticSpecialty('');
        setOilLevelAutomatic(undefined);
        setOilLevelAutomaticSpecialty('');
        setIdlingAutomatic(undefined);
        setIdlingAutomaticSpecialty('');
      }
    }, []);

    const onChangeFuelType = useCallback((e: any) => {
      setFuelType(e.target.value);
      setFuelTypeDisabled(checkFuelType(e.target.value));
      if (fuelTypeDisabled) {
        setHighVoltagePricing('');
        setHighVoltageWire(undefined);
        setHighVoltageWireSpecialty('');
        setRegenerativeSystem(undefined);
        setRegenerativeSystemSpecialty('');
        setChargingPort(undefined);
        setChargingPortSpecialty('');
      }
    }, []);

    const onChangeWarranty = useCallback((e: any) => {
      setWarranty(e.target.value);
    }, []);

    const clickTableRightText = useCallback(() => {
      setInspectionRecordVersion(!inspectionRecordVersion);
    }, [inspectionRecordVersion]);

    const onChangeSignatureYear = useCallback((e: any) => {
      const {value} = e.target;
      setSignatureYear(value);
    }, []);

    const onChangeSignatureMonth = useCallback((e: any) => {
      const {value} = e.target;
      setSignatureMonth(value);
    }, []);

    const onChangeSignatureDay = useCallback((e: any) => {
      const {value} = e.target;
      setSignatureDay(value);
    }, []);

    const InputRadioDom = useCallback((props: any, className?: string) => {
      const color = props.disabled ? '#444' : props.required ? (!props.value ? theme.color.newRed : '#222') : '#222';
      return (
        <>
          {props.text.map((item: string, index: number) => (
            <RadioWrapper
              width={props.width || '50%'}
              key={item + index}
              className={className}
              style={{
                verticalAlign: 'middle',
                float: props.float ? props.float : 'left',
                display: props.display || ''
              }}
            >
              <input
                type={'radio'}
                id={props.name + props.type[index]}
                name={props.name}
                value={props.type[index]}
                checked={props.value === props.type[index]}
                onChange={props.onClick}
                disabled={props.disabled}
                style={{float: 'left', margin: '0 7px 0 0'}}
              />
              <label
                htmlFor={props.name + props.type[index]}
                style={{
                  float: 'left',
                  color
                }}
              >
                <span></span>
                {item}
              </label>
            </RadioWrapper>
          ))}
        </>
      );
    }, []);

    // 사고 교환 수리 이력  storeQuery
    const accidentExchangeHistoryQuery = store.query && JSON.parse(store.query);
    const accidentExchangeHistoryPricing = store.pricing && JSON.parse(store.pricing);
    const accidentExchangeHistorySpecialty = store.specialty && JSON.parse(store.specialty);

    // 자동차 종합상태 storeQuery
    const overallStateOfVehicleQuery = store.overallQuery && JSON.parse(store.overallQuery);
    const overallStateOfVehiclePricing = store.overallPricing && JSON.parse(store.overallPricing);
    const overallStateOfVehicleSpecialty = store.overallSpecialty && JSON.parse(store.overallSpecialty);

    // 자동차 세부사항 storeQuery
    const vehicleDetailsQuery = store.vehicleDetailsQuery && JSON.parse(store.vehicleDetailsQuery);
    const vehicleDetailsPricing = store.vehicleDetailsPricing && JSON.parse(store.vehicleDetailsPricing);
    const vehicleDetailsSpecialty = store.vehicleDetailsSpecialty && JSON.parse(store.vehicleDetailsSpecialty);

    // 자동차 기타사항
    const vehicleOtherInformationQuery = store.vehicleOtherInformationQuery && JSON.parse(store.vehicleOtherInformationQuery);
    const vehicleOtherInformationPricing = store.vehicleOtherInformationPricing && JSON.parse(store.vehicleOtherInformationPricing);
    const vehicleOtherInformationSpecialty = store.vehicleOtherInformationSpecialty && JSON.parse(store.vehicleOtherInformationSpecialty);

    // 기본적으로 보내는값
    const basicQuery = {
      enrollNumber, // 제시번호
      pricingCheck, // 자동차 가격조사 산정 선택
      inspectionRecordNumberFront, // 발행번호 - 앞
      inspectionRecordNumberMiddle, // 발행번호 - 중간
      inspectionRecordNumberBack, // 발행번호 - 뒤
      validPeriodStart, // 검사유효기간 - 시작
      validPeriodEnd, // 검사유효기간 - 종료
      transmissionType, // 변속기 종류
      fuelType, // 사용연료
      warranty, // 보증유형
      // 자동차 종합상태
      odometerStatus: overallStateOfVehicleQuery?.odometerStatus, // 주행거리 계기상태
      vehicleIdentityNumberStatus: overallStateOfVehicleQuery?.vehicleIdentityNumberStatus, // 차대번호 표기
      smokeEmissionPercentage: Number(overallStateOfVehicleQuery?.smokeEmissionPercentage), // 매연배출가스(%)
      tuning: overallStateOfVehicleQuery?.tuning, // 튜닝
      tuningLegal: overallStateOfVehicleQuery?.tuningLegal, // 튜닝-적법
      tuningDevice: overallStateOfVehicleQuery?.tuningDevice, // 튜닝-불법
      tuningIllegal: overallStateOfVehicleQuery?.tuningIllegal, // 튜닝-구조
      tuningStructure: overallStateOfVehicleQuery?.tuningStructure, // 튜닝-장치
      specialHistory: overallStateOfVehicleQuery?.specialHistory, // 특별이력
      specialHistoryFire: overallStateOfVehicleQuery?.specialHistoryFire, // 특별이력-화재
      specialHistoryFlood: overallStateOfVehicleQuery?.specialHistoryFlood, // 특별이력-침수
      usageChange: overallStateOfVehicleQuery?.usageChange, // 용도번경
      usageChangeRent: overallStateOfVehicleQuery?.usageChangeRent, // 용도번경-렌트
      usageChangeBusiness: overallStateOfVehicleQuery?.usageChangeBusiness, // 용도번경-영업용
      hoodOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.hoodOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.hoodOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.hoodOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.hoodOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.hoodOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.hoodOuterPanelDamage
      },
      frontLeftFenderOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.frontLeftFenderOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontLeftFenderOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontLeftFenderOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontLeftFenderOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.frontLeftFenderOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.frontLeftFenderOuterPanelDamage
      },
      frontRightFenderOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.frontRightFenderOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontRightFenderOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontRightFenderOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontRightFenderOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.frontRightFenderOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.frontRightFenderOuterPanelDamage
      },
      frontLeftDoorOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.frontLeftDoorOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontLeftDoorOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontLeftDoorOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontLeftDoorOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.frontLeftDoorOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.frontLeftDoorOuterPanelDamage
      },
      frontRightDoorOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.frontRightDoorOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontRightDoorOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontRightDoorOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontRightDoorOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.frontRightDoorOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.frontRightDoorOuterPanelDamage
      },
      rearLeftDoorOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.rearLeftDoorOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.rearLeftDoorOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.rearLeftDoorOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.rearLeftDoorOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.rearLeftDoorOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.rearLeftDoorOuterPanelDamage
      },
      rearRightDoorOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.rearRightDoorOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.rearRightDoorOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.rearRightDoorOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.rearRightDoorOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.rearRightDoorOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.rearRightDoorOuterPanelDamage
      },
      trunkLidOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.trunkLidOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.trunkLidOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.trunkLidOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.trunkLidOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.trunkLidOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.trunkLidOuterPanelDamage
      },
      radiatorOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.radiatorOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.radiatorOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.radiatorOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.radiatorOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.radiatorOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.radiatorOuterPanelDamage
      },
      roofOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.roofOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.roofOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.roofOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.roofOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.roofOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.roofOuterPanelDamage
      },
      quarterLeftOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.quarterLeftOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.quarterLeftOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.quarterLeftOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.quarterLeftOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.quarterLeftOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.quarterLeftOuterPanelDamage
      },
      quarterRightOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.quarterRightOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.quarterRightOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.quarterRightOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.quarterRightOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.quarterRightOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.quarterRightOuterPanelDamage
      },
      sideSillLeftOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.sideSillLeftOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.sideSillLeftOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.sideSillLeftOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.sideSillLeftOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.sideSillLeftOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.sideSillLeftOuterPanelDamage
      },
      sideSillRightOuterPanel: {
        exchange: accidentExchangeHistoryQuery?.sideSillRightOuterPanelExchange,
        sheetMetal: accidentExchangeHistoryQuery?.sideSillRightOuterPanelSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.sideSillRightOuterPanelCorrosion,
        scratch: accidentExchangeHistoryQuery?.sideSillRightOuterPanelScratch,
        uneven: accidentExchangeHistoryQuery?.sideSillRightOuterPanelUneven,
        damage: accidentExchangeHistoryQuery?.sideSillRightOuterPanelDamage
      },
      frontPanelChassis: {
        exchange: accidentExchangeHistoryQuery?.frontPanelChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontPanelChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontPanelChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontPanelChassisScratch,
        uneven: accidentExchangeHistoryQuery?.frontPanelChassisUneven,
        damage: accidentExchangeHistoryQuery?.frontPanelChassisDamage
      },
      crossMemberChassis: {
        exchange: accidentExchangeHistoryQuery?.crossMemberChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.crossMemberChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.crossMemberChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.crossMemberChassisScratch,
        uneven: accidentExchangeHistoryQuery?.crossMemberChassisUneven,
        damage: accidentExchangeHistoryQuery?.crossMemberChassisDamage
      },
      insideLeftPanelChassis: {
        exchange: accidentExchangeHistoryQuery?.insideLeftPanelChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.insideLeftPanelChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.insideLeftPanelChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.insideLeftPanelChassisScratch,
        uneven: accidentExchangeHistoryQuery?.insideLeftPanelChassisUneven,
        damage: accidentExchangeHistoryQuery?.insideLeftPanelChassisDamage
      },
      insideRightPanelChassis: {
        exchange: accidentExchangeHistoryQuery?.insideRightPanelChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.insideRightPanelChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.insideRightPanelChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.insideRightPanelChassisScratch,
        uneven: accidentExchangeHistoryQuery?.insideRightPanelChassisUneven,
        damage: accidentExchangeHistoryQuery?.insideRightPanelChassisDamage
      },
      rearPanelChassis: {
        exchange: accidentExchangeHistoryQuery?.rearPanelChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.rearPanelChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.rearPanelChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.rearPanelChassisScratch,
        uneven: accidentExchangeHistoryQuery?.rearPanelChassisUneven,
        damage: accidentExchangeHistoryQuery?.rearPanelChassisDamage
      },
      trunkFloorChassis: {
        exchange: accidentExchangeHistoryQuery?.trunkFloorChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.trunkFloorChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.trunkFloorChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.trunkFloorChassisScratch,
        uneven: accidentExchangeHistoryQuery?.trunkFloorChassisUneven,
        damage: accidentExchangeHistoryQuery?.trunkFloorChassisDamage
      },
      frontLeftSideMemberChassis: {
        exchange: accidentExchangeHistoryQuery?.frontLeftSideMemberChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontLeftSideMemberChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontLeftSideMemberChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontLeftSideMemberChassisScratch,
        uneven: accidentExchangeHistoryQuery?.frontLeftSideMemberChassisUneven,
        damage: accidentExchangeHistoryQuery?.frontLeftSideMemberChassisDamage
      },
      frontRightSideMemberChassis: {
        exchange: accidentExchangeHistoryQuery?.frontRightSideMemberChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontRightSideMemberChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontRightSideMemberChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontRightSideMemberChassisScratch,
        uneven: accidentExchangeHistoryQuery?.frontRightSideMemberChassisUneven,
        damage: accidentExchangeHistoryQuery?.frontRightSideMemberChassisDamage
      },
      rearLeftSideMemberChassis: {
        exchange: accidentExchangeHistoryQuery?.rearLeftSideMemberChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.rearLeftSideMemberChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.rearLeftSideMemberChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.rearLeftSideMemberChassisScratch,
        uneven: accidentExchangeHistoryQuery?.rearLeftSideMemberChassisUneven,
        damage: accidentExchangeHistoryQuery?.rearLeftSideMemberChassisDamage
      },
      rearRightSideMemberChassis: {
        exchange: accidentExchangeHistoryQuery?.rearRightSideMemberChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.rearRightSideMemberChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.rearRightSideMemberChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.rearRightSideMemberChassisScratch,
        uneven: accidentExchangeHistoryQuery?.rearRightSideMemberChassisUneven,
        damage: accidentExchangeHistoryQuery?.rearRightSideMemberChassisDamage
      },
      frontLeftWheelHouseChassis: {
        exchange: accidentExchangeHistoryQuery?.frontLeftWheelHouseChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontLeftWheelHouseChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontLeftWheelHouseChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontLeftWheelHouseChassisScratch,
        uneven: accidentExchangeHistoryQuery?.frontLeftWheelHouseChassisUneven,
        damage: accidentExchangeHistoryQuery?.frontLeftWheelHouseChassisDamage
      },
      frontRightWheelHouseChassis: {
        exchange: accidentExchangeHistoryQuery?.frontRightWheelHouseChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.frontRightWheelHouseChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.frontRightWheelHouseChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.frontRightWheelHouseChassisScratch,
        uneven: accidentExchangeHistoryQuery?.frontRightWheelHouseChassisUneven,
        damage: accidentExchangeHistoryQuery?.frontRightWheelHouseChassisDamage
      },
      rearLeftWheelHouseChassis: {
        exchange: accidentExchangeHistoryQuery?.rearLeftWheelHouseChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.rearLeftWheelHouseChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.rearLeftWheelHouseChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.rearLeftWheelHouseChassisScratch,
        uneven: accidentExchangeHistoryQuery?.rearLeftWheelHouseChassisUneven,
        damage: accidentExchangeHistoryQuery?.rearLeftWheelHouseChassisDamage
      },
      rearRightWheelHouseChassis: {
        exchange: accidentExchangeHistoryQuery?.rearRightWheelHouseChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.rearRightWheelHouseChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.rearRightWheelHouseChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.rearRightWheelHouseChassisScratch,
        uneven: accidentExchangeHistoryQuery?.rearRightWheelHouseChassisUneven,
        damage: accidentExchangeHistoryQuery?.rearRightWheelHouseChassisDamage
      },
      pillarLeftPanelAChassis: {
        exchange: accidentExchangeHistoryQuery?.pillarLeftPanelAChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.pillarLeftPanelAChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.pillarLeftPanelAChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.pillarLeftPanelAChassisScratch,
        uneven: accidentExchangeHistoryQuery?.pillarLeftPanelAChassisUneven,
        damage: accidentExchangeHistoryQuery?.pillarLeftPanelAChassisDamage
      },
      pillarRightPanelAChassis: {
        exchange: accidentExchangeHistoryQuery?.pillarRightPanelAChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.pillarRightPanelAChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.pillarRightPanelAChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.pillarRightPanelAChassisScratch,
        uneven: accidentExchangeHistoryQuery?.pillarRightPanelAChassisUneven,
        damage: accidentExchangeHistoryQuery?.pillarRightPanelAChassisDamage
      },
      pillarLeftPanelBChassis: {
        exchange: accidentExchangeHistoryQuery?.pillarLeftPanelBChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.pillarLeftPanelBChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.pillarLeftPanelBChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.pillarLeftPanelBChassisScratch,
        uneven: accidentExchangeHistoryQuery?.pillarLeftPanelBChassisUneven,
        damage: accidentExchangeHistoryQuery?.pillarLeftPanelBChassisDamage
      },
      pillarRightPanelBChassis: {
        exchange: accidentExchangeHistoryQuery?.pillarRightPanelBChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.pillarRightPanelBChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.pillarRightPanelBChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.pillarRightPanelBChassisScratch,
        uneven: accidentExchangeHistoryQuery?.pillarRightPanelBChassisUneven,
        damage: accidentExchangeHistoryQuery?.pillarRightPanelBChassisDamage
      },
      pillarLeftPanelCChassis: {
        exchange: accidentExchangeHistoryQuery?.pillarLeftPanelCChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.pillarLeftPanelCChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.pillarLeftPanelCChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.pillarLeftPanelCChassisScratch,
        uneven: accidentExchangeHistoryQuery?.pillarLeftPanelCChassisUneven,
        damage: accidentExchangeHistoryQuery?.pillarLeftPanelCChassisDamage
      },
      pillarRightPanelCChassis: {
        exchange: accidentExchangeHistoryQuery?.pillarRightPanelCChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.pillarRightPanelCChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.pillarRightPanelCChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.pillarRightPanelCChassisScratch,
        uneven: accidentExchangeHistoryQuery?.pillarRightPanelCChassisUneven,
        damage: accidentExchangeHistoryQuery?.pillarRightPanelCChassisDamage
      },
      packageTrayChassis: {
        exchange: accidentExchangeHistoryQuery?.packageTrayChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.packageTrayChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.packageTrayChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.packageTrayChassisScratch,
        uneven: accidentExchangeHistoryQuery?.packageTrayChassisUneven,
        damage: accidentExchangeHistoryQuery?.packageTrayChassisDamage
      },
      dashPanelChassis: {
        exchange: accidentExchangeHistoryQuery?.dashPanelChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.dashPanelChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.dashPanelChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.dashPanelChassisScratch,
        uneven: accidentExchangeHistoryQuery?.dashPanelChassisUneven,
        damage: accidentExchangeHistoryQuery?.dashPanelChassisDamage
      },
      floorPanelChassis: {
        exchange: accidentExchangeHistoryQuery?.floorPanelChassisExchange,
        sheetMetal: accidentExchangeHistoryQuery?.floorPanelChassisSheetMetal,
        corrosion: accidentExchangeHistoryQuery?.floorPanelChassisCorrosion,
        scratch: accidentExchangeHistoryQuery?.floorPanelChassisScratch,
        uneven: accidentExchangeHistoryQuery?.floorPanelChassisUneven,
        damage: accidentExchangeHistoryQuery?.floorPanelChassisDamage
      },
      // 자동차 세부사항
      selfInspectionMotor: vehicleDetailsQuery?.selfInspectionMotor, // 원동기 옵션
      selfInspectionTransmission: vehicleDetailsQuery?.selfInspectionTransmission, // 변동기 옵션
      idlingStatus: vehicleDetailsQuery?.idlingStatus, // 작동상태(공회전) 옵션
      oilLeakageCylinderCover: vehicleDetailsQuery?.oilLeakageCylinderCover, // 오일누유 - 로커암커버
      oilLeakageCylinderHeadGasket: vehicleDetailsQuery?.oilLeakageCylinderHeadGasket, // 오일누유 – 실린더 헤드 / 개스킷
      oilLeakageCylinderBlockOilPan: vehicleDetailsQuery?.oilLeakageCylinderBlockOilPan, // 오일누유 – 실린더 블록 / 오일팬
      oilLevel: vehicleDetailsQuery?.oilLevel, // 오일유량
      coolantLeakageCylinderCover: vehicleDetailsQuery?.coolantLeakageCylinderCover, // 냉각수 - 실린더 헤드 / 개스킷
      coolantLeakageWaterPump: vehicleDetailsQuery?.coolantLeakageWaterPump, // 냉각수 - 워터펌프
      coolantLeakageRadiator: vehicleDetailsQuery?.coolantLeakageRadiator, // 냉각수 - 라디에이터
      coolantLeve: vehicleDetailsQuery?.coolantLeve, // 냉각수 - 냉각수 수량
      commonRail: vehicleDetailsQuery?.commonRail, // 고압펌프(커먼레일) - 디젤엔진
      clutchAssembly: vehicleDetailsQuery?.clutchAssembly, // 클러치 어셈블리
      constantSpeedJoint: vehicleDetailsQuery?.constantSpeedJoint, // 등속조인트
      propellerShaftBearing: vehicleDetailsQuery?.propellerShaftBearing, // 추진축 및 베어링
      oilLeakageSteeringSystem: vehicleDetailsQuery?.oilLeakageSteeringSystem, // 동력조향 작동 오일 누유
      steeringPump: vehicleDetailsQuery?.steeringPump, // 작동상태 - 스티어링 펌프
      steeringGear: vehicleDetailsQuery?.steeringGear, // 작동상태 - 스티어링 기어(MDPS포함)
      tieRodEndBallJoint: vehicleDetailsQuery?.tieRodEndBallJoint, // 작동상태 - 타이로드엔드 및 볼 조인트
      oilLeakageBrakeMasterCylinder: vehicleDetailsQuery?.oilLeakageBrakeMasterCylinder, // 브레이크 마스터 실린더오일 누유
      oilLeakageBrake: vehicleDetailsQuery?.oilLeakageBrake, // 브레이크 오일 누유
      brakeSystem: vehicleDetailsQuery?.brakeSystem, // 배려장치 상태
      generator: vehicleDetailsQuery?.generator, // 발전기 출력
      starterMotor: vehicleDetailsQuery?.starterMotor, // 시동 모터
      wiperMotor: vehicleDetailsQuery?.wiperMotor, // 와이퍼 모터 기능
      ventilatingMotor: vehicleDetailsQuery?.ventilatingMotor, // 실내송풍 모터
      radiatorFanMotor: vehicleDetailsQuery?.radiatorFanMotor, // 라디에이터 팬 모터
      windowMotor: vehicleDetailsQuery?.windowMotor, // 윈도우 모터
      chargingPort: vehicleDetailsQuery?.chargingPort, // 충전구 절연 상태
      regenerativeSystem: vehicleDetailsQuery?.regenerativeSystem, // 구동축전지 격리 상태
      highVoltageWire: vehicleDetailsQuery?.highVoltageWire, // 고전원전기배선 상태
      fuelLeakage: vehicleDetailsQuery?.fuelLeakage, // 연료누출
      inspectorSpecialty: vehicleOtherInformationSpecialty?.inspectorSpecialty, // 성능 상태점검자 의견
      inspectorName, // 성능 상태 점검자 이름
      reportPersonnelName, // 중고자동차 성능 상태 고지자
      signatureDate: `${signatureYear}-${signatureMonth}-${signatureDay}`, // 서명 날짜
      inspectionRecordImageList: imgList, // 성능점검지 이미지
      inspectionRecordVersion
    };

    // 자동 변속기 쿼리
    const automaticQuery = {
      oilLeakageAutomatic: vehicleDetailsQuery?.oilLeakageAutomatic, // A/T - 오일누유
      oilLevelAutomatic: vehicleDetailsQuery?.oilLevelAutomatic, // A/T - 오일유량 및 상태
      idlingAutomatic: vehicleDetailsQuery?.idlingAutomatic // A/T - 작동상태(공회전)
    };

    // 수동 변속기 쿼리
    const manualQuery = {
      oilLeakageManual: vehicleDetailsQuery?.oilLeakageManual, // M/T - 오일누유
      gearShiftManual: vehicleDetailsQuery?.gearShiftManual, // M/T - 기어변속장치
      oilLevelManual: vehicleDetailsQuery?.oilLevelManual, // M/T - 오일유량 및 상태
      idlingManual: vehicleDetailsQuery?.idlingManual // M/T - 작동상태(공회전)
    };

    // 자동 변속기 특이사항 활성시 쿼리
    const automaticSpecialtyQuery = {
      oilLeakageAutomaticSpecialty: vehicleDetailsSpecialty?.oilLeakageAutomaticSpecialty, // A/T - 오일누유 특이사항
      oilLevelAutomaticSpecialty: vehicleDetailsSpecialty?.oilLevelAutomaticSpecialty, // A/T - 오일유량 및 상태 특이사항
      idlingAutomaticSpecialty: vehicleDetailsSpecialty?.idlingAutomaticSpecialty // A/T - 작동상태(공회전) 특이사항
    };

    // 수동 변속기 특이사항 활성시 쿼리
    const manualSpecialtyQuery = {
      oilLeakageManualSpecialty: vehicleDetailsSpecialty?.oilLeakageManualSpecialty, // M/T - 오일누유 특이사항
      gearShiftManualSpecialty: vehicleDetailsSpecialty?.gearShiftManualSpecialty, // M/T - 기어변속장치 특이사항
      oilLevelManualSpecialty: vehicleDetailsSpecialty?.oilLevelManualSpecialty, // M/T - 오일유량 및 상태 특이사항
      idlingManualSpecialty: vehicleDetailsSpecialty?.idlingManualSpecialty // M/T - 작동상태(공회전) 특이사항
    };

    // 가격조사 선택시 보내는값
    const pricingCheckQuery = {
      basePricingCalculating, // 가격산정 기준가격
      // 자동차 종합상태
      mileageStatus: overallStateOfVehicleQuery?.mileageStatus, // 주행거리
      mileage: overallStateOfVehicleQuery?.mileage, // 주행거리
      mileagePricing: overallStateOfVehiclePricing?.mileagePricing, // 주행거리 - 산정
      mileageSpecialty: overallStateOfVehicleSpecialty?.mileageSpecialty,
      mileageStatusPricing: overallStateOfVehiclePricing?.mileageStatusPricing, // 주행거리 가격산정
      mileageStatusSpecialty: overallStateOfVehicleSpecialty?.mileageStatusSpecialty, // 주행거리 특기사항
      vehicleIdentityNumberStatusPricing: overallStateOfVehiclePricing?.vehicleIdentityNumberStatusPricing, // 주행거리 표기 가격조사 산정액
      vehicleIdentityNumberStatusSpecialty: overallStateOfVehicleSpecialty?.vehicleIdentityNumberStatusSpecialty, // 주행거리 표기 특이사항
      emissionPricing: overallStateOfVehiclePricing?.emissionPricing, // 배출가스 - 가격조사 산정액
      emissionSpecialty: overallStateOfVehicleSpecialty?.emissionSpecialty, // 배출가스 특이사항
      tuningPricing: overallStateOfVehiclePricing?.tuningPricing, // 튜닝 - 가격조사 산정액
      tuningSpecialty: overallStateOfVehicleSpecialty?.tuningSpecialty, // 튜닝 특이사항
      specialHistoryPricing: overallStateOfVehiclePricing?.specialHistoryPricing, // 특별이력 가격조사 산정액
      specialHistorySpecialty: overallStateOfVehicleSpecialty?.specialHistorySpecialty, // 특별이력 특이사항
      usageChangePricing: overallStateOfVehiclePricing?.usageChangePricing, // 용도번경 가격조사 산정액
      usageChangeSpecialty: overallStateOfVehicleSpecialty?.usageChangeSpecialty, // 용도번경 특이사항
      color: overallStateOfVehicleQuery?.color, // 색상
      colorPricing: overallStateOfVehiclePricing?.colorPricing, // 색상 가격산정
      colorSpecialty: overallStateOfVehicleSpecialty?.colorSpecialty, // 색상 특이사항
      feature: overallStateOfVehicleQuery?.feature, // 주요옵션
      featurePricing: overallStateOfVehiclePricing?.featurePricing, // 주요옵션 - 가격조션사 산정액
      featureSpecialty: overallStateOfVehicleSpecialty?.featureSpecialty, // 주요옵션 - 특이사항
      // 자동차 세부사항
      selfInspectionPricing: vehicleDetailsPricing?.selfInspectionPricing, // 자가진단 가격조사 산정액
      selfInspectionMotorSpecialty: vehicleDetailsSpecialty?.selfInspectionMotorSpecialty, // 원동기 특이사항
      selfInspectionTransmissionSpecialty: vehicleDetailsSpecialty?.selfInspectionTransmissionSpecialty, // 변속기 특이사항
      motorPricing: vehicleDetailsPricing?.motorPricing, // 원동기 가격조사 산정액
      idlingStatusSpecialty: vehicleDetailsSpecialty?.idlingStatusSpecialty, // 작동상태(공회전) 특이사항
      oilLeakageCylinderCoverSpecialty: vehicleDetailsSpecialty?.oilLeakageCylinderCoverSpecialty, // 오일누유 - 로커암커버 특이사항
      oilLeakageCylinderHeadGasketSpecialty: vehicleDetailsSpecialty?.oilLeakageCylinderHeadGasketSpecialty, // 오일누유 – 실린더 헤드 / 개스킷 특이사항
      oilLeakageCylinderBlockOilPanSpecialty: vehicleDetailsSpecialty?.oilLeakageCylinderBlockOilPanSpecialty, // 오일누유 – 실린더 블록 / 오일팬 특이사항v
      oilLevelSpecialty: vehicleDetailsSpecialty?.oilLevelSpecialty, // 오일유량 특이사항
      coolantLeakageCylinderCoverSpecialty: vehicleDetailsSpecialty?.coolantLeakageCylinderCoverSpecialty, // 냉각수 - 실린더 헤드 / 개스킷 특이사항
      coolantLeakageWaterPumpSpecialty: vehicleDetailsSpecialty?.coolantLeakageWaterPumpSpecialty, // 냉각수 - 워터펌프 특이사항
      coolantLeakageRadiatorSpecialty: vehicleDetailsSpecialty?.coolantLeakageRadiatorSpecialty, // 냉각수 - 라디에이터 특이사항
      coolantLeveSpecialty: vehicleDetailsSpecialty?.coolantLeveSpecialty, // 냉각수 - 냉각수 수량 특이사항
      commonRailSpecialty: vehicleDetailsSpecialty?.commonRailSpecialty, // 고압펌프(커먼레일) - 디젤엔진 특이사항
      transmissionPricing: vehicleDetailsPricing?.transmissionPricing, // 변속기 - 가격조사 산정액
      powerPricing: vehicleDetailsPricing?.powerPricing, // 동력전달 - 가격조사 산정액
      clutchAssemblySpecialty: vehicleDetailsSpecialty?.clutchAssemblySpecialty, // 클러치 어셈블리 특이사항
      constantSpeedJointSpecialty: vehicleDetailsSpecialty?.constantSpeedJointSpecialty, // 등속조인트 특이사항
      propellerShaftBearingSpecialty: vehicleDetailsSpecialty?.propellerShaftBearingSpecialty, // 추진축 및 베어링 특이사항
      differentialGearSpecialty: vehicleDetailsSpecialty?.differentialGearSpecialty, // 디퍼렌셜 기어
      steeringPricing: vehicleDetailsPricing?.steeringPricing, // 조향 - 가격조사 산정액
      oilLeakageSteeringSystemSpecialty: vehicleDetailsSpecialty?.oilLeakageSteeringSystemSpecialty, // 동력조향 작동 오일 누유 특이사항
      steeringPumpSpecialty: vehicleDetailsSpecialty?.steeringPumpSpecialty, // 작동상태 - 스티어링 펌프 특이사항
      steeringGearSpecialty: vehicleDetailsSpecialty?.steeringGearSpecialty, // 작동상태 - 스티어링 기어(MDPS포함) 특이사항
      steeringJointSpecialty: vehicleDetailsSpecialty?.steeringJointSpecialty, // 작동상태 - 스티어링 조인트 특이사항
      powerSteeringHoseSpecialty: vehicleDetailsSpecialty?.powerSteeringHoseSpecialty, // 작동상태 - 파워고압호스 특이사항
      tieRodEndBallJointSpecialty: vehicleDetailsSpecialty?.tieRodEndBallJointSpecialty, // 작동상태 - 타이로드엔드 및 볼 조인트 특이사항
      brakePricing: vehicleDetailsPricing?.brakePricing, // 제동 - 가격조사 산정액
      oilLeakageBrakeMasterCylinderSpecialty: vehicleDetailsSpecialty?.oilLeakageBrakeMasterCylinderSpecialty, // 브레이크 마스터 실린더오일 누유 특이사항
      oilLeakageBrakeSpecialty: vehicleDetailsSpecialty?.oilLeakageBrakeSpecialty, // 브레이크 오일 누유 특이사항
      brakeSystemSpecialty: vehicleDetailsSpecialty?.brakeSystemSpecialty, // 배려장치 상태 특이사항
      electricityPricing: vehicleDetailsPricing?.electricityPricing, // 동력전달 - 가격조사 산정액
      generatorSpecialty: vehicleDetailsSpecialty?.generatorSpecialty, // 발전기 출력 특이사항
      starterMotorSpecialty: vehicleDetailsSpecialty?.starterMotorSpecialty, // 시동 모터 특이사항
      wiperMotorSpecialty: vehicleDetailsSpecialty?.wiperMotorSpecialty, // 와이퍼 모터 기능 특이사항
      ventilatingMotorSpecialty: vehicleDetailsSpecialty?.ventilatingMotorSpecialty, // 실내송풍 모터 특이사항
      radiatorFanMotorSpecialty: vehicleDetailsSpecialty?.radiatorFanMotorSpecialty, // 라디에이터 팬 모터 특이사항
      windowMotorSpecialty: vehicleDetailsSpecialty?.windowMotorSpecialty, // 윈도우 모터 특이사항
      highVoltagePricing: vehicleDetailsPricing?.highVoltagePricing, // 고전원 전기장치 - 가격조사 산정액
      chargingPortSpecialty: vehicleDetailsSpecialty?.chargingPortSpecialty, // 충전구 절연 상태 특이사항
      regenerativeSystemSpecialty: vehicleDetailsSpecialty?.regenerativeSystemSpecialty, // 구동축전지 격리 상태 특이사항
      highVoltageWireSpecialty: vehicleDetailsSpecialty?.highVoltageWireSpecialty, // 고전원전기배선 상태 특이사항
      fuelLeakagePricing: vehicleDetailsPricing?.fuelLeakagePricing, // 연료누출 가격조사 산정액
      fuelLeakageSpecialty: vehicleDetailsSpecialty?.fuelLeakageSpecialty, // 연료누출 특이사항
      // 자동차 기타사항
      exterior: vehicleOtherInformationQuery?.exterior, // 외장
      interior: vehicleOtherInformationQuery?.interior, // 내장
      polish: vehicleOtherInformationQuery?.polish, // 광택
      cabinCleanness: vehicleOtherInformationQuery?.cabinCleanness, // 룸 크리닝
      wheel: vehicleOtherInformationQuery?.wheel, // 휠
      wheelDriverFront: vehicleOtherInformationQuery?.wheelDriverFront, // 휠 - 운전석 전
      wheelDriverRear: vehicleOtherInformationQuery?.wheelDriverRear, // 휠 - 운전석 후
      wheelPassengerFront: vehicleOtherInformationQuery?.wheelPassengerFront, // 휠 - 동반석 전
      wheelPassengerRear: vehicleOtherInformationQuery?.wheelPassengerRear, // 휠 - 동반석 후
      wheelEmergency: vehicleOtherInformationQuery?.wheelEmergency, // 휠 - 응급
      tire: vehicleOtherInformationQuery?.tire, // 타이어
      tireDriverFront: vehicleOtherInformationQuery?.tireDriverFront, // 타이어 - 운전석 전
      tireDriverRear: vehicleOtherInformationQuery?.tireDriverRear, // 타이어 - 운전석 후
      tirePassengerFront: vehicleOtherInformationQuery?.tirePassengerFront, // 타이어 - 동반석 전
      tirePassengerRear: vehicleOtherInformationQuery?.tirePassengerRear, // 타이어 - 동반석 후
      tireEmergency: vehicleOtherInformationQuery?.tireEmergency, // 타이어 - 응급
      window: vehicleOtherInformationQuery?.window, // 유리
      basicItem: vehicleOtherInformationQuery?.basicItem, // 기본품목
      basicItemInstruction: vehicleOtherInformationQuery?.basicItemInstruction, // 기본품목 - 사용설명서
      basicItemSafetyTripod: vehicleOtherInformationQuery?.basicItemSafetyTripod, // 기본품목 - 안전삼각대
      basicItemJack: vehicleOtherInformationQuery?.basicItemJack, // 기본품목 - 잭
      basicItemSpanner: vehicleOtherInformationQuery?.basicItemSpanner, // 기본품목 - 스패너
      otherInformationPricing: vehicleOtherInformationPricing?.otherInformationPricing,
      pricingPersonnelSpecialty: vehicleOtherInformationSpecialty?.pricingPersonnelSpecialty, // 가격조사산정자 의견
      pricingPersonnelName, //  가격 조사 산정자 이름
      finalPricing, // 최종 가격조사 산정금액
      basePricingType // 기준서
    };

    // 이전버전 보내는값
    const beforeQuery = {
      usageChangeLease: overallStateOfVehicleQuery?.usageChangeLease, // 용도변경 - 리스
      fullPainting: overallStateOfVehicleQuery?.fullPainting, // 전체도색
      colorChange: overallStateOfVehicleQuery?.colorChange, // 색상변경
      featureETC: overallStateOfVehicleQuery?.featureETC, // 주요옵션-기타
      featureSunroof: overallStateOfVehicleQuery?.featureSunroof, // 주요옵션-썬루프
      featureNavigation: overallStateOfVehicleQuery?.featureNavigation, // 주요옵션-네비케이션
      outerPanel1RankPricing: accidentExchangeHistoryPricing?.outerPanel1RankPricing, // 외판부위 1랭킹 - 가격산정금액
      outerPanel1RankSpecialty: accidentExchangeHistorySpecialty?.outerPanel1RankSpecialty, // 외판부위 1랭킹 - 특이사항 추가
      outerPanel2RankPricing: accidentExchangeHistoryPricing?.outerPanel2RankPricing, // 외판부위 2랭킹 - 가격산정금액
      outerPanel2RankSpecialty: accidentExchangeHistorySpecialty?.outerPanel2RankSpecialty, // 외판부위 2랭킹 - 특이사항
      mainChassisPricing: accidentExchangeHistoryPricing?.mainChassisPricing, // 주요골격 - 가격산정금액
      mainChassisSpecialty: accidentExchangeHistorySpecialty?.mainChassisSpecialty // 주요골격 - 특이사항
    };

    // 개정된버전 보내는값
    const afterQuery = {
      hcEmissionPPM: Number(overallStateOfVehicleQuery?.hcEmissionPPM), // 배출가스(ppm)
      coEmissionPercentage: Number(overallStateOfVehicleQuery?.coEmissionPercentage), // 일산탄소배출가스(%)
      recall: overallStateOfVehicleQuery?.recall, // 리콜
      recallStatus: overallStateOfVehicleQuery?.recallStatus, // 리콜대상
      accidentRepairHistoryPricing: accidentExchangeHistoryPricing?.accidentRepairHistoryPricing, // 사고교환수리 - 가격산정금액
      accidentRepairHistorySpecialty: accidentExchangeHistorySpecialty?.accidentRepairHistorySpecialty, // 사고교환수리 - 특이사항
      differentialGear: vehicleDetailsQuery?.differentialGear, // 디퍼렌셜 기어
      steeringJoint: vehicleDetailsQuery?.steeringJoint, // 작동상태 - 스티어링조인트
      powerSteeringHose: vehicleDetailsQuery?.powerSteeringHose // 작동상태 - 파워고압호스
    };

    // 이전버전 && 체크
    const beforePricingCheckQuery = {
      fullPainting: overallStateOfVehicleQuery?.fullPainting, // 전체도색
      colorChange: overallStateOfVehicleQuery?.colorChange, // 색상변경
      featureETC: overallStateOfVehicleQuery?.featureETC, // 주요옵션-기타
      featureSunroof: overallStateOfVehicleQuery?.featureSunroof, // 주요옵션-썬루프
      featureNavigation: overallStateOfVehicleQuery?.featureNavigation // 주요옵션-네비케이션
    };

    // 임시저장 or 확인 클릭시
    const clickRecordSubmit = useCallback(
      (value) => {
        if (validPeriodStart || validPeriodEnd) {
          if (validPeriodStart.length < 8 && validPeriodEnd.length < 8) {
            setToastErr('검사 유효기간을 올바르게 입력하세요.');
            return false;
          }
        }
        const temp = value === 'temp';
        if (!temp && imgList.length < 2) {
          setToastErr('이미지를 2장 이상 등록해주세요.');
          return false;
        }
        // 쿼리 체크
        let Query = inspectionRecordVersion ? {...basicQuery, ...beforeQuery} : {...basicQuery, ...afterQuery};
        Query = transmissionType === 'MANUAL' ? {...Query, ...manualQuery} : {...Query, ...automaticQuery};
        Query = transmissionType === 'MANUAL' && pricingCheck ? {...Query, ...manualSpecialtyQuery} : {...Query, ...automaticSpecialtyQuery};
        Query = pricingCheck ? {...Query, ...pricingCheckQuery} : Query;
        Query = inspectionRecordVersion && pricingCheck ? {...Query, ...beforePricingCheckQuery} : Query;
        !temp ? setRecordApi(Query) : setTemporaryRecordApi(Query);
      },
      [basicQuery, beforeQuery, inspectionRecordVersion, afterQuery, signatureYear, signatureMonth, signatureDay, transmissionType, automaticQuery, automaticSpecialtyQuery, manualQuery, manualSpecialtyQuery]
    );

    // 확인
    const setRecordApi = useCallback(
      (query) => {
        setVehicleInspectionRecordApi(id, query).then((res) => {
          if (res) {
            if (res.setVehicleInspectionRecord) {
              alert('등록되었습니다');
              router.back();
            } else {
              alert(res.errors[0].message.toString());
            }
          }
        });
      },
      [basicQuery, beforeQuery, inspectionRecordVersion, afterQuery, signatureYear, signatureMonth, signatureDay]
    );

    // 임시저장
    const setTemporaryRecordApi = useCallback(
      (query) => {
        setTemporaryVehicleInspectionRecordApi(id, query).then((res) => {
          if (res) {
            if (res.setTemporaryVehicleInspectionRecord) {
              setToast('임시 저장이 되었습니다.');
            } else {
              alert(res.errors[0].message.toString());
            }
          }
        });
      },
      [basicQuery, beforeQuery, inspectionRecordVersion, afterQuery, signatureYear, signatureMonth, signatureDay]
    );

    // 차량점검지 첨부
    const onChangeImageUpload = useCallback(
      (e: any) => {
        const cookies = parseCookies();
        const accessToken = cookies.carPartnerAccessToken;
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append('file', img, img.name);
        const requestOptions = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: formData
        };
        fetch(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL || 'http://api.carmerce.co.kr/dev/cloud/storage/upload', requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const res = JSON.parse(result);
            const resultName = res[0].name;
            const resultOriginName = res[0].originFilename;
            const list = [...imgList];
            list.push({name: resultName, originFilename: resultOriginName});

            setImgList(list);
            imgRef.current.value = '';
          })
          .catch((error) => {
            console.error('error', error);
            setToastErr('이미지 업로드에 실패했습니다.');
          });
      },
      [imgList]
    );

    const deleteImg = useCallback(
      (index: any) => {
        const list = [...imgList];
        list.splice(index, 1);
        setImgList(list);
      },
      [imgList]
    );

    // 자동차 종합상태
    const OverallStateOfVehicleDom = useCallback(
      () => <OverallStateOfVehicle response={propsData} pricingCheck={pricingCheck} inspectionRecordVersion={inspectionRecordVersion} />,
      [propsData, pricingCheck, inspectionRecordVersion]
    );

    // 사고 교환 수리 이력
    const AccidentExchangeHistoryDom = useCallback(
      () => <AccidentExchangeHistory response={propsData} pricingCheck={pricingCheck} inspectionRecordVersion={inspectionRecordVersion} />,
      [propsData, pricingCheck, inspectionRecordVersion]
    );

    // 자동차 세부사항
    const VehicleDetailsDom = useCallback(
      () => (
        <VehicleDetails
          response={propsData}
          pricingCheck={pricingCheck}
          inspectionRecordVersion={inspectionRecordVersion}
          fuelTypeDisabled={fuelTypeDisabled}
          transmissionTypeDisabled={transmissionTypeDisabled}
          transmissionAutoTypeDisabled={transmissionAutoTypeDisabled}
        />
      ),
      [propsData, pricingCheck, inspectionRecordVersion, fuelTypeDisabled, transmissionTypeDisabled, transmissionAutoTypeDisabled]
    );

    // 자동차 기타사항 & 점검 의견
    const VehicleOtherInformationDom = useCallback(() => <VehicleOtherInformation response={propsData} pricingCheck={pricingCheck} />, [propsData, pricingCheck]);

    return (
      <>
        <Toast type={'success'} toast={toast} setToast={setToast} />
        <Toast type={'error'} toast={toastErr} setToast={setToastErr} />
        <EasyVehicleRegistration />
        <Section>
          {/* 상단 */}
          <Wrapper>
            <Txt fontSize="24px" type="medium" letterSpacing="-1.0px">
              성능 점검 기록부
            </Txt>
            <Wrapper>
              <Wrapper display={'inline-block'}>
                <Txt type={'medium'} fontSize={'13px'} mt={'5px'} lineHeight={'20px'} color={'#555'} style={{opacity: '0.7'}}>
                  매매회원이 중요정보(제시번호, 성능점점기록부, 조합/상사명) 미기재 또는 허위 기재시 표시 광고의 공정화에
                  <br />
                  관한 법률(20조 제1항 제1호)에 의해 1억원이하의 과태료가부과될 수 있습니다.
                </Txt>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {/* 제시번호 입력 */}
          <Wrapper mt={'30px'}>
            <TableBox>
              <TableCaption>제시번호 입력</TableCaption>
              <colgroup>
                <col width={'15%'} />
                <col width={'85%'} />
              </colgroup>
              <tbody>
                <tr key={'enrollNumber'}>
                  <th style={{verticalAlign: 'baseline', paddingTop: '26px'}}>제시번호</th>
                  <td>
                    <EnrollNumberInput placeholder="예) 2012070722" value={enrollNumber} onChange={onChangeEnrollNumber} width={'100%'} maxLength={15} />
                    <Txt type={'medium'} color={theme.color.tableInfo} fontSize={'14px'} mt={10}>
                      자동차관리법 제 58조 및 동 법의 시행규칙 제 120조 에 따라 중고자동차성능∙상태를 점검하였음을 확인합니다.
                    </Txt>
                  </td>
                </tr>
              </tbody>
            </TableBox>
          </Wrapper>
          {/* 자동차 기본정보 */}
          <Wrapper mt={'30px'}>
            <TableBox>
              <TableCaption>자동차 기본정보</TableCaption>
              <TableRightText onClick={clickTableRightText}>{inspectionRecordVersion ? '개정된' : '이전'} 성능점검 기록부로 등록 &gt;</TableRightText>
              <colgroup>
                <col width={'15%'} />
                <col width={'35%'} />
                <col width={'15%'} />
                <col width={'35%'} />
              </colgroup>
              <tbody>
                <tr key={'inspectionRecordNumber'}>
                  <th>발행번호</th>
                  <td colSpan={3}>
                    <TextInline mr={'10px'}>제</TextInline>
                    <InputInline large value={inspectionRecordNumberFront} onChange={onChangeInspectionRecordNumberFront} maxLength={2} />
                    <TextInline m={'4px'}>-</TextInline>
                    <InputInline large value={inspectionRecordNumberMiddle} onChange={onChangeInspectionRecordNumberMiddle} maxLength={2} />
                    <TextInline m={'4px'}>-</TextInline>
                    <InputInline large value={inspectionRecordNumberBack} onChange={onChangeInspectionRecordNumberBack} maxLength={6} />
                    <TextInline ml={'10px'}>호</TextInline>
                  </td>
                </tr>
                <tr key={'pricingCheck'}>
                  <th>서비스 선택</th>
                  <td colSpan={3}>
                    <CheckboxRed
                      labelText="자동차가격조사 · 산정 선택 (자동차가격조사 · 산정은 매수인이 원하는 경우 제공하는 서비스입니다.)"
                      name="pricingCheck"
                      isChk={pricingCheck}
                      onChange={onChangePricingCheck}
                    />
                  </td>
                </tr>
                <tr key={'name'}>
                  <th>차명</th>
                  <td>{name}</td>
                  <th>연식</th>
                  <td>{modelYear}년</td>
                </tr>
                <tr key={'number'}>
                  <th>차량번호</th>
                  <td>{number}</td>
                  <th>검사유효기간</th>
                  <td>
                    <InputInline maxLength={8} value={validPeriodStart} onChange={onChangeValidPeriodStart} placeholder={'YYYYMMDD'} />
                    <TextInline m={'4px'}>-</TextInline>
                    <InputInline maxLength={8} value={validPeriodEnd} onChange={onChangeValidPeriodEnd} placeholder={'YYYYMMDD'} />
                  </td>
                </tr>
                <tr key={'transmissionType'}>
                  <th>최초등록일</th>
                  <td>{firstRegisterDate}</td>
                  <th>변속기 종류</th>
                  <td>
                    <Select value={transmissionType} onChange={onChangeTransmissionType} options={transmissionTypeArr} placeholder={'선택'} width={'255px'} height={'28px'} />
                  </td>
                </tr>
                <tr key={'fuelType'}>
                  <th>사용연료</th>
                  <td>
                    <Select value={fuelType} onChange={onChangeFuelType} options={fuelTypeArr} placeholder={'선택'} width={'255px'} height={'28px'} />
                  </td>
                  <th>차대번호</th>
                  <td>{vehicleIdentityNumber}</td>
                </tr>

                <tr key={'warranty'}>
                  <th>보증유형</th>
                  <td>
                    <InputRadioDom type={warrantyType} name={'warranty'} value={warranty} onClick={onChangeWarranty} text={['자가 보증', '보증사 보증']} />
                  </td>
                  <th>원동기형식</th>
                  <td>{motorType}</td>
                </tr>
                <tr>
                  <th>가격산정 기준가격</th>
                  <td colSpan={3}>
                    <InputInline value={getCommas(basePricingCalculating)} onChange={onChangeBasePricingCalculating} disabled={!pricingCheck} />
                    <TdText>만원</TdText>
                  </td>
                </tr>
              </tbody>
            </TableBox>
          </Wrapper>
        </Section>

        {/* 자동차 종합상태 */}
        <Section>{OverallStateOfVehicleDom()}</Section>
        {/* 사고 교환 수리 이력 */}
        <Section>{AccidentExchangeHistoryDom()}</Section>

        {/* 자동차 세부사항 */}
        <Section>{VehicleDetailsDom()}</Section>

        {/* 자동차 기타정보 & 점검의견 */}
        <Section>{VehicleOtherInformationDom()}</Section>

        <FinalWrapper>
          <FinalPricingBox>
            <Wrapper>
              <Image width="304px" src={'/images/vehicleInspectionRecord_FinalPricingTitle@2x.png'} alt={'최종 가격 조사 산정 금액'} mb={30} />
              <Txt type={'medium'} fontSize={theme.fontSize.xs} color={theme.color['2']} lineHeight={'1.14'} mb={30}>
                자동차관리법 제 58조 및 같은 법 시행규칙 제 120조에 따라
                <br />(
                <TdSpan>
                  <TdCheckbox width={'auto'} float={'none'} display={'inline-block'} margin={'0 0 0 5px'}>
                    <CheckboxRed color={theme.color['2']} labelText="중고자동차성능·상태를 점검" name="finalTitleChk1" isChk={true} readOnly />
                  </TdCheckbox>
                </TdSpan>
                {pricingCheck ? (
                  <TdSpan>
                    <TdCheckbox width={'auto'} float={'none'} display={'inline-block'} margin={'0 5px 0 10px'}>
                      <CheckboxRed color={theme.color['2']} labelText="자동차가격조사·산정" name="finalTitleChk2" isChk={true} readOnly />
                    </TdCheckbox>
                  </TdSpan>
                ) : (
                  <></>
                )}
                ) 하였음을 확인합니다.
              </Txt>
            </Wrapper>
            <Wrapper width={'584px'} margin={'0 auto 30px'}>
              <DateWrapper>
                <Select value={signatureYear} onChange={onChangeSignatureYear} options={signatureYearArr} placeholder={'년도 선택'} width={'150px'} height={'28px'} />
                <Wrapper margin={'0 10px'} display={'inline-block'}>
                  <Select value={signatureMonth} onChange={onChangeSignatureMonth} options={signatureMonthArr} placeholder={'월 선택'} width={'90px'} height={'28px'} />
                </Wrapper>
                <Select value={signatureDay} onChange={onChangeSignatureDay} options={signatureDayArr} placeholder={'일 선택'} width={'90px'} height={'28px'} />
              </DateWrapper>
              <Wrapper w h justifyContent={'space-between'} mb={10}>
                <Wrapper>
                  <FinalLineDot />
                  <TextInline color={'#003974'} size={'15px'}>
                    중고자동차 성능ㆍ상태 점검자
                  </TextInline>
                </Wrapper>
                <InputInline value={inspectorName} onChange={onChangeInspectorName} width={'350px'} Xlarge style={{minWidth: '350px'}} />
              </Wrapper>
              <Wrapper w h justifyContent={'space-between'} mb={10}>
                <Wrapper>
                  <FinalLineDot />
                  <TextInline color={'#003974'} size={'15px'}>
                    중고자동차 성능 · 상태 고지자
                  </TextInline>
                </Wrapper>
                <InputInline value={reportPersonnelName} onChange={onChangeReportPersonnelName} width={'350px'} Xlarge style={{minWidth: '350px'}} />
              </Wrapper>
              <DisabledWrapper w h justifyContent={'space-between'} disabled={!pricingCheck}>
                <Wrapper>
                  <FinalLineDot />
                  <TextInline color={'#003974'} size={'15px'}>
                    자동차가격조사 · 산정자
                  </TextInline>
                </Wrapper>
                <InputInline value={pricingPersonnelName} onChange={onChangePricingPersonnelName} width={'350px'} Xlarge disabled={!pricingCheck} style={{minWidth: '350px'}} />
              </DisabledWrapper>
              <DisabledWrapper mt={25} disabled={!pricingCheck}>
                <TextInline type={'medium'} fontSize={theme.fontSize.xs} color={theme.color['2']} lineHeight={'1.9'}>
                  이 가격조사 · 산정금액은 보험개발원의 차량기준가액을 바탕으로 한<br />
                  기준가격과 (
                  <InputSpan>
                    <InputRadioDom
                      type={InspectionBasePricingType}
                      name={'basePricingType'}
                      value={basePricingType}
                      onClick={(e: any) => setBasePricingType(e.target.value)}
                      text={['기술사회', '한국자동차진단보증협회']}
                      width={'auto'}
                      float={'none'}
                      display={'inline-block'}
                      style={{marginRight: '3px'}}
                    />
                  </InputSpan>
                  ) 기준서를 적용하였습니다.
                </TextInline>
              </DisabledWrapper>
              <DisabledWrapper w h justifyContent={'space-between'} mt={10} disabled={!pricingCheck}>
                <Wrapper>
                  <FinalLineDot />
                  <TextInline color={'#003974'} size={'15px'}>
                    자동차가격조사 · 산정금액
                  </TextInline>
                </Wrapper>
                <InputInline value={getCommas(finalPricing)} onChange={onChangeFinalPricing} width={'350px'} Xlarge disabled={!pricingCheck} style={{minWidth: '350px'}} />
              </DisabledWrapper>
            </Wrapper>
            <FinalUploadBox>
              <Wrapper flex justifyContent={'center'}>
                <Wrapper pt={10}>
                  <TextInline color={'white'}>차량점검지 첨부 (필수*)</TextInline>
                </Wrapper>
                <UploadListBox>
                  {imgList.map((item: VehicleInspectionRecordImageType, index) => (
                    // TODO: 빌드 오류
                    <Wrapper key={item.id} margin={'5px 0'} justifyContent={'space-between'} w h>
                      <ImageTxt width={'278px'} margin={'0 10px 0 0'} size={'xs'} textAlign={'left'} color={'#69aef4'} display={'inline-block'} lineHeight={'1.2'}>
                        {item.originFilename}
                      </ImageTxt>
                      <DeleteBtn onClick={() => deleteImg(index)}>
                        <span></span>
                      </DeleteBtn>
                    </Wrapper>
                  ))}
                </UploadListBox>
                <UploadButton>
                  <label htmlFor={'imgFileUpload'}>파일 찾기</label>
                  <input type="file" id={'imgFileUpload'} ref={imgRef} accept="image/jpg,image/png,image/jpeg" name="imgUpload" onChange={onChangeImageUpload} />
                </UploadButton>
              </Wrapper>
              <InfoWrapper>
                <Wrapper flex width={'445px'} justifyContent={'space-between'} style={{float: 'right'}}>
                  <Icon></Icon>
                  <Txt type={'medium'} fontSize={'13px'} color={theme.color.white} textAlign={'left'} lineHeight={'1.4'}>
                    반드시, 차량 점검지를 입력해야 등록이 가능합니다. <br />
                    파일 형식 : JPG, JPGE / 파일 크기 : 최대 XX MB / 권장 이미지 크기 : 800*1000
                  </Txt>
                </Wrapper>
              </InfoWrapper>
            </FinalUploadBox>
          </FinalPricingBox>
          {/* 유의사항 */}
          <VehicleInspectionRecordNotice />
        </FinalWrapper>

        <Wrapper mt="20px" mb="40px" between w>
          <Wrapper flexNum={1}>
            <Btn mr="10px" type="squareButtonWhite" onClick={() => router.back()}>
              취소
            </Btn>
          </Wrapper>
          <Wrapper flexNum={1} justifyContent="end" flex>
            <Btn type="squareButtonWhite" onClick={() => clickRecordSubmit('temp')} mr="10px">
              임시저장
            </Btn>
            <Btn type="squareButtonBlack" onClick={() => clickRecordSubmit('save')}>
              확인
            </Btn>
          </Wrapper>
        </Wrapper>
      </>
    );
  })
);
export default VehicleInspectionRecord;

const TableCaption = styled.caption<any>`
  text-align: left;
  margin-bottom: 10px;
  font-family: ${theme.font.black};
  font-size: 15px;
  color: ${theme.color[3]};
  ${({disabled}) => disabled && 'opacity: 0.2;'};
`;

const TableBox = styled.table<any>`
  position: relative;
  width: 100%;
  border-top: 2px solid ${theme.color.tableTop};
  border-collapse: collapse;
  font-family: ${theme.font.medium};
  ${({disabled}) => disabled && 'border-top: 2px solid #d8d8d84f;'};

  tr {
    border-bottom: 1px solid ${theme.color.tableBorder};

    &.accident-exchange-tr {
      td {
        text-align: left;
      }
    }
  }

  th,
  td {
    font-size: ${theme.fontSize.xs};
    vertical-align: middle;
  }

  th {
    border-left: 1px solid ${theme.color.tableBorder};
    background: ${theme.color.tableBg};
    color: ${theme.color.tableSubTop};
    font-family: ${theme.font.bold};
    width: 142px;
    height: 42px;
    vertical-align: middle;
    line-height: 16px;
    &:first-of-type {
      border-left: 0;
    }
    &.borderLeftTh {
      border-left: 1px solid ${theme.color.tableBorder};
    }
    &.borderBottom {
      border-bottom: 1px solid ${theme.color.tableBorder};
    }
  }

  td {
    border-left: 1px solid ${theme.color.tableBorder};
    padding: 7px 14px;
    line-height: 16px;
    color: ${theme.color.tableTd};

    &.borderBottom {
      border-bottom: 1px solid ${theme.color.tableBorder};
    }
  }
`;

const TableRightText = styled(Text)`
  position: absolute;
  top: 0;
  right: 0;
  text-decoration: underline;
  font-family: ${theme.font.bold};
  color: ${theme.color.notice};
  font-size: ${theme.fontSize.xs};
  cursor: pointer;
`;

const InputInline = styled(Input)<any>`
  display: inline-block;
  width: ${({width}) => width || '120px'};
  ${({large}) => large && 'height: 42px'};
  ${({Xlarge}) => Xlarge && 'height: 49px'};

  input {
    min-height: 28px;
    ${({large}) => large && 'height: 42px'};
    ${({Xlarge}) => Xlarge && 'height: 49px'};
    border-radius: 2px;
    border: 1px solid ${theme.color.inputBorder};

    &:disabled {
      background-color: #fff;
      ${({background}) => background && 'background-color: #eee;'}
    }
`;

const TextInline = styled(Txt)<any>`
  display: inline-block;
  line-height: 19px;
  ${({float}) => `float: ${float}` || ''};
  font-family: ${theme.font.medium};
`;

const TdText = styled.text`
  display: inline-block;
  margin-left: 7px;
`;

const TdCheckbox = styled.div<any>`
  float: ${({float}) => float || 'left'};
  width: ${({width}) => width || '33%'};
  ${({margin}) => (margin ? `margin: ${margin}` : '')};
  ${({display}) => (display ? `display: ${display}` : '')};
`;

const FinalPricingBox = styled(Wrapper)`
  padding: 50px 0 0;
  border: solid 2px rgba(118, 186, 254, 0.8);
  text-align: center;
`;

const FinalLineDot = styled(Wrapper)`
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 12px;
  margin-bottom: 3px;
  background-color: #0073e8;
`;

const FinalUploadBox = styled(Wrapper)`
  padding: 30px 0;
  background-color: #0073e8;
`;

const UploadListBox = styled.div`
  background-color: ${theme.color.white};
  width: 342px;
  margin: 0 10px 0 30px;
  padding: 10px 15px;
  max-height: 400px;
  overflow-y: scroll;
`;

const UploadButton = styled.div`
  position: relative;

  label {
    display: inline-block;
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.white};
    width: 80px;
    height: 40px;
    background-color: #003974;
    line-height: 40px;
    cursor: pointer;
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const EnrollNumberInput = styled(Input)`
  &::placeholder {
    color: ${theme.color.tableSubTop};
    opacity: 0.35;
  }
`;

const RadioWrapper = styled(Wrapper)`
  label {
    padding-top: 2px;
  }
  input[type='radio'] {
    display: none;
  }
  input[type='radio'] + label span {
    padding: 2px 0;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 0 5px 2px 0;
    vertical-align: middle;
    background: url('/images/vehicle-detail/ic-r-check-off@3x.png') no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  input[type='radio']:checked + label span {
    background: url('/images/vehicle-detail/ic-r-check-on@3x.png') no-repeat;
    background-size: contain;
  }
  input[type='radio']:disabled + label {
    opacity: 0.2;
  }

  &.OpacityNoneLabel {
    & input[type='radio']:disabled + label {
      opacity: 1;
    }
  }
`;

const InputSpan = styled.span`
  display: inline-block;
  padding: 0 3px;

  label {
    &:last-of-type {
      margin-left: 5px;
    }
  }
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-bottom: 15px;
`;

const TdSpan = styled.span`
  display: inline-block;
  padding: 2px 5px;
`;

const DisabledWrapper = styled(Wrapper)<any>`
  ${({disabled}) => disabled && 'opacity: 0.2'}
`;

const FinalWrapper = styled(Wrapper)`
  padding: 20px;
  background-color: #fff;
`;

const DeleteBtn = styled.button<any>`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #69aef4;
  background: transparent;

  span {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    &:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      background-color: #69aef4;
      position: absolute;
      left: 1px;
      top: 1px;
      transform: rotate(45deg);
    }
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      background-color: #69aef4;
      position: absolute;
      left: 1px;
      top: 1px;
      transform: rotate(-45deg);
    }
  }
`;

const ImageTxt = styled(Txt)<any>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Icon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url('/images/vehicle-detail/ic-nt-1.svg') no-repeat;
  background-size: contain;
`;

const InfoWrapper = styled.div`
  width: 653px;
  margin: 17px auto 0;

  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;
