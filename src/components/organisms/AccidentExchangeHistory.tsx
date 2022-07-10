import React, {ReactElement, useState, useCallback, useEffect, memo} from 'react';
import theme from '@public/theme';
import {Wrapper, Txt, Input} from '@components/atoms';
import styled from '@emotion/styled';
import useAccidentExchangeHistoryCheckBox from '@modules/hooks/useAccidentExchangeHistoryCheckBox';
import VehicleAccidentCheckPopup from '@components/organisms/VehicleAccidentCheckPopup';
import {inject, observer} from 'mobx-react';
import useDomReady from '@modules/hooks/useDomReady';
import useInput from '@modules/hooks/useInput';
import {getCommas} from '@modules/replaceStrings';

type AccidentExchangeHistoryType = {
  vehicleInspectionRecordStore?: any;
  response: any;
  pricingCheck: boolean;
  inspectionRecordVersion: boolean;
};

const AccidentExchangeHistory = inject('vehicleInspectionRecordStore')(
  observer(({vehicleInspectionRecordStore: store, response, pricingCheck, inspectionRecordVersion}: AccidentExchangeHistoryType) => {
    console.log('response', response);
    const [show, setShow] = useState<number>();
    // 외판부위 1랭크
    const [
      [
        hoodOuterPanelExchange, // 후드 이상여부 - 교환 - 외판부위 1랭크
        hoodOuterPanelSheetMetal, // 후드 이상여부 - 판금/용접 - 외판부위 1랭크
        hoodOuterPanelCorrosion, // 후드 이상여부 - 부식 - 외판부위 1랭크
        hoodOuterPanelScratch, // 후드 이상여부 - 흠집 - 외판부위 1랭크
        hoodOuterPanelUneven, // 후드 이상여부 - 요철 - 외판부위 1랭크
        hoodOuterPanelDamage
      ], // 후드 이상여부 - 손상 - 외판부위 1랭크
      HoodOuterPanelCheckBox,
      HoodOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.hoodOuterPanel, dataLabel: 'hoodOuterPanel'});

    const [
      [
        frontLeftFenderOuterPanelExchange, // 프론트 휀더(좌) 이상여부 - 교환 - 외판부위 1랭크
        frontLeftFenderOuterPanelSheetMetal, // 프론트 휀더(좌) 이상여부 - 판금/용접 - 외판부위 1랭크
        frontLeftFenderOuterPanelCorrosion, // 프론트 휀더(좌) 이상여부 - 부식 - 외판부위 1랭크
        frontLeftFenderOuterPanelScratch, // 프론트 휀더(좌) 이상여부 - 흠집 - 외판부위 1랭크
        frontLeftFenderOuterPanelUneven, // 프론트 휀더(좌) 이상여부 - 요철 - 외판부위 1랭크
        frontLeftFenderOuterPanelDamage
      ], // 프론트 휀더(좌) 이상여부 - 손상 - 외판부위 1랭크
      FrontLeftFenderOuterPanelCheckBox,
      FrontLeftFenderOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontLeftFenderOuterPanel, dataLabel: 'frontLeftFenderOuterPanel'});

    const [
      [
        frontRightFenderOuterPanelExchange, // 프론트 휀더(우) 이상여부 - 교환 - 외판부위 1랭크
        frontRightFenderOuterPanelSheetMetal, // 프론트 휀더(우) 이상여부 - 판금/용접 - 외판부위 1랭크
        frontRightFenderOuterPanelCorrosion, // 프론트 휀더(우) 이상여부 - 부식 - 외판부위 1랭크
        frontRightFenderOuterPanelScratch, // 프론트 휀더(우) 이상여부 - 흠집 - 외판부위 1랭크
        frontRightFenderOuterPanelUneven, // 프론트 휀더(우) 이상여부 - 요철 - 외판부위 1랭크
        frontRightFenderOuterPanelDamage
      ], // 프론트 휀더(우) 이상여부 - 손상 - 외판부위 1랭크
      FrontRightFenderOuterPanelCheckBox,
      FrontRightFenderOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontRightFenderOuterPanel, dataLabel: 'frontRightFenderOuterPanel'});
    const [
      [
        frontLeftDoorOuterPanelExchange, // 프론트 도어(좌) 이상여부 - 교환 - 외판부위 1랭크
        frontLeftDoorOuterPanelSheetMetal, // 프론트 도어(좌) 이상여부 - 판금/용접 - 외판부위 1랭크
        frontLeftDoorOuterPanelCorrosion, // 프론트 도어(좌) 이상여부 - 부식 - 외판부위 1랭크
        frontLeftDoorOuterPanelScratch, // 프론트 도어(좌) 이상여부 - 흠집 - 외판부위 1랭크
        frontLeftDoorOuterPanelUneven, // 프론트 도어(좌) 이상여부 - 요철 - 외판부위 1랭크
        frontLeftDoorOuterPanelDamage
      ], // 프론트 도어(좌) 이상여부 - 손상 - 외판부위 1랭크
      FrontLeftDoorOuterPanelCheckBox,
      FrontLeftDoorOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontLeftDoorOuterPanel, dataLabel: 'frontLeftDoorOuterPanel'});
    const [
      [
        frontRightDoorOuterPanelExchange, // 프론트 도어(우) 이상여부 - 교환 - 외판부위 1랭크
        frontRightDoorOuterPanelSheetMetal, // 프론트 도어(우) 이상여부 - 판금/용접 - 외판부위 1랭크
        frontRightDoorOuterPanelCorrosion, // 프론트 도어(우) 이상여부 - 부식 - 외판부위 1랭크
        frontRightDoorOuterPanelScratch, // 프론트 도어(우) 이상여부 - 흠집 - 외판부위 1랭크
        frontRightDoorOuterPanelUneven, // 프론트 도어(우) 이상여부 - 요철 - 외판부위 1랭크
        frontRightDoorOuterPanelDamage
      ], // 프론트 도어(우) 이상여부 - 손상 - 외판부위 1랭크
      FrontRightDoorOuterPanelCheckBox,
      FrontRightDoorOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontRightDoorOuterPanel, dataLabel: 'frontRightDoorOuterPanel'});
    const [
      [
        rearLeftDoorOuterPanelExchange, // 리어 도어(좌) 이상여부 - 교환 - 외판부위 1랭크
        rearLeftDoorOuterPanelSheetMetal, // 리어 도어(좌) 이상여부 - 판금/용접 - 외판부위 1랭크
        rearLeftDoorOuterPanelCorrosion, // 리어 도어(좌) 이상여부 - 부식 - 외판부위 1랭크
        rearLeftDoorOuterPanelScratch, // 리어 도어(좌) 이상여부 - 흠집 - 외판부위 1랭크
        rearLeftDoorOuterPanelUneven, // 리어 도어(좌) 이상여부 - 요철 - 외판부위 1랭크
        rearLeftDoorOuterPanelDamage
      ], // 리어 도어(좌) 이상여부 - 손상 - 외판부위 1랭크
      RearLeftDoorOuterPanelCheckBox,
      RearLeftDoorOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.rearLeftDoorOuterPanel, dataLabel: 'rearLeftDoorOuterPanel'});
    const [
      [
        rearRightDoorOuterPanelExchange, // 리어 도어(우) 이상여부 - 교환 - 외판부위 1랭크
        rearRightDoorOuterPanelSheetMetal, // 리어 도어(우) 이상여부 - 판금/용접 - 외판부위 1랭크
        rearRightDoorOuterPanelCorrosion, // 리어 도어(우) 이상여부 - 부식 - 외판부위 1랭크
        rearRightDoorOuterPanelScratch, // 리어 도어(우) 이상여부 - 흠집 - 외판부위 1랭크
        rearRightDoorOuterPanelUneven, // 리어 도어(우) 이상여부 - 요철 - 외판부위 1랭크
        rearRightDoorOuterPanelDamage
      ], // 리어 도어(우) 이상여부 - 손상 - 외판부위 1랭크
      RearRightDoorOuterPanelCheckBox,
      RearRightDoorOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.rearRightDoorOuterPanel, dataLabel: 'rearRightDoorOuterPanel'});
    const [
      [
        trunkLidOuterPanelExchange, //  트렁크 리드 이상여부 - 교환 - 외판부위 1랭크
        trunkLidOuterPanelSheetMetal, //  트렁크 리드 이상여부 - 판금/용접 - 외판부위 1랭크
        trunkLidOuterPanelCorrosion, //  트렁크 리드 이상여부 - 부식 - 외판부위 1랭크
        trunkLidOuterPanelScratch, //  트렁크 리드 이상여부 - 흠집 - 외판부위 1랭크
        trunkLidOuterPanelUneven, //  트렁크 리드 이상여부 - 요철 - 외판부위 1랭크
        trunkLidOuterPanelDamage
      ], //  트렁크 리드 이상여부 - 손상 - 외판부위 1랭크
      TrunkLidOuterPanelCheckBox,
      TrunkLidOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.trunkLidOuterPanel, dataLabel: 'trunkLidOuterPanel'});
    const [
      [
        radiatorOuterPanelExchange, //  라디에이터 서포트 이상여부 - 교환 - 외판부위 1랭크
        radiatorOuterPanelSheetMetal, //  라디에이터 서포트 이상여부 - 판금/용접 - 외판부위 1랭크
        radiatorOuterPanelCorrosion, //  라디에이터 서포트 이상여부 - 부식 - 외판부위 1랭크
        radiatorOuterPanelScratch, //  라디에이터 서포트 이상여부 - 흠집 - 외판부위 1랭크
        radiatorOuterPanelUneven, //  라디에이터 서포트 이상여부 - 요철 - 외판부위 1랭크
        radiatorOuterPanelDamage
      ], //  라디에이터 서포트 이상여부 - 손상 - 외판부위 1랭크
      RadiatorOuterPanelCheckBox,
      RadiatorOuterPanelImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.radiatorOuterPanel, dataLabel: 'radiatorOuterPanel'});
    // 외판부위 2 랭크
    const [
      [
        roofOuterPanelExchange, // 루프 패널 이상여부 - 교환 - 외판부위 2랭크
        roofOuterPanelSheetMetal, // 루프 패널 이상여부 - 판금/용접 - 외판부위 2랭크
        roofOuterPanelCorrosion, // 루프 패널 이상여부- 부식 - 외판부위 2랭크
        roofOuterPanelScratch, // 루프 패널 이상여부 - 흠집 - 외판부위 2랭크
        roofOuterPanelUneven, // 루프 패널 이상여부 - 요철 - 외판부위 2랭크
        roofOuterPanelDamage
      ], // 루프 패널 이상여부 - 손상 - 외판부위 2랭크
      RoofOuterPanelCheckBox,
      RoofOuterPanelImgSpan,
      roofOuterPanelSetter
    ] = useAccidentExchangeHistoryCheckBox({part: response?.roofOuterPanel, dataLabel: 'roofOuterPanel'});
    const [
      [
        quarterLeftOuterPanelExchange, // 쿼터 패널(리어펜더)(좌) - 교환 - 외판부위 2랭크
        quarterLeftOuterPanelSheetMetal, // 쿼터 패널(리어펜더)(좌) - 판금/용접 - 외판부위 2랭크
        quarterLeftOuterPanelCorrosion, // 쿼터 패널(리어펜더)(좌)- 부식 - 외판부위 2랭크
        quarterLeftOuterPanelScratch, // 쿼터 패널(리어펜더)(좌) - 흠집 - 외판부위 2랭크
        quarterLeftOuterPanelUneven, // 쿼터 패널(리어펜더)(좌) - 요철 - 외판부위 2랭크
        quarterLeftOuterPanelDamage
      ], // 쿼터 패널(리어펜더)(좌) - 손상 - 외판부위 2랭크
      QuarterLeftOuterPanelCheckBox,
      QuarterLeftOuterPanelImgSpan,
      quarterLeftOuterPanelSetter
    ] = useAccidentExchangeHistoryCheckBox({part: response?.quarterLeftOuterPanel, dataLabel: 'quarterLeftOuterPanel'});
    const [
      [
        quarterRightOuterPanelExchange, // 쿼터 패널(리어펜더)(우) - 교환 - 외판부위 2랭크
        quarterRightOuterPanelSheetMetal, // 쿼터 패널(리어펜더)(우) - 판금/용접 - 외판부위 2랭크
        quarterRightOuterPanelCorrosion, // 쿼터 패널(리어펜더)(우)- 부식 - 외판부위 2랭크
        quarterRightOuterPanelScratch, // 쿼터 패널(리어펜더)(우) - 흠집 - 외판부위 2랭크
        quarterRightOuterPanelUneven, // 쿼터 패널(리어펜더)(우) - 요철 - 외판부위 2랭크
        quarterRightOuterPanelDamage
      ], // 쿼터 패널(리어펜더)(우) - 손상 - 외판부위 2랭크
      QuarterRightOuterPanelCheckBox,
      QuarterRightOuterPanelImgSpan,
      quarterRightOuterPanelSetter
    ] = useAccidentExchangeHistoryCheckBox({part: response?.quarterRightOuterPanel, dataLabel: 'quarterRightOuterPanel'});
    const [
      [
        sideSillLeftOuterPanelExchange, // 사이드실 패널(좌) - 교환 - 외판부위 2랭크
        sideSillLeftOuterPanelSheetMetal, // 사이드실 패널(좌) - 판금/용접 - 외판부위 2랭크
        sideSillLeftOuterPanelCorrosion, // 사이드실 패널(좌)- 부식 - 외판부위 2랭크
        sideSillLeftOuterPanelScratch, // 사이드실 패널(좌) - 흠집 - 외판부위 2랭크
        sideSillLeftOuterPanelUneven, // 사이드실 패널(좌) - 요철 - 외판부위 2랭크
        sideSillLeftOuterPanelDamage
      ], // 사이드실 패널(좌) - 손상 - 외판부위 2랭크
      SideSillLeftOuterPanelCheckBox,
      SideSillLeftOuterPanelImgSpan,
      sideSillLeftOuterPanelSetter
    ] = useAccidentExchangeHistoryCheckBox({part: response?.sideSillLeftOuterPanel, dataLabel: 'sideSillLeftOuterPanel'});
    const [
      [
        sideSillRightOuterPanelExchange, // 사이드실 패널(우) - 교환 - 외판부위 2랭크
        sideSillRightOuterPanelSheetMetal, // 사이드실 패널(우) - 판금/용접 - 외판부위 2랭크
        sideSillRightOuterPanelCorrosion, // 사이드실 패널(우)- 부식 - 외판부위 2랭크
        sideSillRightOuterPanelScratch, // 사이드실 패널(우) - 흠집 - 외판부위 2랭크
        sideSillRightOuterPanelUneven, // 사이드실 패널(우) - 요철 - 외판부위 2랭크
        sideSillRightOuterPanelDamage
      ], // 사이드실 패널(우) - 손상 - 외판부위 2랭크
      SideSillRightOuterPanelCheckBox,
      SideSillRightOuterPanelImgSpan,
      sideSillRightOuterPanelSetter
    ] = useAccidentExchangeHistoryCheckBox({part: response?.sideSillRightOuterPanel, dataLabel: 'sideSillRightOuterPanel'});

    // 주요 골격 A랭크
    const [
      [
        frontPanelChassisExchange, // 프론트 패널 - 교환 - 주요골격 A랭크
        frontPanelChassisSheetMetal, // 프론트 패널 - 판금/용접 - 주요골격 A랭크
        frontPanelChassisCorrosion, // 프론트 패널 - 부식 - 주요골격 A랭크
        frontPanelChassisScratch, // 프론트 패널 - 흠집 - 주요골격 A랭크
        frontPanelChassisUneven, // 프론트 패널 - 요철 - 주요골격 A랭크
        frontPanelChassisDamage
      ], // 프론트 패널 - 손상 - 주요골
      FrontPanelChassisCheckBox,
      FrontPanelChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontPanelChassis, dataLabel: 'frontPanelChassis'});
    const [
      [
        crossMemberChassisExchange, // 크로스 멤버 - 교환 - 주요골격 A랭크
        crossMemberChassisSheetMetal, // 크로스 멤버 - 판금/용접 - 주요골격 A랭크
        crossMemberChassisCorrosion, // 크로스 멤버 - 부식 - 주요골격 A랭크
        crossMemberChassisScratch, // 크로스 멤버 - 흠집 - 주요골격 A랭크
        crossMemberChassisUneven, // 크로스 멤버 - 요철 - 주요골격 A랭크
        crossMemberChassisDamage
      ], // 크로스 멤버 - 손상 - 주요골
      CrossMemberChassisCheckBox,
      CrossMemberChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.crossMemberChassis, dataLabel: 'crossMemberChassis'});
    const [
      [
        insideLeftPanelChassisExchange, // 인사이드 패널(좌) - 교환 - 주요골격 A랭크
        insideLeftPanelChassisSheetMetal, // 인사이드 패널(좌) - 판금/용접 - 주요골격 A랭크
        insideLeftPanelChassisCorrosion, // 인사이드 패널(좌) - 부식 - 주요골격 A랭크
        insideLeftPanelChassisScratch, // 인사이드 패널(좌) - 흠집 - 주요골격 A랭크
        insideLeftPanelChassisUneven, // 인사이드 패널(좌) - 요철 - 주요골격 A랭크
        insideLeftPanelChassisDamage
      ], // 인사이드 패널(좌) - 손상 - 주요골
      InsideLeftPanelChassisCheckBox,
      InsideLeftPanelChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.insideLeftPanelChassis, dataLabel: 'insideLeftPanelChassis'});
    const [
      [
        insideRightPanelChassisExchange, // 인사이드 패널(우) - 교환 - 주요골격 A랭크
        insideRightPanelChassisSheetMetal, // 인사이드 패널(우) - 판금/용접 - 주요골격 A랭크
        insideRightPanelChassisCorrosion, // 인사이드 패널(우) - 부식 - 주요골격 A랭크
        insideRightPanelChassisScratch, // 인사이드 패널(우) - 흠집 - 주요골격 A랭크
        insideRightPanelChassisUneven, // 인사이드 패널(우) - 요철 - 주요골격 A랭크
        insideRightPanelChassisDamage
      ], // 인사이드 패널(우) - 손상 - 주요골
      InsideRightPanelChassisCheckBox,
      InsideRightPanelChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.insideRightPanelChassis, dataLabel: 'insideRightPanelChassis'});
    const [
      [
        rearPanelChassisExchange, //  리어 패널 - 교환 - 주요골격 A랭크
        rearPanelChassisSheetMetal, //  리어 패널 - 판금/용접 - 주요골격 A랭크
        rearPanelChassisCorrosion, //  리어 패널 - 부식 - 주요골격 A랭크
        rearPanelChassisScratch, //  리어 패널 - 흠집 - 주요골격 A랭크
        rearPanelChassisUneven, //  리어 패널 - 요철 - 주요골격 A랭크
        rearPanelChassisDamage
      ], //  리어 패널 - 손상 - 주요골격 A랭크
      RearPanelChassisCheckBox,
      RearPanelChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.rearPanelChassis, dataLabel: 'rearPanelChassis'});
    const [
      [
        trunkFloorChassisExchange, // 트렁크 플로어 - 교환 - 주요골격 A랭크
        trunkFloorChassisSheetMetal, // 트렁크 플로어 - 판금/용접 - 주요골격 A랭크
        trunkFloorChassisCorrosion, // 트렁크 플로어 - 부식 - 주요골격 A랭크
        trunkFloorChassisScratch, // 트렁크 플로어 - 흠집 - 주요골격 A랭크
        trunkFloorChassisUneven, // 트렁크 플로어 - 요철 - 주요골격 A랭크
        trunkFloorChassisDamage
      ], // 트렁크 플로어 - 손상 - 주요골
      TrunkFloorChassisCheckBox,
      TrunkFloorChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.trunkFloorChassis, dataLabel: 'trunkFloorChassis'});

    // 주요 골격 B랭크
    const [
      [
        frontLeftSideMemberChassisExchange, // 프론트 사이드 멤버(좌) - 교환 - 주요골격 B랭크
        frontLeftSideMemberChassisSheetMetal, // 프론트 사이드 멤버(좌) - 판금/용접 - 주요골격 B랭크
        frontLeftSideMemberChassisCorrosion, // 프론트 사이드 멤버(좌) - 부식 - 주요골격 B랭크
        frontLeftSideMemberChassisScratch, // 프론트 사이드 멤버(좌) - 흠집 - 주요골격 B랭크
        frontLeftSideMemberChassisUneven, // 프론트 사이드 멤버(좌) - 요철 - 주요골격 B랭크
        frontLeftSideMemberChassisDamage
      ], // 프론트 사이드 멤버(좌) - 손상 - 주요골
      FrontLeftSideMemberChassisCheckBox,
      FrontLeftSideMemberChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontLeftSideMemberChassis, dataLabel: 'frontLeftSideMemberChassis'});
    const [
      [
        frontRightSideMemberChassisExchange, // 프론트 사이드 멤버(우) - 교환 - 주요골격 B랭크
        frontRightSideMemberChassisSheetMetal, // 프론트 사이드 멤버(우) - 판금/용접 - 주요골격 B랭크
        frontRightSideMemberChassisCorrosion, // 프론트 사이드 멤버(우 ) - 부식 - 주요골격 B랭크
        frontRightSideMemberChassisScratch, // 프론트 사이드 멤버(우) - 흠집 - 주요골격 B랭크
        frontRightSideMemberChassisUneven, // 프론트 사이드 멤버(우) - 요철 - 주요골격 B랭크
        frontRightSideMemberChassisDamage
      ], // 프론트 사이드 멤버(우) - 손상 - 주요골
      FrontRightSideMemberChassisCheckBox,
      FrontRightSideMemberChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontRightSideMemberChassis, dataLabel: 'frontRightSideMemberChassis'});
    const [
      [
        rearLeftSideMemberChassisExchange, // 리어 사이드 멤버(좌) - 교환 - 주요골격 B랭크
        rearLeftSideMemberChassisSheetMetal, // 리어 사이드 멤버(좌) - 판금/용접 - 주요골격 B랭크
        rearLeftSideMemberChassisCorrosion, // 리어 사이드 멤버(좌) - 부식 - 주요골격 B랭크
        rearLeftSideMemberChassisScratch, // 리어 사이드 멤버(좌) - 흠집 - 주요골격 B랭크
        rearLeftSideMemberChassisUneven, // 리어 사이드 멤버(좌) - 요철 - 주요골격 B랭크
        rearLeftSideMemberChassisDamage
      ], // 리어 사이드 멤버(좌) - 손상 - 주요골
      RearLeftSideMemberChassisCheckBox,
      RearLeftSideMemberChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.rearLeftSideMemberChassis, dataLabel: 'rearLeftSideMemberChassis'});
    const [
      [
        rearRightSideMemberChassisExchange, // 리어 사이드 멤버(우) - 교환 - 주요골격 B랭크
        rearRightSideMemberChassisSheetMetal, // 리어 사이드 멤버(우) - 판금/용접 - 주요골격 B랭크
        rearRightSideMemberChassisCorrosion, // 리어 사이드 멤버(우) - 부식 - 주요골격 B랭크
        rearRightSideMemberChassisScratch, // 리어 사이드 멤버(우) - 흠집 - 주요골격 B랭크
        rearRightSideMemberChassisUneven, // 리어 사이드 멤버(우) - 요철 - 주요골격 B랭크
        rearRightSideMemberChassisDamage
      ], // 리어 사이드 멤버(우) - 손상 - 주요골
      RearRightSideMemberChassisCheckBox,
      RearRightSideMemberChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.rearRightSideMemberChassis, dataLabel: 'rearRightSideMemberChassis'});
    const [
      [
        frontLeftWheelHouseChassisExchange, // 프론트 휠하우스(좌) - 교환 - 주요골격 B랭크
        frontLeftWheelHouseChassisSheetMetal, // 프론트 휠하우스(좌) - 판금/용접 - 주요골격 B랭크
        frontLeftWheelHouseChassisCorrosion, // 프론트 휠하우스(좌) - 부식 - 주요골격 B랭크
        frontLeftWheelHouseChassisScratch, // 프론트 휠하우스(좌) - 흠집 - 주요골격 B랭크
        frontLeftWheelHouseChassisUneven, // 프론트 휠하우스(좌) - 요철 - 주요골격 B랭크
        frontLeftWheelHouseChassisDamage
      ], // 프론트 휠하우스(좌) - 손상 - 주요골
      FrontLeftWheelHouseChassisCheckBox,
      FrontLeftWheelHouseChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontLeftWheelHouseChassis, dataLabel: 'frontLeftWheelHouseChassis'});
    const [
      [
        frontRightWheelHouseChassisExchange, // 프론트 휠하우스(우) - 교환 - 주요골격 B랭크
        frontRightWheelHouseChassisSheetMetal, // 프론트 휠하우스(우) - 판금/용접 - 주요골격 B랭크
        frontRightWheelHouseChassisCorrosion, // 프론트 휠하우스(우) - 부식 - 주요골격 B랭크
        frontRightWheelHouseChassisScratch, // 프론트 휠하우스(우) - 흠집 - 주요골격 B랭크
        frontRightWheelHouseChassisUneven, // 프론트 휠하우스(우) - 요철 - 주요골격 B랭크
        frontRightWheelHouseChassisDamage
      ], // 프론트 휠하우스(우) - 손상 - 주요골
      FrontRightWheelHouseChassisCheckBox,
      FrontRightWheelHouseChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.frontRightWheelHouseChassis, dataLabel: 'frontRightWheelHouseChassis'});
    const [
      [
        rearLeftWheelHouseChassisExchange, // 리어 휠하우스(좌) - 교환 - 주요골격 B랭크
        rearLeftWheelHouseChassisSheetMetal, // 리어 휠하우스(좌) - 판금/용접 - 주요골격 B랭크
        rearLeftWheelHouseChassisCorrosion, // 리어 휠하우스(좌) - 부식 - 주요골격 B랭크
        rearLeftWheelHouseChassisScratch, // 리어 휠하우스(좌) - 흠집 - 주요골격 B랭크
        rearLeftWheelHouseChassisUneven, // 리어 휠하우스(좌) - 요철 - 주요골격 B랭크
        rearLeftWheelHouseChassisDamage
      ], // 리어 휠하우스(좌) - 손상 - 주요골
      RearLeftWheelHouseChassisCheckBox,
      RearLeftWheelHouseChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.rearLeftWheelHouseChassis, dataLabel: 'rearLeftWheelHouseChassis'});
    const [
      [
        rearRightWheelHouseChassisExchange, // 리어 휠하우스(우) - 교환 - 주요골격 B랭크
        rearRightWheelHouseChassisSheetMetal, // 리어 휠하우스(우) - 판금/용접 - 주요골격 B랭크
        rearRightWheelHouseChassisCorrosion, // 리어 휠하우스(우) - 부식 - 주요골격 B랭크
        rearRightWheelHouseChassisScratch, // 리어 휠하우스(우) - 흠집 - 주요골격 B랭크
        rearRightWheelHouseChassisUneven, // 리어 휠하우스(우) - 요철 - 주요골격 B랭크
        rearRightWheelHouseChassisDamage
      ], // 리어 휠하우스(우) - 손상 - 주요골
      RearRightWheelHouseChassisCheckBox,
      RearRightWheelHouseChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.rearRightWheelHouseChassis, dataLabel: 'rearRightWheelHouseChassis'});
    const [
      [
        pillarLeftPanelAChassisExchange, // 필러 패널A(좌) - 교환 - 주요골격 B랭크
        pillarLeftPanelAChassisSheetMetal, // 필러 패널A(좌) - 판금/용접 - 주요골격 B랭크
        pillarLeftPanelAChassisCorrosion, // 필러 패널A(좌) - 부식 - 주요골격 B랭크
        pillarLeftPanelAChassisScratch, // 필러 패널A(좌) - 흠집 - 주요골격 B랭크
        pillarLeftPanelAChassisUneven, // 필러 패널A(좌) - 요철 - 주요골격 B랭크
        pillarLeftPanelAChassisDamage
      ], // 필러 패널A(좌) - 손상 - 주요골
      PillarLeftPanelAChassisCheckBox,
      PillarLeftPanelAChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.pillarLeftPanelAChassis, dataLabel: 'pillarLeftPanelAChassis'});
    const [
      [
        pillarRightPanelAChassisExchange, // 필러 패널A(우) - 교환 - 주요골격 B랭크
        pillarRightPanelAChassisSheetMetal, // 필러 패널A(우) - 판금/용접 - 주요골격 B랭크
        pillarRightPanelAChassisCorrosion, // 필러 패널A(우) - 부식 - 주요골격 B랭크
        pillarRightPanelAChassisScratch, // 필러 패널A(우) - 흠집 - 주요골격 B랭크
        pillarRightPanelAChassisUneven, // 필러 패널A(우) - 요철 - 주요골격 B랭크
        pillarRightPanelAChassisDamage
      ], // 필러 패널A(우) - 손상 - 주요골
      PillarRightPanelAChassisCheckBox,
      PillarRightPanelAChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.pillarRightPanelAChassis, dataLabel: 'pillarRightPanelAChassis'});
    const [
      [
        pillarLeftPanelBChassisExchange, // 필러 패널B(좌) - 교환 - 주요골격 B랭크
        pillarLeftPanelBChassisSheetMetal, // 필러 패널B(좌) - 판금/용접 - 주요골격 B랭크
        pillarLeftPanelBChassisCorrosion, // 필러 패널B(좌) - 부식 - 주요골격 B랭크
        pillarLeftPanelBChassisScratch, // 필러 패널B(좌) - 흠집 - 주요골격 B랭크
        pillarLeftPanelBChassisUneven, // 필러 패널B(좌) - 요철 - 주요골격 B랭크
        pillarLeftPanelBChassisDamage
      ], // 필러 패널B(좌) - 손상 - 주요골
      PillarLeftPanelBChassisCheckBox,
      PillarLeftPanelBChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.pillarLeftPanelBChassis, dataLabel: 'pillarLeftPanelBChassis'});
    const [
      [
        pillarRightPanelBChassisExchange, // 필러 패널B(우) - 교환 - 주요골격 B랭크
        pillarRightPanelBChassisSheetMetal, // 필러 패널B(우) - 판금/용접 - 주요골격 B랭크
        pillarRightPanelBChassisCorrosion, // 필러 패널B(우) - 부식 - 주요골격 B랭크
        pillarRightPanelBChassisScratch, // 필러 패널B(우) - 흠집 - 주요골격 B랭크
        pillarRightPanelBChassisUneven, // 필러 패널B(우) - 요철 - 주요골격 B랭크
        pillarRightPanelBChassisDamage
      ], // 필러 패널B(우) - 손상 - 주요골
      PillarRightPanelBChassisCheckBox,
      PillarRightPanelBChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.pillarRightPanelBChassis, dataLabel: 'pillarRightPanelBChassis'});
    const [
      [
        pillarLeftPanelCChassisExchange, // 필러 패널C(좌) - 교환 - 주요골격 B랭크
        pillarLeftPanelCChassisSheetMetal, // 필러 패널C(좌) - 판금/용접 - 주요골격 B랭크
        pillarLeftPanelCChassisCorrosion, // 필러 패널C(좌) - 부식 - 주요골격 B랭크
        pillarLeftPanelCChassisScratch, // 필러 패널C(좌) - 흠집 - 주요골격 B랭크
        pillarLeftPanelCChassisUneven, // 필러 패널C(좌) - 요철 - 주요골격 B랭크
        pillarLeftPanelCChassisDamage
      ], // 필러 패널C(좌) - 손상 - 주요골
      PillarLeftPanelCChassisCheckBox,
      PillarLeftPanelCChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.pillarLeftPanelCChassis, dataLabel: 'pillarLeftPanelCChassis'});
    const [
      [
        pillarRightPanelCChassisExchange, // 필러 패널C(우) - 교환 - 주요골격 B랭크
        pillarRightPanelCChassisSheetMetal, // 필러 패널C(우) - 판금/용접 - 주요골격 B랭크
        pillarRightPanelCChassisCorrosion, // 필러 패널C(우) - 부식 - 주요골격 B랭크
        pillarRightPanelCChassisScratch, // 필러 패널C(우) - 흠집 - 주요골격 B랭크
        pillarRightPanelCChassisUneven, // 필러 패널C(우) - 요철 - 주요골격 B랭크
        pillarRightPanelCChassisDamage
      ], // 필러 패널C(우) - 손상 - 주요골
      PillarRightPanelCChassisCheckBox,
      PillarRightPanelCChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.pillarRightPanelCChassis, dataLabel: 'pillarRightPanelCChassis'});
    const [
      [
        packageTrayChassisExchange, // 패키지 트레이 - 교환 - 주요골격 B랭크
        packageTrayChassisSheetMetal, // 패키지 트레이 - 판금/용접 - 주요골격 B랭크
        packageTrayChassisCorrosion, // 패키지 트레이 - 부식 - 주요골격 B랭크
        packageTrayChassisScratch, // 패키지 트레이 - 흠집 - 주요골격 B랭크
        packageTrayChassisUneven, // 패키지 트레이 - 요철 - 주요골격 B랭크
        packageTrayChassisDamage
      ], // 패키지 트레이 - 손상 - 주요골
      PackageTrayChassisCheckBox,
      PackageTrayChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.packageTrayChassis, dataLabel: 'packageTrayChassis'});

    // 주요 골격 C랭크
    const [
      [
        dashPanelChassisExchange, // 대쉬 패널 - 교환 - 주요골격 C랭크
        dashPanelChassisSheetMetal, // 대쉬 패널 - 판금/용접 - 주요골격 C랭크
        dashPanelChassisCorrosion, // 대쉬 패널 - 부식 - 주요골격 C랭크
        dashPanelChassisScratch, // 대쉬 패널 - 흠집 - 주요골격 C랭크
        dashPanelChassisUneven, // 대쉬 패널 - 요철 - 주요골격 C랭크
        dashPanelChassisDamage
      ], // 대쉬 패널 - 손상 - 주요골
      DashPanelChassisCheckBox,
      DashPanelChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.dashPanelChassis, dataLabel: 'dashPanelChassis'});
    const [
      [
        floorPanelChassisExchange, // 플로어 패널 - 교환 - 주요골격 C랭크
        floorPanelChassisSheetMetal, // 플로어 패널 - 판금/용접 - 주요골격 C랭크
        floorPanelChassisCorrosion, // 플로어 패널 - 부식 - 주요골격 C랭크
        floorPanelChassisScratch, // 플로어 패널 - 흠집 - 주요골격 C랭크
        floorPanelChassisUneven, // 플로어 패널 - 요철 - 주요골격 C랭크
        floorPanelChassisDamage
      ], // 플로어 패널 - 손상 - 주요골격 C랭크
      FloorPanelChassisCheckBox,
      FloorPanelChassisImgSpan
    ] = useAccidentExchangeHistoryCheckBox({part: response?.floorPanelChassis, dataLabel: 'floorPanelChassis'});
    const [accidentCheckPopup, setAccidentCheckPopup] = useState(false);

    // const [accident, setAccident] = useState(!!response?.accident); // 사고이력
    // const [simpleRepair, setSimpleRepair] = useState(!!response?.simpleRepair); // 단순수리

    // 외판 부위의 판금, 용접수리, 교환 및 부식 이미지
    const OuterPlatePartImg = useCallback(
      () => (
        <Wrapper width={'412px'}>
          <ImgTitleBox>
            <Txt type={'bold'} fontSize={'14px'} height={'60px'} lineHeight={'60px'}>
              외판 부위의 판금, 용접수리, 교환 및 부식{' '}
            </Txt>
          </ImgTitleBox>
          <ImgBox w h column height={'700px'}>
            <Txt type={'medium'} textAlign={'center'} fontSize={'13px'} color={'#444'} style={{marginBottom: '30px'}}>
              앞 (전방)
            </Txt>
            <OuterPlatingPartImgInner>
              <HoodOuterPanelImgSpan onShowNumb={1} title={'후드'} show={show} setShow={setShow} styleCss={HoodOuterImgSpanStyle} />
              <FrontLeftFenderOuterPanelImgSpan onShowNumb={2} title={'프론트 휀더(좌)'} show={show} setShow={setShow} styleCss={FrontLeftFenderOuterPanelImgSpanStyle} />
              <FrontRightFenderOuterPanelImgSpan onShowNumb={3} title={'프론트 휀더(우)'} show={show} setShow={setShow} styleCss={FrontRightFenderOuterPanelImgSpanStyle} />
              <FrontLeftDoorOuterPanelImgSpan onShowNumb={4} title={'프론트 도어(좌)'} show={show} setShow={setShow} styleCss={FrontLeftDoorOuterPanelStyle} />
              <FrontRightDoorOuterPanelImgSpan onShowNumb={5} title={'프론트 도어(우)'} show={show} setShow={setShow} styleCss={FrontRightDoorOuterPanelStyle} />
              <RearLeftDoorOuterPanelImgSpan onShowNumb={6} title={'리어 도어(좌)'} show={show} setShow={setShow} styleCss={RearLeftDoorOuterPanelImgSpanStyle} />
              <RearRightDoorOuterPanelImgSpan onShowNumb={7} title={'리어 도어(우)'} show={show} setShow={setShow} styleCss={RearRightDoorOuterPanelImgSpanStyle} />
              <TrunkLidOuterPanelImgSpan onShowNumb={8} title={'트렁크리드'} show={show} setShow={setShow} styleCss={TrunkLidOuterPanelImgSpanStyle} />
              <RadiatorOuterPanelImgSpan onShowNumb={9} title={'라디에이터 서포트(볼트체결부품)'} show={show} setShow={setShow} styleCss={RadiatorOuterPanelImgSpanStyle} />
              <RoofOuterPanelImgSpan onShowNumb={10} title={'루프패널'} show={show} setShow={setShow} styleCss={RoofOuterPanelImgSpanStyle} />
              <QuarterLeftOuterPanelImgSpan onShowNumb={11} title={'쿼터 패널(리어펜더)(좌)'} show={show} setShow={setShow} styleCss={QuarterLeftOuterPanelImgSpanStyle} />
              <QuarterRightOuterPanelImgSpan onShowNumb={12} title={'쿼터 패널(리어펜더)(우)'} show={show} setShow={setShow} styleCss={QuarterRightOuterPanelImgSpanStyle} />
              <SideSillLeftOuterPanelImgSpan onShowNumb={13} title={'사이드실 패널(좌)'} show={show} setShow={setShow} styleCss={SideSillLeftOuterPanelImgSpanStyle} />
              <SideSillRightOuterPanelImgSpan onShowNumb={14} title={'사이드실 패널(우)'} show={show} setShow={setShow} styleCss={SideSillRightOuterPanelImgSpanStyle} />
            </OuterPlatingPartImgInner>
            <Txt type={'medium'} textAlign={'center'} fontSize={'13px'} color={'#444'} style={{marginTop: '30px'}}>
              앞 (후방)
            </Txt>
          </ImgBox>
        </Wrapper>
      ),
      [
        show,
        HoodOuterPanelCheckBox,
        FrontLeftFenderOuterPanelCheckBox,
        FrontRightFenderOuterPanelImgSpan,
        FrontLeftDoorOuterPanelImgSpan,
        FrontRightDoorOuterPanelImgSpan,
        RearLeftDoorOuterPanelImgSpan,
        RearRightDoorOuterPanelImgSpan,
        TrunkLidOuterPanelImgSpan,
        RadiatorOuterPanelImgSpan,
        RoofOuterPanelImgSpan,
        QuarterLeftOuterPanelImgSpan,
        QuarterRightOuterPanelImgSpan,
        SideSillLeftOuterPanelImgSpan,
        SideSillRightOuterPanelImgSpan
      ]
    );

    // 주요 골격 부위의 판금, 용접수리, 교환 및 부식
    const MainSkeletonPartImg = useCallback(
      () => (
        <Wrapper width={'412px'} style={{borderTop: '1px solid #d8d8d8'}}>
          <ImgTitleBox>
            <Txt type={'bold'} fontSize={'14px'} height={'60px'} lineHeight={'60px'}>
              주요 골격 부위의 판금, 용접수리, 교환 및 부식
            </Txt>
          </ImgTitleBox>
          <ImgBox w h column height={'1150px'}>
            <Txt type={'medium'} textAlign={'center'} fontSize={'13px'} color={'#444'} style={{marginBottom: '30px'}}>
              앞 (전방)
            </Txt>
            <MainSkeletonPartImgInner>
              <FrontPanelChassisImgSpan onShowNumb={-1} title={'프론트 패널'} show={show} setShow={setShow} styleCss={FrontPanelChassisImgSpanStyle} />
              <CrossMemberChassisImgSpan onShowNumb={-2} title={'크로스 멤버'} show={show} setShow={setShow} styleCss={CrossMemberChassisImgSpanStyle} />
              <InsideLeftPanelChassisImgSpan onShowNumb={-3} title={'인사이드 패널(좌)'} show={show} setShow={setShow} styleCss={InsideLeftPanelChassisImgSpanStyle} />
              <InsideRightPanelChassisImgSpan onShowNumb={-4} title={'인사이드 패널(우)'} show={show} setShow={setShow} styleCss={InsideRightPanelChassisImgSpanStyle} />
              <RearPanelChassisImgSpan onShowNumb={-5} title={'리어 패널'} show={show} setShow={setShow} styleCss={RearPanelChassisImgSpanStyle} />
              <TrunkFloorChassisImgSpan onShowNumb={-6} title={'트렁크 플로어'} show={show} setShow={setShow} styleCss={TrunkFloorChassisImgSpanStyle} />
              <FrontLeftSideMemberChassisImgSpan onShowNumb={-7} title={'프론트 사이드 멤버(좌)'} show={show} setShow={setShow} styleCss={FrontLeftSideMemberChassisImgSpanStyle} />
              <FrontRightSideMemberChassisImgSpan
                onShowNumb={-8}
                title={'프론트 사이드 멤버(우)'}
                show={show}
                setShow={setShow}
                styleCss={FrontRightSideMemberChassisImgSpanStyle}
              />
              <RearLeftSideMemberChassisImgSpan onShowNumb={-9} title={'리어 사이드 멤버(좌)'} show={show} setShow={setShow} styleCss={RearLeftSideMemberChassisImgSpanStyle} />
              <RearRightSideMemberChassisImgSpan onShowNumb={-10} title={'리어 사이드 멤버(우)'} show={show} setShow={setShow} styleCss={RearRightSideMemberChassisImgSpanStyle} />
              <FrontLeftWheelHouseChassisImgSpan onShowNumb={-11} title={'프론트 휠하우스(좌)'} show={show} setShow={setShow} styleCss={FrontLeftWheelHouseChassisImgSpanStyle} />
              <FrontRightWheelHouseChassisImgSpan onShowNumb={-12} title={'프론트 휠하우스(우)'} show={show} setShow={setShow} styleCss={FrontRightWheelHouseChassisImgSpanStyle} />
              <RearLeftWheelHouseChassisImgSpan onShowNumb={-13} title={'리어 휠하우스(좌)'} show={show} setShow={setShow} styleCss={RearLeftWheelHouseChassisImgSpanStyle} />
              <RearRightWheelHouseChassisImgSpan onShowNumb={-14} title={'리어 휠하우스(우)'} show={show} setShow={setShow} styleCss={RearRightWheelHouseChassisImgSpanStyle} />
              <PillarLeftPanelAChassisImgSpan onShowNumb={-15} title={'필러 패널A(좌)'} show={show} setShow={setShow} styleCss={PillarLeftPanelAChassisImgSpanStyle} />
              <PillarRightPanelAChassisImgSpan onShowNumb={-16} title={'필러 패널A(우)'} show={show} setShow={setShow} styleCss={PillarRightPanelAChassisImgSpanStyle} />
              <PillarLeftPanelBChassisImgSpan onShowNumb={-17} title={'필러 패널B(좌)'} show={show} setShow={setShow} styleCss={PillarLeftPanelBChassisImgSpanStyle} />
              <PillarRightPanelBChassisImgSpan onShowNumb={-18} title={'필러 패널B(우)'} show={show} setShow={setShow} styleCss={PillarRightPanelBChassisImgSpanStyle} />
              <PillarLeftPanelCChassisImgSpan onShowNumb={-19} title={'필러 패널C(좌)'} show={show} setShow={setShow} styleCss={PillarLeftPanelCChassisImgSpanStyle} />
              <PillarRightPanelCChassisImgSpan onShowNumb={-20} title={'필러 패널C(우)'} show={show} setShow={setShow} styleCss={PillarRightPanelCChassisImgSpanStyle} />
              <PackageTrayChassisImgSpan onShowNumb={-21} title={'패키지 트레이'} show={show} setShow={setShow} styleCss={PackageTrayChassisImgSpanStyle} />
              <DashPanelChassisImgSpan onShowNumb={-22} title={'대쉬 패널'} show={show} setShow={setShow} styleCss={DashPanelChassisImgSpanStyle} />
              <FloorPanelChassisImgSpan onShowNumb={-23} title={'플로어 패널'} show={show} setShow={setShow} styleCss={FloorPanelChassisImgSpanStyle} />
            </MainSkeletonPartImgInner>
            <Txt type={'medium'} textAlign={'center'} fontSize={'13px'} color={'#444'} style={{marginTop: '30px'}}>
              앞 (후방)
            </Txt>
          </ImgBox>
        </Wrapper>
      ),
      [
        show,
        FrontPanelChassisImgSpan,
        CrossMemberChassisImgSpan,
        InsideLeftPanelChassisImgSpan,
        InsideRightPanelChassisImgSpan,
        RearPanelChassisImgSpan,
        TrunkFloorChassisImgSpan,
        FrontLeftSideMemberChassisImgSpan,
        FrontRightSideMemberChassisImgSpan,
        RearLeftSideMemberChassisImgSpan,
        RearRightSideMemberChassisImgSpan,
        FrontLeftWheelHouseChassisImgSpan,
        FrontRightWheelHouseChassisImgSpan,
        RearLeftWheelHouseChassisImgSpan,
        RearRightWheelHouseChassisImgSpan,
        PillarLeftPanelAChassisImgSpan,
        PillarRightPanelAChassisImgSpan,
        PillarLeftPanelBChassisImgSpan,
        PillarRightPanelBChassisImgSpan,
        PillarLeftPanelCChassisImgSpan,
        PillarRightPanelCChassisImgSpan,
        PackageTrayChassisImgSpan,
        DashPanelChassisImgSpan,
        FloorPanelChassisImgSpan
      ]
    );

    // AccidentContent
    const [tooltip, setTooltip] = useState(false);
    const domReady = useDomReady();
    const [tooltip1, setTooltip1] = useState(false);
    const [tooltip2, setTooltip2] = useState(false);

    /* 사고 교환 수리 이력 */
    const [accidentRepairHistoryPricing, onChangeAccidentRepairHistoryPricing] = useInput(response?.accidentRepairHistoryPricing || '', 'number'); // 사고교환수리 - 가격조사 산정액
    const [accidentRepairHistorySpecialty, setAccidentRepairHistorySpecialty] = useState(response?.accidentRepairHistorySpecialty || ''); // 사고교환수리 - 특이사항
    const [outerPanel1RankPricing, onChangeOuterPanel1RankPricing] = useInput(response?.outerPanel1RankPricing || '', 'number'); // 외판부위 1랭크 - 가격 산정금액
    const [outerPanel1RankSpecialty, setOuterPanel1RankSpecialty] = useState(response?.outerPanel1RankSpecialty || ''); // 외판부위 1랭크 - 특이사항
    const [outerPanel2RankPricing, onChangeOuterPanel2RankPricing] = useInput(response?.outerPanel2RankPricing || '', 'number'); // 외판부위 2랭크 - 가격조사 산정액
    const [outerPanel2RankSpecialty, setOuterPanel2RankSpecialty] = useState(response?.outerPanel2RankSpecialty || ''); // 외판부위 2랭크 - 특이사항
    const [mainChassisPricing, onChangeMainChassisPricing] = useInput(response?.mainChassisPricing || '', 'number'); // 주요 골격-  가격조사 산정액
    const [mainChassisSpecialty, setMainChassisSpecialty] = useState(response?.mainChassisSpecialty || ''); // 주요 골격 - 특이사항

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

    const TooltipDom = useCallback(
      ({message, width, top, left, className}: {message: string | ReactElement; width?: string; top?: string; left?: string; className?: string}) => (
        <TooltipBox width={width} top={top} left={left} className={className}>
          <Txt type="medium" fontSize={'14px'} color={theme.color.notice} lineHeight={'1.43'}>
            {message}
          </Txt>
        </TooltipBox>
      ),
      []
    );
    // 사고 이력 있음 조건
    const accidentConfirmCheck: boolean =
      roofOuterPanelSheetMetal || quarterLeftOuterPanelSheetMetal || quarterRightOuterPanelSheetMetal || sideSillLeftOuterPanelSheetMetal || sideSillRightOuterPanelSheetMetal;

    // 1. 각각 값에 팝업을 걸던가..
    // 2. 전체를 두고 전체를 하던가..

    // 사고 이력 유무 조건
    const accidentCheck: boolean =
      frontPanelChassisExchange ||
      frontPanelChassisSheetMetal ||
      crossMemberChassisExchange ||
      crossMemberChassisSheetMetal ||
      insideLeftPanelChassisExchange ||
      insideLeftPanelChassisSheetMetal ||
      insideRightPanelChassisExchange ||
      insideRightPanelChassisSheetMetal ||
      rearPanelChassisExchange ||
      rearPanelChassisSheetMetal ||
      trunkFloorChassisExchange ||
      trunkFloorChassisSheetMetal ||
      frontLeftSideMemberChassisExchange ||
      frontLeftSideMemberChassisSheetMetal ||
      frontRightSideMemberChassisExchange ||
      frontRightSideMemberChassisSheetMetal ||
      rearLeftSideMemberChassisExchange ||
      rearLeftSideMemberChassisSheetMetal ||
      rearRightSideMemberChassisExchange ||
      rearRightSideMemberChassisSheetMetal ||
      frontLeftWheelHouseChassisExchange ||
      frontLeftWheelHouseChassisSheetMetal ||
      frontRightWheelHouseChassisExchange ||
      frontRightWheelHouseChassisSheetMetal ||
      rearLeftWheelHouseChassisExchange ||
      rearLeftWheelHouseChassisSheetMetal ||
      rearRightWheelHouseChassisExchange ||
      rearRightWheelHouseChassisSheetMetal ||
      pillarLeftPanelAChassisExchange ||
      pillarLeftPanelAChassisSheetMetal ||
      pillarRightPanelAChassisExchange ||
      pillarRightPanelAChassisSheetMetal ||
      pillarLeftPanelBChassisExchange ||
      pillarLeftPanelBChassisSheetMetal ||
      pillarRightPanelBChassisExchange ||
      pillarRightPanelBChassisSheetMetal ||
      pillarLeftPanelCChassisExchange ||
      pillarLeftPanelCChassisSheetMetal ||
      pillarRightPanelCChassisExchange ||
      pillarRightPanelCChassisSheetMetal ||
      packageTrayChassisExchange ||
      packageTrayChassisSheetMetal ||
      dashPanelChassisExchange ||
      dashPanelChassisSheetMetal ||
      floorPanelChassisExchange ||
      floorPanelChassisSheetMetal;

    // 단순 수리 유무 조건
    const simpleRepair: boolean =
      hoodOuterPanelExchange ||
      hoodOuterPanelSheetMetal ||
      frontLeftFenderOuterPanelExchange ||
      frontLeftFenderOuterPanelSheetMetal ||
      frontRightFenderOuterPanelExchange ||
      frontRightFenderOuterPanelSheetMetal ||
      frontLeftDoorOuterPanelExchange ||
      frontLeftDoorOuterPanelSheetMetal ||
      frontRightDoorOuterPanelExchange ||
      frontRightDoorOuterPanelSheetMetal ||
      rearLeftDoorOuterPanelExchange ||
      rearLeftDoorOuterPanelSheetMetal ||
      rearRightDoorOuterPanelExchange ||
      rearRightDoorOuterPanelSheetMetal ||
      trunkLidOuterPanelExchange ||
      trunkLidOuterPanelSheetMetal ||
      radiatorOuterPanelExchange ||
      radiatorOuterPanelSheetMetal ||
      roofOuterPanelExchange ||
      roofOuterPanelSheetMetal ||
      quarterLeftOuterPanelExchange ||
      quarterLeftOuterPanelSheetMetal ||
      quarterRightOuterPanelExchange ||
      quarterRightOuterPanelSheetMetal ||
      sideSillLeftOuterPanelExchange ||
      sideSillLeftOuterPanelSheetMetal ||
      sideSillRightOuterPanelExchange ||
      sideSillRightOuterPanelSheetMetal;

    // 외판부위 1랭크 조건
    const exteriorRank1Check: boolean =
      hoodOuterPanelExchange ||
      hoodOuterPanelSheetMetal ||
      hoodOuterPanelCorrosion ||
      hoodOuterPanelScratch ||
      hoodOuterPanelUneven ||
      hoodOuterPanelDamage ||
      frontLeftFenderOuterPanelExchange ||
      frontLeftFenderOuterPanelSheetMetal ||
      frontLeftFenderOuterPanelCorrosion ||
      frontLeftFenderOuterPanelScratch ||
      frontLeftFenderOuterPanelUneven ||
      frontLeftFenderOuterPanelDamage ||
      frontRightFenderOuterPanelExchange ||
      frontRightFenderOuterPanelSheetMetal ||
      frontRightFenderOuterPanelCorrosion ||
      frontRightFenderOuterPanelScratch ||
      frontRightFenderOuterPanelUneven ||
      frontRightFenderOuterPanelDamage ||
      frontLeftDoorOuterPanelExchange ||
      frontLeftDoorOuterPanelSheetMetal ||
      frontLeftDoorOuterPanelCorrosion ||
      frontLeftDoorOuterPanelScratch ||
      frontLeftDoorOuterPanelUneven ||
      frontLeftDoorOuterPanelDamage ||
      frontRightDoorOuterPanelExchange ||
      frontRightDoorOuterPanelSheetMetal ||
      frontRightDoorOuterPanelCorrosion ||
      frontRightDoorOuterPanelScratch ||
      frontRightDoorOuterPanelUneven ||
      frontRightDoorOuterPanelDamage ||
      rearLeftDoorOuterPanelExchange ||
      rearLeftDoorOuterPanelSheetMetal ||
      rearLeftDoorOuterPanelCorrosion ||
      rearLeftDoorOuterPanelScratch ||
      rearLeftDoorOuterPanelUneven ||
      rearLeftDoorOuterPanelDamage ||
      rearRightDoorOuterPanelExchange ||
      rearRightDoorOuterPanelSheetMetal ||
      rearRightDoorOuterPanelCorrosion ||
      rearRightDoorOuterPanelScratch ||
      rearRightDoorOuterPanelUneven ||
      rearRightDoorOuterPanelDamage ||
      trunkLidOuterPanelExchange ||
      trunkLidOuterPanelSheetMetal ||
      trunkLidOuterPanelCorrosion ||
      trunkLidOuterPanelScratch ||
      trunkLidOuterPanelUneven ||
      trunkLidOuterPanelDamage ||
      radiatorOuterPanelExchange ||
      radiatorOuterPanelSheetMetal ||
      radiatorOuterPanelCorrosion ||
      radiatorOuterPanelScratch ||
      radiatorOuterPanelUneven ||
      radiatorOuterPanelDamage;

    // 외판부위 2랭크 조건
    const exteriorRank2Check: boolean =
      roofOuterPanelExchange ||
      roofOuterPanelSheetMetal ||
      roofOuterPanelCorrosion ||
      roofOuterPanelScratch ||
      roofOuterPanelUneven ||
      roofOuterPanelDamage ||
      quarterLeftOuterPanelExchange ||
      quarterLeftOuterPanelSheetMetal ||
      quarterLeftOuterPanelCorrosion ||
      quarterLeftOuterPanelScratch ||
      quarterLeftOuterPanelUneven ||
      quarterLeftOuterPanelDamage ||
      quarterRightOuterPanelExchange ||
      quarterRightOuterPanelSheetMetal ||
      quarterRightOuterPanelCorrosion ||
      quarterRightOuterPanelScratch ||
      quarterRightOuterPanelUneven ||
      quarterRightOuterPanelDamage ||
      sideSillLeftOuterPanelExchange ||
      sideSillLeftOuterPanelSheetMetal ||
      sideSillLeftOuterPanelCorrosion ||
      sideSillLeftOuterPanelScratch ||
      sideSillLeftOuterPanelUneven ||
      sideSillLeftOuterPanelDamage ||
      sideSillRightOuterPanelExchange ||
      sideSillRightOuterPanelSheetMetal ||
      sideSillRightOuterPanelCorrosion ||
      sideSillRightOuterPanelScratch ||
      sideSillRightOuterPanelUneven ||
      sideSillRightOuterPanelDamage;

    // 주요 골격 A 랭크
    const mainSkeletonACheck: boolean =
      frontPanelChassisExchange ||
      frontPanelChassisSheetMetal ||
      frontPanelChassisCorrosion ||
      frontPanelChassisScratch ||
      frontPanelChassisUneven ||
      frontPanelChassisDamage ||
      crossMemberChassisExchange ||
      crossMemberChassisSheetMetal ||
      crossMemberChassisCorrosion ||
      crossMemberChassisScratch ||
      crossMemberChassisUneven ||
      crossMemberChassisDamage ||
      insideLeftPanelChassisExchange ||
      insideLeftPanelChassisSheetMetal ||
      insideLeftPanelChassisCorrosion ||
      insideLeftPanelChassisScratch ||
      insideLeftPanelChassisUneven ||
      insideLeftPanelChassisDamage ||
      insideRightPanelChassisExchange ||
      insideRightPanelChassisSheetMetal ||
      insideRightPanelChassisCorrosion ||
      insideRightPanelChassisScratch ||
      insideRightPanelChassisUneven ||
      insideRightPanelChassisDamage ||
      rearPanelChassisExchange ||
      rearPanelChassisSheetMetal ||
      rearPanelChassisCorrosion ||
      rearPanelChassisScratch ||
      rearPanelChassisUneven ||
      rearPanelChassisDamage ||
      trunkFloorChassisExchange ||
      trunkFloorChassisSheetMetal ||
      trunkFloorChassisCorrosion ||
      trunkFloorChassisScratch ||
      trunkFloorChassisUneven ||
      trunkFloorChassisDamage;

    // 주요 골격 B 랭크
    const mainSkeletonBCheck: boolean =
      frontLeftSideMemberChassisExchange ||
      frontLeftSideMemberChassisSheetMetal ||
      frontLeftSideMemberChassisCorrosion ||
      frontLeftSideMemberChassisScratch ||
      frontLeftSideMemberChassisUneven ||
      frontLeftSideMemberChassisDamage ||
      frontRightSideMemberChassisExchange ||
      frontRightSideMemberChassisSheetMetal ||
      frontRightSideMemberChassisCorrosion ||
      frontRightSideMemberChassisScratch ||
      frontRightSideMemberChassisUneven ||
      frontRightSideMemberChassisDamage ||
      rearLeftSideMemberChassisExchange ||
      rearLeftSideMemberChassisSheetMetal ||
      rearLeftSideMemberChassisCorrosion ||
      rearLeftSideMemberChassisScratch ||
      rearLeftSideMemberChassisUneven ||
      rearLeftSideMemberChassisDamage ||
      rearRightSideMemberChassisExchange ||
      rearRightSideMemberChassisSheetMetal ||
      rearRightSideMemberChassisCorrosion ||
      rearRightSideMemberChassisScratch ||
      rearRightSideMemberChassisUneven ||
      rearRightSideMemberChassisDamage ||
      frontLeftWheelHouseChassisExchange ||
      frontLeftWheelHouseChassisSheetMetal ||
      frontLeftWheelHouseChassisCorrosion ||
      frontLeftWheelHouseChassisScratch ||
      frontLeftWheelHouseChassisUneven ||
      frontLeftWheelHouseChassisDamage ||
      frontRightWheelHouseChassisExchange ||
      frontRightWheelHouseChassisSheetMetal ||
      frontRightWheelHouseChassisCorrosion ||
      frontRightWheelHouseChassisScratch ||
      frontRightWheelHouseChassisUneven ||
      frontRightWheelHouseChassisDamage ||
      rearLeftWheelHouseChassisExchange ||
      rearLeftWheelHouseChassisSheetMetal ||
      rearLeftWheelHouseChassisCorrosion ||
      rearLeftWheelHouseChassisScratch ||
      rearLeftWheelHouseChassisUneven ||
      rearLeftWheelHouseChassisDamage ||
      rearRightWheelHouseChassisExchange ||
      rearRightWheelHouseChassisSheetMetal ||
      rearRightWheelHouseChassisCorrosion ||
      rearRightWheelHouseChassisScratch ||
      rearRightWheelHouseChassisUneven ||
      rearRightWheelHouseChassisDamage ||
      pillarLeftPanelAChassisExchange ||
      pillarLeftPanelAChassisSheetMetal ||
      pillarLeftPanelAChassisCorrosion ||
      pillarLeftPanelAChassisScratch ||
      pillarLeftPanelAChassisUneven ||
      pillarLeftPanelAChassisDamage ||
      pillarRightPanelAChassisExchange ||
      pillarRightPanelAChassisSheetMetal ||
      pillarRightPanelAChassisCorrosion ||
      pillarRightPanelAChassisScratch ||
      pillarRightPanelAChassisUneven ||
      pillarRightPanelAChassisDamage ||
      pillarLeftPanelBChassisExchange ||
      pillarLeftPanelBChassisSheetMetal ||
      pillarLeftPanelBChassisCorrosion ||
      pillarLeftPanelBChassisScratch ||
      pillarLeftPanelBChassisUneven ||
      pillarLeftPanelBChassisDamage ||
      pillarRightPanelBChassisExchange ||
      pillarRightPanelBChassisSheetMetal ||
      pillarRightPanelBChassisCorrosion ||
      pillarRightPanelBChassisScratch ||
      pillarRightPanelBChassisUneven ||
      pillarRightPanelBChassisDamage ||
      pillarLeftPanelCChassisExchange ||
      pillarLeftPanelCChassisSheetMetal ||
      pillarLeftPanelCChassisCorrosion ||
      pillarLeftPanelCChassisScratch ||
      pillarLeftPanelCChassisUneven ||
      pillarLeftPanelCChassisDamage ||
      pillarRightPanelCChassisExchange ||
      pillarRightPanelCChassisSheetMetal ||
      pillarRightPanelCChassisCorrosion ||
      pillarRightPanelCChassisScratch ||
      pillarRightPanelCChassisUneven ||
      pillarRightPanelCChassisDamage ||
      packageTrayChassisExchange ||
      packageTrayChassisSheetMetal ||
      packageTrayChassisCorrosion ||
      packageTrayChassisScratch ||
      packageTrayChassisUneven ||
      packageTrayChassisDamage;

    // 주요 골격 C 랭크
    const mainSkeletonCCheck: boolean =
      dashPanelChassisExchange ||
      dashPanelChassisSheetMetal ||
      dashPanelChassisCorrosion ||
      dashPanelChassisScratch ||
      dashPanelChassisUneven ||
      dashPanelChassisDamage ||
      floorPanelChassisExchange ||
      floorPanelChassisSheetMetal ||
      floorPanelChassisCorrosion ||
      floorPanelChassisScratch ||
      floorPanelChassisUneven ||
      floorPanelChassisDamage;

    // 외판 부위에서 사고 이력 있음의 조건부들 클릭시 팝업 생성
    useEffect(() => {
      // 처음 진입시에 안뜨게 domReady
      if (domReady && accidentConfirmCheck) {
        setAccidentCheckPopup(true);
      }
    }, [accidentConfirmCheck]);

    const queryString = JSON.stringify({
      hoodOuterPanelExchange,
      hoodOuterPanelSheetMetal,
      hoodOuterPanelCorrosion,
      hoodOuterPanelScratch,
      hoodOuterPanelUneven,
      hoodOuterPanelDamage,
      frontLeftFenderOuterPanelExchange,
      frontLeftFenderOuterPanelSheetMetal,
      frontLeftFenderOuterPanelCorrosion,
      frontLeftFenderOuterPanelScratch,
      frontLeftFenderOuterPanelUneven,
      frontLeftFenderOuterPanelDamage,
      frontRightFenderOuterPanelExchange,
      frontRightFenderOuterPanelSheetMetal,
      frontRightFenderOuterPanelCorrosion,
      frontRightFenderOuterPanelScratch,
      frontRightFenderOuterPanelUneven,
      frontRightFenderOuterPanelDamage,
      frontLeftDoorOuterPanelExchange,
      frontLeftDoorOuterPanelSheetMetal,
      frontLeftDoorOuterPanelCorrosion,
      frontLeftDoorOuterPanelScratch,
      frontLeftDoorOuterPanelUneven,
      frontLeftDoorOuterPanelDamage,
      frontRightDoorOuterPanelExchange,
      frontRightDoorOuterPanelSheetMetal,
      frontRightDoorOuterPanelCorrosion,
      frontRightDoorOuterPanelScratch,
      frontRightDoorOuterPanelUneven,
      frontRightDoorOuterPanelDamage,
      rearLeftDoorOuterPanelExchange,
      rearLeftDoorOuterPanelSheetMetal,
      rearLeftDoorOuterPanelCorrosion,
      rearLeftDoorOuterPanelScratch,
      rearLeftDoorOuterPanelUneven,
      rearLeftDoorOuterPanelDamage,
      rearRightDoorOuterPanelExchange,
      rearRightDoorOuterPanelSheetMetal,
      rearRightDoorOuterPanelCorrosion,
      rearRightDoorOuterPanelScratch,
      rearRightDoorOuterPanelUneven,
      rearRightDoorOuterPanelDamage,
      trunkLidOuterPanelExchange,
      trunkLidOuterPanelSheetMetal,
      trunkLidOuterPanelCorrosion,
      trunkLidOuterPanelScratch,
      trunkLidOuterPanelUneven,
      trunkLidOuterPanelDamage,
      radiatorOuterPanelExchange,
      radiatorOuterPanelSheetMetal,
      radiatorOuterPanelCorrosion,
      radiatorOuterPanelScratch,
      radiatorOuterPanelUneven,
      radiatorOuterPanelDamage,
      roofOuterPanelExchange,
      roofOuterPanelSheetMetal,
      roofOuterPanelCorrosion,
      roofOuterPanelScratch,
      roofOuterPanelUneven,
      roofOuterPanelDamage,
      quarterLeftOuterPanelExchange,
      quarterLeftOuterPanelSheetMetal,
      quarterLeftOuterPanelCorrosion,
      quarterLeftOuterPanelScratch,
      quarterLeftOuterPanelUneven,
      quarterLeftOuterPanelDamage,
      quarterRightOuterPanelExchange,
      quarterRightOuterPanelSheetMetal,
      quarterRightOuterPanelCorrosion,
      quarterRightOuterPanelScratch,
      quarterRightOuterPanelUneven,
      quarterRightOuterPanelDamage,
      sideSillLeftOuterPanelExchange,
      sideSillLeftOuterPanelSheetMetal,
      sideSillLeftOuterPanelCorrosion,
      sideSillLeftOuterPanelScratch,
      sideSillLeftOuterPanelUneven,
      sideSillLeftOuterPanelDamage,
      sideSillRightOuterPanelExchange,
      sideSillRightOuterPanelSheetMetal,
      sideSillRightOuterPanelCorrosion,
      sideSillRightOuterPanelScratch,
      sideSillRightOuterPanelUneven,
      sideSillRightOuterPanelDamage,
      frontPanelChassisExchange,
      frontPanelChassisSheetMetal,
      frontPanelChassisCorrosion,
      frontPanelChassisScratch,
      frontPanelChassisUneven,
      frontPanelChassisDamage,
      crossMemberChassisExchange,
      crossMemberChassisSheetMetal,
      crossMemberChassisCorrosion,
      crossMemberChassisScratch,
      crossMemberChassisUneven,
      crossMemberChassisDamage,
      insideLeftPanelChassisExchange,
      insideLeftPanelChassisSheetMetal,
      insideLeftPanelChassisCorrosion,
      insideLeftPanelChassisScratch,
      insideLeftPanelChassisUneven,
      insideLeftPanelChassisDamage,
      insideRightPanelChassisExchange,
      insideRightPanelChassisSheetMetal,
      insideRightPanelChassisCorrosion,
      insideRightPanelChassisScratch,
      insideRightPanelChassisUneven,
      insideRightPanelChassisDamage,
      rearPanelChassisExchange,
      rearPanelChassisSheetMetal,
      rearPanelChassisCorrosion,
      rearPanelChassisScratch,
      rearPanelChassisUneven,
      rearPanelChassisDamage,
      trunkFloorChassisExchange,
      trunkFloorChassisSheetMetal,
      trunkFloorChassisCorrosion,
      trunkFloorChassisScratch,
      trunkFloorChassisUneven,
      trunkFloorChassisDamage,
      frontLeftSideMemberChassisExchange,
      frontLeftSideMemberChassisSheetMetal,
      frontLeftSideMemberChassisCorrosion,
      frontLeftSideMemberChassisScratch,
      frontLeftSideMemberChassisUneven,
      frontLeftSideMemberChassisDamage,
      frontRightSideMemberChassisExchange,
      frontRightSideMemberChassisSheetMetal,
      frontRightSideMemberChassisCorrosion,
      frontRightSideMemberChassisScratch,
      frontRightSideMemberChassisUneven,
      frontRightSideMemberChassisDamage,
      rearLeftSideMemberChassisExchange,
      rearLeftSideMemberChassisSheetMetal,
      rearLeftSideMemberChassisCorrosion,
      rearLeftSideMemberChassisScratch,
      rearLeftSideMemberChassisUneven,
      rearLeftSideMemberChassisDamage,
      rearRightSideMemberChassisExchange,
      rearRightSideMemberChassisSheetMetal,
      rearRightSideMemberChassisCorrosion,
      rearRightSideMemberChassisScratch,
      rearRightSideMemberChassisUneven,
      rearRightSideMemberChassisDamage,
      frontLeftWheelHouseChassisExchange,
      frontLeftWheelHouseChassisSheetMetal,
      frontLeftWheelHouseChassisCorrosion,
      frontLeftWheelHouseChassisScratch,
      frontLeftWheelHouseChassisUneven,
      frontLeftWheelHouseChassisDamage,
      frontRightWheelHouseChassisExchange,
      frontRightWheelHouseChassisSheetMetal,
      frontRightWheelHouseChassisCorrosion,
      frontRightWheelHouseChassisScratch,
      frontRightWheelHouseChassisUneven,
      frontRightWheelHouseChassisDamage,
      rearLeftWheelHouseChassisExchange,
      rearLeftWheelHouseChassisSheetMetal,
      rearLeftWheelHouseChassisCorrosion,
      rearLeftWheelHouseChassisScratch,
      rearLeftWheelHouseChassisUneven,
      rearLeftWheelHouseChassisDamage,
      rearRightWheelHouseChassisExchange,
      rearRightWheelHouseChassisSheetMetal,
      rearRightWheelHouseChassisCorrosion,
      rearRightWheelHouseChassisScratch,
      rearRightWheelHouseChassisUneven,
      rearRightWheelHouseChassisDamage,
      pillarLeftPanelAChassisExchange,
      pillarLeftPanelAChassisSheetMetal,
      pillarLeftPanelAChassisCorrosion,
      pillarLeftPanelAChassisScratch,
      pillarLeftPanelAChassisUneven,
      pillarLeftPanelAChassisDamage,
      pillarRightPanelAChassisExchange,
      pillarRightPanelAChassisSheetMetal,
      pillarRightPanelAChassisCorrosion,
      pillarRightPanelAChassisScratch,
      pillarRightPanelAChassisUneven,
      pillarRightPanelAChassisDamage,
      pillarLeftPanelBChassisExchange,
      pillarLeftPanelBChassisSheetMetal,
      pillarLeftPanelBChassisCorrosion,
      pillarLeftPanelBChassisScratch,
      pillarLeftPanelBChassisUneven,
      pillarLeftPanelBChassisDamage,
      pillarRightPanelBChassisExchange,
      pillarRightPanelBChassisSheetMetal,
      pillarRightPanelBChassisCorrosion,
      pillarRightPanelBChassisScratch,
      pillarRightPanelBChassisUneven,
      pillarRightPanelBChassisDamage,
      pillarLeftPanelCChassisExchange,
      pillarLeftPanelCChassisSheetMetal,
      pillarLeftPanelCChassisCorrosion,
      pillarLeftPanelCChassisScratch,
      pillarLeftPanelCChassisUneven,
      pillarLeftPanelCChassisDamage,
      pillarRightPanelCChassisExchange,
      pillarRightPanelCChassisSheetMetal,
      pillarRightPanelCChassisCorrosion,
      pillarRightPanelCChassisScratch,
      pillarRightPanelCChassisUneven,
      pillarRightPanelCChassisDamage,
      packageTrayChassisExchange,
      packageTrayChassisSheetMetal,
      packageTrayChassisCorrosion,
      packageTrayChassisScratch,
      packageTrayChassisUneven,
      packageTrayChassisDamage,
      dashPanelChassisExchange,
      dashPanelChassisSheetMetal,
      dashPanelChassisCorrosion,
      dashPanelChassisScratch,
      dashPanelChassisUneven,
      dashPanelChassisDamage,
      floorPanelChassisExchange,
      floorPanelChassisSheetMetal,
      floorPanelChassisCorrosion,
      floorPanelChassisScratch,
      floorPanelChassisUneven,
      floorPanelChassisDamage
    });
    store.setQuery(queryString);

    store.setPricing(
      JSON.stringify({
        accidentRepairHistoryPricing, // 사고교환수리 - 가격산정금액
        outerPanel1RankPricing, // 외판부위 1랭킹 - 가격산정금액
        outerPanel2RankPricing, // 외판부위 2랭킹 - 가격산정금액
        mainChassisPricing // 주요골격 - 가격산정금액
      })
    );
    store.setSpecialty(
      JSON.stringify({
        accidentRepairHistorySpecialty, // 사고교환수리 - 특이사항
        outerPanel1RankSpecialty, // 외판부위 1랭킹 - 특이사항 추가
        outerPanel2RankSpecialty, // 외판부위 2랭킹 - 특이사항
        mainChassisSpecialty // 주요골격 - 특이사항
      })
    );

    return (
      <Wrapper>
        <Title>사고 교환 수리 이력</Title>
        {/* 외판 부위의 판금, 용접수리, 교환 및 부식 start */}
        <Wrapper w flex style={{alignItem: 'baseline'}}>
          <OuterPlatePartImg />
          <TableBox>
            <colgroup>
              <col width={'80'} />
              <col width={'50'} />
              <col width={'250'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
            </colgroup>
            <thead>
              <tr>
                <th className={'borderLeftTh'}>랭크</th>
                <th>No</th>
                <th>부위 명칭</th>
                <th>교환</th>
                <th>
                  판금
                  <br />
                  용접
                </th>
                <th>부식</th>
                <th>흠집</th>
                <th>요철</th>
                <th>손상</th>
              </tr>
            </thead>
            <tbody>
              {/* 1 랭크 */}
              <HoodOuterPanelCheckBox onShowNumb={1} partName={'후드'}>
                <th rowSpan={9} className={'borderLeftTh'}>
                  1랭크
                </th>
              </HoodOuterPanelCheckBox>
              <FrontLeftFenderOuterPanelCheckBox onShowNumb={2} partName={'프론트 휀더(좌)'} />
              <FrontRightFenderOuterPanelCheckBox onShowNumb={3} partName={'프론트 휀더(우)'} />
              <FrontLeftDoorOuterPanelCheckBox onShowNumb={4} partName={'프론트 도어(좌)'} />
              <FrontRightDoorOuterPanelCheckBox onShowNumb={5} partName={'프론트 도어(우)'} />
              <RearLeftDoorOuterPanelCheckBox onShowNumb={6} partName={'리어 도어(좌)'} />
              <RearRightDoorOuterPanelCheckBox onShowNumb={7} partName={'리어 도어(우)'} />
              <TrunkLidOuterPanelCheckBox onShowNumb={8} partName={'트렁크리드'} />
              <RadiatorOuterPanelCheckBox onShowNumb={9} partName={'라디에이터 서포트 (볼트체결부품)'} />
              {/* 2 랭크 */}
              <RoofOuterPanelCheckBox onShowNumb={10} partName={'루프 패널'}>
                <th rowSpan={5} className={'borderLeftTh'}>
                  2랭크
                </th>
              </RoofOuterPanelCheckBox>
              <QuarterLeftOuterPanelCheckBox onShowNumb={11} partName={'쿼터 패널 (리어펜더)(좌)'} />
              <QuarterRightOuterPanelCheckBox onShowNumb={12} partName={'쿼터 패널 (리어펜더)(우)'} />
              <SideSillLeftOuterPanelCheckBox onShowNumb={13} partName={'사이드실 패널 (좌)'} />
              <SideSillRightOuterPanelCheckBox onShowNumb={14} partName={'사이드실 패널 (우)'} className={'nonBorderBottomTr'} />
            </tbody>
          </TableBox>
        </Wrapper>
        {/* 외판 부위의 판금, 용접수리, 교환 및 부식 end */}

        {/* 주요 골격 부위의 판금, 용접수리, 교환 및 부식 start */}
        <Wrapper w flex style={{alignItem: 'baseline', borderBottom: '1px solid #d8d8d8'}}>
          {/* 이미지 */}
          <MainSkeletonPartImg />
          <TableBox>
            <colgroup>
              <col width={'80'} />
              <col width={'50'} />
              <col width={'250'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
              <col width={'50'} />
            </colgroup>
            <thead>
              <tr className={'borderTopTr'}>
                <th className={'borderLeftTh'}>랭크</th>
                <th>No</th>
                <th>부위 명칭</th>
                <th>교환</th>
                <th>
                  판금
                  <br />
                  용접
                </th>
                <th>부식</th>
                <th>흠집</th>
                <th>요철</th>
                <th>손상</th>
              </tr>
            </thead>
            <tbody>
              {/* A 랭크 */}
              <FrontPanelChassisCheckBox onShowNumb={1} partName={'후드'}>
                <th rowSpan={6} className={'borderLeftTh'}>
                  A랭크
                </th>
              </FrontPanelChassisCheckBox>
              <CrossMemberChassisCheckBox
                onShowNumb={2}
                partName={
                  <QuestionMark>
                    크로스 멤버
                    <span onMouseEnter={() => setTooltip(true)} onMouseOut={() => setTooltip(false)}></span>
                    {tooltip && (
                      <TooltipDom
                        width={'241px'}
                        top={'69px'}
                        left={'-252%'}
                        message={
                          <Txt type="medium" fontSize={'14px'} color={theme.color.notice} lineHeight={'1.43'}>
                            볼트 체결식인 경우 무사고 차량이며, <br />그 외는 유사고에 해당합니다.
                          </Txt>
                        }
                      />
                    )}
                  </QuestionMark>
                }
                className={'questionMark'}
              />
              <InsideLeftPanelChassisCheckBox onShowNumb={3} partName={'인사이드 패널(좌)'} />
              <InsideRightPanelChassisCheckBox onShowNumb={4} partName={'인사이드 패널(우)'} />
              <RearPanelChassisCheckBox onShowNumb={5} partName={'리어 패널'} />
              <TrunkFloorChassisCheckBox onShowNumb={6} partName={'트렁크 플로어'} />

              {/* B 랭크 */}
              <FrontLeftSideMemberChassisCheckBox onShowNumb={7} partName={'프론트 사이드 멤버(좌)'}>
                <th rowSpan={15} className={'borderLeftTh'}>
                  B랭크
                </th>
              </FrontLeftSideMemberChassisCheckBox>
              <FrontRightSideMemberChassisCheckBox onShowNumb={8} partName={'프론트 사이드 멤버(우)'} />
              <RearLeftSideMemberChassisCheckBox onShowNumb={9} partName={'리어 사이드 멤버(좌)'} />
              <RearRightSideMemberChassisCheckBox onShowNumb={10} partName={'리어 사이드 멤버(우)'} />
              <FrontLeftWheelHouseChassisCheckBox onShowNumb={11} partName={'프론트 휠하우스(좌)'} />
              <FrontRightWheelHouseChassisCheckBox onShowNumb={12} partName={'프론트 휠하우스(우)'} />
              <RearLeftWheelHouseChassisCheckBox onShowNumb={13} partName={'리어하우스(좌)'} />
              <RearRightWheelHouseChassisCheckBox onShowNumb={14} partName={'리어하우스(우)'} />
              <PillarLeftPanelAChassisCheckBox onShowNumb={15} partName={'필러 패널A(좌)'} />
              <PillarRightPanelAChassisCheckBox onShowNumb={16} partName={'필러 패널A(우)'} />
              <PillarLeftPanelBChassisCheckBox onShowNumb={17} partName={'필러 패널B(좌)'} />
              <PillarRightPanelBChassisCheckBox onShowNumb={18} partName={'필러 패널B(우)'} />
              <PillarLeftPanelCChassisCheckBox onShowNumb={19} partName={'필러 패널C(좌)'} />
              <PillarRightPanelCChassisCheckBox onShowNumb={20} partName={'필러 패널C(우)'} />
              <PackageTrayChassisCheckBox onShowNumb={21} partName={'패키지트레이'} />

              {/* C 랭크 */}
              <DashPanelChassisCheckBox onShowNumb={22} partName={'대쉬 패널'}>
                <th rowSpan={2} className={'borderLeftTh'}>
                  C랭크
                </th>
              </DashPanelChassisCheckBox>
              <FloorPanelChassisCheckBox onShowNumb={23} partName={'플로어 패널(바닥)'} className={'nonBorderBottomTr'} />
            </tbody>
          </TableBox>
        </Wrapper>

        <Wrapper>
          <TableBox style={{borderTop: '1px solid #d8d8d8', marginTop: '21px'}}>
            {inspectionRecordVersion ? (
              <>
                <colgroup>
                  <col width={'103'} />
                  <col width={'127'} />
                  <col width={'103'} />
                  <col width={'103'} />
                  <col width={'274'} />
                  <col width={'86'} />
                  <col width={'89'} />
                </colgroup>
                <tbody>
                  <tr>
                    <th style={{height: '50px'}}>
                      <QuestionMark>
                        사고이력
                        <span className={'accident-repair'} onMouseEnter={() => setTooltip2(true)} onMouseLeave={() => setTooltip2(false)}></span>
                        {tooltip2 && (
                          <TooltipDom
                            width={'580px'}
                            left={'-27%'}
                            className={'left-arrow old-version'}
                            message={
                              <Txt type="medium" fontSize={'14px'} color={theme.color.notice} lineHeight={'1.43'}>
                                사고이력은 사고로 자동차의 주요 골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. <br />
                                단. 쿼터패널, 루프패널, 사이드실패널 부위는 절단, 용접시에만 사고로 표기합니다. <br />
                                <Txt type="medium" fontSize={'14px'} color={'#333'} lineHeight={'1.43'} style={{textDecoration: 'underline'}}>
                                  (후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)
                                </Txt>
                              </Txt>
                            }
                          />
                        )}
                      </QuestionMark>
                    </th>
                    <td className={'borderBottom'} colSpan={2}>
                      {accidentCheck || accidentConfirmCheck ? '있음' : '없음'}
                    </td>
                    <th className={'borderBottom'}>
                      <QuestionMark>
                        단순수리
                        <span className={'accident-repair'} onMouseEnter={() => setTooltip1(true)} onMouseLeave={() => setTooltip1(false)}></span>
                        {tooltip1 && (
                          <TooltipDom
                            width={'669px'}
                            left={'-197%'}
                            className={'simple-repair old-version'}
                            message={
                              <Txt type="medium" fontSize={'14px'} color={theme.color.notice} lineHeight={'1.43'}>
                                단순수리는 후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위가 교체 및 판금, 용접수리가 된 경우로 한정합니다.
                              </Txt>
                            }
                          />
                        )}
                      </QuestionMark>
                    </th>
                    <td className={'borderBottom'} colSpan={3} style={{borderBottom: '1px solid #d8d8d8'}}>
                      {simpleRepair ? '있음' : '없음'}
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={3}>
                      부위별 이상여부 <br />
                      (하단참조)
                    </th>
                    <td colSpan={3} style={{height: '50px'}}>
                      외판부위 1랭크:
                      <span style={{display: 'inline-block', paddingLeft: '10px'}}>{exteriorRank1Check ? '있음' : '없음'}</span>
                    </td>
                    <td></td>
                    {PricingSpecialtyDom(outerPanel1RankPricing, onChangeOuterPanel1RankPricing, outerPanel1RankSpecialty, setOuterPanel1RankSpecialty, 1, 1, 1, 1)}
                  </tr>
                  <tr>
                    <td colSpan={3} style={{height: '50px'}}>
                      외판부위 2랭크:
                      <span style={{display: 'inline-block', paddingLeft: '10px'}}> {exteriorRank2Check ? '있음' : '없음'}</span>
                    </td>
                    <td></td>
                    {PricingSpecialtyDom(outerPanel2RankPricing, onChangeOuterPanel2RankPricing, outerPanel2RankSpecialty, setOuterPanel2RankSpecialty, 1, 1, 1, 1)}
                  </tr>
                  <tr>
                    <td colSpan={3} style={{height: '50px'}}>
                      주요 골격:
                      <span style={{display: 'inline-block', paddingLeft: '45px'}}>{mainSkeletonACheck || mainSkeletonBCheck || mainSkeletonCCheck ? '있음' : '없음'}</span>
                    </td>
                    <td>
                      {mainSkeletonACheck ? <SkeletonSpan>A랭크</SkeletonSpan> : ''}
                      {mainSkeletonBCheck ? <SkeletonSpan>B랭크</SkeletonSpan> : ''}
                      {mainSkeletonCCheck ? <SkeletonSpan style={{padding: 0}}>C랭크</SkeletonSpan> : ''}
                    </td>
                    {PricingSpecialtyDom(mainChassisPricing, onChangeMainChassisPricing, mainChassisSpecialty, setMainChassisSpecialty, 1, 1, 1, 1)}
                  </tr>
                </tbody>
              </>
            ) : (
              <>
                <colgroup>
                  <col width={'103'} />
                  <col width={'127'} />
                  <col width={'127'} />
                  <col width={'103'} />
                  <col width={'127'} />
                  <col width={'127'} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      <QuestionMark>
                        사고이력
                        <span className={'accident-repair'} onMouseEnter={() => setTooltip2(true)} onMouseLeave={() => setTooltip2(false)}></span>
                        {tooltip2 && (
                          <TooltipDom
                            width={'580px'}
                            left={'-10%'}
                            className={'left-arrow'}
                            message={
                              <Txt type="medium" fontSize={'14px'} color={theme.color.notice} lineHeight={'1.43'}>
                                사고이력은 사고로 자동차의 주요 골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. <br />
                                단. 쿼터패널, 루프패널, 사이드실패널 부위는 절단, 용접시에만 사고로 표기합니다. <br />
                                <Txt type="medium" fontSize={'14px'} color={'#333'} lineHeight={'1.43'} style={{textDecoration: 'underline'}}>
                                  (후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)
                                </Txt>
                              </Txt>
                            }
                          />
                        )}
                      </QuestionMark>
                    </th>
                    <td className={'borderBottom'} colSpan={2} style={{borderBottom: '1px solid #d8d8d8'}}>
                      {accidentCheck || accidentConfirmCheck ? '있음' : '없음'}
                    </td>
                    <th className={'borderBottom'} style={{borderBottom: '1px solid #d8d8d8'}}>
                      <QuestionMark>
                        단순수리
                        <span className={'accident-repair'} onMouseEnter={() => setTooltip1(true)} onMouseLeave={() => setTooltip1(false)}></span>
                        {tooltip1 && (
                          <TooltipDom
                            width={'669px'}
                            // left={'-84%'}
                            className={'simple-repair'}
                            message={
                              <Txt type="medium" fontSize={'14px'} color={theme.color.notice} lineHeight={'1.43'}>
                                단순수리는 후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위가 교체 및 판금, 용접수리가 된 경우로 한정합니다.
                              </Txt>
                            }
                          />
                        )}
                      </QuestionMark>
                    </th>
                    <td className={'borderBottom'} colSpan={2} style={{borderBottom: '1px solid #d8d8d8'}}>
                      {simpleRepair ? '있음' : '없음'}
                    </td>
                  </tr>
                  <tr className={'accident-exchange-tr'}>
                    <th>
                      가격조사 산정액 <br /> 및 특기사항
                    </th>
                    {PricingSpecialtyDom(
                      accidentRepairHistoryPricing,
                      onChangeAccidentRepairHistoryPricing,
                      accidentRepairHistorySpecialty,
                      setAccidentRepairHistorySpecialty,
                      1,
                      1,
                      2,
                      3
                    )}
                  </tr>
                </tbody>
              </>
            )}
          </TableBox>
        </Wrapper>
        {/* 주요 골격 부위의 판금, 용접수리, 교환 및 부식 end */}
        <VehicleAccidentCheckPopup
          visible={accidentCheckPopup}
          title={'[ 절단, 용접 ] 수리를 한 차량인가요?'}
          onClose={() => {
            roofOuterPanelSetter.setSheetMetal(false);
            quarterLeftOuterPanelSetter.setSheetMetal(false);
            quarterRightOuterPanelSetter.setSheetMetal(false);
            sideSillLeftOuterPanelSetter.setSheetMetal(false);
            sideSillRightOuterPanelSetter.setSheetMetal(false);
            setAccidentCheckPopup(false);
          }}
          onOk={() => setAccidentCheckPopup(false)}
        />
      </Wrapper>
    );
  })
);

