import graphQLClientRequest from '@api/graphQLClientRequest';
import {QueryType} from '@api/vehicle/setVehicleInspectionRecordApi';

export default function setTemporaryVehicleInspectionRecordApi(
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
  setTemporaryVehicleInspectionRecord (
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
      ${inspectionRecordImageList ? `inspectionRecordImageList: ${JSON.stringify(inspectionRecordImageList).replaceAll('"name"', 'name').replaceAll('"originFilename"', 'originFilename')}` : ''}
      inspectionRecordVersion: ${inspectionRecordVersion ? 'VERSION_531' : 'VERSION_900'}
    }
  ){
    id
  }}
  `;

  // console.log('121231234', mutation);
  const response = graphQLClientRequest(mutation, undefined);

  return response;
}
