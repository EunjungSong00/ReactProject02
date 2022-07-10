import graphQLClientRequest from '@api/graphQLClientRequest';
import {
  GoodBadType,
  InspectionBasePricingType,
  InspectionColorType,
  InspectionFuelType,
  InspectionLevelType,
  InspectionMileageType,
  InspectionOilStatusType,
  InspectionRecallStatusType,
  InspectionTransmissionOilLevelType,
  InspectionTransmissionType,
  NoYesType,
  warrantyType,
  InpectionRankType,
  VehicleInspectionRecordImageType
} from '@pages/vehicle-management/registration/detail-vehicle/vehicle-inspection-record';

export type QueryType = {
  enrollNumber?: string | number; // 제시번호
  pricingCheck?: boolean; // 자동차 가격조사 산정 선택
  inspectionRecordNumberFront?: string | number; // 발행번호 - 앞
  inspectionRecordNumberMiddle?: string | number; // 발행번호 - 중간
  inspectionRecordNumberBack?: string; // 발행번호 - 뒤
  validPeriodStart?: string; // 검사유효기간 - 시작
  validPeriodEnd?: string; // 검사유효기간 - 종료
  transmissionType: InspectionTransmissionType; // 변속기 종류
  fuelType?: InspectionFuelType; // 사용연료
  warranty?: warrantyType; // 보증유형
  basePricingCalculating?: number | string; // 가격산정 기준가격
  mileage?: number | string; // 주행거리
  odometerStatus?: GoodBadType; // 주행거리 계기상태
  mileageStatus?: InspectionMileageType; // 주행거리 상태
  vehicleIdentityNumberStatus?: GoodBadType; // 차대번호 표기
  hcEmissionPPM?: number; // 배출가스(ppm)
  coEmissionPercentage?: number; // 일산화탄소배출가스(%)
  smokeEmissionPercentage?: number; // 매연배출가스(%)
  tuning?: NoYesType; // 튜닝
  tuningLegal?: boolean; // 튜닝-적법
  tuningDevice?: boolean; // 튜닝-불법
  tuningIllegal?: boolean; // 튜닝-구조
  tuningStructure?: boolean; // 튜닝-장치
  specialHistory?: NoYesType; // 특별이력
  specialHistoryFire?: boolean; // 특별이력-화재
  specialHistoryFlood?: boolean; // 특별이력-침수
  usageChange?: NoYesType; // 용도번경
  usageChangeRent?: boolean; // 용도번경-렌트
  usageChangeLease?: boolean; // 용도변견 - 리스
  usageChangeBusiness?: boolean; // 용도번경-영업용
  color?: InspectionColorType; // 색상
  fullPainting?: boolean; // 전체도색
  colorChange?: boolean; // 색상변경
  feature?: NoYesType; // 주요옵션
  featureETC?: boolean; // 주요옵션-기타
  featureSunroof?: boolean; // 주요옵션-썬루프
  featureNavigation?: boolean; // 주요옵션-네비케이션
  recall?: NoYesType; // 리콜대상
  recallStatus?: InspectionRecallStatusType; // 리콜대상
  hoodOuterPanel?: InpectionRankType; // 후드 이상여부 - 외판부위 1랭크
  frontLeftFenderOuterPanel?: InpectionRankType; // 프론트 휀더(좌) 이상여부 - 외판부위 1랭크
  frontRightFenderOuterPanel?: InpectionRankType; // 프론트 휀더(우) 이상여부 - 외판부위 1랭크
  frontLeftDoorOuterPanel?: InpectionRankType; // 프론트 도어(좌) 이상여부 - 외판부위 1랭크
  frontRightDoorOuterPanel?: InpectionRankType; // 프론트 도어(우) 이상여부 - 외판부위 1랭크
  rearLeftDoorOuterPanel?: InpectionRankType; // 리어 도어(좌) 이상여부 - 외판부위 1랭크
  rearRightDoorOuterPanel?: InpectionRankType; // 리어 도어(우) 이상여부 - 외판부위 1랭크
  trunkLidOuterPanel?: InpectionRankType; // 트렁크 리드 이상여부 - 외판부위 1랭크
  radiatorOuterPanel?: InpectionRankType; // 라디에이터 서포트 이상여부 - 외판부위 1랭크
  roofOuterPanel?: InpectionRankType; // 루프 패널 이상여부 - 외판부위 2랭크
  quarterLeftOuterPanel?: InpectionRankType; // 쿼터 패널(리어펜더)(좌) - 외판부위 2랭크
  quarterRightOuterPanel?: InpectionRankType; // 쿼터 패널(리어펜더)(우) - 외판부위 2랭크
  sideSillLeftOuterPanel?: InpectionRankType; // 사이드실 패널(좌) - 외판부위 2랭크
  sideSillRightOuterPanel?: InpectionRankType; // 사이드실 패널(우) - 외판부위 2랭크
  frontPanelChassis?: InpectionRankType; // 프론트 패널 - 주요골격 A랭크
  crossMemberChassis?: InpectionRankType; // 크로스 멤버 - 주요골격 A랭크
  insideLeftPanelChassis?: InpectionRankType; // 인사이드 패널(좌) - 주요골격 A랭크
  insideRightPanelChassis?: InpectionRankType; // 인사이드 패널(우) - 주요골격 A랭크
  rearPanelChassis?: InpectionRankType; // 리어 패널 - 주요골격 A랭크
  trunkFloorChassis?: InpectionRankType; // 트렁크 플로어 - 주요골격 A랭크
  frontLeftSideMemberChassis?: InpectionRankType; // 프론트 사이드 멤버(좌) - 주요골격 B랭크
  frontRightSideMemberChassis?: InpectionRankType; // 프론트 사이드 멤버(우) - 주요골격 B랭크
  rearLeftSideMemberChassis?: InpectionRankType; // 리어 사이드 멤버(좌) - 주요골격 B랭크
  rearRightSideMemberChassis?: InpectionRankType; // 리어 사이드 멤버(우) - 주요골격 B랭크
  frontLeftWheelHouseChassis?: InpectionRankType; // 프론트 휠하우스(좌) - 주요골격 B랭크
  frontRightWheelHouseChassis?: InpectionRankType; // 프론트 휠하우스(우) - 주요골격 B랭크
  rearLeftWheelHouseChassis?: InpectionRankType; // 리어 휠하우스(좌) - 주요골격 B랭크
  rearRightWheelHouseChassis?: InpectionRankType; // 리어 휠하우스(우) - 주요골격 B랭크
  pillarLeftPanelAChassis?: InpectionRankType; // 필러 패널A(좌) - 주요골격 B랭크
  pillarRightPanelAChassis?: InpectionRankType; // 필러 패널A(우) - 주요골격 B랭크
  pillarLeftPanelBChassis?: InpectionRankType; // 필러 패널B(좌) - 주요골격 B랭크
  pillarRightPanelBChassis?: InpectionRankType; // 필러 패널B(우) - 주요골격 B랭크
  pillarLeftPanelCChassis?: InpectionRankType; // 필러 패널C(좌) - 주요골격 B랭크
  pillarRightPanelCChassis?: InpectionRankType; // 필러 패널C(우) - 주요골격 B랭크
  packageTrayChassis?: InpectionRankType; // 패키지 트레이 - 주요골격 B랭크
  dashPanelChassis?: InpectionRankType; // 대쉬 패널 - 주요골격 C랭크
  floorPanelChassis?: InpectionRankType; // 플로어 패널 - 주요골격 C랭크
  accident?: boolean; // 사고이력
  simpleRepair?: boolean; // 단순수리
  accidentRepairHistoryPricing?: number; // 사고교환수리 - 가격산정금액
  accidentRepairHistorySpecialty?: string; // 사고교환수리 - 특이사항
  outerPanel1RankPricing?: number; // 외판부위 1랭킹 - 가격산정금액
  outerPanel1RankSpecialty?: string; // 외판부위 1랭킹 - 특이사항 추가
  outerPanel2RankPricing?: number; // 외판부위 2랭킹 - 가격산정금액
  outerPanel2RankSpecialty?: string; // 외판부위 2랭킹 - 특이사항
  mainChassisPricing?: number; // 주요골격 - 가격산정금액
  mainChassisSpecialty?: string; // 주요골격 - 특이사항
  selfInspectionMotor?: GoodBadType; // 원동기 옵션
  selfInspectionPricing?: number; // 자가진단 가격조사 산정액
  selfInspectionMotorSpecialty?: string; // 자가진단 원동기 특이사항
  selfInspectionTransmission?: GoodBadType; // 변동기 옵션
  selfInspectionTransmissionSpecialty?: string; // 자가진단 변속기 특이사항
  motorPricing?: number; // 원동기 가격조사 산정액
  idlingStatus?: GoodBadType; // 작동상태(공회전) 옵션
  idlingStatusSpecialty?: string; // 작동상태(공회전) 특이사항
  oilLeakageCylinderCover?: InspectionOilStatusType; // 오일 - 실린더 커버(로커암 커버)
  oilLeakageCylinderCoverSpecialty?: string; // 오일 - 실린더 커버(로커암 커버) 특이사항
  oilLeakageCylinderHeadGasket?: InspectionOilStatusType; // 오일누유 – 실린더 헤드 / 개스킷
  oilLeakageCylinderHeadGasketSpecialty?: string; // 오일 - 실린더 커버(로커암 커버) 특이사항
  oilLeakageCylinderBlockOilPan?: InspectionOilStatusType; // 오일누유 – 실린더 블록 / 오일팬
  oilLeakageCylinderBlockOilPanSpecialty?: string; // 오일 - 실린더 블록 / 오일팬 특이사항
  oilLevel?: InspectionLevelType; // 오일유량
  oilLevelSpecialty?: string; // 오일 유량 특이사항
  coolantLeakageCylinderCover?: InspectionOilStatusType; // 냉각수 - 실린더 헤드 / 개스킷
  coolantLeakageCylinderCoverSpecialty?: string; // 냉각수 - 실린더 헤드 / 개스킷 특이사항
  coolantLeakageWaterPump?: InspectionOilStatusType; // 냉각수 - 워터펌프
  coolantLeakageWaterPumpSpecialty?: string; // 냉각수 - 워터펌프 특이사항
  coolantLeakageRadiator?: InspectionOilStatusType; // 냉각수 - 라디에이터
  coolantLeakageRadiatorSpecialty?: string; // 냉각수 - 라디에이터 특이사항
  coolantLeve?: InspectionLevelType; // 냉각수 - 냉각수 수량
  coolantLeveSpecialty?: string; // 냉각수 - 냉각수 수량 특이사항
  commonRail?: GoodBadType; // 고압펌프(커먼레일) - 디젤엔진
  commonRailSpecialty?: string; // 커먼레일 특이사항
  transmissionPricing?: number; // 변속기 가격조사 산정액
  oilLeakageAutomatic?: InspectionOilStatusType; // A/T - 오일누유
  oilLeakageAutomaticSpecialty?: string; // A/T - 오일누유 특이사항
  oilLevelAutomatic?: InspectionTransmissionOilLevelType; // A/T - 오일유량 및 상태
  oilLevelAutomaticSpecialty?: string; // A/T - 오일유량 및 상태 특이사항
  idlingAutomatic?: GoodBadType; // A/T - 작동상태 (공회전)
  idlingAutomaticSpecialty?: string; // A/T - 작동상태(공회전) 특이사항
  oilLeakageManual?: InspectionOilStatusType; // M/T - 오일누유
  gearShiftManual?: GoodBadType; // M/T - 기어변속장치
  gearShiftManualSpecialty?: string; // M/T - 기어변속장치 특이사항
  oilLevelManual?: InspectionTransmissionOilLevelType; // M/T - 기어변속장치
  oilLevelManualSpecialty?: string; // M/T - 오일유량 및 상태 특이사항
  idlingManual?: GoodBadType; // M/T - 작동상태(공회전)
  idlingManualSpecialty?: string; // M/T - 작동상태(공회전) 특이사항
  powerPricing?: number; // 동력전달 가격조사 산정액
  clutchAssembly?: GoodBadType; // 클러치 어셈블러
  clutchAssemblySpecialty?: string; // 클러치 어셈블리 특이사항
  constantSpeedJoint?: GoodBadType; // 등속조인트
  constantSpeedJointSpecialty?: string; // 등속조인트 특이사항
  propellerShaftBearing?: GoodBadType; // 추진축 및 베어링 특이사항
  differentialGear?: GoodBadType; // 디퍼렌셜 기어
  differentialGearSpecialty?: string; // 디퍼렌셜 기어 특이사항
  steeringPricing?: number; // 조향 가격조사 산정액
  oilLeakageSteeringSystem?: InspectionOilStatusType; // 동력조향 작동 오일 누유
  oilLeakageSteeringSystemSpecialty?: string; // 동력조향 작동 오일 누유 특이사항
  steeringPump?: GoodBadType; // 작동상태 - 스티어링 펌프
  steeringPumpSpecialty?: string; // 작동상태 - 스티어링 펌프 특이사항
  steeringGear?: GoodBadType; // 작동상태 - 스티어링 기어(MDPS포함)
  steeringGearSpecialty?: string; // 작동상태 - 스티어링 기어(MDPS포함) 특이사항
  steeringJoint?: GoodBadType; // 작동상태 - 스티어링조인트
  steeringJointSpecialty?: string; // 작동상태 - 스티어링조인트 특이사항
  powerSteeringHose?: GoodBadType; // 작동상태 - 파워고압호스
  powerSteeringHoseSpecialty?: string; // 작동상태 - 파워고압호스 특이사항
  tieRodEndBallJoint?: GoodBadType; // 작동상태 - 타이로드엔드 및 볼 조인트
  tieRodEndBallJointSpecialty?: string; // 작동상태 - 타이로드엔드 및 볼 조인트 특이사항
  brakePricing?: number; // 제동 가격조사 산정액
  oilLeakageBrakeMasterCylinder?: InspectionOilStatusType; // 브레이크 마스터 실린더오일 누유
  oilLeakageBrakeMasterCylinderSpecialty?: string; // 브레이크 마스터 실린더오일 누유 특이사항
  oilLeakageBrake?: InspectionOilStatusType; // 브레이크 오일 누유
  oilLeakageBrakeSpecialty?: string; // 브레이크 오일 누유 특이사항
  brakeSystem?: GoodBadType; // 배려장치 상태
  brakeSystemSpecialty?: string; // 배려장치 상태 특이사항
  electricityPricing?: number; // 전기 가격조사 산정액
  generator?: GoodBadType; // 발전기 출력
  generatorSpecialty?: string; // 발전기 출력 특이사항
  starterMotor?: GoodBadType; // 시동 모터
  starterMotorSpecialty?: string; // 시동 모터 특이사항
  wiperMotor?: GoodBadType; // 와이퍼 모터 기능
  wiperMotorSpecialty?: string; // 와이퍼 모터 기능 특이사항
  ventilatingMotor?: GoodBadType; // 실내송풍 모터
  ventilatingMotorSpecialty?: string; // 실내송풍 모터 특이사항
  radiatorFanMotor?: GoodBadType; // 라디에이터 팬 모터
  radiatorFanMotorSpecialty?: string; // 라디에이터 팬 모터 특이사항
  windowMotor?: GoodBadType; // 윈도우 모터
  windowMotorSpecialty?: string; // 윈도우 모터 특이사항
  highVoltagePricing?: number; // 고전원 전기장치 가격조사 산정액
  chargingPort?: GoodBadType; // 충전구 절연 상태
  chargingPortSpecialty?: string; // 충전구 절연 상태 특이사항
  regenerativeSystem?: GoodBadType; // 구동축전지 격리 상태
  regenerativeSystemSpecialty?: string; // 구동축전지 격리 상태 특이사항
  highVoltageWire?: GoodBadType; // 고전원전기배선 상태
  highVoltageWireSpecialty?: string; // 고전원전기배선 상태 특이사항
  fuelLeakage?: NoYesType; // 연료 누출
  fuelLeakagePricing?: number; // 연료누출 가격조사 산정액
  fuelLeakageSpecialty?: string; // 연료누출 가격조사 특이사항
  exterior?: GoodBadType; // 외장
  interior?: GoodBadType; // 내장
  polish?: GoodBadType; // 광택
  cabinCleanness?: GoodBadType; // 룸 크리닝
  basePricingType?: InspectionBasePricingType; // 기준서
  wheel?: GoodBadType; // 휠
  wheelDriverFront?: boolean; // 휠 - 운전석 전
  wheelDriverRear?: boolean; // 휠 - 운전석 후
  wheelPassengerFront?: boolean; // 휠 - 동반석 전
  wheelPassengerRear?: boolean; // 휠 - 동반석 후
  wheelEmergency?: boolean; // 휠 - 응급
  tire?: GoodBadType; // 타이어
  tireDriverFront?: boolean; // 타이어 - 운전석 전
  tireDriverRear?: boolean; // 타이어 - 운전석 후
  tirePassengerFront?: boolean; // 타이어 - 동반석 전
  tirePassengerRear?: boolean; // 타이어 - 동반석 후
  tireEmergency?: boolean; // 타이어 - 응급
  window?: GoodBadType; // 유리
  basicItem?: GoodBadType; // 기본품목
  basicItemInstruction?: boolean; // 기본품목 - 사용설명서
  basicItemSafetyTripod?: boolean; // 기본품목 - 안전삼각대
  basicItemJack?: boolean; // 기본품목 - 잭
  basicItemSpanner?: boolean; // 기본품목 - 스패너
  inspectorSpecialty?: string; // 중고자동차 성능 상태점검자 특이사항 및 점검자의 의견
  pricingPersonnelSpecialty?: string; // 중고자동차 가격조사산정자 특이사항 및 점검자의 의견
  inspectorName?: string; // 성능 상태 점검자 이름
  pricingPersonnelName?: string; //  가격 조사 산정
  reportPersonnelName?: string; // 중고자동차 성능 상태 고지자
  finalPricing?: number; // 최종 가격조사 산정액
  signatureDate?: string; // 서명 날짜 - 있는지 없는지 문의
  mileagePricing?: number; // 주행거리 가격조사 산정액
  mileageSpecialty?: string; // 주행거리 특이사항
  mileageStatusPricing?: number; // 주행거리 상태 가격조사 산정액
  mileageStatusSpecialty?: string; // 주행거리 특이사항
  vehicleIdentityNumberStatusPricing?: number; // 주행거리 표기 가격조사 산정액
  vehicleIdentityNumberStatusSpecialty?: string; // 주행거리 표기 특이사항
  emissionPricing?: number; // 배출가스 가격조사 산정액
  emissionSpecialty?: string; // 배출가스 특이사항
  specialHistoryPricing?: number; // 특별이력 가격조사 산정액
  specialHistorySpecialty?: string; // 특별이력 특이사항
  usageChangePricing?: number; // 용도번경 가격조사 산정액
  usageChangeSpecialty?: string; // 용도번경 특이사항
  tuningPricing?: number; // 가격조사 산정액
  tuningSpecialty?: string; // 튜닝 특이사항
  colorPricing?: number; // 색상 가격조사 산정액
  colorSpecialty?: string; // 색상 특이사항
  featurePricing?: number; // 주요옵션 가격조사 산정액
  featureSpecialty?: string; // 주요옵션 가격조사 특이사항
  otherInformationPricing?: number; // 자동차 기타정보 가격조사 산정액
  oilLeakageManualSpecialty?: string;
  propellerShaftBearingSpecialty?: string;
  inspectionRecordImageList: VehicleInspectionRecordImageType[]; // 차량성능점검지 첨부 - 얘만 필수!
  inspectionRecordVersion?: boolean; // 성능기록부 버전
};