export default memo(AccidentExchangeHistory);

const Title = styled(Txt)`
  text-align: left;
  padding-bottom: 10px;
  font-family: ${theme.font.black};
  font-size: 15px;
  color: ${theme.color[3]};
  border-bottom: 2px solid ${theme.color.tableTop};
`;

const ImgBox = styled(Wrapper)`
  width: 412px;
  //flex-direction: ;
  //height: 700px;

  // 선택 i 아이콘
  .active_data {
    i {
      display: none;

      &.checked-i {
      }
    }
    .icon {
      display: block;
    }
    .area {
      span {
        display: block;
      }
    }
  }

  span {
    em.box {
      strong {
        display: block;
        position: relative;
        width: 100%;
        height: auto;
        line-height: 12px;
        padding-bottom: 3px;
        background: none;
        letter-spacing: -1px;
        font-size: 11px;
        text-align: center;
      }
    }
  }
`;

const ImgTitleBox = styled.div`
  background-color: ${theme.color.tableBg};
  border-bottom: 1px solid ${theme.color.tableBorder};
  text-align: center;
  height: 60px;
`;

const OuterPlatingPartImgInner = styled.div`
  position: relative;
  width: 392px;
  height: 331px;
  margin: 0 auto;
  background: url('/images/vehicle-detail/bg-front@3x.png') no-repeat;
  background-size: contain;
`;

