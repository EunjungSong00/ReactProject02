import React, {memo, useCallback, useState, useEffect} from 'react';
import {Wrapper, Select, Input, Txt} from '@components/atoms';
import CheckboxRed from '@components/atoms/CheckboxRed';
import {getCommas} from '@modules/replaceStrings';
import {
  GoodBadType,
  InspectionColorType,
  InspectionMileageType,
  InspectionRecallStatusType,
  InspectionRecallType,
  NoYesType,
  vehicleIdentityNumberStatusArr
} from '@pages/vehicle-management/registration/detail-vehicle/vehicle-inspection-record';
import theme from '@public/theme';
import styled from '@emotion/styled';
import useInput from '@hooks/useInput';
import {inject, observer} from 'mobx-react';

type OverallStateOfVehicleStoreType = {
  vehicleInspectionRecordStore?: any,
  response: any,
  pricingCheck: boolean,
  inspectionRecordVersion: boolean
}

const OverallStateOfVehicle = inject('vehicleInspectionRecordStore')(
  observer(({vehicleInspectionRecordStore: store, response, pricingCheck, inspectionRecordVersion}: OverallStateOfVehicleStoreType) => {
    /* 종합상태 */
    const [odometerStatus, setOdometerStatus] = useState<GoodBadType>(response?.odometerStatus || undefined); // 주행거리 계기상태
    const [mileagePricing, onChangeMileagePricing] = useInput(response?.mileagePricing || '', 'number'); // 주행거리 계기상태 - 가격조사 산정액
    const [mileageSpecialty, setMileageSpecialty] = useState(response?.mileageSpecialty || ''); // 주행거리 계기상태 - 특이사항
    const [mileageStatus, setMileageStatus] = useState(response?.mileageStatus || undefined); // 주행거리 상태
    const [mileage, onChangeMileage] = useInput(response?.mileage || '', 'number'); // 주행거리 km
    const [mileageStatusPricing, onChangeMileageStatusPricing] = useInput(response?.mileageStatusPricing || '', 'number'); // 주행거리 상태 - 가격조사 산정액
    const [mileageStatusSpecialty, setMileageStatusSpecialty] = useState(response?.mileageStatusSpecialty || ''); // 주행거리 상태 - 특이사항
    const [vehicleIdentityNumberStatus, setVehicleIdentityNumberStatus] = useState(response?.vehicleIdentityNumberStatus || undefined); // 차대번호 표기
    const vehicleIdentityNumberStatusPricingCheck = response?.vehicleIdentityNumberStatusPricing;
    const [vehicleIdentityNumberStatusPricing, onChangeVehicleIdentityNumberStatusPricing] = useInput(vehicleIdentityNumberStatusPricingCheck || '', 'number'); // 차대번호 표기 - 가격조사 산정액
    const [vehicleIdentityNumberStatusSpecialty, setVehicleIdentityNumberStatusSpecialty] = useState(response?.vehicleIdentityNumberStatusSpecialty || ''); // 차대번호 표기 - 특이사항
    const [coEmission, setCoEmission] = useState(!!response?.coEmissionPercentage); // 일산화탄소 체크박스
    const [ppmEmission, setPpmEmission] = useState(!!response?.hcEmissionPPM); // 탄화수소 체크박스
    const [smokeEmission, setSmokeEmission] = useState(!!response?.smokeEmissionPercentage); // 매연 체크박스
    const [coEmissionPercentage, onChangeCoEmissionPercentage] = useInput(response?.coEmissionPercentage || '', 'number'); // 일산화탄소배출가스
    const [hcEmissionPPM, onChangeHcEmissionPPM] = useInput(response?.hcEmissionPPM || '', 'number'); // 탄화수소
    const [smokeEmissionPercentage, onChangeSmokeEmissionPercentage] = useInput(response?.smokeEmissionPercentage || '', 'number'); // 매연배출가스
    const [emissionPricing, onChangeEmissionPricing] = useInput(response?.emissionPricing || '', 'number'); // 배출가스 - 가격조사 산정액
    const [emissionSpecialty, setEmissionSpecialty] = useState(response?.emissionSpecialty || ''); // 배출가스 - 특이사항
    const [tuning, setTuning] = useState(response?.tuning || undefined); // 튜닝 체크박스
    const [tuningDisabled, setTuningDisabled] = useState(response?.tuning ? response?.tuning === NoYesType[0] : true); // 튜닝 Disabled
    const [tuningLegal, setTuningLegal] = useState(!!response?.tuningLegal); // 튜닝 - 적법
    const [tuningDevice, setTuningDevice] = useState(!!response?.tuningDevice); // 튜닝 - 불법
    const [tuningIllegal, setTuningIllegal] = useState(!!response?.tuningIllegal); // 튜닝 - 구조
    const [tuningStructure, setTuningStructure] = useState(!!response?.tuningStructure); // 튜닝 - 장치
    const [tuningPricing, onChangeTuningPricing] = useInput(response?.tuningPricing || '', 'number'); // 튜닝 - 가격조사 산정액
    const [tuningSpecialty, setTuningSpecialty] = useState(response?.tuningSpecialty || ''); // 튜닝 - 특이사항
    const [specialHistory, setSpecialHistory] = useState(response?.specialHistory || undefined); // 특별이력 체크박스
    const [specialHistoryDisabled, setSpecialHistoryDisabled] = useState(response?.specialHistory ? response?.specialHistory === NoYesType[0] : true); // 특별이력 Disabled
    const [specialHistoryFlood, setSpecialHistoryFlood] = useState(!!response?.specialHistoryFlood); // 특별이력 - 침수
    const [specialHistoryFire, setSpecialHistoryFire] = useState(!!response?.specialHistoryFire); // 특별이력 - 화재
    const [specialHistoryPricing, onChangeSpecialHistoryPricing] = useInput(response?.specialHistoryPricing || '', 'number'); // 특별이력 - 가격조사 산정액
    const [specialHistorySpecialty, setSpecialHistorySpecialty] = useState(response?.specialHistorySpecialty || ''); // 특별이력 - 특이사항
    const [usageChange, setUsageChange] = useState(response?.usageChange || undefined); // 용도변경 체크박스
    const [usageChangeDisabled, setUsageChangeDisabled] = useState(response?.usageChange ? response?.usageChange === NoYesType[0] : true); // 용도변경 Disabled
    const [usageChangeRent, setUsageChangeRent] = useState(!!response?.usageChangeRent); // 용도변경 - 렌트
    const [usageChangeLease, setUsageChangeLease] = useState(!!response?.usageChangeLease); // 용도변경 - 리스
    const [usageChangeBusiness, setUsageChangeBusiness] = useState(!!response?.usageChangeBusiness); // 용도변경 - 영업용
    const [usageChangePricing, onChangeUsageChangePricing] = useInput(response?.usageChangePricing || '', 'number'); // 용도변경 - 가격조사 산정액
    const [usageChangeSpecialty, setUsageChangeSpecialty] = useState(response?.usageChangeSpecialty || ''); // 용도변경 - 특이사항
    const [color, setColor] = useState<InspectionColorType>(response?.color || undefined); // 색상 체크박스
    const [colorDisabled, setColorDisabled] = useState(response?.color ? response?.color === undefined : true); // 색상 Disabled
    const [fullPainting, setFullPainting] = useState(!!response?.fullPainting); // 색상 - 전체도색
    const [colorChange, setColorChange] = useState(!!response?.colorChange); // 색상 - 색상변경
    const [colorPricing, onChangeColorPricing] = useInput(response?.colorPricing || '', 'number'); // 색상 - 가격조사 산정액
    const [colorSpecialty, setColorSpecialty] = useState(response?.colorSpecialty || ''); // 색상 - 특이사항
    const [feature, setFeature] = useState(response?.feature || undefined); // 주요옵션 체크박스
    const [featureDisabled, setFeatureDisabled] = useState(response?.feature ? response?.feature === NoYesType[0] : true); // 주요옵션 Disabled
    const [featureETC, setFeatureETC] = useState(!!response?.featureETC); // 주요옵션 - 기타
    const [featureSunroof, setFeatureSunroof] = useState(!!response?.featureSunroof); // 주요옵션 - 선루프
    const [featureNavigation, setFeatureNavigation] = useState(!!response?.featureNavigation); // 주요옵션 - 네비게이션
    const [featurePricing, onChangeFeaturePricing] = useInput(response?.featurePricing || '', 'number'); // 주요옵션 - 가격조션사 산정액
    const [featureSpecialty, setFeatureSpecialty] = useState(response?.featureSpecialty || ''); // 주요옵션 - 특이사항
    const [recall, setRecall] = useState(response?.recall || undefined); // 리콜 체크박스
    const [recallDisabled, setRecallDisabled] = useState(response?.recall ? response?.recall === InspectionRecallType[0] : InspectionRecallType[1]); // 리콜 disabled
    const [recallStatus, setRecallStatus] = useState(response?.recallStatus || undefined); // 리콜 이행/미이행

    // 주행거리 계기상태
    const onChangeOdometerStatus = useCallback((e: any) => {
      setOdometerStatus(e.target.value);
    }, []);

    // 주행거리 상태
    const onChangeMileageStatus = useCallback((e: any) => {
      setMileageStatus(e.target.value);
    }, []);

    const onChangeVehicleIdentityNumberStatus = useCallback((e: any) => {
      setVehicleIdentityNumberStatus(e.target.value);
    }, []);

    /* 배출가스 */
    const onChangeEmission = useCallback(
      (type: string) => {
        if (type === 'co') {
          setCoEmission(!coEmission);
        }
        if (type === 'ppm') {
          setPpmEmission(!ppmEmission);
        } else if (type === 'smoke') {
          setSmokeEmission(!smokeEmission);
        }
      },
      [coEmission, ppmEmission, smokeEmission]
    );

    // 튜닝
    const onChangeTuning = useCallback((e: any) => {
      const {value} = e.target;
      setTuning(value);
      if (value === NoYesType[1]) {
        setTuningDisabled(false);
      } else {
        setTuningLegal(false);
        setTuningDevice(false);
        setTuningIllegal(false);
        setTuningStructure(false);
        setTuningDisabled(true);
      }
    }, []);

    const onChangeTuningLegal = useCallback(() => {
      !tuningLegal ? setTuningDevice(false) : null;
      setTuningLegal(!tuningLegal);
    }, [tuningLegal]);

    const onChangeTuningDevice = useCallback(() => {
      !tuningDevice ? setTuningLegal(false) : null;
      setTuningDevice(!tuningDevice);
    }, [tuningDevice]);

    const onChangeTuningIllegal = useCallback(() => {
      !tuningIllegal ? setTuningStructure(false) : null;
      setTuningIllegal(!tuningIllegal);
    }, [tuningIllegal]);

    const onChangeTuningStructure = useCallback(() => {
      !tuningStructure ? setTuningIllegal(false) : null;
      setTuningStructure(!tuningStructure);
    }, [tuningStructure]);

    // 특별이력
    const onChangeSpecialHistory = useCallback((e: any) => {
      const {value} = e.target;
      setSpecialHistory(value);
      if (value === NoYesType[0]) {
        setSpecialHistoryFlood(false);
        setSpecialHistoryFire(false);
        setSpecialHistoryDisabled(true);
      } else {
        setSpecialHistoryDisabled(false);
      }
    }, []);

    const onChangeSpecialHistoryFlood = useCallback(() => {
      setSpecialHistoryFlood(!specialHistoryFlood);
    }, [specialHistoryFlood]);

    const onChangeSpecialHistoryFire = useCallback(() => {
      setSpecialHistoryFire(!specialHistoryFire);
    }, [specialHistoryFire]);

    // 용도변경
    const onChangeUsageChange = useCallback((e: any) => {
      const {value} = e.target;
      setUsageChange(value);
      if (value === NoYesType[1]) {
        setUsageChangeDisabled(false);
      } else {
        setUsageChangeRent(false);
        setUsageChangeBusiness(false);
        setUsageChangeLease(false);
        setUsageChangeDisabled(true);
      }
    }, []);

    const onChangeUsageChangeRent = useCallback(() => {
      setUsageChangeRent(!usageChangeRent);
    }, [usageChangeRent]);

    const onChangeUsageChangeLease = useCallback(() => {
      setUsageChangeLease(!usageChangeLease);
    }, [usageChangeLease]);

    const onChangeUsageChangeBusiness = useCallback(() => {
      setUsageChangeBusiness(!usageChangeBusiness);
    }, [usageChangeBusiness]);

    // 색상
    const onChangeColor = useCallback((e: any) => {
      const {value} = e.target;
      setColor(value);
      if (value !== undefined) {
        setColorDisabled(false);
      } else {
        setColorDisabled(true);
      }
    }, [color, colorDisabled]);

    const onChangeFullPainting = useCallback(() => {
      setFullPainting(!fullPainting);
    }, [fullPainting]);

    const onChangeColorChange = useCallback(() => {
      setColorChange(!colorChange);
    }, [colorChange]);

    // 주요 옵션
    const onChangeFeature = useCallback((e: any) => {
      const {value} = e.target;
      setFeature(value);
      if (value === NoYesType[0]) {
        setFeatureETC(false);
        setFeatureSunroof(false);
        setFeatureNavigation(false);
        setFeatureDisabled(true);
      } else {
        setFeatureDisabled(false);
      }
    }, []);

    const onChangeFeatureETC = useCallback(() => {
      setFeatureETC(!featureETC);
    }, [featureETC]);

    const onChangeFeatureSunroof = useCallback(() => {
      setFeatureSunroof(!featureSunroof);
    }, [featureSunroof]);

    const onChangeFeatureNavigation = useCallback(() => {
      setFeatureNavigation(!featureNavigation);
    }, [featureNavigation]);

    // 리콜 대상
    const onChangeRecall = useCallback((e: any) => {
      const {value} = e.target;
      setRecall(value);
      if (value === InspectionRecallType[0]) {
        setRecallStatus(undefined);
        setRecallDisabled(true);
      } else {
        setRecallDisabled(false);
      }
    }, []);

    const onChangeRecallStatus = useCallback((e: any) => {
      const {value} = e.target;
      setRecallStatus(value);
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
          <WonTd rowSpan={rowSpan} colSpan={colSpan} disabledBorderTop={disabledBorderTop || !pricingCheck}
                 disabledOpacity={!pricingCheck}>
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

    // setOverallQuery
    store.setOverallQuery(JSON.stringify({
      odometerStatus, // 주행거리 계기상태
      mileageStatus, // 주행거리 상태
      mileage, // 주행거리 km
      vehicleIdentityNumberStatus, // 차대번호 표기
      coEmissionPercentage, // 일산화탄소배출가스
      hcEmissionPPM, // 탄화수소
      smokeEmissionPercentage, // 매연배출가스
      tuning, // 튜닝 체크박스
      tuningLegal, // 튜닝 - 적법
      tuningDevice, // 튜닝 - 불법
      tuningIllegal, // 튜닝 - 구조
      tuningStructure, // 튜닝 - 장치
      specialHistory, // 특별이력 체크박스
      specialHistoryFlood, // 특별이력 - 침수
      specialHistoryFire, // 특별이력 - 화재
      usageChange, // 용도변경 체크박스
      usageChangeRent, // 용도변경 - 렌트
      usageChangeLease, // 용도변경 - 리스
      usageChangeBusiness, // 용도변경 - 영업용
      color, // 색상 체크박스
      fullPainting, // 색상 - 전체도색
      colorChange, // 색상 - 색상변경
      feature, // 주요옵션 체크박스
      featureETC, // 주요옵션 - 기타
      featureSunroof, // 주요옵션 - 선루프
      featureNavigation, // 주요옵션 - 네비게이션
      recall, // 리콜 체크박스
      recallStatus // 리콜 이행/미이행
    }));

    // setOverallPricing
    store.setOverallPricing(JSON.stringify({
      mileagePricing, // 주행거리 계기상태 - 가격조사 산정액
      mileageStatusPricing, // 주행거리 상태 - 가격조사 산정액
      vehicleIdentityNumberStatusPricing, // 차대번호 표기 - 가격조사 산정액
      emissionPricing, // 배출가스 - 가격조사 산정액
      tuningPricing, // 튜닝 - 가격조사 산정액
      specialHistoryPricing, // 특별이력 - 가격조사 산정액
      usageChangePricing, // 용도변경 - 가격조사 산정액
      colorPricing, // 색상 - 가격조사 산정액
      featurePricing // 주요옵션 - 가격조션사 산정액
    }));

    // setOverallSpecialty
    store.setOverallSpecialty(JSON.stringify({
      mileageSpecialty, // 주행거리 계기상태 - 특이사항
      mileageStatusSpecialty, // 주행거리 상태 - 특이사항
      vehicleIdentityNumberStatusSpecialty, // 차대번호 표기 - 특이사항
      emissionSpecialty, // 배출가스 - 특이사항
      tuningSpecialty, // 튜닝 - 특이사항
      specialHistorySpecialty, // 특별이력 - 특이사항
      usageChangeSpecialty, // 용도변경 - 특이사항
      colorSpecialty, // 색상 - 특이사항
      featureSpecialty // 주요옵션 - 특이사항
    }));

    return (
      <Wrapper mt={'30px'}>
        <TableBox>
          <TableCaption>자동차 종합상태</TableCaption>
          <colgroup>
            <col width={'103'} />
            <col width={'254'} />
            <col width={'353'} />
            <col width={'86'} />
            <col width={'89'} />
          </colgroup>
          <thead>
          <tr>
            <th>사용이력</th>
            <th>상태</th>
            <th>항목 / 해당부품</th>
            <BorderBtTh>
              가격조사
              <br />
              산정액
            </BorderBtTh>
            <BorderBtTh>특기사항</BorderBtTh>
          </tr>
          </thead>
          <tbody>
          <tr key={'odometerStatus'}>
            <th>
              주행거리
              <br />
              계기상태
            </th>
            <td>
              <InputRadioDom
                type={GoodBadType}
                name={'odometerStatus'}
                value={odometerStatus}
                onClick={onChangeOdometerStatus}
                text={['양호', '불량']} />
            </td>
            <td></td>
            {PricingSpecialtyDom(mileagePricing, onChangeMileagePricing, mileageSpecialty, setMileageSpecialty)}
          </tr>
          <tr key={'mileageStatus'}>
            <th>주행거리</th>
            <td>
              <InputRadioDom
                type={InspectionMileageType}
                name={'mileageStatus'}
                value={mileageStatus}
                onClick={onChangeMileageStatus}
                text={['많음', '보통', '적음']}
                disabled={!pricingCheck}
              />
            </td>
            <td>
              <TdLabel>주행거리</TdLabel>
              <InputInline value={getCommas(mileage)} onChange={onChangeMileage} disabled={!pricingCheck} />
              <TdText>km</TdText>
            </td>
            {PricingSpecialtyDom(mileageStatusPricing, onChangeMileageStatusPricing, mileageStatusSpecialty, setMileageStatusSpecialty)}
          </tr>
          <tr key={'vehicleIdentityNumberStatus'}>
            <th>차대번호 표기</th>
            <td>
              <Select
                value={vehicleIdentityNumberStatus}
                onChange={onChangeVehicleIdentityNumberStatus}
                options={vehicleIdentityNumberStatusArr}
                placeholder={'선택'}
                height={'28px'}
              />
            </td>
            <td></td>
            {PricingSpecialtyDom(
              vehicleIdentityNumberStatusPricing,
              onChangeVehicleIdentityNumberStatusPricing,
              vehicleIdentityNumberStatusSpecialty,
              setVehicleIdentityNumberStatusSpecialty
            )}
          </tr>
          <tr key={'emission'}>
            <th>배출가스</th>
            <td>
              {inspectionRecordVersion ? (
                <></>
              ) : (
                <Emission>
                  <CheckboxRed labelText='일산화탄소' name='coEmission' isChk={coEmission}
                               onChange={() => onChangeEmission('co')} />
                  <CheckboxRed labelText='탄화수소' name='ppmEmission' isChk={ppmEmission}
                               onChange={() => onChangeEmission('ppm')} />
                </Emission>
              )}
              <CheckboxRed labelText='매연' name='smokeEmission' isChk={smokeEmission}
                           onChange={() => onChangeEmission('smoke')} />
            </td>
            <td>
              {inspectionRecordVersion ? (
                <></>
              ) : (
                <>
                  <div style={{paddingBottom: '5px'}}>
                    <TdLabel>일산화탄소(CO)</TdLabel>
                    <InputInline value={getCommas(coEmissionPercentage)} onChange={onChangeCoEmissionPercentage}
                                 disabled={!coEmission} background />
                    <TdText>%</TdText>
                  </div>
                  <div style={{paddingBottom: '5px'}}>
                    <TdLabel>탄화수소(HC)</TdLabel>
                    <InputInline value={getCommas(hcEmissionPPM)} onChange={onChangeHcEmissionPPM}
                                 disabled={!ppmEmission} background />
                    <TdText>ppm</TdText>
                  </div>
                </>
              )}
              <div>
                <TdLabel>매연</TdLabel>
                <InputInline value={getCommas(smokeEmissionPercentage)} onChange={onChangeSmokeEmissionPercentage}
                             disabled={!smokeEmission} background />
                <TdText>%</TdText>
              </div>
            </td>
            {PricingSpecialtyDom(emissionPricing, onChangeEmissionPricing, emissionSpecialty, setEmissionSpecialty)}
          </tr>
          <tr key={'tuning'}>
            <th rowSpan={2}>튜닝</th>
            <td rowSpan={2}>
              <InputRadioDom type={NoYesType} name={'tuning'} value={tuning} onClick={onChangeTuning}
                             text={['없음', '있음']} />
            </td>
            <td>
              <TdCheckbox>
                <CheckboxRed labelText='적법' name='tuningLegal' isChk={tuningLegal} onChange={onChangeTuningLegal}
                             disabled={tuningDisabled} />
              </TdCheckbox>
              <TdCheckbox>
                <CheckboxRed labelText='불법' name='tuningDevice' isChk={tuningDevice} onChange={onChangeTuningDevice}
                             disabled={tuningDisabled} />
              </TdCheckbox>
            </td>
            {PricingSpecialtyDom(tuningPricing, onChangeTuningPricing, tuningSpecialty, setTuningSpecialty, 2, 2)}
          </tr>
          <tr key={'tuning2'}>
            <td>
              <TdCheckbox>
                <CheckboxRed labelText='구조' name='tuningIllegal' isChk={tuningIllegal} onChange={onChangeTuningIllegal}
                             disabled={tuningDisabled} />
              </TdCheckbox>
              <TdCheckbox>
                <CheckboxRed labelText='장치' name='tuningStructure' isChk={tuningStructure}
                             onChange={onChangeTuningStructure} disabled={tuningDisabled} />
              </TdCheckbox>
            </td>
          </tr>
          <tr key={'specialHistory'}>
            <th>특별이력</th>
            <td>
              <InputRadioDom type={NoYesType} name={'specialHistory'} value={specialHistory}
                             onClick={onChangeSpecialHistory} text={['없음', '있음']} />
            </td>
            <td>
              <TdCheckbox>
                <CheckboxRed labelText='침수' name='specialHistoryFlood' isChk={specialHistoryFlood}
                             onChange={onChangeSpecialHistoryFlood} disabled={specialHistoryDisabled} />
              </TdCheckbox>
              <TdCheckbox>
                <CheckboxRed labelText='화재' name='specialHistoryFire' isChk={specialHistoryFire}
                             onChange={onChangeSpecialHistoryFire} disabled={specialHistoryDisabled} />
              </TdCheckbox>
            </td>
            {PricingSpecialtyDom(specialHistoryPricing, onChangeSpecialHistoryPricing, specialHistorySpecialty, setSpecialHistorySpecialty)}
          </tr>
          <tr key={'usageChange'}>
            <th>용도변경</th>
            <td>
              <InputRadioDom type={NoYesType} name={'usageChange'} value={usageChange} onClick={onChangeUsageChange}
                             text={['없음', '있음']} />
            </td>
            <td>
              <TdCheckbox>
                <CheckboxRed labelText='렌트' name='usageChangeRent' isChk={usageChangeRent}
                             onChange={onChangeUsageChangeRent} disabled={usageChangeDisabled} />
              </TdCheckbox>
              {inspectionRecordVersion ? (
                <>
                  <TdCheckbox>
                    <CheckboxRed labelText='리스' name='usageChangeLease' isChk={usageChangeLease}
                                 onChange={onChangeUsageChangeLease} disabled={usageChangeDisabled} />
                  </TdCheckbox>
                </>
              ) : (
                <></>
              )}
              <TdCheckbox>
                <CheckboxRed labelText='영업용' name='usageChangeBusiness' isChk={usageChangeBusiness}
                             onChange={onChangeUsageChangeBusiness} disabled={usageChangeDisabled} />
              </TdCheckbox>
            </td>
            {PricingSpecialtyDom(usageChangePricing, onChangeUsageChangePricing, usageChangeSpecialty, setUsageChangeSpecialty)}
          </tr>

          <tr key={'color'}>
            <th>색상</th>
            <td>
              <InputRadioDom type={InspectionColorType} name={'color'} value={color} onClick={onChangeColor}
                             text={['무채색', '유채색']} disabled={!pricingCheck} />
            </td>
            <td>
              {inspectionRecordVersion ? (
                <>
                  <TdCheckbox>
                    <CheckboxRed labelText='전체도색' name='fullPainting' isChk={fullPainting}
                                 onChange={onChangeFullPainting} disabled={colorDisabled} />
                  </TdCheckbox>
                  <TdCheckbox>
                    <CheckboxRed labelText='색상변경' name='colorChange' isChk={colorChange} onChange={onChangeColorChange}
                                 disabled={colorDisabled} />
                  </TdCheckbox>
                </>
              ) : (
                <></>
              )}
            </td>
            {PricingSpecialtyDom(colorPricing, onChangeColorPricing, colorSpecialty, setColorSpecialty)}
          </tr>
          <tr key={'feature'}>
            <th>주요 옵션</th>
            <td>
              <InputRadioDom type={NoYesType} name={'feature'} value={feature} onClick={onChangeFeature}
                             text={['없음', '있음']} disabled={!pricingCheck} />
            </td>
            <td>
              {inspectionRecordVersion ? (
                <>
                  <TdCheckbox>
                    <CheckboxRed labelText='기타' name='featureETC' isChk={featureETC} onChange={onChangeFeatureETC}
                                 disabled={pricingCheck ? featureDisabled : true} />
                  </TdCheckbox>
                  <TdCheckbox>
                    <CheckboxRed
                      labelText='선루프'
                      name='featureSunroof'
                      isChk={featureSunroof}
                      onChange={onChangeFeatureSunroof}
                      disabled={pricingCheck ? featureDisabled : true}
                    />
                  </TdCheckbox>
                  <TdCheckbox>
                    <CheckboxRed
                      labelText='네비게이션'
                      name='featureNavigation'
                      isChk={featureNavigation}
                      onChange={onChangeFeatureNavigation}
                      disabled={pricingCheck ? featureDisabled : true}
                    />
                  </TdCheckbox>
                </>
              ) : (
                <></>
              )}
            </td>
            {PricingSpecialtyDom(featurePricing, onChangeFeaturePricing, featureSpecialty, setFeatureSpecialty)}
          </tr>
          {inspectionRecordVersion ? (
            <></>
          ) : (
            <>
              <tr key={'recall'}>
                <th>리콜 대상</th>
                <td>
                  <InputRadioDom type={InspectionRecallType} name={'recall'} value={recall} onClick={onChangeRecall}
                                 text={['해당없음', '있음']} />
                </td>
                <td>
                  <InputRadioDom
                    type={InspectionRecallStatusType}
                    name={'recallStatus'}
                    value={recallStatus}
                    onClick={onChangeRecallStatus}
                    text={['리콜 이행', '리콜 미이행']}
                    width={'33%'}
                    disabled={recallDisabled}
                  />
                </td>
                <td></td>
                <td></td>
              </tr>
            </>
          )}
          </tbody>
        </TableBox>
      </Wrapper>
    );
  })
);
export default memo(OverallStateOfVehicle);

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

const TdLabel = styled.text`
  display: inline-block;
  width: 94px;
  margin-right: 5px;
`;

const TdCheckbox = styled.div<any>`
  float: ${({float}) => float || 'left'};
  width: ${({width}) => width || '33%'};
  ${({margin}) => (margin ? `margin: ${margin}` : '')};
  ${({display}) => (display ? `display: ${display}` : '')};
`;

const TdText = styled.text`
  display: inline-block;
  margin-left: 7px;
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

const WonTd = styled.td<any>`
  //text-align: center;
  text-align: ${({textLeft}) => (textLeft ? 'left' : 'center')};
  ${({disabledBorderTop}) => disabledBorderTop && 'border-top: 1px solid #d8d8d8;'};
  ${({disabledOpacity}) => disabledOpacity && 'opacity: 0.2; border-top: 1px solid #d8d8d84f'};
`;

const TextInline = styled(Txt)<any>`
  display: inline-block;
  line-height: 19px;
  ${({float}) => `float: ${float}` || ''};
  font-family: ${theme.font.medium};
`;

const Emission = styled.div`
  div {
    padding-bottom: 5px;
  }
`;
