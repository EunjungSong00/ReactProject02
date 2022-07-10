import React, {useCallback, memo, useState, useEffect} from 'react';
import {Wrapper, Txt, Input} from '@components/atoms';
import {
  GoodBadType,
  InspectionLevelType,
  InspectionOilStatusType,
  InspectionTransmissionOilLevelType,
  NoYesType
} from '@pages/vehicle-management/registration/detail-vehicle/vehicle-inspection-record';
import {getCommas} from '@modules/replaceStrings';
import styled from '@emotion/styled';
import theme from '@public/theme';
import useInput from '@hooks/useInput';
import {inject, observer} from 'mobx-react';

type VehicleDetailsType = {
  vehicleInspectionRecordStore?: any;
  response: any;
  pricingCheck: boolean;
  inspectionRecordVersion: boolean;
  fuelTypeDisabled: any;
  transmissionTypeDisabled: any;
  transmissionAutoTypeDisabled: any;
}

const VehicleDetails = inject('vehicleInspectionRecordStore')(
  observer(({vehicleInspectionRecordStore: store, response, pricingCheck, inspectionRecordVersion, fuelTypeDisabled, transmissionTypeDisabled, transmissionAutoTypeDisabled}: VehicleDetailsType) => {
  /* 세부사항 */
  /* 세부사항 - 자가진단 */
  const [selfInspectionMotor, setSelfInspectionMotor] = useState<GoodBadType>(response?.selfInspectionMotor || undefined); // 원동기 옵션
  const [selfInspectionPricing, onChangeSelfInspectionPricing] = useInput(response?.selfInspectionPricing || '', 'number'); // 자가진단 - 가격조사 산정액
  const [selfInspectionMotorSpecialty, setSelfInspectionMotorSpecialty] = useState(response?.selfInspectionMotorSpecialty || ''); // 원동기 - 특이사항
  const [selfInspectionTransmission, setSelfInspectionTransmission] = useState<GoodBadType>(response?.selfInspectionTransmission || undefined); // 변속기 옵션
  const [selfInspectionTransmissionSpecialty, setSelfInspectionTransmissionSpecialty] = useState(response?.selfInspectionTransmissionSpecialty || ''); // 변속기 - 특이사항
  /* 세부사항 - 원동기 */
  const [motorPricing, onChangeMotorPricing] = useInput(response?.motorPricing || '', 'number'); // 원동기 가격조사 산정액
  const [idlingStatus, setIdlingStatus] = useState<GoodBadType>(response?.idlingStatus || undefined); // 작동상태(공회전) 옵션
  const [idlingStatusSpecialty, setIdlingStatusSpecialty] = useState(response?.idlingStatusSpecialty || ''); // 작동상태(공회전) 특이사항
  const [oilLeakageCylinderCover, setOilLeakageCylinderCover] = useState<InspectionOilStatusType>(response?.oilLeakageCylinderCover || undefined); // 오일누유 - 로커암커버
  const [oilLeakageCylinderCoverSpecialty, setOilLeakageCylinderCoverSpecialty] = useState(response?.oilLeakageCylinderCoverSpecialty || ''); // 오일누유 - 로커암커버 특이사항
  const [oilLeakageCylinderHeadGasket, setOilLeakageCylinderHeadGasket] = useState<InspectionOilStatusType>(response?.oilLeakageCylinderHeadGasket || undefined); // 오일누유 – 실린더 헤드 / 개스킷
  const [oilLeakageCylinderHeadGasketSpecialty, setOilLeakageCylinderHeadGasketSpecialty] = useState(response?.oilLeakageCylinderHeadGasketSpecialty || ''); // 오일누유 – 실린더 헤드 / 개스킷 특이사항
  const [oilLeakageCylinderBlockOilPan, setOilLeakageCylinderBlockOilPan] = useState<InspectionOilStatusType>(response?.oilLeakageCylinderBlockOilPan || undefined); // 오일누유 – 실린더 블록 / 오일팬
  const [oilLeakageCylinderBlockOilPanSpecialty, setOilLeakageCylinderBlockOilPanSpecialty] = useState(response?.oilLeakageCylinderBlockOilPanSpecialty || ''); // 오일누유 – 실린더 블록 / 오일팬 특이사항
  const [oilLevel, setOilLevel] = useState<InspectionLevelType>(response?.oilLevel || undefined); // 오일유량
  const [oilLevelSpecialty, setOilLevelSpecialty] = useState(response?.oilLevelSpecialty || ''); // 오일유량 특이사항
  const [coolantLeakageCylinderCover, setCoolantLeakageCylinderCover] = useState<InspectionOilStatusType>(response?.coolantLeakageCylinderCover || undefined); // 냉각수 - 실린더 헤드 / 개스킷
  const [coolantLeakageCylinderCoverSpecialty, setCoolantLeakageCylinderCoverSpecialty] = useState(response?.coolantLeakageCylinderCoverSpecialty || ''); // 냉각수 - 실린더 헤드 / 개스킷 특이사항
  const [coolantLeakageWaterPump, setCoolantLeakageWaterPump] = useState<InspectionOilStatusType>(response?.coolantLeakageWaterPump || undefined); // 냉각수 - 워터펌프
  const [coolantLeakageWaterPumpSpecialty, setCoolantLeakageWaterPumpSpecialty] = useState(response?.coolantLeakageWaterPumpSpecialty || ''); // 냉각수 - 워터펌프 특이사항
  const [coolantLeakageRadiator, setCoolantLeakageRadiator] = useState<InspectionOilStatusType>(response?.coolantLeakageRadiator || undefined); // 냉각수 - 라디에이터
  const [coolantLeakageRadiatorSpecialty, setCoolantLeakageRadiatorSpecialty] = useState(response?.coolantLeakageRadiatorSpecialty || ''); // 냉각수 - 라디에이터 특이사항
  const [coolantLeve, setCoolantLeve] = useState<InspectionLevelType>(response?.coolantLeve || undefined); // 냉각수 - 냉각수 수량
  const [coolantLeveSpecialty, setCoolantLeveSpecialty] = useState(response?.coolantLeveSpecialty || ''); // 냉각수 - 냉각수 수량 특이사항
  const [commonRail, setCommonRail] = useState<GoodBadType>(response?.commonRail || undefined); // 고압펌프(커먼레일) - 디젤엔진
  const [commonRailSpecialty, setCommonRailSpecialty] = useState(response?.commonRailSpecialty || ''); // 고압펌프(커먼레일) - 디젤엔진 특이사항
  /* 세부사항 - 변속기 */
  const [transmissionPricing, onChangeTransmissionPricing] = useInput(response?.transmissionPricing || '', 'number'); // 변속기 - 가격조사 산정액
  const [oilLeakageAutomatic, setOilLeakageAutomatic] = useState<InspectionOilStatusType | undefined>(response?.oilLeakageAutomatic || undefined); // A/T - 오일누유
  const [oilLeakageAutomaticSpecialty, setOilLeakageAutomaticSpecialty] = useState(response?.oilLeakageAutomaticSpecialty || ''); // A/T - 오일누유 특이사항
  const [oilLevelAutomatic, setOilLevelAutomatic] = useState<InspectionTransmissionOilLevelType | undefined>(response?.oilLevelAutomatic || undefined); // A/T - 오일유량 및 상태
  const [oilLevelAutomaticSpecialty, setOilLevelAutomaticSpecialty] = useState(response?.oilLevelAutomaticSpecialty || ''); // A/T - 오일유량 및 상태 특이사항
  const [idlingAutomatic, setIdlingAutomatic] = useState<GoodBadType | undefined>(response?.idlingAutomatic || undefined); // A/T - 작동상태(공회전)
  const [idlingAutomaticSpecialty, setIdlingAutomaticSpecialty] = useState(response?.idlingAutomaticSpecialty || ''); // A/T - 작동상태(공회전) 특이사항
  const [oilLeakageManual, setOilLeakageManual] = useState<InspectionOilStatusType | undefined>(response?.oilLeakageManual || undefined); // M/T - 오일누유
  const [oilLeakageManualSpecialty, setOilLeakageManualSpecialty] = useState(response?.oilLeakageManualSpecialty || ''); // M/T - 오일누유 특이사항
  const [gearShiftManual, setGearShiftManual] = useState<GoodBadType | undefined>(response?.gearShiftManual || undefined); // M/T - 기어변속장치
  const [gearShiftManualSpecialty, setGearShiftManualSpecialty] = useState(response?.gearShiftManualSpecialty || ''); // M/T - 기어변속장치 특이사항
  const [oilLevelManual, setOilLevelManual] = useState<InspectionTransmissionOilLevelType | undefined>(response?.oilLevelManual || undefined); // M/T - 오일유량 및 상태
  const [oilLevelManualSpecialty, setOilLevelManualSpecialty] = useState(response?.oilLevelManualSpecialty || ''); // M/T - 오일유량 및 상태 특이사항
  const [idlingManual, setIdlingManual] = useState<GoodBadType | undefined>(response?.idlingManual || undefined); // M/T - 작동상태(공회전)
  const [idlingManualSpecialty, setIdlingManualSpecialty] = useState(response?.idlingManualSpecialty || ''); // M/T - 작동상태(공회전) 특이사항
  /* 세부사항 - 동력전달 */
  const [powerPricing, onChangePowerPricing] = useInput(response?.powerPricing || '', 'number'); // 동력전달 - 가격조사 산정액
  const [clutchAssembly, setClutchAssembly] = useState<GoodBadType>(response?.clutchAssembly || undefined); // 클러치 어셈블리
  const [clutchAssemblySpecialty, setClutchAssemblySpecialty] = useState(response?.clutchAssemblySpecialty || ''); // 클러치 어셈블리 특이사항
  const [constantSpeedJoint, setConstantSpeedJoint] = useState<GoodBadType>(response?.constantSpeedJoint || undefined); // 등속조인트
  const [constantSpeedJointSpecialty, setConstantSpeedJointSpecialty] = useState(response?.constantSpeedJointSpecialty || ''); // 등속조인트 특이사항
  const [propellerShaftBearing, setPropellerShaftBearing] = useState<GoodBadType>(response?.propellerShaftBearing || undefined); // 추진축 및 베어링
  const [propellerShaftBearingSpecialty, setPropellerShaftBearingSpecialty] = useState(response?.propellerShaftBearingSpecialty || ''); // 추진축 및 베어링 특이사항
  const [differentialGear, setDifferentialGear] = useState<GoodBadType>(response?.differentialGear || undefined); // 디퍼렌셜 기어
  const [differentialGearSpecialty, setDifferentialGearSpecialty] = useState(response?.differentialGearSpecialty || ''); // 디퍼렌셜 기어 특이사항
  /* 세부사항 - 조향 */
  const [steeringPricing, onChangeSteeringPricing] = useInput(response?.steeringPricing || '', 'number'); // 조향 - 가격조사 산정액
  const [oilLeakageSteeringSystem, setOilLeakageSteeringSystem] = useState<InspectionOilStatusType>(response?.oilLeakageSteeringSystem || undefined); // 동력조향 작동 오일 누유
  const [oilLeakageSteeringSystemSpecialty, setOilLeakageSteeringSystemSpecialty] = useState(response?.oilLeakageSteeringSystemSpecialty || ''); // 동력조향 작동 오일 누유 특이사항
  const [steeringPump, setSteeringPump] = useState<GoodBadType>(response?.steeringPump || undefined); // 작동상태 - 스티어링 펌프
  const [steeringPumpSpecialty, setSteeringPumpSpecialty] = useState(response?.steeringPumpSpecialty || ''); // 작동상태 - 스티어링 펌프 특이사항
  const [steeringGear, setSteeringGear] = useState<GoodBadType>(response?.steeringGear || undefined); // 작동상태 - 스티어링 기어(MDPS포함)
  const [steeringGearSpecialty, setSteeringGearSpecialty] = useState(response?.steeringGearSpecialty || ''); // 작동상태 - 스티어링 기어(MDPS포함) 특이사항
  const [steeringJoint, setSteeringJoint] = useState<GoodBadType>(response?.steeringJoint || undefined); // 작동상태 - 스티어링조인트
  const [steeringJointSpecialty, setSteeringJointSpecialty] = useState(response?.steeringJointSpecialty || ''); // 작동상태 - 스티어링조인트 특이사항
  const [powerSteeringHose, setPowerSteeringHose] = useState<GoodBadType>(response?.powerSteeringHose || undefined); // 작동상태 - 파워고압호스
  const [powerSteeringHoseSpecialty, setPowerSteeringHoseSpecialty] = useState(response?.powerSteeringHoseSpecialty || ''); // 작동상태 - 파워고압호스 특이사항
  const [tieRodEndBallJoint, setTieRodEndBallJoint] = useState<GoodBadType>(response?.tieRodEndBallJoint || undefined); // 작동상태 - 타이로드엔드 및 볼 조인트
  const [tieRodEndBallJointSpecialty, setTieRodEndBallJointSpecialty] = useState(response?.tieRodEndBallJointSpecialty || ''); // 작동상태 - 타이로드엔드 및 볼 조인트 특이사항
  /* 세부사항 - 제동 */
  const [brakePricing, onChangeBrakePricing] = useInput(response?.brakePricing || '', 'number'); // 제동 - 가격조사 산정액
  const oilLeakageBrakeMasterCylinderValue = response?.oilLeakageBrakeMasterCylinder || undefined;
  const [oilLeakageBrakeMasterCylinder, setOilLeakageBrakeMasterCylinder] = useState<InspectionOilStatusType>(oilLeakageBrakeMasterCylinderValue); // 브레이크 마스터 실린더오일 누유
  const oilLeakageBrakeMasterCylinderSpecialtyValue = response?.oilLeakageBrakeMasterCylinderSpecialty || '';
  const [oilLeakageBrakeMasterCylinderSpecialty, setOilLeakageBrakeMasterCylinderSpecialty] = useState(oilLeakageBrakeMasterCylinderSpecialtyValue); // 브레이크 마스터 실린더오일 누유 특이사항
  const [oilLeakageBrake, setOilLeakageBrake] = useState<InspectionOilStatusType>(response?.oilLeakageBrake || undefined); // 브레이크 오일 누유
  const [oilLeakageBrakeSpecialty, setOilLeakageBrakeSpecialty] = useState(response?.oilLeakageBrakeSpecialty || ''); // 브레이크 오일 누유 특이사항
  const [brakeSystem, setBrakeSystem] = useState<GoodBadType>(response?.brakeSystem || undefined); // 배려장치 상태
  const [brakeSystemSpecialty, setBrakeSystemSpecialty] = useState(response?.brakeSystemSpecialty || ''); // 배려장치 상태 특이사항
  /* 세부사항 - 동력전달 */
  const [electricityPricing, onChangeElectricityPricing] = useInput(response?.electricityPricing || '', 'number'); // 동력전달 - 가격조사 산정액
  const [generator, setGenerator] = useState<GoodBadType>(response?.generator || undefined); // 발전기 출력
  const [generatorSpecialty, setGeneratorSpecialty] = useState(response?.generatorSpecialty || ''); // 발전기 출력 특이사항
  const [starterMotor, setStarterMotor] = useState<GoodBadType>(response?.starterMotor || undefined); // 시동 모터
  const [starterMotorSpecialty, setStarterMotorSpecialty] = useState(response?.starterMotorSpecialty || ''); // 시동 모터 특이사항
  const [wiperMotor, setWiperMotor] = useState<GoodBadType>(response?.wiperMotor || undefined); // 와이퍼 모터 기능
  const [wiperMotorSpecialty, setWiperMotorSpecialty] = useState(response?.wiperMotorSpecialty || ''); // 와이퍼 모터 기능 특이사항
  const [ventilatingMotor, setVentilatingMotor] = useState<GoodBadType>(response?.ventilatingMotor || undefined); // 실내송풍 모터
  const [ventilatingMotorSpecialty, setVentilatingMotorSpecialty] = useState(response?.ventilatingMotorSpecialty || ''); // 실내송풍 모터 특이사항
  const [radiatorFanMotor, setRadiatorFanMotor] = useState<GoodBadType>(response?.radiatorFanMotor || undefined); // 라디에이터 팬 모터
  const [radiatorFanMotorSpecialty, setRadiatorFanMotorSpecialty] = useState(response?.radiatorFanMotorSpecialty || ''); // 라디에이터 팬 모터 특이사항
  const [windowMotor, setWindowMotor] = useState<GoodBadType>(response?.windowMotor || undefined); // 윈도우 모터
  const [windowMotorSpecialty, setWindowMotorSpecialty] = useState(response?.windowMotorSpecialty || ''); // 윈도우 모터 특이사항
  /* 세부사항 - 고전원전기장치 */
  const [highVoltagePricing, onChangeHighVoltagePricing, setHighVoltagePricing] = useInput(response?.highVoltagePricing || '', 'number'); // 고전원전기장치 - 가격조사 산정액
  const [chargingPort, setChargingPort] = useState(response?.chargingPort || undefined); // 충전구 절연 상태
  const [chargingPortSpecialty, setChargingPortSpecialty] = useState(response?.chargingPortSpecialty || ''); // 충전구 절연 상태 특이사항
  const [regenerativeSystem, setRegenerativeSystem] = useState(response?.regenerativeSystem || undefined); // 구동축전지 격리 상태
  const [regenerativeSystemSpecialty, setRegenerativeSystemSpecialty] = useState(response?.regenerativeSystemSpecialty || ''); // 구동축전지 격리 상태 특이사항
  const [highVoltageWire, setHighVoltageWire] = useState(response?.highVoltageWire || undefined); // 고전원전기배선 상태
  const [highVoltageWireSpecialty, setHighVoltageWireSpecialty] = useState(response?.highVoltageWireSpecialty || ''); // 고전원전기배선 상태 특이사항
  const [fuelLeakage, setFuelLeakage] = useState<NoYesType>(response?.fuelLeakage || undefined); // 연료누출
  const [fuelLeakagePricing, onChangeFuelLeakagePricing] = useInput(response?.fuelLeakagePricing || '', 'number'); // 연료누출 가격조사 산정액
  const [fuelLeakageSpecialty, setFuelLeakageSpecialty] = useState(response?.fuelLeakageSpecialty || ''); // 연료누출 특이사항

  const PricingSpecialtyDom = useCallback(
    (
      pricingValue: string,
      setPricing: any,
      specialtyValue: string,
      setSpecialty: any,
      rowSpan?: number,
      rowSpan2?: number,
      colSpan?: number,
      colSpan2?: number,
      disabled?: boolean,
      disabled2?: boolean,
      background?: boolean,
      background2?: boolean
    ) => (
      <>
        {PricingDom(pricingValue, setPricing, rowSpan, colSpan, disabled, background)}
        {SpecialtyDom(specialtyValue, setSpecialty, rowSpan2, colSpan2, disabled2, background2)}
      </>
    ),
    [pricingCheck]
  );

  const PricingDom = useCallback(
    (pricingValue: string, onChangePricing: any, rowSpan?: number, colSpan?: number, disabled?: boolean, background?: boolean) => (
      <>
        <WonTd rowSpan={rowSpan} colSpan={colSpan} disabledOpacity={!pricingCheck}>
          <InputInline
            value={getCommas(pricingValue)}
            onChange={onChangePricing}
            width={'70px'}
            mr={'4px'}
            disabled={disabled || !pricingCheck}
            background={background || !pricingCheck}
          />
          <TextInline>만원</TextInline>
        </WonTd>
      </>
    ),
    [pricingCheck]
  );

  const SpecialtyDom = useCallback(
    (specialtyValue: string, setSpecialty: any, rowSpan?: number, colSpan?: number, disabled?: boolean, background?: boolean, disabledBorderTop?: boolean) => (
      <>
        <WonTd rowSpan={rowSpan} colSpan={colSpan} disabledBorderTop={disabledBorderTop || !pricingCheck} disabledOpacity={!pricingCheck}>
          <InputInline
            value={specialtyValue}
            onChange={(e: any) => setSpecialty(e.target.value)}
            width={'100%'}
            disabled={disabled || !pricingCheck}
            background={background || !pricingCheck}
          />
        </WonTd>
      </>
    ),
    [pricingCheck]
  );

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

  // setVehicleDetailsQuery
  store.setVehicleDetailsQuery(JSON.stringify({
    selfInspectionMotor, // 원동기 옵션
    selfInspectionTransmission, // 변속기 옵션
    idlingStatus, // 작동상태(공회전) 옵션
    oilLeakageCylinderCover, // 오일누유 - 로커암커버
    oilLeakageCylinderHeadGasket, // 오일누유 – 실린더 헤드 / 개스킷
    oilLeakageCylinderBlockOilPan, // 오일누유 – 실린더 블록 / 오일팬
    oilLevel, // 오일유량
    coolantLeakageCylinderCover, // 냉각수 - 실린더 헤드 / 개스킷
    coolantLeakageWaterPump, // 냉각수 - 워터펌프
    coolantLeakageRadiator, // 냉각수 - 라디에이터
    coolantLeve, // 냉각수 - 냉각수 수량
    commonRail, // 고압펌프(커먼레일) - 디젤엔진
    oilLeakageAutomatic, // A/T - 오일누유
    oilLevelAutomatic, // A/T - 오일유량 및 상태
    idlingAutomatic, // A/T - 작동상태(공회전)
    oilLeakageManual, // M/T - 오일누유
    gearShiftManual, // M/T - 기어변속장치
    oilLevelManual, // M/T - 오일유량 및 상태
    idlingManual, // M/T - 작동상태(공회전)
    clutchAssembly, // 클러치 어셈블리
    constantSpeedJoint, // 등속조인트
    propellerShaftBearing, // 추진축 및 베어링
    differentialGear, // 디퍼렌셜 기어
    oilLeakageSteeringSystem, // 동력조향 작동 오일 누유
    steeringGear, // 작동상태 - 스티어링 기어(MDPS포함)
    steeringPump, // 작동상태 - 스티어링 펌프
    steeringJoint, // 작동상태 - 스티어링조인트
    powerSteeringHose, // 작동상태 - 파워고압호스
    tieRodEndBallJoint, // 작동상태 - 타이로드엔드 및 볼 조인트
    oilLeakageBrakeMasterCylinder, // 브레이크 마스터 실린더오일 누유
    oilLeakageBrake, // 브레이크 오일 누유
    brakeSystem, // 배려장치 상태
    generator, // 발전기 출력
    starterMotor, // 시동 모터
    wiperMotor, // 와이퍼 모터 기능
    ventilatingMotor, // 실내송풍 모터
    radiatorFanMotor, // 라디에이터 팬 모터
    windowMotor, // 윈도우 모터
    chargingPort, // 충전구 절연 상태
    regenerativeSystem, // 구동축전지 격리 상태
    highVoltageWire, // 고전원전기배선 상태
    fuelLeakage // 연료누출
  }));

  // setVehicleDetailsPricing
  store.setVehicleDetailsPricing(JSON.stringify({
    selfInspectionPricing, // 자가진단 - 가격조사 산정액
    motorPricing, // 원동기 가격조사 산정액
    transmissionPricing, // 변속기 - 가격조사 산정액
    powerPricing, // 동력전달 - 가격조사 산정액
    steeringPricing, // 조향 - 가격조사 산정액
    brakePricing, // 제동 - 가격조사 산정액
    electricityPricing, // 동력전달 - 가격조사 산정액
    highVoltagePricing, // 고전원전기장치 - 가격조사 산정액
    fuelLeakagePricing // 연료누출 가격조사 산정액
  }));

  // setVehicleDetailsSpecialty
  store.setVehicleDetailsSpecialty(JSON.stringify({
    selfInspectionMotorSpecialty, // 원동기 - 특이사항
    selfInspectionTransmissionSpecialty, // 변속기 - 특이사항
    idlingStatusSpecialty, // 작동상태(공회전) 특이사항
    oilLeakageCylinderCoverSpecialty, // 오일누유 - 로커암커버 특이사항
    oilLeakageCylinderHeadGasketSpecialty, // 오일누유 – 실린더 헤드 / 개스킷 특이사항
    oilLeakageCylinderBlockOilPanSpecialty, // 오일누유 – 실린더 블록 / 오일팬 특이사항
    oilLevelSpecialty, // 오일유량 특이사항
    coolantLeakageCylinderCoverSpecialty, // 냉각수 - 실린더 헤드 / 개스킷 특이사항
    coolantLeakageWaterPumpSpecialty, // 냉각수 - 워터펌프 특이사항
    coolantLeakageRadiatorSpecialty, // 냉각수 - 라디에이터 특이사항
    coolantLeveSpecialty, // 냉각수 - 냉각수 수량 특이사항
    commonRailSpecialty, // 고압펌프(커먼레일) - 디젤엔진 특이사항
    oilLeakageAutomaticSpecialty, // A/T - 오일누유 특이사항
    oilLevelAutomaticSpecialty, // A/T - 오일유량 및 상태 특이사항
    idlingAutomaticSpecialty, // A/T - 작동상태(공회전) 특이사항
    oilLeakageManualSpecialty, // M/T - 오일누유 특이사항
    gearShiftManualSpecialty, // M/T - 기어변속장치 특이사항
    oilLevelManualSpecialty, // M/T - 오일유량 및 상태 특이사항
    idlingManualSpecialty, // M/T - 작동상태(공회전) 특이사항
    clutchAssemblySpecialty, // 클러치 어셈블리 특이사항
    constantSpeedJointSpecialty, // 등속조인트 특이사항
    propellerShaftBearingSpecialty, // 추진축 및 베어링 특이사항
    differentialGearSpecialty, // 디퍼렌셜 기어 특이사항
    oilLeakageSteeringSystemSpecialty, // 동력조향 작동 오일 누유 특이사항
    steeringPumpSpecialty, // 작동상태 - 스티어링 펌프 특이사항
    steeringGearSpecialty, // 작동상태 - 스티어링 기어(MDPS포함) 특이사항
    steeringJointSpecialty, // 작동상태 - 스티어링조인트 특이사항
    powerSteeringHoseSpecialty, // 작동상태 - 파워고압호스 특이사항
    tieRodEndBallJointSpecialty, // 작동상태 - 타이로드엔드 및 볼 조인트 특이사항
    oilLeakageBrakeMasterCylinderSpecialty, // 브레이크 마스터 실린더오일 누유 특이사항
    oilLeakageBrakeSpecialty, // 브레이크 오일 누유 특이사항
    brakeSystemSpecialty, // 배려장치 상태 특이사항
    generatorSpecialty, // 발전기 출력 특이사항
    starterMotorSpecialty, // 시동 모터 특이사항
    wiperMotorSpecialty, // 와이퍼 모터 기능 특이사항
    ventilatingMotorSpecialty, // 실내송풍 모터 특이사항
    radiatorFanMotorSpecialty, // 라디에이터 팬 모터 특이사항
    windowMotorSpecialty, // 윈도우 모터 특이사항
    chargingPortSpecialty, // 충전구 절연 상태 특이사항
    regenerativeSystemSpecialty, // 구동축전지 격리 상태 특이사항
    highVoltageWireSpecialty, // 고전원전기배선 상태 특이사항
    fuelLeakageSpecialty // 연료누출 특이사항
  }));

  return (
    <Wrapper mt={'30px'}>
      <TableBox>
        <TableCaption>자동차 세부사항</TableCaption>
        <colgroup>
          <col width={'103'} />
          <col width={'127'} />
          <col width={'127'} />
          <col width={'353'} />
          <col width={'86'} />
          <col width={'89'} />
        </colgroup>
        <thead>
        <tr>
          <th>주요장치</th>
          <th>항목</th>
          <th>해당부품</th>
          <th>상태</th>
          <BorderBtTh>
            가격조사
            <br />
            산정액
          </BorderBtTh>
          <BorderBtTh>특기사항</BorderBtTh>
        </tr>
        </thead>
        <tbody>
        <tr key={'selfInspectionMotor'}>
          <th rowSpan={2}>자가진단</th>
          <TdCenter colSpan={2}>원동기</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'selfInspectionMotor'}
              value={selfInspectionMotor}
              onClick={(e: any) => setSelfInspectionMotor(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {PricingSpecialtyDom(selfInspectionPricing, onChangeSelfInspectionPricing, selfInspectionMotorSpecialty, setSelfInspectionMotorSpecialty, 2)}
        </tr>
        <tr key={'selfInspectionTransmission'}>
          <TdCenter colSpan={2}>변속기</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'selfInspectionTransmission'}
              value={selfInspectionTransmission}
              onClick={(e: any) => setSelfInspectionTransmission(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(selfInspectionTransmissionSpecialty, setSelfInspectionTransmissionSpecialty)}
        </tr>
        <tr key={'idlingStatus'}>
          <th rowSpan={10}>원동기</th>
          <TdCenter colSpan={2}>작동상태(공회전)</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'idlingStatus'}
              value={idlingStatus}
              onClick={(e: any) => setIdlingStatus(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {PricingSpecialtyDom(motorPricing, onChangeMotorPricing, idlingStatusSpecialty, setIdlingStatusSpecialty, 10)}
        </tr>
        <tr key={'oilLeakageCylinderCover'}>
          <TdCenter rowSpan={3}>오일 누유</TdCenter>
          <TdCenter>로커암커버</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageCylinderCover'}
              value={oilLeakageCylinderCover}
              onClick={(e: any) => setOilLeakageCylinderCover(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(oilLeakageCylinderCoverSpecialty, setOilLeakageCylinderCoverSpecialty)}
        </tr>
        <tr key={'oilLeakageCylinderHeadGasket'}>
          <TdCenter>실린더헤드/가스켓</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageCylinderHeadGasket'}
              value={oilLeakageCylinderHeadGasket}
              onClick={(e: any) => setOilLeakageCylinderHeadGasket(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(oilLeakageCylinderHeadGasketSpecialty, setOilLeakageCylinderHeadGasketSpecialty)}
        </tr>
        <tr key={'oilLeakageCylinderBlockOilPan'}>
          <TdCenter>오일팬</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageCylinderBlockOilPan'}
              value={oilLeakageCylinderBlockOilPan}
              onClick={(e: any) => setOilLeakageCylinderBlockOilPan(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(oilLeakageCylinderBlockOilPanSpecialty, setOilLeakageCylinderBlockOilPanSpecialty)}
        </tr>
        <tr key={'oilLevel'}>
          <TdCenter colSpan={2}>오일유량</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionLevelType}
              name={'oilLevel'}
              value={oilLevel}
              onClick={(e: any) => setOilLevel(e.target.value)}
              text={['적정', '부족']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(oilLevelSpecialty, setOilLevelSpecialty)}
        </tr>
        <tr key={'coolantLeakageCylinderCover'}>
          <TdCenter rowSpan={4}>냉각수 누수</TdCenter>
          <TdCenter>실린더헤드/가스켓</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'coolantLeakageCylinderCover'}
              value={coolantLeakageCylinderCover}
              onClick={(e: any) => setCoolantLeakageCylinderCover(e.target.value)}
              text={['없음', '미세누수', '누수']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(coolantLeakageCylinderCoverSpecialty, setCoolantLeakageCylinderCoverSpecialty)}
        </tr>
        <tr key={'coolantLeakageWaterPump'}>
          <TdCenter>워터펌프</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'coolantLeakageWaterPump'}
              value={coolantLeakageWaterPump}
              onClick={(e: any) => setCoolantLeakageWaterPump(e.target.value)}
              text={['없음', '미세누수', '누수']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(coolantLeakageWaterPumpSpecialty, setCoolantLeakageWaterPumpSpecialty)}
        </tr>
        <tr key={'coolantLeakageRadiator'}>
          <TdCenter>라디에이터</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'coolantLeakageRadiator'}
              value={coolantLeakageRadiator}
              onClick={(e: any) => setCoolantLeakageRadiator(e.target.value)}
              text={['없음', '미세누수', '누수']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(coolantLeakageRadiatorSpecialty, setCoolantLeakageRadiatorSpecialty)}
        </tr>
        <tr key={'coolantLeve'}>
          <TdCenter>냉각수 수량</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionLevelType}
              name={'coolantLeve'}
              value={coolantLeve}
              onClick={(e: any) => setCoolantLeve(e.target.value)}
              text={['적정', '부족']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(coolantLeveSpecialty, setCoolantLeveSpecialty)}
        </tr>
        <tr key={'commonRail'}>
          <TdCenter colSpan={2}>고압펌프(커먼레일)-디젤엔진</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'commonRail'}
              value={commonRail}
              onClick={(e: any) => setCommonRail(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(commonRailSpecialty, setCommonRailSpecialty)}
        </tr>
        <Tr disabled={transmissionAutoTypeDisabled} key={'oilLeakageAutomatic'}>
          <th className={'opacityDisabledTh'} rowSpan={7}>변속기</th>
          <TdCenter className={'disabledTdOpacity borderTd'} rowSpan={3}>
            자동 변속기
            <br />
            (A/T)
          </TdCenter>
          <TdCenter className={'disabledTd disabledBorderBottom'}>오일누유</TdCenter>
          <td className={'disabledBorderBottom disabledBorderTd'}>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageAutomatic'}
              value={oilLeakageAutomatic}
              onClick={(e: any) => setOilLeakageAutomatic(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
              disabled={transmissionAutoTypeDisabled}
            />
          </td>
          {PricingSpecialtyDom(
            transmissionPricing,
            onChangeTransmissionPricing,
            oilLeakageAutomaticSpecialty,
            setOilLeakageAutomaticSpecialty,
            7,
            1,
            1,
            1,
            !pricingCheck,
            transmissionAutoTypeDisabled,
            transmissionAutoTypeDisabled,
            transmissionAutoTypeDisabled
          )}
        </Tr>
        <Tr className={'disabledTr'} disabled={transmissionAutoTypeDisabled} key={'oilLevelAutomatic'}>
          <TdCenter className={'disabledTd'}>오일유량 및 상태</TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={InspectionTransmissionOilLevelType}
              name={'oilLevelAutomatic'}
              value={oilLevelAutomatic}
              onClick={(e: any) => setOilLevelAutomatic(e.target.value)}
              text={['적정', '부족', '과다']}
              width={'33%'}
              disabled={transmissionAutoTypeDisabled}
            />
          </td>
          {SpecialtyDom(
            oilLevelAutomaticSpecialty,
            setOilLevelAutomaticSpecialty,
            1,
            1,
            transmissionAutoTypeDisabled,
            transmissionAutoTypeDisabled
          )}
        </Tr>
        <Tr className={'disabledTr'} disabled={transmissionAutoTypeDisabled} key={'idlingAutomatic'}>
          <TdCenter className={'opacityTd'}>작동상태(공회전)</TdCenter>
          <td className={'borderTd disabledBorderTd'}>
            <InputRadioDom
              type={GoodBadType}
              name={'idlingAutomatic'}
              value={idlingAutomatic}
              onClick={(e: any) => setIdlingAutomatic(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
              disabled={transmissionAutoTypeDisabled}
            />
          </td>
          {SpecialtyDom(
            idlingAutomaticSpecialty,
            setIdlingAutomaticSpecialty,
            1,
            1,
            transmissionAutoTypeDisabled,
            transmissionAutoTypeDisabled
          )}
        </Tr>
        <Tr className={'disabledTr'} disabled={transmissionTypeDisabled} key={'oilLeakageManual'}>
          <TdCenter className={'disabledTdOpacity'} rowSpan={4}>
            수동 변속기
            <br />
            (M/T)
          </TdCenter>
          <TdCenter className={'disabledTd'}>오일누유</TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageManual'}
              value={oilLeakageManual}
              onClick={(e: any) => setOilLeakageManual(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
              disabled={transmissionTypeDisabled}
            />
          </td>
          {SpecialtyDom(
            oilLeakageManualSpecialty,
            setOilLeakageManualSpecialty,
            1,
            1,
            transmissionTypeDisabled,
            transmissionTypeDisabled
          )}
        </Tr>
        <Tr className={'disabledTr'} disabled={transmissionTypeDisabled} key={'gearShiftManual'}>
          <TdCenter className={'disabledTd'}>기어변속장치</TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={GoodBadType}
              name={'gearShiftManual'}
              value={gearShiftManual}
              onClick={(e: any) => setGearShiftManual(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
              disabled={transmissionTypeDisabled}
            />
          </td>
          {SpecialtyDom(
            gearShiftManualSpecialty,
            setGearShiftManualSpecialty,
            1,
            1,
            transmissionTypeDisabled,
            transmissionTypeDisabled,
            transmissionTypeDisabled
          )}
        </Tr>
        <Tr className={'disabledTr'} disabled={transmissionTypeDisabled} key={'oilLevelManual'}>
          <TdCenter className={'disabledTd'}>오일유량 및 상태</TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={InspectionTransmissionOilLevelType}
              name={'oilLevelManual'}
              value={oilLevelManual}
              onClick={(e: any) => setOilLevelManual(e.target.value)}
              text={['적정', '부족', '과다']}
              width={'33%'}
              disabled={transmissionTypeDisabled}
            />
          </td>
          {SpecialtyDom(
            oilLevelManualSpecialty,
            setOilLevelManualSpecialty,
            1,
            1,
            transmissionTypeDisabled,
            transmissionTypeDisabled,
            transmissionTypeDisabled
          )}
        </Tr>
        <Tr className={'borderTr'} key={'idlingManual'} disabled={transmissionTypeDisabled}>
          <TdCenter className={'disabledTd'}>작동상태(공회전)</TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={GoodBadType}
              name={'idlingManual'}
              value={idlingManual}
              onClick={(e: any) => setIdlingManual(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
              disabled={transmissionTypeDisabled}
            />
          </td>
          {SpecialtyDom(
            idlingManualSpecialty,
            setIdlingManualSpecialty,
            1,
            1,
            transmissionTypeDisabled,
            transmissionTypeDisabled,
            transmissionTypeDisabled
          )}
        </Tr>

        <tr key={'clutchAssembly'}>
          <th rowSpan={inspectionRecordVersion ? 3 : 4}>동력전달</th>
          <TdCenter colSpan={2}>클러치 어셈블리</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'clutchAssembly'}
              value={clutchAssembly}
              onClick={(e: any) => setClutchAssembly(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {PricingSpecialtyDom(powerPricing, onChangePowerPricing, clutchAssemblySpecialty, setClutchAssemblySpecialty, inspectionRecordVersion ? 3 : 4)}
        </tr>
        <tr key={'constantSpeedJoint'}>
          <TdCenter colSpan={2}>등속조인트</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'constantSpeedJoint'}
              value={constantSpeedJoint}
              onClick={(e: any) => setConstantSpeedJoint(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(constantSpeedJointSpecialty, setConstantSpeedJointSpecialty)}
        </tr>
        <tr key={'propellerShaftBearing'}>
          <TdCenter colSpan={2}>추진축 및 베어링</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'propellerShaftBearing'}
              value={propellerShaftBearing}
              onClick={(e: any) => setPropellerShaftBearing(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(propellerShaftBearingSpecialty, setPropellerShaftBearingSpecialty)}
        </tr>
        {inspectionRecordVersion ? (
          <></>
        ) : (
          <>
            <tr key={'differentialGear'}>
              <TdCenter colSpan={2}>디퍼렌셜 기어</TdCenter>
              <td>
                <InputRadioDom
                  type={GoodBadType}
                  name={'differentialGear'}
                  value={differentialGear}
                  onClick={(e: any) => setDifferentialGear(e.target.value)}
                  text={['양호', '불량']}
                  width={'33%'}
                />
              </td>
              {SpecialtyDom(differentialGearSpecialty, setDifferentialGearSpecialty)}
            </tr>
          </>
        )}
        <tr key={'oilLeakageSteeringSystem'}>
          <th rowSpan={inspectionRecordVersion ? 4 : 6}>조향</th>
          <TdCenter colSpan={2}>동력조항 작동 오일 누유</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageSteeringSystem'}
              value={oilLeakageSteeringSystem}
              onClick={(e: any) => setOilLeakageSteeringSystem(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
            />
          </td>
          {PricingSpecialtyDom(
            steeringPricing,
            onChangeSteeringPricing,
            oilLeakageSteeringSystemSpecialty,
            setOilLeakageSteeringSystemSpecialty,
            inspectionRecordVersion ? 4 : 6
          )}
        </tr>
        <tr key={'steeringPump'}>
          <TdCenter rowSpan={inspectionRecordVersion ? 3 : 5}>작동 상태</TdCenter>
          <TdCenter>스티어링 펌프</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'steeringPump'}
              value={steeringPump}
              onClick={(e: any) => setSteeringPump(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(steeringPumpSpecialty, setSteeringPumpSpecialty)}
        </tr>
        <tr key={'steeringGear'}>
          <TdCenter>
            스티어링 기어
            {inspectionRecordVersion ? null : (
              <>
                <br />
                (MDPS포함)
              </>
            )}
          </TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'steeringGear'}
              value={steeringGear}
              onClick={(e: any) => setSteeringGear(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(steeringGearSpecialty, setSteeringGearSpecialty)}
        </tr>
        {inspectionRecordVersion ? (
          <></>
        ) : (
          <>
            <tr key={'steeringJoint'}>
              <TdCenter>스티어링 조인트</TdCenter>
              <td>
                <InputRadioDom
                  type={GoodBadType}
                  name={'steeringJoint'}
                  value={steeringJoint}
                  onClick={(e: any) => setSteeringJoint(e.target.value)}
                  text={['양호', '불량']}
                  width={'33%'}
                />
              </td>
              {SpecialtyDom(steeringJointSpecialty, setSteeringJointSpecialty)}
            </tr>
            <tr key={'powerSteeringHose'}>
              <TdCenter>파워고압호스</TdCenter>
              <td>
                <InputRadioDom
                  type={GoodBadType}
                  name={'powerSteeringHose'}
                  value={powerSteeringHose}
                  onClick={(e: any) => setPowerSteeringHose(e.target.value)}
                  text={['양호', '불량']}
                  width={'33%'}
                />
              </td>
              {SpecialtyDom(powerSteeringHoseSpecialty, setPowerSteeringHoseSpecialty)}
            </tr>
          </>
        )}
        <tr key={'tieRodEndBallJoint'}>
          <TdCenter>
            타이로드엔드 및<br />
            볼조인트
          </TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'tieRodEndBallJoint'}
              value={tieRodEndBallJoint}
              onClick={(e: any) => setTieRodEndBallJoint(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(tieRodEndBallJointSpecialty, setTieRodEndBallJointSpecialty)}
        </tr>
        <tr key={'oilLeakageBrakeMasterCylinder'}>
          <th rowSpan={3}>제동</th>
          <TdCenter colSpan={2}>브레이크 마스터 실린더오일 누유</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageBrakeMasterCylinder'}
              value={oilLeakageBrakeMasterCylinder}
              onClick={(e: any) => setOilLeakageBrakeMasterCylinder(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
            />
          </td>
          {PricingSpecialtyDom(brakePricing, onChangeBrakePricing, oilLeakageBrakeMasterCylinderSpecialty, setOilLeakageBrakeMasterCylinderSpecialty, 3)}
        </tr>
        <tr key={'oilLeakageBrake'}>
          <TdCenter colSpan={2}>브레이크 오일 누유</TdCenter>
          <td>
            <InputRadioDom
              type={InspectionOilStatusType}
              name={'oilLeakageBrake'}
              value={oilLeakageBrake}
              onClick={(e: any) => setOilLeakageBrake(e.target.value)}
              text={['없음', '미세누유', '누유']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(oilLeakageBrakeSpecialty, setOilLeakageBrakeSpecialty)}
        </tr>
        <tr key={'brakeSystem'}>
          <TdCenter colSpan={2}>배력장치 상태</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'brakeSystem'}
              value={brakeSystem}
              onClick={(e: any) => setBrakeSystem(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(brakeSystemSpecialty, setBrakeSystemSpecialty)}
        </tr>
        <tr key={'generator'}>
          <th rowSpan={6}>동력전달</th>
          <TdCenter colSpan={2}>발전기 출력</TdCenter>
          <td>
            <InputRadioDom type={GoodBadType} name={'generator'} value={generator} onClick={(e: any) => setGenerator(e.target.value)} text={['양호', '불량']} width={'33%'} />
          </td>
          {PricingSpecialtyDom(electricityPricing, onChangeElectricityPricing, generatorSpecialty, setGeneratorSpecialty, 6)}
        </tr>
        <tr key={'starterMotor'}>
          <TdCenter colSpan={2}>시동모터</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'starterMotor'}
              value={starterMotor}
              onClick={(e: any) => setStarterMotor(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(starterMotorSpecialty, setStarterMotorSpecialty)}
        </tr>
        <tr key={'wiperMotor'}>
          <TdCenter colSpan={2}>와이퍼 모터기능</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'wiperMotor'}
              value={wiperMotor}
              onClick={(e: any) => setWiperMotor(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(wiperMotorSpecialty, setWiperMotorSpecialty)}
        </tr>
        <tr key={'ventilatingMotor'}>
          <TdCenter colSpan={2}>실내 송풍 모터</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'ventilatingMotor'}
              value={ventilatingMotor}
              onClick={(e: any) => setVentilatingMotor(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(ventilatingMotorSpecialty, setVentilatingMotorSpecialty)}
        </tr>
        <tr key={'radiatorFanMotor'}>
          <TdCenter colSpan={2}>라디에이터 팬 모터</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'radiatorFanMotor'}
              value={radiatorFanMotor}
              onClick={(e: any) => setRadiatorFanMotor(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(radiatorFanMotorSpecialty, setRadiatorFanMotorSpecialty)}
        </tr>
        <tr key={'windowMotor'}>
          <TdCenter colSpan={2}>윈도우 모터</TdCenter>
          <td>
            <InputRadioDom
              type={GoodBadType}
              name={'windowMotor'}
              value={windowMotor}
              onClick={(e: any) => setWindowMotor(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
            />
          </td>
          {SpecialtyDom(windowMotorSpecialty, setWindowMotorSpecialty)}
        </tr>
        <Tr className={'disabledTr'} disabled={fuelTypeDisabled} key={'chargingPort'}>
          <th rowSpan={3}>
            고전원
            <br />
            전기장치
          </th>
          <TdCenter className={'disabledTd'} colSpan={2}>
            충전구 절연 상태
          </TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={GoodBadType}
              name={'chargingPort'}
              value={chargingPort}
              onClick={(e: any) => setChargingPort(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
              disabled={fuelTypeDisabled}
            />
          </td>
          {PricingSpecialtyDom(
            highVoltagePricing,
            onChangeHighVoltagePricing,
            chargingPortSpecialty,
            setChargingPortSpecialty,
            3,
            1,
            1,
            1,
            fuelTypeDisabled,
            fuelTypeDisabled,
            fuelTypeDisabled,
            fuelTypeDisabled
          )}
        </Tr>
        <Tr className={'disabledTr'} disabled={fuelTypeDisabled} key={'regenerativeSystem'}>
          <TdCenter className={'disabledTd'} colSpan={2}>
            구동축전지 격리 상태
          </TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={GoodBadType}
              name={'regenerativeSystem'}
              value={regenerativeSystem}
              onClick={(e: any) => setRegenerativeSystem(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
              disabled={fuelTypeDisabled}
            />
          </td>
          {SpecialtyDom(regenerativeSystemSpecialty, setRegenerativeSystemSpecialty, 1, 1, fuelTypeDisabled, fuelTypeDisabled)}
        </Tr>
        <Tr className={'borderTr'} disabled={fuelTypeDisabled} key={'highVoltageWire'}>
          <TdCenter className={'disabledTd'} colSpan={2}>
            고전원전개배선 상태
            <br />
            (접속단자, 피복, 보호기구)
          </TdCenter>
          <td className={'disabledBorderTd'}>
            <InputRadioDom
              type={GoodBadType}
              name={'highVoltageWire'}
              value={highVoltageWire}
              onClick={(e: any) => setHighVoltageWire(e.target.value)}
              text={['양호', '불량']}
              width={'33%'}
              disabled={fuelTypeDisabled}
            />
          </td>
          {SpecialtyDom(highVoltageWireSpecialty, setHighVoltageWireSpecialty, 1, 1, fuelTypeDisabled, fuelTypeDisabled)}
        </Tr>
        <tr key={'fuelLeakage'}>
          <th>연료</th>
          <TdCenter colSpan={2}>연료누출(LP가스포함)</TdCenter>
          <td>
            <InputRadioDom
              type={NoYesType}
              name={'fuelLeakage'}
              value={fuelLeakage}
              onClick={(e: any) => setFuelLeakage(e.target.value)}
              text={['없음', '있음']}
              width={'33%'}
            />
          </td>
          {PricingSpecialtyDom(fuelLeakagePricing, onChangeFuelLeakagePricing, fuelLeakageSpecialty, setFuelLeakageSpecialty)}
        </tr>
        </tbody>
      </TableBox>
    </Wrapper>
);
})
);

export default memo(VehicleDetails);

const WonTd = styled.td<any>`
  //text-align: center;
  text-align: ${({textLeft}) => (textLeft ? 'left' : 'center')};
  ${({disabledBorderTop}) => disabledBorderTop && 'border-top: 1px solid #d8d8d8;'};
  ${({disabledOpacity}) => disabledOpacity && 'opacity: 0.2; border-top: 1px solid #d8d8d84f'};
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

const BorderBtTh = styled.th`
  border-bottom: 1px solid ${theme.color.tableBorder};
`;

const TdCenter = styled.td<any>`
  text-align: center;
`;

const Tr = styled.tr<any>`
  &.disabledTr {
    ${({disabled}) => disabled && 'border-color: #d8d8d84f;'};
  }
  &.borderTr {
    ${({disabled}) => disabled && 'border-bottom: 1px solid #d8d8d8;'};
  }
  th.borderLeftTh {
    ${({disabled}) => (disabled ? 'opacity: 0.2; border-left: 1px solid #d8d8d8;' : 'border-left: 1px solid #d8d8d8;')};
  }
  th {
    &.opacityDisabledTh {
      ${({disabled}) => disabled && 'opacity: 1'}
    }
    ${({disabled}) => disabled && 'opacity: 0.2;'};
    &.disabledBorderLeftTh {
      border-left: 1px solid #d8d8d8 !important;
      ${({disabled}) => disabled && 'border-left: 1px solid #d8d8d84f;!important;'};
    }
    &.disabledBorderTh {
      ${({disabled}) => (disabled ? 'opacity: 0.2; border-left: 1px solid #d8d8d8;' : 'border-left: 1px solid #d8d8d8;')};
    }
  }
  td {
    &.disabledTd {
      ${({disabled}) => disabled && 'border-left: 1px solid #d8d8d84f; opacity: 0.2;'};
    }
    &.opacityTd {
      ${({disabled}) => disabled && 'border-left: 1px solid #d8d8d84f; border-bottom: 1px solid #d8d8d8; opacity: 0.2;'};
    }
    &.borderTd {
      ${({disabled}) => disabled && 'border-bottom: 1px solid #d8d8d8;'};
    }
    &.disabledBorderBottom {
      ${({disabled}) => disabled && 'border-bottom: 1px solid #d8d8d84f'}
    }
    &.disabledBorderTd {
      ${({disabled}) => disabled && 'border-left: 1px solid #d8d8d84f;'};
    }
    &.disabledTdOpacity {
      ${({disabled}) => disabled && 'opacity: 0.2;'};
    }
    &.borderTopTd {
      ${({disabled}) => disabled && 'border-top: 1px solid #d8d8d8;'};
    }
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
    opacity: .2;
  }

  &.OpacityNoneLabel {
    & input[type='radio']:disabled + label {
      opacity: 1;
    }
  }
`;