const MainSkeletonPartImgInner = styled.div`
  position: relative;
  width: 392px;
  height: 331px;
  margin: 0 auto;
  background: url('/images/vehicle-detail/bg-back-new@3x.png') no-repeat;
  background-size: contain;
`;

const TableBox = styled.table<any>`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  font-family: ${theme.font.medium};
  text-align: center;

  tr {
    border-bottom: 1px solid ${theme.color.tableBorder};
    &.nonBorderBottomTr {
      border-bottom: 0;
    }
    &.borderTopTr {
      border-top: 1px solid ${theme.color.tableBorder};
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
    height: 60px;
    vertical-align: middle;
    line-height: 1.2;

    &:first-of-type {
      border-left: 0;
    }
    &.borderLeftTh {
      border-left: 1px solid ${theme.color.tableBorder};
    }
  }

  td {
    border-left: 1px solid ${theme.color.tableBorder};
    padding: 7px 14px;
    line-height: 16px;
    color: ${theme.color.tableTd};
  }
`;

const QuestionMark = styled.p<any>`
  position: relative;
  span {
    font-family: ${theme.font.bold};
    font-size: 9px;
    color: ${theme.color.notice};
    padding-left: 10px;
    position: relative;
    display: inline-block;
    height: 16px;
    width: 16px;
    margin-left: 5px;
    margin-top: -3px;

    &::before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid ${theme.color.notice};
      background-color: #fef5f5;
      border-radius: 8px;
      position: absolute;
      top: 2px;
      left: 0;
      z-index: 0;
    }

    &::after {
      content: '?';
      font-size: 8px;
      font-family: ${theme.font.bold};
      width: 16px;
      height: 16px;
      display: inline-block;
      color: ${theme.color.notice};
      position: absolute;
      top: 4px;
      left: 6px;
    }

    &.accident-repair {
      &::after {
        top: 6px;
        left: 1px;
      }
    }
  }
`;

