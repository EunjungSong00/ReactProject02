import styled from '@emotion/styled';
import React, {useCallback, useState} from 'react';
import {Txt, Wrapper} from '@components/atoms';
import theme from '@public/theme';
import Input from '@components/atoms/Input';
import {getCommas} from '@modules/replaceStrings';
import CheckboxRed from '@components/atoms/CheckboxRed';
import useInput from '@hooks/useInput';
import {GoodBadType} from '@pages/vehicle-management/registration/detail-vehicle/vehicle-inspection-record';
import {inject, observer} from 'mobx-react';

type VehicleOtherInformationType = {
  vehicleInspectionRecordStore?: any;
    response: any;
    pricingCheck: boolean;
}

const VehicleOtherInformation = inject('vehicleInspectionRecordStore')(
    observer(({vehicleInspectionRecordStore: store, response, pricingCheck}: VehicleOtherInformationType) => {
  const [otherInformationPricing, onChangeOtherInformationPricing] = useInput(response?.otherInformationPricing || '', 'number'); // 기타정보 가격조사 산정액
  const [exterior, setExterior] = useState<GoodBadType>(response?.exterior || undefined); // 외장
  const [interior, setInterior] = useState<GoodBadType>(response?.interior || undefined); // 내장
  const [polish, setPolish] = useState<GoodBadType>(response?.polish || undefined); // 광택
  const [cabinCleanness, setCabinCleanness] = useState<GoodBadType>(response?.cabinCleanness || undefined); // 룸 크리닝
  const [wheel, setWheel] = useState<GoodBadType>(response?.wheel || undefined); // 휠 옵션값
  const [wheelDisabled, setWheelDisabled] = useState(response?.wheel ? response?.wheel === GoodBadType[0] : true); // 휠 disabled
  const [wheelDriverFront, setWheelDriverFront] = useState(!!response?.wheelDriverFront); // 휠 - 운전석 전
  const [wheelDriverRear, setWheelDriverRear] = useState(!!response?.wheelDriverRear); // 휠 - 운전석 후
  const [wheelPassengerFront, setWheelPassengerFront] = useState(!!response?.wheelPassengerFront); // 휠 - 동반석 전
  const [wheelPassengerRear, setWheelPassengerRear] = useState(!!response?.wheelPassengerRear); // 휠 - 동반석 후
  const [wheelEmergency, setWheelEmergency] = useState(!!response?.wheelEmergency); // 휠 - 응급
  const [tire, setTire] = useState<GoodBadType>(response?.tire || undefined); // 타이어 옵션값
  const [tireDisabled, setTireDisabled] = useState(response?.tire ? response?.tire === GoodBadType[0] : true); // 타이어 disabled
  const [tireDriverFront, setTireDriverFront] = useState(!!response?.tireDriverFront); // 타이어 - 운전석 전
  const [tireDriverRear, setTireDriverRear] = useState(!!response?.tireDriverRear); // 타이어 - 운전석 후
  const [tirePassengerFront, setTirePassengerFront] = useState(!!response?.tirePassengerFront); // 타이어 - 동반석 전
  const [tirePassengerRear, setTirePassengerRear] = useState(!!response?.tirePassengerRear); // 타이어 - 동반석 후
  const [tireEmergency, setTireEmergency] = useState(!!response?.tireEmergency); // 타이어 - 응급
  const [window, setWindow] = useState<GoodBadType>(response?.window || undefined); // 유리
  const [basicItem, setBasicItem] = useState<GoodBadType>(response?.basicItem || undefined); // 기본품목 옵션값
  const [basicItemDisabled, setBasicItemDisabled] = useState(response?.basicItem ? response?.basicItem === GoodBadType[0] : true); // 기본품목 Disabled
  const [basicItemInstruction, setBasicItemInstruction] = useState(!!response?.basicItemInstruction); // 기본품목 - 사용설명서
  const [basicItemSafetyTripod, setBasicItemSafetyTripod] = useState(!!response?.basicItemSafetyTripod); // 기본품목 - 안전삼각대
  const [basicItemJack, setBasicItemJack] = useState(!!response?.basicItemJack); // 기본품목 - 잭
  const [basicItemSpanner, setBasicItemSpanner] = useState(!!response?.basicItemSpanner); // 기본품목 - 스패너
  /* 점검의견 */
  const [inspectorSpecialty, onChangeInspectorSpecialty] = useInput(response?.inspectorSpecialty || ''); // 성능 상태점검자 의견
  const [pricingPersonnelSpecialty, onChangePricingPersonnelSpecialty] = useInput(response?.pricingPersonnelSpecialty || ''); // 가격조사산정자 의견

  const onChangeWheel = useCallback((e: any) => {
    const {value} = e.target;
    setWheel(value);
    if (value === GoodBadType[1]) {
      setWheelDisabled(false);
    } else {
      setWheelDriverFront(false);
      setWheelDriverRear(false);
      setWheelPassengerFront(false);
      setWheelPassengerRear(false);
      setWheelEmergency(false);
      setWheelDisabled(true);
    }
  }, []);

  const onChangeTire = useCallback((e: any) => {
    const {value} = e.target;
    setTire(value);
    if (value === GoodBadType[1]) {
      setTireDisabled(false);
    } else {
      setTireDriverFront(false);
      setTireDriverRear(false);
      setTirePassengerFront(false);
      setTirePassengerRear(false);
      setTireEmergency(false);
      setTireDisabled(true);
    }
  }, []);

  const onChangeBasicItem = useCallback((e: any) => {
    const {value} = e.target;
    setBasicItem(value);
    if (value === GoodBadType[1]) {
      setBasicItemDisabled(false);
    } else {
      setBasicItemInstruction(false);
      setBasicItemSafetyTripod(false);
      setBasicItemJack(false);
      setBasicItemSpanner(false);
      setBasicItemDisabled(true);
    }
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

  // setQuery
  store.setVehicleOtherInformationQuery(JSON.stringify({
    exterior, // 외장
    interior, // 내장
    polish, // 광택
    cabinCleanness, // 룸 크리닝
    wheel, // 휠 옵션값
    wheelDriverFront, // 휠 - 운전석 전
    wheelDriverRear, // 휠 - 운전석 후
    wheelPassengerFront, // 휠 - 동반석 전
    wheelPassengerRear, // 휠 - 동반석 후
    wheelEmergency, // 휠 - 응급
    tire, // 타이어 옵션값
    tireDriverFront, // 타이어 - 운전석 전
    tireDriverRear, // 타이어 - 운전석 후
    tirePassengerFront, // 타이어 - 동반석 전
    tirePassengerRear, // 타이어 - 동반석 후
    tireEmergency, // 타이어 - 응급
    window, // 유리
    basicItem, // 기본품목 옵션값
    basicItemInstruction, // 기본품목 - 사용설명서
    basicItemSafetyTripod, // 기본품목 - 안전삼각대
    basicItemJack, // 기본품목 - 잭
    basicItemSpanner // 기본품목 - 스패너
  }));

  // setPricing
  store.setVehicleOtherInformationPricing(JSON.stringify({
    otherInformationPricing // 기타정보 가격조사 산정액
  }));

  // setSpecialty
  store.setVehicleOtherInformationSpecialty(JSON.stringify({
    inspectorSpecialty, // 성능 상태점검자 의견
    pricingPersonnelSpecialty // 가격조사산정자 의견
  }));

  return (
    <>
      {/* 자동차 기타정보 */}
      <DisabledWrapper mt={'30px'}>
        <TableBox disabled={!pricingCheck}>
          <TableCaption disabled={!pricingCheck}>자동차 기타정보</TableCaption>
          <colgroup>
            <col width={'90'} />
            <col width={'90'} />
            <col width={'600'} />
            <col width={'110'} />
          </colgroup>
          <thead>
          <Tr className={'disabledTr'} disabled={!pricingCheck}>
            <th colSpan={3}>항목</th>
            <th className={'disabledBorderLeftTh'}>가격조사.산정액</th>
          </Tr>
          </thead>
          <tbody>
          <Tr key={'exterior'} className={'disabledTr'} disabled={!pricingCheck}>
            <th rowSpan={7}>수리필요</th>
            <th className={'disabledBorderLeftTh'}>외장</th>
            <td className={'disabledBorderTd'}>
              <InputRadioDom
                disabled={!pricingCheck}
                type={GoodBadType}
                name={'exterior'}
                value={exterior}
                onClick={(e: any) => setExterior(e.target.value)}
                text={['양호', '불량']}
                width={'75px'}
              />
            </td>
            {PricingDom(otherInformationPricing, onChangeOtherInformationPricing, 8)}
          </Tr>
          <Tr key={'interior'} className={'disabledTr'} disabled={!pricingCheck}>
            <th className={'disabledBorderLeftTh'}>내장</th>
            <td className={'disabledBorderTd'}>
              <InputRadioDom
                disabled={!pricingCheck}
                type={GoodBadType}
                name={'interior'}
                value={interior}
                onClick={(e: any) => setInterior(e.target.value)}
                text={['양호', '불량']}
                width={'75px'}
              />
            </td>
          </Tr>
          <Tr key={'polish'} className={'disabledTr'} disabled={!pricingCheck}>
            <th className={'disabledBorderLeftTh'}>광택</th>
            <td className={'disabledBorderTd'}>
              <InputRadioDom
                disabled={!pricingCheck}
                type={GoodBadType}
                name={'polish'}
                value={polish}
                onClick={(e: any) => setPolish(e.target.value)}
                text={['양호', '불량']}
                width={'75px'}
              />
            </td>
          </Tr>
          <Tr key={'cabinCleanness'} className={'disabledTr'} disabled={!pricingCheck}>
            <th className={'disabledBorderLeftTh'}>룸 크리닝</th>
            <td className={'disabledBorderTd'}>
              <InputRadioDom
                disabled={!pricingCheck}
                type={GoodBadType}
                name={'cabinCleanness'}
                value={cabinCleanness}
                onClick={(e: any) => setCabinCleanness(e.target.value)}
                text={['양호', '불량']}
                width={'75px'}
              />
            </td>
          </Tr>
          <Tr key={'wheel'} className={'disabledTr'} disabled={!pricingCheck}>
            <th className={'disabledBorderLeftTh'}>휠</th>
            <td className={'disabledBorderTd'}>
              <Wrapper display={'inline-block'}>
                <InputRadioDom disabled={!pricingCheck} type={GoodBadType} name={'wheel'} value={wheel} onClick={onChangeWheel} text={['양호', '불량']} width={'75px'} />
              </Wrapper>
              <DisabledWrapper display={'inline-block'} style={{float: 'right'}} disabled={!pricingCheck}>
                <TextInline float={'left'}>운전석</TextInline>
                <TdCheckbox width={'auto'} margin={'0 10px 0 15px'}>
                  <CheckboxRed labelText="전" name="wheelDriverFront" isChk={wheelDriverFront} onChange={() => setWheelDriverFront(!wheelDriverFront)} disabled={wheelDisabled} />
                </TdCheckbox>
                <TdCheckbox width={'auto'}>
                  <CheckboxRed labelText="후" name="wheelDriverRear" isChk={wheelDriverRear} onChange={() => setWheelDriverRear(!wheelDriverRear)} disabled={wheelDisabled} />
                </TdCheckbox>
                <TdLine />

                <TextInline float={'left'}>동반석</TextInline>
                <TdCheckbox width={'auto'} margin={'0 10px 0 15px'}>
                  <CheckboxRed
                    labelText="전"
                    name="wheelPassengerFront"
                    isChk={wheelPassengerFront}
                    onChange={() => setWheelPassengerFront(!wheelPassengerFront)}
                    disabled={wheelDisabled}
                  />
                </TdCheckbox>
                <TdCheckbox width={'auto'}>
                  <CheckboxRed
                    labelText="후"
                    name="wheelPassengerRear"
                    isChk={wheelPassengerRear}
                    onChange={() => setWheelPassengerRear(!wheelPassengerRear)}
                    disabled={wheelDisabled}
                  />
                </TdCheckbox>
                <TdLine />
                <TdCheckbox width={'auto'}>
                  <CheckboxRed labelText="응급" name="wheelEmergency" isChk={wheelEmergency} onChange={() => setWheelEmergency(!wheelEmergency)} disabled={wheelDisabled} />
                </TdCheckbox>
              </DisabledWrapper>
            </td>
          </Tr>
          <Tr key={'tire'} className={'disabledTr'} disabled={!pricingCheck}>
            <th className={'disabledBorderLeftTh'}>타이어</th>
            <td className={'disabledBorderTd'}>
              <Wrapper display={'inline-block'}>
                <InputRadioDom disabled={!pricingCheck} type={GoodBadType} name={'tire'} value={tire} onClick={onChangeTire} text={['양호', '불량']} width={'75px'} />
              </Wrapper>
              <DisabledWrapper display={'inline-block'} style={{float: 'right'}} disabled={!pricingCheck}>
                <TextInline float={'left'}>운전석</TextInline>
                <TdCheckbox width={'auto'} margin={'0 10px 0 15px'}>
                  <CheckboxRed labelText="전" name="tireDriverFront" isChk={tireDriverFront} onChange={() => setTireDriverFront(!tireDriverFront)} disabled={tireDisabled} />
                </TdCheckbox>
                <TdCheckbox width={'auto'}>
                  <CheckboxRed labelText="후" name="tireDriverRear" isChk={tireDriverRear} onChange={() => setTireDriverRear(!tireDriverRear)} disabled={tireDisabled} />
                </TdCheckbox>
                <TdLine />
                <TextInline float={'left'}>동반석</TextInline>
                <TdCheckbox width={'auto'} margin={'0 10px 0 15px'}>
                  <CheckboxRed
                    labelText="전"
                    name="tirePassengerFront"
                    isChk={tirePassengerFront}
                    onChange={() => setTirePassengerFront(!tirePassengerFront)}
                    disabled={tireDisabled} />
                </TdCheckbox>
                <TdCheckbox width={'auto'}>
                  <CheckboxRed labelText="후" name="tirePassengerRear" isChk={tirePassengerRear} onChange={() => setTirePassengerRear(!tirePassengerRear)} disabled={tireDisabled} />
                </TdCheckbox>
                <TdLine />
                <TdCheckbox width={'auto'}>
                  <CheckboxRed labelText="응급" name="tireEmergency" isChk={tireEmergency} onChange={() => setTireEmergency(!tireEmergency)} disabled={tireDisabled} />
                </TdCheckbox>
              </DisabledWrapper>
            </td>
          </Tr>
          <Tr key={'window'} className={'disabledTr'} disabled={!pricingCheck}>
            <th className={'disabledBorderLeftTh'}>유리</th>
            <td className={'disabledBorderTd'}>
              <InputRadioDom
                disabled={!pricingCheck}
                type={GoodBadType}
                name={'window'}
                value={window}
                onClick={(e: any) => setWindow(e.target.value)}
                text={['양호', '불량']}
                width={'75px'}
              />
            </td>
          </Tr>
          <Tr key={'basicItem'} className={'disabledTr'} disabled={!pricingCheck}>
            <th>기본품목</th>
            <th className={'disabledBorderLeftTh'}>보유상태</th>
            <td className={'disabledBorderTd'}>
              <InputRadioDom
                disabled={!pricingCheck}
                type={GoodBadType}
                name={'basicItem'}
                value={basicItem}
                onClick={onChangeBasicItem}
                text={['없음', '있음']}
                width={'75px'}
              />
              <DisabledWrapper display={'inline-block'} style={{float: 'right'}} disabled={!pricingCheck}>
                <TdCheckbox width={'auto'}>
                  <CheckboxRed
                    labelText="사용설명서"
                    name="basicItemInstruction"
                    isChk={basicItemInstruction}
                    onChange={() => setBasicItemInstruction(!basicItemInstruction)}
                    disabled={basicItemDisabled}
                  />
                </TdCheckbox>
                <TdCheckbox width={'auto'} margin={'0 42px'}>
                  <CheckboxRed
                    labelText="안전삼각대"
                    name="basicItemSafetyTripod"
                    isChk={basicItemSafetyTripod}
                    onChange={() => setBasicItemSafetyTripod(!basicItemSafetyTripod)}
                    disabled={basicItemDisabled}
                  />
                </TdCheckbox>
                <TdCheckbox width={'auto'} margin={'0 42px 0 0'}>
                  <CheckboxRed labelText="잭" name="basicItemJack" isChk={basicItemJack} onChange={() => setBasicItemJack(!basicItemJack)} disabled={basicItemDisabled} />
                </TdCheckbox>
                <TdCheckbox width={'auto'}>
                  <CheckboxRed
                    labelText="스패너"
                    name="basicItemSpanner"
                    isChk={basicItemSpanner}
                    onChange={() => setBasicItemSpanner(!basicItemSpanner)}
                    disabled={basicItemDisabled}
                  />
                </TdCheckbox>
              </DisabledWrapper>
            </td>
          </Tr>
          </tbody>
        </TableBox>
     </DisabledWrapper>

      {/* 점검의견 */}
      <Wrapper mt={'30px'}>
        <TableBox>
          <TableCaption>점검의견</TableCaption>
          <colgroup>
            <col width={'150'} />
            <col width={'200'} />
            <col width={'368'} />
          </colgroup>
          <tbody>
          <tr key={'inspectorName'}>
            <th rowSpan={2}>
              특이사항 및<br />
              점검자의 의견
            </th>
            <th style={{height: '50px'}}>성능 · 상태점검자</th>
            <td>
              <InputFull value={inspectorSpecialty} maxLength={50} onChange={onChangeInspectorSpecialty} small />
            </td>
          </tr>
          <Tr disabled={!pricingCheck} key={'pricingPersonnelName'}>
            <th className={'disabledBorderTh'} style={{height: '50px'}}>
              가격 · 조사산정자
            </th>
            <td className={'disabledTd'}>
              <InputFull value={pricingPersonnelSpecialty} maxLength={50} onChange={onChangePricingPersonnelSpecialty} small disabled={!pricingCheck} />
            </td>
          </Tr>
          </tbody>
        </TableBox>
      </Wrapper>
    </>

);
})
);
export default VehicleOtherInformation;

const DisabledWrapper = styled(Wrapper)<any>`
  ${({disabled}) => disabled && 'opacity: 0.2'}
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

const TableCaption = styled.caption<any>`
  text-align: left;
  margin-bottom: 10px;
  font-family: ${theme.font.black};
  font-size: 15px;
  color: ${theme.color[3]};
  ${({disabled}) => disabled && 'opacity: 0.2;'};
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

const TextInline = styled(Txt)<any>`
  display: inline-block;
  line-height: 19px;
  ${({float}) => `float: ${float}` || ''};
  font-family: ${theme.font.medium};
`;

const TdCheckbox = styled.div<any>`
  float: ${({float}) => float || 'left'};
  width: ${({width}) => width || '33%'};
  ${({margin}) => (margin ? `margin: ${margin}` : '')};
  ${({display}) => (display ? `display: ${display}` : '')};
`;

const WonTd = styled.td<any>`
  //text-align: center;
  text-align: ${({textLeft}) => (textLeft ? 'left' : 'center')};
  ${({disabledBorderTop}) => disabledBorderTop && 'border-top: 1px solid #d8d8d8;'};
  ${({disabledOpacity}) => disabledOpacity && 'opacity: 0.2; border-top: 1px solid #d8d8d84f'};
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

const InputFull = styled(Input)<any>`
  ${({small}) => small && 'height: 28px'};

  input {
    ${({small}) => small && 'min-height: 28px'};
    border: 1px solid ${theme.color.inputBorder};
    border-radius: 2px;

    &:disabled {
      background-color: ${theme.color.inputDisabled};
    }
  }
`;

const TdLine = styled.div`
  float: left;
  width: 1px;
  height: 15px;
  margin: 2px 20px 0;
  background-color: #444;
`;