export default function setVehicleInspectionRecordApi(
  id: string,
  {
    enrollNumber,
    pricingCheck,
    inspectionRecordNumberFront,
    inspectionRecordNumberMiddle,
    inspectionRecordNumberBack,
    validPeriodStart,
    validPeriodEnd,
    transmissionType,
    fuelType,
    warranty,
    basePricingCalculating,
    mileage,
    mileagePricing,
    mileageSpecialty,
    mileageStatusPricing,
    mileageStatusSpecialty,
    odometerStatus,
    mileageStatus,
    vehicleIdentityNumberStatus,
    vehicleIdentityNumberStatusPricing,
    vehicleIdentityNumberStatusSpecialty,
    hcEmissionPPM,
    coEmissionPercentage,
    smokeEmissionPercentage,
    emissionPricing,
    emissionSpecialty,
    tuning,
    tuningLegal,
    tuningDevice,
    tuningIllegal,
    tuningStructure,
    tuningPricing,
    tuningSpecialty,
    specialHistory,
    specialHistoryFire,
    specialHistoryFlood,
    specialHistoryPricing,
    specialHistorySpecialty,
    usageChange,
    usageChangeRent,
    usageChangeLease,
    usageChangeBusiness,
    usageChangePricing,
    usageChangeSpecialty,
    color,
    colorPricing,
    colorSpecialty,
    fullPainting,
    colorChange,
    feature,
    featureETC,
    featureSunroof,
    featureNavigation,
    featurePricing,
    featureSpecialty,
    recall,
    recallStatus,
    hoodOuterPanel,
    frontLeftFenderOuterPanel,
    frontRightFenderOuterPanel,
    frontLeftDoorOuterPanel,
    frontRightDoorOuterPanel,
    rearLeftDoorOuterPanel,
    rearRightDoorOuterPanel,
    trunkLidOuterPanel,
    radiatorOuterPanel,
    roofOuterPanel,
    quarterLeftOuterPanel,
    quarterRightOuterPanel,
    sideSillLeftOuterPanel,
    sideSillRightOuterPanel,
    frontPanelChassis,
    crossMemberChassis,
    insideLeftPanelChassis,
    insideRightPanelChassis,
    rearPanelChassis,
    trunkFloorChassis,
    frontLeftSideMemberChassis,
    frontRightSideMemberChassis,
    rearLeftSideMemberChassis,
    rearRightSideMemberChassis,
    frontLeftWheelHouseChassis,
    frontRightWheelHouseChassis,
    rearLeftWheelHouseChassis,
    rearRightWheelHouseChassis,
    pillarLeftPanelAChassis,
    pillarRightPanelAChassis,
    pillarLeftPanelBChassis,
    pillarRightPanelBChassis,
    pillarLeftPanelCChassis,
    pillarRightPanelCChassis,
    packageTrayChassis,
    dashPanelChassis,
    floorPanelChassis,
    accident,
    simpleRepair,
    accidentRepairHistoryPricing,
    accidentRepairHistorySpecialty,
    outerPanel1RankPricing,
    outerPanel1RankSpecialty,
    outerPanel2RankPricing,
    outerPanel2RankSpecialty,
    mainChassisPricing,
    mainChassisSpecialty,
    selfInspectionMotor,
    selfInspectionPricing,
    selfInspectionMotorSpecialty,
    selfInspectionTransmission,
    selfInspectionTransmissionSpecialty,
    motorPricing,
    idlingStatus,
    idlingStatusSpecialty,
    oilLeakageCylinderCoverSpecialty,
    oilLeakageCylinderHeadGasket,
    oilLeakageCylinderHeadGasketSpecialty,
    oilLeakageCylinderBlockOilPan,
    oilLeakageCylinderBlockOilPanSpecialty,
    oilLevel,
    oilLevelSpecialty,
    coolantLeakageCylinderCover,
    coolantLeakageCylinderCoverSpecialty,
    coolantLeakageWaterPump,
    coolantLeakageWaterPumpSpecialty,
    coolantLeakageRadiator,
    coolantLeakageRadiatorSpecialty,
    coolantLeve,
    coolantLeveSpecialty,
    commonRail,
    commonRailSpecialty,
    transmissionPricing,
    oilLeakageAutomatic,
    oilLeakageAutomaticSpecialty,
    oilLevelAutomatic,
    oilLevelAutomaticSpecialty,
    idlingAutomatic,
    idlingAutomaticSpecialty,
    oilLeakageManual,
    oilLeakageManualSpecialty,
    oilLeakageCylinderCover,
    gearShiftManual,
    gearShiftManualSpecialty,
    oilLevelManual,
    oilLevelManualSpecialty,
    idlingManual,
    idlingManualSpecialty,
    powerPricing,
    clutchAssembly,
    clutchAssemblySpecialty,
    constantSpeedJoint,
    constantSpeedJointSpecialty,
    propellerShaftBearing,
    propellerShaftBearingSpecialty,
    differentialGear,
    differentialGearSpecialty,
    steeringPricing,
    oilLeakageSteeringSystem,
    oilLeakageSteeringSystemSpecialty,
    steeringPump,
    steeringPumpSpecialty,
    steeringGear,
    steeringGearSpecialty,
    steeringJoint,
    steeringJointSpecialty,
    powerSteeringHose,
    powerSteeringHoseSpecialty,
    tieRodEndBallJoint,
    tieRodEndBallJointSpecialty,
    brakePricing,
    oilLeakageBrakeMasterCylinder,
    oilLeakageBrakeMasterCylinderSpecialty,
    oilLeakageBrake,
    oilLeakageBrakeSpecialty,
    brakeSystem,
    brakeSystemSpecialty,
    electricityPricing,
    generator,
    generatorSpecialty,
    starterMotor,
    starterMotorSpecialty,
    wiperMotor,
    wiperMotorSpecialty,
    ventilatingMotor,
    ventilatingMotorSpecialty,
    radiatorFanMotor,
    radiatorFanMotorSpecialty,
    windowMotor,
    windowMotorSpecialty,
    highVoltagePricing,
    chargingPort,
    chargingPortSpecialty,
    regenerativeSystem,
    regenerativeSystemSpecialty,
    highVoltageWire,
    highVoltageWireSpecialty,
    fuelLeakage,
    fuelLeakagePricing,
    fuelLeakageSpecialty,
    exterior,
    interior,
    polish,
    cabinCleanness,
    basePricingType,
    wheel,
    wheelDriverFront,
    wheelDriverRear,
    wheelPassengerFront,
    wheelPassengerRear,
    wheelEmergency,
    tire,
    tireDriverFront,
    tireDriverRear,
    tirePassengerFront,
    tirePassengerRear,
    tireEmergency,
    window,
    basicItem,
    basicItemInstruction,
    basicItemSafetyTripod,
    basicItemJack,
    basicItemSpanner,
    otherInformationPricing,
    inspectorSpecialty,
    pricingPersonnelSpecialty,
    inspectorName,
    pricingPersonnelName,
    reportPersonnelName,
    finalPricing,
    signatureDate,
    inspectionRecordImageList,
    inspectionRecordVersion
  }: QueryType
) {
  const mutation = `
  mutation{
  setVehicleInspectionRecord (
    id: "${id}",
    request: {
        ${enrollNumber ? `enrollNumber: "${enrollNumber}"` : ''}     
        ${pricingCheck ? `pricingCheck: ${pricingCheck}` : ''}
        ${inspectionRecordNumberFront ? `inspectionRecordNumberFront: "${inspectionRecordNumberFront}"` : ''}
        ${inspectionRecordNumberMiddle ? `inspectionRecordNumberMiddle: "${inspectionRecordNumberMiddle}"` : ''} 
        ${inspectionRecordNumberBack ? `inspectionRecordNumberBack: "${inspectionRecordNumberBack}"` : ''}
        ${validPeriodStart ? `validPeriodStart: "${validPeriodStart}"` : ''}
        ${validPeriodEnd ? `validPeriodEnd: "${validPeriodEnd}"` : ''}
        ${transmissionType ? `transmissionType: ${transmissionType}` : ''}
        ${fuelType ? `fuelType: ${fuelType}` : ''}   
        ${warranty ? `warranty: ${warranty}` : ''}  
        ${basePricingCalculating ? `basePricingCalculating: ${basePricingCalculating}` : ''}                  
        ${mileage ? `mileage: ${mileage}` : ''} 
        ${mileagePricing ? `mileagePricing: ${mileagePricing}` : ''} 
        ${mileageSpecialty ? `mileageSpecialty: "${mileageSpecialty}"` : ''}
        ${mileageStatusPricing ? `mileageStatusPricing: ${mileageStatusPricing}` : ''} 
        ${mileageStatusSpecialty ? `mileageStatusSpecialty: "${mileageStatusSpecialty}"` : ''} 
        ${odometerStatus ? `odometerStatus: ${odometerStatus}` : ''}
        ${mileageStatus ? `mileageStatus: ${mileageStatus}` : ''}
        ${vehicleIdentityNumberStatus ? `vehicleIdentityNumberStatus: ${vehicleIdentityNumberStatus}` : ''}
        ${vehicleIdentityNumberStatusPricing ? `vehicleIdentityNumberStatusPricing: ${vehicleIdentityNumberStatusPricing}` : ''}
        ${vehicleIdentityNumberStatusSpecialty ? `vehicleIdentityNumberStatusSpecialty: "${vehicleIdentityNumberStatusSpecialty}"` : ''}       
        ${hcEmissionPPM ? `hcEmissionPPM: ${hcEmissionPPM}` : ''}  
        ${coEmissionPercentage ? `coEmissionPercentage: ${coEmissionPercentage}` : ''}   
        ${smokeEmissionPercentage ? `smokeEmissionPercentage: ${smokeEmissionPercentage}` : ''}  
        ${emissionPricing ? `emissionPricing : ${emissionPricing}` : ''}
        ${emissionSpecialty ? `emissionSpecialty: "${emissionSpecialty}"` : ''}
        ${tuning ? `tuning: ${tuning}` : ''}
        ${tuningLegal ? `tuningLegal: ${tuningLegal}` : ''}
        ${tuningDevice ? `tuningDevice: ${tuningDevice}` : ''}
        ${tuningIllegal ? `tuningIllegal: ${tuningIllegal}` : ''}
        ${tuningStructure ? `tuningStructure: ${tuningStructure}` : ''}
        ${tuningPricing ? `tuningPricing: ${tuningPricing}` : ''}
        ${tuningSpecialty ? `tuningSpecialty: "${tuningSpecialty}"` : ''}
        ${specialHistory ? `specialHistory: ${specialHistory}` : ''}
        ${specialHistoryFire ? `specialHistoryFire: ${specialHistoryFire}` : ''}
        ${specialHistoryFlood ? `specialHistoryFlood: ${specialHistoryFlood}` : ''}
        ${specialHistoryPricing ? `specialHistoryPricing: ${specialHistoryPricing}` : ''}
        ${specialHistorySpecialty ? `specialHistorySpecialty: "${specialHistorySpecialty}"` : ''}
        ${usageChange ? `usageChange: ${usageChange}` : ''}
        ${usageChangeRent ? `usageChangeRent: ${usageChangeRent}` : ''}
        ${usageChangeLease ? `usageChangeLease: ${usageChangeLease}` : ''}
        ${usageChangeBusiness ? `usageChangeBusiness: ${usageChangeBusiness}` : ''}
        ${usageChangePricing ? `usageChangePricing: ${usageChangePricing}` : ''}
        ${usageChangeSpecialty ? `usageChangeSpecialty: "${usageChangeSpecialty}"` : ''}
        ${color ? `color: ${color}` : ''}
        ${colorPricing ? `colorPricing: ${colorPricing}` : ''}
        ${colorSpecialty ? `colorSpecialty: "${colorSpecialty}"` : ''}
        ${fullPainting ? `fullPainting: ${fullPainting}` : ''}
        ${colorChange ? `colorChange: ${colorChange}` : ''}
        ${feature ? `feature: ${feature}` : ''}
        ${featureETC ? `featureETC: ${featureETC}` : ''}
        ${featureSunroof ? `featureSunroof: ${featureSunroof}` : ''}
        ${featureNavigation ? `featureNavigation: ${featureNavigation}` : ''}
        ${featurePricing ? `featurePricing: ${featurePricing}` : ''}
        ${featureSpecialty ? `featureSpecialty: "${featureSpecialty}"` : ''}
        ${recall ? `recall: ${recall}` : ''}
        ${recallStatus ? `recallStatus: ${recallStatus}` : ''}
        hoodOuterPanel: {
          exchange: ${!!hoodOuterPanel?.exchange}
          sheetMetal: ${!!hoodOuterPanel?.sheetMetal}
          corrosion: ${!!hoodOuterPanel?.corrosion}
          scratch: ${!!hoodOuterPanel?.scratch}
          uneven: ${!!hoodOuterPanel?.uneven}
          damage: ${!!hoodOuterPanel?.damage}
        }
        frontLeftFenderOuterPanel: {
          exchange: ${!!frontLeftFenderOuterPanel?.exchange}
          sheetMetal: ${!!frontLeftFenderOuterPanel?.sheetMetal}
          corrosion: ${!!frontLeftFenderOuterPanel?.corrosion}
          scratch: ${!!frontLeftFenderOuterPanel?.scratch}
          uneven: ${!!frontLeftFenderOuterPanel?.uneven}
          damage: ${!!frontLeftFenderOuterPanel?.damage}
        }
        frontRightFenderOuterPanel: {
          exchange: ${!!frontRightFenderOuterPanel?.exchange}
          sheetMetal: ${!!frontRightFenderOuterPanel?.sheetMetal}
          corrosion: ${!!frontRightFenderOuterPanel?.corrosion}
          scratch: ${!!frontRightFenderOuterPanel?.scratch}
          uneven: ${!!frontRightFenderOuterPanel?.uneven}
          damage: ${!!frontRightFenderOuterPanel?.damage}
        }
        frontLeftDoorOuterPanel: {
          exchange: ${!!frontLeftDoorOuterPanel?.exchange}
          sheetMetal: ${!!frontLeftDoorOuterPanel?.sheetMetal}
          corrosion: ${!!frontLeftDoorOuterPanel?.corrosion}
          scratch: ${!!frontLeftDoorOuterPanel?.scratch}
          uneven: ${!!frontLeftDoorOuterPanel?.uneven}
          damage: ${!!frontLeftDoorOuterPanel?.damage}
        }
        frontRightDoorOuterPanel: {
          exchange: ${!!frontRightDoorOuterPanel?.exchange}
          sheetMetal: ${!!frontRightDoorOuterPanel?.sheetMetal}
          corrosion: ${!!frontRightDoorOuterPanel?.corrosion}
          scratch: ${!!frontRightDoorOuterPanel?.scratch}
          uneven: ${!!frontRightDoorOuterPanel?.uneven}
          damage: ${!!frontRightDoorOuterPanel?.damage}
        }
        rearLeftDoorOuterPanel: {
          exchange: ${!!rearLeftDoorOuterPanel?.exchange}
          sheetMetal: ${!!rearLeftDoorOuterPanel?.sheetMetal}
          corrosion: ${!!rearLeftDoorOuterPanel?.corrosion}
          scratch: ${!!rearLeftDoorOuterPanel?.scratch}
          uneven: ${!!rearLeftDoorOuterPanel?.uneven}
          damage: ${!!rearLeftDoorOuterPanel?.damage}
        }
        rearRightDoorOuterPanel: {
          exchange: ${!!rearRightDoorOuterPanel?.exchange}
          sheetMetal: ${!!rearRightDoorOuterPanel?.sheetMetal}
          corrosion: ${!!rearRightDoorOuterPanel?.corrosion}
          scratch: ${!!rearRightDoorOuterPanel?.scratch}
          uneven: ${!!rearRightDoorOuterPanel?.uneven}
          damage: ${!!rearRightDoorOuterPanel?.damage}
        }
        trunkLidOuterPanel: {
          exchange: ${!!trunkLidOuterPanel?.exchange}
          sheetMetal: ${!!trunkLidOuterPanel?.sheetMetal}
          corrosion: ${!!trunkLidOuterPanel?.corrosion}
          scratch: ${!!trunkLidOuterPanel?.scratch}
          uneven: ${!!trunkLidOuterPanel?.uneven}
          damage: ${!!trunkLidOuterPanel?.damage}
        }
        radiatorOuterPanel: {
          exchange: ${!!radiatorOuterPanel?.exchange}
          sheetMetal: ${!!radiatorOuterPanel?.sheetMetal}
          corrosion: ${!!radiatorOuterPanel?.corrosion}
          scratch: ${!!radiatorOuterPanel?.scratch}
          uneven: ${!!radiatorOuterPanel?.uneven}
          damage: ${!!radiatorOuterPanel?.damage}
        }
        roofOuterPanel: {
          exchange: ${!!roofOuterPanel?.exchange}
          sheetMetal: ${!!roofOuterPanel?.sheetMetal}
          corrosion: ${!!roofOuterPanel?.corrosion}
          scratch: ${!!roofOuterPanel?.scratch}
          uneven: ${!!roofOuterPanel?.uneven}
          damage: ${!!roofOuterPanel?.damage}
        }
        quarterLeftOuterPanel: {
          exchange: ${!!quarterLeftOuterPanel?.exchange}
          sheetMetal: ${!!quarterLeftOuterPanel?.sheetMetal}
          corrosion: ${!!quarterLeftOuterPanel?.corrosion}
          scratch: ${!!quarterLeftOuterPanel?.scratch}
          uneven: ${!!quarterLeftOuterPanel?.uneven}
          damage: ${!!quarterLeftOuterPanel?.damage}
        }
        quarterRightOuterPanel: {
          exchange: ${!!quarterRightOuterPanel?.exchange}
          sheetMetal: ${!!quarterRightOuterPanel?.sheetMetal}
          corrosion: ${!!quarterRightOuterPanel?.corrosion}
          scratch: ${!!quarterRightOuterPanel?.scratch}
          uneven: ${!!quarterRightOuterPanel?.uneven}
          damage: ${!!quarterRightOuterPanel?.damage}
        }
        sideSillLeftOuterPanel: {
          exchange: ${!!sideSillLeftOuterPanel?.exchange}
          sheetMetal: ${!!sideSillLeftOuterPanel?.sheetMetal}
          corrosion: ${!!sideSillLeftOuterPanel?.corrosion}
          scratch: ${!!sideSillLeftOuterPanel?.scratch}
          uneven: ${!!sideSillLeftOuterPanel?.uneven}
          damage: ${!!sideSillLeftOuterPanel?.damage}
        }
        sideSillRightOuterPanel: {
          exchange: ${!!sideSillRightOuterPanel?.exchange}
          sheetMetal: ${!!sideSillRightOuterPanel?.sheetMetal}
          corrosion: ${!!sideSillRightOuterPanel?.corrosion}
          scratch: ${!!sideSillRightOuterPanel?.scratch}
          uneven: ${!!sideSillRightOuterPanel?.uneven}
          damage: ${!!sideSillRightOuterPanel?.damage}
        }
        frontPanelChassis: {
          exchange: ${!!frontPanelChassis?.exchange}
          sheetMetal: ${!!frontPanelChassis?.sheetMetal}
          corrosion: ${!!frontPanelChassis?.corrosion}
          scratch: ${!!frontPanelChassis?.scratch}
          uneven: ${!!frontPanelChassis?.uneven}
          damage: ${!!frontPanelChassis?.damage}
        }
        crossMemberChassis: {
          exchange: ${!!crossMemberChassis?.exchange}
          sheetMetal: ${!!crossMemberChassis?.sheetMetal}
          corrosion: ${!!crossMemberChassis?.corrosion}
          scratch: ${!!crossMemberChassis?.scratch}
          uneven: ${!!crossMemberChassis?.uneven}
          damage: ${!!crossMemberChassis?.damage}
        }
        insideLeftPanelChassis: {
          exchange: ${!!insideLeftPanelChassis?.exchange}
          sheetMetal: ${!!insideLeftPanelChassis?.sheetMetal}
          corrosion: ${!!insideLeftPanelChassis?.corrosion}
          scratch: ${!!insideLeftPanelChassis?.scratch}
          uneven: ${!!insideLeftPanelChassis?.uneven}
          damage: ${!!insideLeftPanelChassis?.damage}
        }
        insideRightPanelChassis: {
          exchange: ${!!insideRightPanelChassis?.exchange}
          sheetMetal: ${!!insideRightPanelChassis?.sheetMetal}
          corrosion: ${!!insideRightPanelChassis?.corrosion}
          scratch: ${!!insideRightPanelChassis?.scratch}
          uneven: ${!!insideRightPanelChassis?.uneven}
          damage: ${!!insideRightPanelChassis?.damage}
        }
        rearPanelChassis: {
          exchange: ${!!rearPanelChassis?.exchange}
          sheetMetal: ${!!rearPanelChassis?.sheetMetal}
          corrosion: ${!!rearPanelChassis?.corrosion}
          scratch: ${!!rearPanelChassis?.scratch}
          uneven: ${!!rearPanelChassis?.uneven}
          damage: ${!!rearPanelChassis?.damage}
        }
        trunkFloorChassis: {
          exchange: ${!!trunkFloorChassis?.exchange}
          sheetMetal: ${!!trunkFloorChassis?.sheetMetal}
          corrosion: ${!!trunkFloorChassis?.corrosion}
          scratch: ${!!trunkFloorChassis?.scratch}
          uneven: ${!!trunkFloorChassis?.uneven}
          damage: ${!!trunkFloorChassis?.damage}
        }
        frontLeftSideMemberChassis: {
          exchange: ${!!frontLeftSideMemberChassis?.exchange}
          sheetMetal: ${!!frontLeftSideMemberChassis?.sheetMetal}
          corrosion: ${!!frontLeftSideMemberChassis?.corrosion}
          scratch: ${!!frontLeftSideMemberChassis?.scratch}
          uneven: ${!!frontLeftSideMemberChassis?.uneven}
          damage: ${!!frontLeftSideMemberChassis?.damage}
        }
        frontRightSideMemberChassis: {
          exchange: ${!!frontRightSideMemberChassis?.exchange}
          sheetMetal: ${!!frontRightSideMemberChassis?.sheetMetal}
          corrosion: ${!!frontRightSideMemberChassis?.corrosion}
          scratch: ${!!frontRightSideMemberChassis?.scratch}
          uneven: ${!!frontRightSideMemberChassis?.uneven}
          damage: ${!!frontRightSideMemberChassis?.damage}
        }
        rearLeftSideMemberChassis: {
          exchange: ${!!rearLeftSideMemberChassis?.exchange}
          sheetMetal: ${!!rearLeftSideMemberChassis?.sheetMetal}
          corrosion: ${!!rearLeftSideMemberChassis?.corrosion}
          scratch: ${!!rearLeftSideMemberChassis?.scratch}
          uneven: ${!!rearLeftSideMemberChassis?.uneven}
          damage: ${!!rearLeftSideMemberChassis?.damage}
        }
        rearRightSideMemberChassis: {
          exchange: ${!!rearRightSideMemberChassis?.exchange}
          sheetMetal: ${!!rearRightSideMemberChassis?.sheetMetal}
          corrosion: ${!!rearRightSideMemberChassis?.corrosion}
          scratch: ${!!rearRightSideMemberChassis?.scratch}
          uneven: ${!!rearRightSideMemberChassis?.uneven}
          damage: ${!!rearRightSideMemberChassis?.damage}
        }
        frontLeftWheelHouseChassis: {
          exchange: ${!!frontLeftWheelHouseChassis?.exchange}
          sheetMetal: ${!!frontLeftWheelHouseChassis?.sheetMetal}
          corrosion: ${!!frontLeftWheelHouseChassis?.corrosion}
          scratch: ${!!frontLeftWheelHouseChassis?.scratch}
          uneven: ${!!frontLeftWheelHouseChassis?.uneven}
          damage: ${!!frontLeftWheelHouseChassis?.damage}
        }
        frontRightWheelHouseChassis: {
          exchange: ${!!frontRightWheelHouseChassis?.exchange}
          sheetMetal: ${!!frontRightWheelHouseChassis?.sheetMetal}
          corrosion: ${!!frontRightWheelHouseChassis?.corrosion}
          scratch: ${!!frontRightWheelHouseChassis?.scratch}
          uneven: ${!!frontRightWheelHouseChassis?.uneven}
          damage: ${!!frontRightWheelHouseChassis?.damage}
        }
        rearLeftWheelHouseChassis: {
          exchange: ${!!rearLeftWheelHouseChassis?.exchange}
          sheetMetal: ${!!rearLeftWheelHouseChassis?.sheetMetal}
          corrosion: ${!!rearLeftWheelHouseChassis?.corrosion}
          scratch: ${!!rearLeftWheelHouseChassis?.scratch}
          uneven: ${!!rearLeftWheelHouseChassis?.uneven}
          damage: ${!!rearLeftWheelHouseChassis?.damage}
        }
        rearRightWheelHouseChassis: {
          exchange: ${!!rearRightWheelHouseChassis?.exchange}
          sheetMetal: ${!!rearRightWheelHouseChassis?.sheetMetal}
          corrosion: ${!!rearRightWheelHouseChassis?.corrosion}
          scratch: ${!!rearRightWheelHouseChassis?.scratch}
          uneven: ${!!rearRightWheelHouseChassis?.uneven}
          damage: ${!!rearRightWheelHouseChassis?.damage}
        }
        pillarLeftPanelAChassis: {
          exchange: ${!!pillarLeftPanelAChassis?.exchange}
          sheetMetal: ${!!pillarLeftPanelAChassis?.sheetMetal}
          corrosion: ${!!pillarLeftPanelAChassis?.corrosion}
          scratch: ${!!pillarLeftPanelAChassis?.scratch}
          uneven: ${!!pillarLeftPanelAChassis?.uneven}
          damage: ${!!pillarLeftPanelAChassis?.damage}
        }
        pillarRightPanelAChassis: {
          exchange: ${!!pillarRightPanelAChassis?.exchange}
          sheetMetal: ${!!pillarRightPanelAChassis?.sheetMetal}
          corrosion: ${!!pillarRightPanelAChassis?.corrosion}
          scratch: ${!!pillarRightPanelAChassis?.scratch}
          uneven: ${!!pillarRightPanelAChassis?.uneven}
          damage: ${!!pillarRightPanelAChassis?.damage}
        }
        pillarLeftPanelBChassis: {
          exchange: ${!!pillarLeftPanelBChassis?.exchange}
          sheetMetal: ${!!pillarLeftPanelBChassis?.sheetMetal}
          corrosion: ${!!pillarLeftPanelBChassis?.corrosion}
          scratch: ${!!pillarLeftPanelBChassis?.scratch}
          uneven: ${!!pillarLeftPanelBChassis?.uneven}
          damage: ${!!pillarLeftPanelBChassis?.damage}
        }
        pillarRightPanelBChassis: {
          exchange: ${!!pillarRightPanelBChassis?.exchange}
          sheetMetal: ${!!pillarRightPanelBChassis?.sheetMetal}
          corrosion: ${!!pillarRightPanelBChassis?.corrosion}
          scratch: ${!!pillarRightPanelBChassis?.scratch}
          uneven: ${!!pillarRightPanelBChassis?.uneven}
          damage: ${!!pillarRightPanelBChassis?.damage}
        }
        pillarLeftPanelCChassis: {
          exchange: ${!!pillarLeftPanelCChassis?.exchange}
          sheetMetal: ${!!pillarLeftPanelCChassis?.sheetMetal}
          corrosion: ${!!pillarLeftPanelCChassis?.corrosion}
          scratch: ${!!pillarLeftPanelCChassis?.scratch}
          uneven: ${!!pillarLeftPanelCChassis?.uneven}
          damage: ${!!pillarLeftPanelCChassis?.damage}
        }
        pillarRightPanelCChassis: {
          exchange: ${!!pillarRightPanelCChassis?.exchange}
          sheetMetal: ${!!pillarRightPanelCChassis?.sheetMetal}
          corrosion: ${!!pillarRightPanelCChassis?.corrosion}
          scratch: ${!!pillarRightPanelCChassis?.scratch}
          uneven: ${!!pillarRightPanelCChassis?.uneven}
          damage: ${!!pillarRightPanelCChassis?.damage}
        }
        packageTrayChassis: {
          exchange: ${!!packageTrayChassis?.exchange}
          sheetMetal: ${!!packageTrayChassis?.sheetMetal}
          corrosion: ${!!packageTrayChassis?.corrosion}
          scratch: ${!!packageTrayChassis?.scratch}
          uneven: ${!!packageTrayChassis?.uneven}
          damage: ${!!packageTrayChassis?.damage}
        }
        dashPanelChassis: {
          exchange: ${!!dashPanelChassis?.exchange}
          sheetMetal: ${!!dashPanelChassis?.sheetMetal}
          corrosion: ${!!dashPanelChassis?.corrosion}
          scratch: ${!!dashPanelChassis?.scratch}
          uneven: ${!!dashPanelChassis?.uneven}
          damage: ${!!dashPanelChassis?.damage}
        }
        floorPanelChassis: {
          exchange: ${!!floorPanelChassis?.exchange}
          sheetMetal: ${!!floorPanelChassis?.sheetMetal}
          corrosion: ${!!floorPanelChassis?.corrosion}
          scratch: ${!!floorPanelChassis?.scratch}
          uneven: ${!!floorPanelChassis?.uneven}
          damage: ${!!floorPanelChassis?.damage}
        }
        ${accident ? `accident: ${accident}` : ''}
        ${simpleRepair ? `simpleRepair: ${simpleRepair}` : ''}
        ${accidentRepairHistoryPricing ? `accidentRepairHistoryPricing: ${accidentRepairHistoryPricing}` : ''}
        ${accidentRepairHistorySpecialty ? `accidentRepairHistorySpecialty: "${accidentRepairHistorySpecialty}"` : ''}
        ${outerPanel1RankPricing ? `outerPanel1RankPricing: ${outerPanel1RankPricing}` : ''}
        ${outerPanel1RankSpecialty ? `outerPanel1RankSpecialty: "${outerPanel1RankSpecialty}"` : ''}
        ${outerPanel2RankPricing ? `outerPanel2RankPricing: ${outerPanel2RankPricing}` : ''}
        ${outerPanel2RankSpecialty ? `outerPanel2RankSpecialty: "${outerPanel2RankSpecialty}"` : ''}
        ${mainChassisPricing ? `mainChassisPricing: ${mainChassisPricing}` : ''}
        ${mainChassisSpecialty ? `mainChassisSpecialty: "${mainChassisSpecialty}"` : ''}
        ${selfInspectionMotor ? `selfInspectionMotor: ${selfInspectionMotor}` : ''}
        ${selfInspectionPricing ? `selfInspectionPricing: ${selfInspectionPricing}` : ''}
        ${selfInspectionMotorSpecialty ? `selfInspectionMotorSpecialty: "${selfInspectionMotorSpecialty}"` : ''} 
        ${selfInspectionTransmission ? `selfInspectionTransmission: ${selfInspectionTransmission}` : ''}
        ${selfInspectionTransmissionSpecialty ? `selfInspectionTransmissionSpecialty: "${selfInspectionTransmissionSpecialty}"` : ''}  
        ${motorPricing ? `motorPricing: ${motorPricing}` : ''} 
        ${idlingStatus ? `idlingStatus: ${idlingStatus}` : ''}
        ${idlingStatusSpecialty ? `idlingStatusSpecialty: "${idlingStatusSpecialty}"` : ''} 
        ${oilLeakageCylinderCoverSpecialty ? `oilLeakageCylinderCoverSpecialty: "${oilLeakageCylinderCoverSpecialty}"` : ''} 
        ${oilLeakageCylinderHeadGasket ? `oilLeakageCylinderHeadGasket: ${oilLeakageCylinderHeadGasket}` : ''}
        ${oilLeakageCylinderHeadGasketSpecialty ? `oilLeakageCylinderHeadGasketSpecialty: "${oilLeakageCylinderHeadGasketSpecialty}"` : ''}
        ${oilLeakageCylinderBlockOilPan ? `oilLeakageCylinderBlockOilPan: ${oilLeakageCylinderBlockOilPan}` : ''}    
        ${oilLeakageCylinderBlockOilPanSpecialty ? `oilLeakageCylinderBlockOilPanSpecialty: "${oilLeakageCylinderBlockOilPanSpecialty}"` : ''}
        ${oilLevel ? `oilLevel: ${oilLevel}` : ''}
        ${oilLevelSpecialty ? `oilLevelSpecialty: "${oilLevelSpecialty}"` : ''}
        ${coolantLeakageCylinderCover ? `coolantLeakageCylinderCover: ${coolantLeakageCylinderCover}` : ''}
        ${coolantLeakageCylinderCoverSpecialty ? `coolantLeakageCylinderCoverSpecialty: "${coolantLeakageCylinderCoverSpecialty}"` : ''}  
        ${coolantLeakageWaterPump ? `coolantLeakageWaterPump: ${coolantLeakageWaterPump}` : ''}  
        ${coolantLeakageWaterPumpSpecialty ? `coolantLeakageWaterPumpSpecialty: "${coolantLeakageWaterPumpSpecialty}"` : ''}  
        ${coolantLeakageRadiator ? `coolantLeakageRadiator: ${coolantLeakageRadiator}` : ''}
        ${coolantLeakageRadiatorSpecialty ? `coolantLeakageRadiatorSpecialty: "${coolantLeakageRadiatorSpecialty}"` : ''}   
        ${coolantLeve ? `coolantLeve: ${coolantLeve}` : ''}
        ${coolantLeveSpecialty ? `coolantLeveSpecialty: "${coolantLeveSpecialty}"` : ''}  
        ${commonRail ? `commonRail: ${commonRail}` : ''}
        ${commonRailSpecialty ? `commonRailSpecialty: "${commonRailSpecialty}"` : ''}   
        ${transmissionPricing ? `transmissionPricing: ${transmissionPricing}` : ''}    
        ${oilLeakageAutomatic ? `oilLeakageAutomatic: ${oilLeakageAutomatic}` : ''}
        ${oilLeakageAutomaticSpecialty ? `oilLeakageAutomaticSpecialty: "${oilLeakageAutomaticSpecialty}"` : ''}     
        ${oilLevelAutomatic ? `oilLevelAutomatic: ${oilLevelAutomatic}` : ''}  
        ${oilLevelAutomaticSpecialty ? `oilLevelAutomaticSpecialty: "${oilLevelAutomaticSpecialty}"` : ''} 
        ${idlingAutomatic ? `idlingAutomatic: ${idlingAutomatic}` : ''}
        ${idlingAutomaticSpecialty ? `idlingAutomaticSpecialty: "${idlingAutomaticSpecialty}"` : ''}   
        ${oilLeakageManual ? `oilLeakageManual: ${oilLeakageManual}` : ''} 
        ${oilLeakageManualSpecialty ? `oilLeakageManualSpecialty: "${oilLeakageManualSpecialty}"` : ''}
        ${oilLeakageCylinderCover ? `oilLeakageCylinderCover: ${oilLeakageCylinderCover}` : ''}
        ${gearShiftManual ? `gearShiftManual: ${gearShiftManual}` : ''}
        ${gearShiftManualSpecialty ? `gearShiftManualSpecialty: "${gearShiftManualSpecialty}"` : ''}     
        ${oilLevelManual ? `oilLevelManual: ${oilLevelManual}` : ''}    
        ${oilLevelManualSpecialty ? `oilLevelManualSpecialty: "${oilLevelManualSpecialty}"` : ''} 
        ${idlingManual ? `idlingManual: ${idlingManual}` : ''} 
        ${idlingManualSpecialty ? `idlingManualSpecialty: "${idlingManualSpecialty}"` : ''}    
        ${powerPricing ? `powerPricing: ${powerPricing}` : ''}   
        ${clutchAssembly ? `clutchAssembly: ${clutchAssembly}` : ''}
        ${clutchAssemblySpecialty ? `clutchAssemblySpecialty: "${clutchAssemblySpecialty}"` : ''}    
        ${constantSpeedJoint ? `constantSpeedJoint: ${constantSpeedJoint}` : ''}
        ${constantSpeedJointSpecialty ? `constantSpeedJointSpecialty: "${constantSpeedJointSpecialty}"` : ''}     
        ${propellerShaftBearing ? `propellerShaftBearing: ${propellerShaftBearing}` : ''}
        ${propellerShaftBearingSpecialty ? `propellerShaftBearingSpecialty: "${propellerShaftBearingSpecialty}"` : ''}
        ${differentialGear ? `differentialGear: ${differentialGear}` : ''}     
        ${differentialGearSpecialty ? `differentialGearSpecialty: "${differentialGearSpecialty}"` : ''}     
        ${steeringPricing ? `steeringPricing: ${steeringPricing}` : ''}
        ${oilLeakageSteeringSystem ? `oilLeakageSteeringSystem: ${oilLeakageSteeringSystem}` : ''}
        ${oilLeakageSteeringSystemSpecialty ? `oilLeakageSteeringSystemSpecialty: "${oilLeakageSteeringSystemSpecialty}"` : ''}  
        ${steeringPump ? `steeringPump: ${steeringPump}` : ''}
        ${steeringPumpSpecialty ? `steeringPumpSpecialty: "${steeringPumpSpecialty}"` : ''}     
        ${steeringGear ? `steeringGear: ${steeringGear}` : ''}
        ${steeringGearSpecialty ? `steeringGearSpecialty: "${steeringGearSpecialty}"` : ''}   
        ${steeringJoint ? `steeringJoint: ${steeringJoint}` : ''}
        ${steeringJointSpecialty ? `steeringJointSpecialty: "${steeringJointSpecialty}"` : ''}    
        ${powerSteeringHose ? `powerSteeringHose: ${powerSteeringHose}` : ''}
        ${powerSteeringHoseSpecialty ? `powerSteeringHoseSpecialty: "${powerSteeringHoseSpecialty}"` : ''}    
        ${tieRodEndBallJoint ? `tieRodEndBallJoint: ${tieRodEndBallJoint}` : ''}
        ${tieRodEndBallJointSpecialty ? `tieRodEndBallJointSpecialty: "${tieRodEndBallJointSpecialty}"` : ''}
        ${brakePricing ? `brakePricing: ${brakePricing}` : ''}   
        ${oilLeakageBrakeMasterCylinder ? `oilLeakageBrakeMasterCylinder: ${oilLeakageBrakeMasterCylinder}` : ''}
        ${oilLeakageBrakeMasterCylinderSpecialty ? `oilLeakageBrakeMasterCylinderSpecialty: "${oilLeakageBrakeMasterCylinderSpecialty}"` : ''}    
        ${oilLeakageBrake ? `oilLeakageBrake: ${oilLeakageBrake}` : ''}
        ${oilLeakageBrakeSpecialty ? `oilLeakageBrakeSpecialty: "${oilLeakageBrakeSpecialty}"` : ''}       
        ${brakeSystem ? `brakeSystem: ${brakeSystem}` : ''}
        ${brakeSystemSpecialty ? `brakeSystemSpecialty: "${brakeSystemSpecialty}"` : ''}  
        ${electricityPricing ? `electricityPricing: ${electricityPricing}` : ''}   
        ${generator ? `generator: ${generator}` : ''}
        ${generatorSpecialty ? `generatorSpecialty: "${generatorSpecialty}"` : ''}      
        ${starterMotor ? `starterMotor: ${starterMotor}` : ''}
        ${starterMotorSpecialty ? `starterMotorSpecialty: "${starterMotorSpecialty}"` : ''}       
        ${wiperMotor ? `wiperMotor: ${wiperMotor}` : ''}   
        ${wiperMotorSpecialty ? `wiperMotorSpecialty: "${wiperMotorSpecialty}"` : ''}       
        ${ventilatingMotor ? `ventilatingMotor: ${ventilatingMotor}` : ''}
        ${ventilatingMotorSpecialty ? `ventilatingMotorSpecialty: "${ventilatingMotorSpecialty}"` : ''}     
        ${radiatorFanMotor ? `radiatorFanMotor: ${radiatorFanMotor}` : ''}
        ${radiatorFanMotorSpecialty ? `radiatorFanMotorSpecialty: "${radiatorFanMotorSpecialty}"` : ''}  
        ${windowMotor ? `windowMotor: ${windowMotor}` : ''}
        ${windowMotorSpecialty ? `windowMotorSpecialty: "${windowMotorSpecialty}"` : ''}    
        ${highVoltagePricing ? `highVoltagePricing: ${highVoltagePricing}` : ''}     
        ${chargingPort ? `chargingPort: ${chargingPort}` : ''}  
        ${chargingPortSpecialty ? `chargingPortSpecialty: "${chargingPortSpecialty}"` : ''}     
        ${regenerativeSystem ? `regenerativeSystem: ${regenerativeSystem}` : ''}   
        ${regenerativeSystemSpecialty ? `regenerativeSystemSpecialty: "${regenerativeSystemSpecialty}"` : ''}    
        ${highVoltageWire ? `highVoltageWire: ${highVoltageWire}` : ''}  
        ${highVoltageWireSpecialty ? `highVoltageWireSpecialty: "${highVoltageWireSpecialty}"` : ''}  
        ${fuelLeakage ? `fuelLeakage: ${fuelLeakage}` : ''}
        ${fuelLeakagePricing ? `fuelLeakagePricing: ${fuelLeakagePricing}` : ''}     
        ${fuelLeakageSpecialty ? `fuelLeakageSpecialty: "${fuelLeakageSpecialty}"` : ''}      
        ${exterior ? `exterior: ${exterior}` : ''}     
        ${interior ? `interior: ${interior}` : ''}
        ${polish ? `polish: ${polish}` : ''}   
        ${cabinCleanness ? `cabinCleanness: ${cabinCleanness}` : ''}
        ${basePricingType ? `basePricingType: ${basePricingType}` : ''}
        ${wheel ? `wheel: ${wheel}` : ''}
        ${wheelDriverFront ? `wheelDriverFront: ${wheelDriverFront}` : ''}
        ${wheelDriverRear ? `wheelDriverRear: ${wheelDriverRear}` : ''}
        ${wheelPassengerFront ? `wheelPassengerFront: ${wheelPassengerFront}` : ''}
        ${wheelPassengerRear ? `wheelPassengerRear: ${wheelPassengerRear}` : ''}
        ${wheelEmergency ? `wheelEmergency: ${wheelEmergency}` : ''}
        ${tire ? `tire: ${tire}` : ''}
        ${tireDriverFront ? `tireDriverFront: ${tireDriverFront}` : ''}
        ${tireDriverRear ? `tireDriverRear: ${tireDriverRear}` : ''}
        ${tirePassengerFront ? `tirePassengerFront: ${tirePassengerFront}` : ''}
        ${tirePassengerRear ? `tirePassengerRear: ${tirePassengerRear}` : ''}
        ${tireEmergency ? `tireEmergency: ${tireEmergency}` : ''}
        ${window ? `window: ${window}` : ''}
        ${basicItem ? `basicItem: ${basicItem}` : ''}
        ${basicItemInstruction ? `basicItemInstruction: ${basicItemInstruction}` : ''}
        ${basicItemSafetyTripod ? `basicItemSafetyTripod: ${basicItemSafetyTripod}` : ''}
        ${basicItemJack ? `basicItemJack: ${basicItemJack}` : ''}
        ${basicItemSpanner ? `basicItemSpanner: ${basicItemSpanner}` : ''}
        ${otherInformationPricing ? `otherInformationPricing: ${otherInformationPricing}` : ''}
        ${inspectorSpecialty ? `inspectorSpecialty: "${inspectorSpecialty}"` : ''}    
        ${pricingPersonnelSpecialty ? `pricingPersonnelSpecialty: "${pricingPersonnelSpecialty}"` : ''}     
        ${inspectorName ? `inspectorName: "${inspectorName}"` : ''}     
        ${pricingPersonnelName ? `pricingPersonnelName: "${pricingPersonnelName}"` : ''}  
        ${reportPersonnelName ? `reportPersonnelName: "${reportPersonnelName}"` : ''}  
        ${finalPricing ? `finalPricing: ${finalPricing}` : ''}   
        ${signatureDate ? `signatureDate: "${signatureDate}"` : ''}
        inspectionRecordImageList: ${JSON.stringify(inspectionRecordImageList).replaceAll('"name"', 'name').replaceAll('"originFilename"', 'originFilename')}
        inspectionRecordVersion: ${inspectionRecordVersion ? 'VERSION_531' : 'VERSION_900'}
    }
  ){
    id
  }}
  `;

  // console.log('저장', mutation);
  const response = graphQLClientRequest(mutation, undefined);

  return response;
}