const TooltipBox = styled<any>(Wrapper)`
  width: ${({width}) => width || '100%'};
  height: auto;
  padding: 15px;
  border: 1px solid ${theme.color.notice};
  background: #fff;
  display: block;
  position: absolute;
  top: ${({top}) => top || '30px'};
  left: ${({left}) => left || '-30%'};
  z-index: 30;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    top: -9px;
    left: 50.8%;
    transform: translateX(-37.8%);
    border-bottom: 9px solid #fd3636;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
  }
  &::after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    top: -8px;
    left: 50%;
    transform: translateX(-25%);
    border-bottom: 8px solid #fff;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  @media only screen and (min-width: 1200px) {
    left: -160%;
    top: 33px;
  }
  @media only screen and (min-width: 1300px) {
    left: -142%;
  }
  @media only screen and (min-width: 1400px) {
    left: -126%;
  }
  @media only screen and (min-width: 1438px) {
    left: -46%;
  }
  @media only screen and (min-width: 1500px) {
    left: -38%;
  }
  @media only screen and (min-width: 1600px) {
    left: -32%;
  }
  @media only screen and (min-width: 1678px) {
    left: -182%;
    top: 48px;
  }
  @media only screen and (min-width: 1700px) {
    left: -146%;
  }
  @media only screen and (min-width: 1800px) {
    left: -131%;
  }
  @media only screen and (min-width: 1900px) {
    left: -38%;
    top: 30px;
  }
  @media only screen and (min-width: 2100px) {
    left: -32%;
  }
  @media only screen and (min-width: 2300px) {
    left: -22%;
  }

  &.left-arrow {
    &::before {
      left: 121px;
    }
    &::after {
      left: 119px;
    }

    @media only screen and (min-width: 1200px) {
      left: -5%;
    }
    @media only screen and (min-width: 1300px) {
      left: -3%;
    }
    @media only screen and (min-width: 1400px) {
      left: 1%;
    }
    @media only screen and (min-width: 1500px) {
      left: 11%;
    }
    @media only screen and (min-width: 1678px) {
      left: -7%;
    }
    @media only screen and (min-width: 1800px) {
      left: 1%;
    }
    @media only screen and (min-width: 2000px) {
      left: 9%;
    }
    @media only screen and (min-width: 2300px) {
      left: 18%;
    }

    &.old-version {
      @media only screen and (min-width: 1200px) {
        left: -26%;
      }
      @media only screen and (min-width: 1300px) {
        left: -16%;
      }
      @media only screen and (min-width: 1400px) {
        left: -7%;
      }
      @media only screen and (min-width: 1500px) {
        left: 2%;
      }
      @media only screen and (min-width: 1678px) {
        left: -25%;
      }
      @media only screen and (min-width: 1800px) {
        left: -6%;
      }
      @media only screen and (min-width: 2000px) {
        left: 4%;
      }
      @media only screen and (min-width: 2300px) {
        left: 11%;
      }
    }
  }

  &.simple-repair {
    &::before {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      top: -9px;
      left: 334px;
      transform: translateX(-52.8%);
      border-bottom: 9px solid #fd3636;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
    }
    &::after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      top: -8px;
      left: 330px;
      transform: translateX(-25%);
      border-bottom: 8px solid #fff;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
    }
    @media only screen and (min-width: 1200px) {
      left: -132%;
    }
    @media only screen and (min-width: 1300px) {
      left: -110%;
    }
    @media only screen and (min-width: 1400px) {
      left: -96%;
    }
    @media only screen and (min-width: 1500px) {
      left: -93%;
    }
    @media only screen and (min-width: 1600px) {
      left: -83%;
    }
    @media only screen and (min-width: 1678px) {
      left: -141%;
    }
    @media only screen and (min-width: 1700px) {
      left: -138%;
    }
    @media only screen and (min-width: 1800px) {
      left: -108%;
    }
    @media only screen and (min-width: 1900px) {
      left: -93%;
    }
    @media only screen and (min-width: 2000px) {
      left: -80%;
    }
    @media only screen and (min-width: 2100px) {
      left: -80%;
    }
    @media only screen and (min-width: 2200px) {
      left: -68%;
    }
    @media only screen and (min-width: 2300px) {
      left: -62%;
    }
    @media only screen and (min-width: 2500px) {
      left: -53%;
    }
    &.old-version {
      @media only screen and (min-width: 1200px) {
        left: -174%;
      }
      @media only screen and (min-width: 1300px) {
        left: -149%;
      }
      @media only screen and (min-width: 1400px) {
        left: -137%;
      }
      @media only screen and (min-width: 1500px) {
        left: -124%;
      }
      @media only screen and (min-width: 1600px) {
        left: -108%;
      }
      @media only screen and (min-width: 1678px) {
        left: -193%;
      }
      @media only screen and (min-width: 1700px) {
        left: -175%;
      }
      @media only screen and (min-width: 1800px) {
        left: -152%;
      }
      @media only screen and (min-width: 1900px) {
        left: -134%;
      }
      @media only screen and (min-width: 2000px) {
        left: -122%;
      }
      @media only screen and (min-width: 2100px) {
        left: -102%;
      }
      @media only screen and (min-width: 2200px) {
        left: -94%;
      }
      @media only screen and (min-width: 2300px) {
        left: -88%;
      }
      @media only screen and (min-width: 2400px) {
        left: -81%;
      }
      @media only screen and (min-width: 2500px) {
        left: -78%;
      }
    }
  }
`;

