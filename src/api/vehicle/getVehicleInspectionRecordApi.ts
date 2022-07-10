import {gql} from 'graphql-request';
import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';

export default function getVehicleInspectionRecordApi(id: number, options?: ApiOptionsType): any {
  const query = gql`
    query {
      getVehicleInspectionRecord(
        id: ${id}
      ) {
        enrollNumber
    pricingCheck
    basePricingCalculating
    selfInspectionMotor
    recallStatus
    name
    inspectorSpecialty
    pricingPersonnelSpecialty
    inspectionRecordNumberFront
    inspectionRecordNumberMiddle
    inspectionRecordNumberBack
    number
    modelYear
    signatureDate
    validPeriodStart
    validPeriodEnd
    firstRegisterDate
    vehicleIdentityNumber
    transmissionType
    fuelType
    motorType
    warranty
    mileage
    odometerStatus
    mileageStatus
    vehicleIdentityNumberStatus
    inspectionRecordImageList {
      name
      originFilename
    }
    hcEmissionPPM
    coEmissionPercentage
    smokeEmissionPercentage
    tuning
    tuningLegal
    tuningDevice
    tuningIllegal
    tuningStructure
    specialHistory
    specialHistoryFire
    specialHistoryFlood
    usageChange
    usageChangeRent
    usageChangeBusiness
    usageChangeLease
    color
    fullPainting
    colorChange
    feature
    featureETC
    featureSunroof
    featureNavigation
    recall
    recallStatus
    hoodOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontLeftFenderOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontRightFenderOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontLeftDoorOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontRightDoorOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    rearLeftDoorOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    rearRightDoorOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    trunkLidOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    radiatorOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    roofOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    quarterLeftOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    quarterRightOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    sideSillLeftOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    sideSillRightOuterPanel {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontPanelChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    crossMemberChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    insideLeftPanelChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    insideRightPanelChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    rearPanelChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    trunkFloorChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontLeftSideMemberChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontRightSideMemberChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    rearLeftSideMemberChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    rearRightSideMemberChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontLeftWheelHouseChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    frontRightWheelHouseChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    rearLeftWheelHouseChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    rearRightWheelHouseChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    pillarLeftPanelAChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    pillarRightPanelAChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    pillarLeftPanelBChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    pillarRightPanelBChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    pillarLeftPanelCChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    pillarRightPanelCChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    packageTrayChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    dashPanelChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    floorPanelChassis {
      exchange
      sheetMetal
      corrosion
      scratch
      uneven
      damage
    }
    accident
    simpleRepair
    accidentRepairHistoryPricing
    accidentRepairHistorySpecialty
    outerPanel1RankPricing
    outerPanel1RankSpecialty
    outerPanel2RankPricing
    outerPanel2RankSpecialty
    mainChassisPricing
    mainChassisSpecialty
    selfInspectionPricing
    selfInspectionMotor
    selfInspectionTransmission
    selfInspectionTransmissionSpecialty
    selfInspectionMotorSpecialty
    idlingStatus
    idlingStatusSpecialty
    oilLeakageCylinderCover
    oilLeakageCylinderCoverSpecialty
    oilLeakageCylinderHeadGasket
    oilLeakageCylinderHeadGasketSpecialty
    oilLeakageCylinderBlockOilPan
    oilLeakageCylinderBlockOilPanSpecialty
    oilLevel
    oilLevelSpecialty
    coolantLeakageCylinderCover
    coolantLeakageCylinderCoverSpecialty
    coolantLeakageWaterPump
    coolantLeakageWaterPumpSpecialty
    coolantLeakageRadiator
    coolantLeakageRadiatorSpecialty
    coolantLeve
    coolantLeveSpecialty
    commonRail
    commonRailSpecialty
    oilLeakageAutomatic
    oilLeakageAutomaticSpecialty
    oilLevelAutomatic
    oilLevelAutomaticSpecialty
    motorPricing
    transmissionPricing
    idlingAutomatic
    idlingAutomaticSpecialty
    oilLeakageManual
    oilLeakageManualSpecialty
    gearShiftManual
    gearShiftManualSpecialty
    oilLevelManual
    oilLevelManualSpecialty
    idlingManual
    idlingManualSpecialty
    powerPricing
    clutchAssembly
    clutchAssemblySpecialty
    constantSpeedJoint
    constantSpeedJointSpecialty
    propellerShaftBearing
    propellerShaftBearingSpecialty
    differentialGear
    differentialGearSpecialty
    steeringPricing
    oilLeakageSteeringSystem
    oilLeakageSteeringSystemSpecialty
    steeringPump
    steeringPumpSpecialty
    steeringGear
    steeringGearSpecialty
    steeringJoint
    steeringJointSpecialty
    powerSteeringHose
    powerSteeringHoseSpecialty
    tieRodEndBallJoint
    tieRodEndBallJointSpecialty
    brakePricing
    oilLeakageBrakeMasterCylinder
    oilLeakageBrakeMasterCylinderSpecialty
    oilLeakageBrake
    oilLeakageBrakeSpecialty
    brakeSystem
    brakeSystemSpecialty
    electricityPricing
    generator
    generatorSpecialty
    starterMotor
    starterMotorSpecialty
    wiperMotor
    wiperMotorSpecialty
    ventilatingMotor
    ventilatingMotorSpecialty
    radiatorFanMotor
    radiatorFanMotorSpecialty
    windowMotor
    windowMotorSpecialty
    highVoltagePricing
    chargingPort
    chargingPortSpecialty
    regenerativeSystem
    regenerativeSystemSpecialty
    highVoltageWire
    highVoltageWireSpecialty
    fuelLeakage
    fuelLeakagePricing
    fuelLeakageSpecialty
    exterior
    interior
    polish
    cabinCleanness
    wheel
    wheelDriverFront
    wheelDriverRear
    wheelPassengerFront
    wheelPassengerRear
    wheelEmergency
    tire
    tireDriverFront
    tireDriverRear
    tirePassengerFront
    tirePassengerRear
    tireEmergency
    window
    basicItem
    basicItemInstruction
    basicItemSafetyTripod
    basicItemJack
    basicItemSpanner
    otherInformationPricing
    inspectorName
    pricingPersonnelName
    reportPersonnelName
    mileagePricing
    mileageSpecialty
    mileageStatusPricing
    mileageStatusSpecialty
    vehicleIdentityNumberStatus
    vehicleIdentityNumberStatusPricing
    vehicleIdentityNumberStatusSpecialty
    emissionPricing
    emissionSpecialty
    tuningPricing
    tuningSpecialty
    specialHistoryPricing
    specialHistorySpecialty
    usageChangePricing
    usageChangeSpecialty
    tuningPricing
    tuningSpecialty
    colorPricing
    colorSpecialty
    featurePricing
    featureSpecialty
    finalPricing
    basePricingType
    inspectionRecordVersion
      }
    }
  `;
  // console.log('query query', query);

  if (options?.getGql) return query;
  const response = graphQLClientRequest(query, options?.context);

  // console.log('res', response?.props?.response?.getVehicleInspectionRecord);
  return response;
}