const HoodOuterImgSpanStyle = `
  width: 113px;
  height: 75px;
  bottom: 235px;
  left: 139px;

  i {
    &.checked-i {
      &::after {
        top: -4px;
        left: 45px;
      }
    }
    margin-top: 30px;
  }

  .icon {

  }
  .area {
    width: 184px;
    height: 87px;
    
    span {
      width: 112px;
      height: 87px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/1.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 10px;
    left: 32px;
  }
`;

const FrontLeftFenderOuterPanelImgSpanStyle = `
  width: 49px;
  height: 69px;
  bottom: 240px;
  left: 54px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 14px;
      }  
    }
    margin: 35px 0 0 0px;
    text-align: left;
  }

  .area {
    width: 49px;
    height: 77px;

    span {
      width: 26px;
      height: 77px;
      margin-left: 11px;
      bottom: -4px;
      background: url('/images/vehicle-detail/accident-exchange-history/2.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 20px;
  }
`;

const FrontRightFenderOuterPanelImgSpanStyle = `
  width: 49px;
  height: 77px;
  bottom: 235px;
  right: 56px;


  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 14px;
      }  
    }
    margin: 35px 0 0 0px;
    text-align: left;
  }

  .area {
    width: 49px;
    height: 77px;

    span {
      width: 26px;
      height: 77px;
      margin-left: 11px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/3.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 20px;
  }
`;

const FrontLeftDoorOuterPanelStyle = `
  width: 53px;
  height: 76px;
  bottom: 158px;
  left: 40px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 16px;
      }  
    }
    margin: 25px 0 0 10px;
    // text-align: left;
  }

  .area {
    width: 53px;
    height: 78px;

    span {
      width: 54px;
      height: 83px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/4.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 18px;
  }
`;

const FrontRightDoorOuterPanelStyle = `
  width: 53px;
  height: 76px;
  bottom: 158px;
  right: 43px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 16px;
      }  
    }
    margin: 25px 16px 0 0;
    // text-align: left;
  }

  .area {
    width: 53px;
    height: 76px;

    span {
      width: 54px;
      height: 83px;
      bottom: 0;
      margin-right: 4px;
      background: url('/images/vehicle-detail/accident-exchange-history/5.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 20px;
  }

`;

const RearLeftDoorOuterPanelImgSpanStyle = `

  width: 54px;
  height: 78px;
  bottom: 80px;
  left: 41px;
  // z-index: 8;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 16px;
      }  
    }
    margin: 20px 0 0 10px;
    text-align: left;
  }

  .area {
    width: 54px;
    height: 78px;

    span {
      width: 54px;
      height: 80px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/6.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 10px;
  }
`;

const RearRightDoorOuterPanelImgSpanStyle = `
  width: 54px;
  height: 78px;
  bottom: 80px;
  right: 44px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 16px;
      }  
    }
    margin: 20px 16px 0 0;
    text-align: left;
  }

  .area {
    width: 54px;
    height: 78px;

    span {
      width: 54px;
      height: 80px;
      // margin-left: 11px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/7.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 10px;
  }
`;

const TrunkLidOuterPanelImgSpanStyle = `
  width: 98px;
  height: 38px;
  bottom: 5px;
  left: 146px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 38px;
      }  
    }
    margin: 12px 0 0 0px;
    text-align: left;
  }

  .area {
    width: 98px;
    height: 38px;

    span {
      width: 98px;
      height: 40px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/8.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 20px;
  }
`;

const RadiatorOuterPanelImgSpanStyle = `
  width: 134px;
  height: 25px;
  top: -15px;
  left: 131px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 56px;
      }  
    }
    margin: 0 0 0 0px;
    text-align: left;
  }

  .area {
    width: 134px;
    height: 35px;

    span {
      width: 124px;
      height: 34px;
      left: 4px;
      bottom: -23px;
      background: url('/images/vehicle-detail/accident-exchange-history/9.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 10px;
  }
`;

const RoofOuterPanelImgSpanStyle = `
  width: 83px;
  height: 101px;
  bottom: 84px;
  left: 154px;


  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 31px;
      }  
    }
    margin: 58px 0 0 0px;
    text-align: left;
  }

  .area {
    width: 83px;
    height: 101px;

    span {
      width: 83px;
      height: 101px;
      bottom: 2px;
      background: url('/images/vehicle-detail/accident-exchange-history/10.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 40px;
  }
`;

const QuarterLeftOuterPanelImgSpanStyle = `
  width: 73px;
  height: 64px;
  bottom: 20px;
  left: 35px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 25px;
      }  
    }
    margin: 15px 0 0 11px;
    text-align: left;
  }

  .area {
    width: 51px;
    height: 47px;

    span {
      width: 52px;
      height: 98px;
      left: 10px;
      bottom: -2px;
      background: url('/images/vehicle-detail/accident-exchange-history/11.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 20px;
  }
`;

const QuarterRightOuterPanelImgSpanStyle = `
  width: 73px;
  height: 64px;
  bottom: 20px;
  right: 35px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 25px;
      }  
    }
    left: -11px;
    margin: 15px 12px 0 0;
    text-align: left;
  }

  .area {
    width: 51px;
    height: 47px;

    span {
      width: 52px;
      height: 98px;
      right: 10px;
      bottom: -2px;
      background: url('/images/vehicle-detail/accident-exchange-history/12.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 20px;
  }
`;

const SideSillLeftOuterPanelImgSpanStyle = `
  width: 10px;
  height: 139px;
  bottom: 103px;
  left: 35px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 78px 0 0 -8px;
    text-align: left;
  }

  .area {
    width: 10px;
    height: 139px;

    span {
      width: 10px;
      height: 139px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/13.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 35px;
  }
`;

const SideSillRightOuterPanelImgSpanStyle = `  
  width: 10px;
  height: 139px;
  bottom: 103px;
  right: 35px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 78px 0 0 0px;
    text-align: left;
  }

  .area {
    width: 10px;
    height: 139px;

    span {
      width: 10px;
      height: 139px;
      bottom: 0;
      background: url('/images/vehicle-detail/accident-exchange-history/14.png') no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 35px;
}
`;

// 1. 프론트 패널
const FrontPanelChassisImgSpanStyle = `
  width: 102px;
  height: 16px;
  top: 20px;
  left: 143px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 40px;
      }  
    }
    margin: 3px 0 0 0;
    text-align: left;
  }

  .area {
    width: 106px;
    height: 16px;

    span {
      width: 106px;
      height: 16px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-1.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 2. 크로스 멤버
const CrossMemberChassisImgSpanStyle = `
  width: 114px;
  height: 11px;
  bottom: 215px;
  left: 140px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 46px;
      }  
    }
    margin: 0;
    text-align: left;
  }

  .area {
    width: 114px;
    height: 11px;

    span {
      width: 114px;
      height: 11px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-2.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 3. 인사이드패널 (좌)
const InsideLeftPanelChassisImgSpanStyle = `
  width: 16px;
  height: 36px;
  bottom: 253px;
  left: 144px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 12px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 36px;

    span {
      width: 16px;
      height: 36px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-3.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 4. 인사이드패널 (우)
const InsideRightPanelChassisImgSpanStyle = `
  width: 16px;
  height: 36px;
  bottom: 253px;
  right: 144px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 12px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 36px;

    span {
      width: 16px;
      height: 36px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-3.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 5. 리어 패널
const RearPanelChassisImgSpanStyle = `
  width: 106px;
  height: 8px;
  bottom: 18px;
  left: 142px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 42px;
      }  
    }
    margin-top: -2px;
    text-align: left;
  }

  .area {
    width: 109px;
    height: 8px;

    span {
      width: 109px;
      height: 8px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-5.png) no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 10px;
  }
`;

// 6. 트렁크 플로어
const TrunkFloorChassisImgSpanStyle = `
  width: 33px;
  height: 28px;
  bottom: 30px;
  left: 180px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 6px;
      }  
    }
    margin: 7px 0 0 0;
    text-align: left;
  }

  .area {
    width: 33px;
    height: 32px;

    span {
      width: 33px;
      height: 32px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-6.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 7. 프론트 사이드 멤버 (좌)
const FrontLeftSideMemberChassisImgSpanStyle = `
  width: 15px;
  height: 57px;
  bottom: 232px;
  left: 165px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -4px;
      }  
    }
    margin: 20px 0 0 0;
    text-align: left;
  }

  .area {
    width: 15px;
    height: 57px;

    span {
      width: 15px;
      height: 58px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-7.png) no-repeat;
    }
  }
  .box {
    margin-top: 15px;
    z-index: 100;
  }
`;

// 8. 프론트 사이드 멤버 (우)
const FrontRightSideMemberChassisImgSpanStyle = `
  width: 15px;
  height: 57px;
  bottom: 232px;
  right: 165px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -4px;
      }  
    }
    margin: 20px 0 0 0;
    text-align: left;
  }

  .area {
    width: 15px;
    height: 57px;

    span {
      width: 15px;
      height: 58px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-7.png) no-repeat;
    }
  }
  .box {
    margin-top: 15px;
    z-index: 100;
  }
`;

// 9. 리어 사이드 멤버 (좌)
const RearLeftSideMemberChassisImgSpanStyle = `
  width: 16px;
  height: 32px;
  bottom: 30px;
  left: 160px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px
      }  
    }
    margin: 10px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 32px;

    span {
      width: 16px;
      height: 32px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-9.png) no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 10px;
  }
`;

// 10. 리어 사이드 멤버 (우 )
const RearRightSideMemberChassisImgSpanStyle = `
  width: 16px;
  height: 32px;
  bottom: 30px;
  right: 160px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 10px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 32px;

    span {
      width: 16px;
      height: 32px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-9.png) no-repeat;
    }
  }
  .box {
    z-index: 100;
    margin-top: 10px;
  }
`;

// 11. 프론트 휠하우스(좌)
const FrontLeftWheelHouseChassisImgSpanStyle = `
  width: 16px;
  height: 17px;
  bottom: 232px;
  left: 143px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 1px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 17px;

    span {
      width: 16px;
      height: 17px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-11.png) no-repeat;
    }
  }
  .box {
    margin-top: 15px;
    z-index: 100;
  }
`;

// 12. 프론트 휠하우스(우)
const FrontRightWheelHouseChassisImgSpanStyle = `
  width: 16px;
  height: 17px;
  bottom: 232px;
  right: 143px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 1px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 17px;

    span {
      width: 16px;
      height: 17px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-11.png) no-repeat;
    }
  }
  .box {
    margin-top: 15px;
    z-index: 100;
  }
`;

// 13. 리어 휠하우스(좌)
const RearLeftWheelHouseChassisImgSpanStyle = `
  width: 16px;
  height: 17px;
  bottom: 45px;
  left: 139px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 3px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 17px;

    span {
      width: 16px;
      height: 17px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-13.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 14. 리어 휠하우스(우)
const RearRightWheelHouseChassisImgSpanStyle = `
  width: 16px;
  height: 17px;
  bottom: 45px;
  right: 139px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: -3px;
      }  
    }
    margin: 3px 0 0 0;
    text-align: left;
  }

  .area {
    width: 16px;
    height: 17px;

    span {
      width: 16px;
      height: 17px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-13.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 15. 필러 패널A(좌)
const PillarLeftPanelAChassisImgSpanStyle = `
  width: 37px;
  height: 64px;
  bottom: 168px;
  left: 94px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 8px;
      }  
    }
    margin: 13px 0 0 0;
    text-align: left;
  }

  .area {
    width: 37px;
    height: 64px;

    span {
      width: 37px;
      height: 100px;
      bottom: -29px;
      background: url(/images/vehicle-detail/accident-exchange-history/back-15.png) no-repeat;
    }
  }
  .box {
    martin-top: 20px;
    z-index: 100;
  }
`;

// 16. 필러 패널A(우)
const PillarRightPanelAChassisImgSpanStyle = `
  width: 37px;
  height: 64px;
  bottom: 168px;
  right: 94px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 8px;
      }  
    }
    margin: 13px 0 0 0;
    text-align: left;
  }

  .area {
    width: 37px;
    height: 81px; 

    span {
      width: 37px;
      height: 100px;
      bottom: -29px;
      background: url(/images/vehicle-detail/accident-exchange-history/back-16.png) no-repeat;
    }
  }
  .box {
    martin-top: 20px;
    z-index: 100;
  }
`;

// 17. 필러 패널B(좌)
const PillarLeftPanelBChassisImgSpanStyle = `
  width: 28px;
  height: 16px;
  bottom: 141px;
  left: 96px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 3px;
      }  
    }
    margin: 0 0 0 0;
    text-align: left;
  }

  .area {
    width: 28px;
    height: 16px;

    span {
      width: 28px;
      height: 16px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-17.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 18. 필러 패널B(우)
const PillarRightPanelBChassisImgSpanStyle = `
  width: 28px;
  height: 16px;
  bottom: 141px;
  right: 96px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 3px;
      }  
    }
    margin: 0 0 0 0;
    text-align: left;
  }

  .area {
    width: 28px;
    height: 16px;

    span {
      width: 28px;
      height: 16px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-18.png) no-repeat;
    }
  }
  .box {
    margin-top: 10px;
    z-index: 100;
  }
`;

// 19. 필러 패널C (좌)
const PillarLeftPanelCChassisImgSpanStyle = `
  width: 33px;
  height: 69px;
  bottom: 73px;
  left: 96px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 5px;
      }  
    }
    margin: 52px 0 0 0;
    text-align: left;
  }

  .area {
    width: 33px;
    height: 69px;

    span {
      width: 33px;
      height: 71px;
      bottom: -2px;
      background: url(/images/vehicle-detail/accident-exchange-history/back-19.png) no-repeat;
    }
  }
  .box {
    margin-top: 35px;
    z-index: 100;
  }
`;

// 20. 필러 패널C (우)
const PillarRightPanelCChassisImgSpanStyle = `
  width: 33px;
  height: 69px;
  bottom: 73px;
  right: 96px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 5px;
      }  
    }
    margin: 52px 0 0 0;
    text-align: left;
  }

  .area {
    width: 33px;
    height: 69px;

    span {
      width: 33px;
      height: 71px;
      bottom: -2px;
      background: url(/images/vehicle-detail/accident-exchange-history/back-20.png) no-repeat;
    }
  }
  .box {
    margin-top: 35px;
    z-index: 100;
  }
`;

// 21. 패키지 트레이
const PackageTrayChassisImgSpanStyle = `
  width: 114px;
  height: 17px;
  bottom: 82px;
  left: 139px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 45px;
      }  
    }
    margin: 2px 0 0 0;
    text-align: left;
  }

  .area {
    width: 114px;
    height: 17px;

    span {
      width: 114px;
      height: 17px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-21.png) no-repeat;
    }
  }
  .box {
    margin-top: 20px;
    z-index: 100;
  }
`;

// 22. 대쉬 패널
const DashPanelChassisImgSpanStyle = ` 
  width: 114px;
  height: 11px;
  bottom: 199px;
  left: 140px;

  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 46px;
      }  
    }
    margin: 0;
    text-align: left;
  }

  .area {
    width: 114px;
    height: 11px;

    span {
      width: 114px;
      height: 11px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-22.png) no-repeat;
    }
  }
  .box {
    margin-top: 15px;
    z-index: 100;
  }
`;

// 23. 플로어 패널
const FloorPanelChassisImgSpanStyle = `
  width: 97px;
  height: 88px;
  bottom: 104px;
  left: 148px;
  
  i {

    &.checked-i {
      &::after {
        top: -4px;
        left: 38px;
      }  
    }
    margin: 36px 0 0 0;
    text-align: left;
  };

  .area {
    width: 97px;
    height: 88px;

    span {
      width: 97px;
      height: 88px;
      bottom: 0;
      background: url(/images/vehicle-detail/accident-exchange-history/back-23.png) no-repeat;
    }
  }
  .box {
    margin-top: 20px;
    z-index: 100;
  }
`;

const WonTd = styled.td<any>`
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
  }
`;

const TextInline = styled(Txt)<any>`
  display: inline-block;
  line-height: 19px;
  ${({float}) => `float: ${float}` || ''};
  font-family: ${theme.font.medium};
`;

const SkeletonSpan = styled.span<any>`
  display: inline-block;
  padding-right: 20%;
`;
