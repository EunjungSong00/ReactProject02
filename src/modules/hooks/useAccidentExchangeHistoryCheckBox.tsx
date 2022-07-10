import React, {Dispatch, ReactElement, SetStateAction, useCallback, useState} from 'react';
import {Wrapper} from '@components/atoms';
import styled from '@emotion/styled';
import theme from '@public/theme';

type ReturnType =[
    any[],
    ({onShowNumb, partName, children, className}: {onShowNumb:number, partName: string | ReactElement, children?: any, className?: string}) => ReactElement,
    (
        {onShowNumb, title, show, setShow, styleCss}
        : {
            onShowNumb : number,
            title: string,
            show: number | undefined,
            setShow: Dispatch<SetStateAction<number | undefined>>,
            styleCss: string
         }
    ) => ReactElement,
    SetterType
];
interface IUseAccidentExchangeHistoryCheckBox {
    partSort: boolean;
    setPartSort: Dispatch<SetStateAction<boolean>>;
    name: string;
}
interface IUseAccidentExchangeHistorySubCheckBox extends IUseAccidentExchangeHistoryCheckBox {
    labelText: string;
}

export type SetterType = {
  setExchange: Dispatch<SetStateAction<boolean>>,
  setSheetMetal: Dispatch<SetStateAction<boolean>>,
  setCorrosion: Dispatch<SetStateAction<boolean>>,
  setScratch: Dispatch<SetStateAction<boolean>>,
  setUneven: Dispatch<SetStateAction<boolean>>,
  setDamage: Dispatch<SetStateAction<boolean>>
}

export type AccidentSortType = {
    exchange?: boolean;
    sheetMetal?: boolean;
    corrosion?: boolean;
    scratch?: boolean;
    uneven?: boolean;
    damage?: boolean;
}
interface ICheckboxIcon {
    isChk?: boolean;
    disabled?: boolean;
}
interface ICheckboxLabel {
    htmlFor?: string;
}
interface ICheckbox {
    isChk?: boolean;
    disabled?: boolean | undefined;
    onChange?: () => void;
    name?: string;
}
interface ILabelCheckbox extends ICheckbox {
    labelText?: string;
}

const TableCheckboxRed = ({name, isChk, disabled, onChange}: ICheckbox): ReactElement => (
    <Wrapper height="fit-content" >
        <CheckboxInput id={name} checked={isChk} onChange={onChange} name={name} disabled={disabled} />
        <CheckboxLabel htmlFor={name}>
            <CheckboxIcon isChk={isChk} disabled={disabled} />
        </CheckboxLabel>
    </Wrapper>
);

const LabelCheckBox = ({name, isChk, disabled, onChange, labelText}: ILabelCheckbox): ReactElement => (
    <CheckBoxWrapper>
        <LabelCheckBoxInput type={'checkbox'} id={name} checked={isChk} onChange={onChange} name={name} disabled={disabled} />
        <LabelCheckboxLabel htmlFor={name}>
            <LabelCheckSpanWrapper>
                <LabelCheckboxIcon isChk={isChk} disabled={disabled}/>
                <LabelSpan>{labelText}</LabelSpan>
            </LabelCheckSpanWrapper>
        </LabelCheckboxLabel>
  </CheckBoxWrapper>
);

const useAccidentExchangeHistoryCheckBox = ({part, dataLabel}: {part: AccidentSortType, dataLabel: string}): ReturnType => {
    const [exchange, setExchange] = useState(!!part?.exchange); // 교환
    const [sheetMetal, setSheetMetal] = useState(!!part?.sheetMetal); // 판금/용접
    const [corrosion, setCorrosion] = useState(!!part?.corrosion); // 부식
    const [scratch, setScratch] = useState(!!part?.scratch); // 흠집
    const [uneven, setUneven] = useState(!!part?.uneven); // 요철
    const [damage, setDamage] = useState(!!part?.damage); // 손상
    const Check = exchange || sheetMetal || corrosion || scratch || uneven || damage;

    const CheckBoxContent = useCallback(({partSort, setPartSort, name}: IUseAccidentExchangeHistoryCheckBox): ReactElement => (
         <td>
            <TableCheckboxRed
                name={name}
                isChk={partSort}
                onChange={() => setPartSort((val) => !val)}
            />
        </td>
    ), []);

    const LabelCheckBoxContent = useCallback(({partSort, setPartSort, name, labelText}: IUseAccidentExchangeHistorySubCheckBox): ReactElement => (
        <>
            <LabelCheckBox
                name={name}
                isChk={partSort}
                labelText={labelText}
                onChange={() => setPartSort((val) => !val)}
            />
        </>
    ), []);

    const ExchangeCheckbox = useCallback((): ReactElement => (
        <CheckBoxContent partSort={exchange} setPartSort={setExchange} name={`${dataLabel}Exchange`} />
    ), [exchange, dataLabel]);
    const SheetMetalCheckbox = useCallback((): ReactElement => (
        <CheckBoxContent partSort={sheetMetal} setPartSort={setSheetMetal} name={`${dataLabel}SheetMetal`}/>
    ), [sheetMetal, dataLabel]);
    const CorrosionCheckbox = useCallback((): ReactElement => (
        <CheckBoxContent partSort={corrosion} setPartSort={setCorrosion} name={`${dataLabel}Corrosion`}/>
    ), [corrosion, dataLabel]);
    const ScratchCheckbox = useCallback((): ReactElement => (
        <CheckBoxContent partSort={scratch} setPartSort={setScratch} name={`${dataLabel}Scratch`}/>
    ), [scratch, dataLabel]);
    const UnevenCheckbox = useCallback((): ReactElement => (
        <CheckBoxContent partSort={uneven} setPartSort={setUneven} name={`${dataLabel}Uneven`}/>
    ), [uneven, dataLabel]);
    const DamageCheckbox = useCallback((): ReactElement => (
        <CheckBoxContent partSort={damage} setPartSort={setDamage} name={`${dataLabel}Damage`}/>
    ), [damage, dataLabel]);

    // TODO: 코드 줄이기 (은정)
    const ExchangeLabelCheckBox = useCallback((): ReactElement => (
        <LabelCheckBoxContent partSort={exchange} setPartSort={setExchange} labelText={'교환'} name={`${dataLabel}Exchange`} />
    ), [exchange, dataLabel]);
    const SheetMetalLabelCheckBox = useCallback((): ReactElement => (
        <LabelCheckBoxContent partSort={sheetMetal} setPartSort={setSheetMetal} labelText={'판금/용접'} name={`${dataLabel}SheetMetal`} />
    ), [sheetMetal, dataLabel]);
    const CorrosionLabelCheckBox = useCallback((): ReactElement => (
        <LabelCheckBoxContent partSort={corrosion} setPartSort={setCorrosion} labelText={'부식'} name={`${dataLabel}Corrosion`} />
    ), [corrosion, dataLabel]);
    const ScratchLabelCheckBox = useCallback((): ReactElement => (
        <LabelCheckBoxContent partSort={scratch} setPartSort={setScratch} labelText={'흠집'} name={`${dataLabel}Scratch`} />
    ), [scratch, dataLabel]);
    const UnevenLabelCheckBox = useCallback((): ReactElement => (
        <LabelCheckBoxContent partSort={uneven} setPartSort={setUneven} labelText={'요철'} name={`${dataLabel}Uneven`} />
    ), [uneven, dataLabel]);
    const DamageLabelCheckBox = useCallback((): ReactElement => (
        <LabelCheckBoxContent partSort={damage} setPartSort={setDamage} labelText={'손상'} name={`${dataLabel}Damage`} />
    ), [damage, dataLabel]);

    const CheckDom = useCallback(({onShowNumb, partName, children, className}: {onShowNumb:number, partName: string | ReactElement, children?: any, className?: string}) => (
        <tr style={{background: Check ? '#eee' : 'transparent'}} className={className}>
            {children}
            <td>{onShowNumb}</td>
            <LeftTd>{partName}<span></span></LeftTd>
            <ExchangeCheckbox/>
            <SheetMetalCheckbox/>
            <CorrosionCheckbox/>
            <ScratchCheckbox/>
            <UnevenCheckbox/>
            <DamageCheckbox/>
        </tr>
    ), [
        ExchangeCheckbox,
        SheetMetalCheckbox,
        CorrosionCheckbox,
        ScratchCheckbox,
        UnevenCheckbox,
        DamageCheckbox
    ]);

    const LabelCheckDom = useCallback(() => (
        <>
            <ExchangeLabelCheckBox />
            <SheetMetalLabelCheckBox />
            <CorrosionLabelCheckBox/>
            <ScratchLabelCheckBox />
            <UnevenLabelCheckBox />
            <DamageLabelCheckBox />
        </>
    ), [
        ExchangeLabelCheckBox,
        SheetMetalLabelCheckBox,
        CorrosionLabelCheckBox,
        ScratchLabelCheckBox,
        UnevenLabelCheckBox,
        DamageLabelCheckBox]);

    const ImgSpan =
        useCallback((
            {onShowNumb, title, styleCss, show, setShow}
            : {onShowNumb : number, title: string, styleCss: string, show: number | undefined, setShow: Dispatch<SetStateAction<number | undefined>>}): ReactElement => {
                const onShow = (part:number) => {
                    setShow(part);
                };
                const offShow = () => {
                    setShow(0);
                };

                return (
                    <_ImgSpan
                        styleCss={styleCss}
                        onMouseEnter={() => onShow(onShowNumb)}
                        onMouseLeave={offShow}>
                        <i className={Check ? 'checked-i' : ''}>
                            {Math.abs(onShowNumb)}
                        </i>
                        {/* Todo: display => css 관련 수정 > area>span.checked-area-span 이 체크후에 display 값이 반환이 안되는 문제 */}
                        <Wrapper display={show === onShowNumb ? 'block' : 'none'}>
                            <em className={'area'}>
                                <span className={Check ? 'checked-area-span' : ''}></span>
                            </em>
                            <em className={'box'}
                                onMouseEnter={() => onShow(onShowNumb)}
                                onMouseLeave={offShow}>
                                <strong>{Math.abs(onShowNumb)}. {title}</strong>
                                <LabelCheckBoxWrapper>
                                    <LabelCheckDom/>
                                </LabelCheckBoxWrapper>
                            </em>
                        </Wrapper>
                    </_ImgSpan>
                );
    }, [LabelCheckDom]);
    return [[exchange, sheetMetal, corrosion, scratch, uneven, damage], CheckDom, ImgSpan, {setExchange, setSheetMetal, setCorrosion, setScratch, setUneven, setDamage}];
};
export default useAccidentExchangeHistoryCheckBox;

const CheckboxInput = styled.input`
  display: none;
`;
CheckboxInput.defaultProps = {type: 'checkbox'};
const CheckboxIcon = styled.span<ICheckboxIcon>`
    display: inline-block;
    width: 17px;
    height: 13px;
    background: ${(props) =>
    props.isChk
        ? "url('/images/chk_red_on@2x.png') no-repeat 0 0"
        : props.disabled
        ? "url('/images/chk_red_off@2x.png') no-repeat 0 0"
        : "url('/images/chk_red@2x.png') no-repeat 0 0"};
    background-size: contain;
`;

const CheckboxLabel = styled.label<ICheckboxLabel>`
    font-family: ${theme.font.medium};
    font-size: 15px;
    color: #303236;
`;

const CheckBoxWrapper = styled(Wrapper)`
    display: inline-block;
    width: 25%;
`;

const LabelCheckBoxWrapper = styled(Wrapper)`
    > div:nth-of-type(2),
    > div:nth-of-type(5) {
        width: 43%;
        margin: 0 3px 0 5px;
    }
`;

const LabelCheckBoxInput = styled.input`
    display: none;
`;
LabelCheckBoxInput.defaultProps = {type: 'checkbox'};

const LabelCheckboxIcon = styled.span<ICheckboxIcon>`
  display: inline-block;
  width: 13px;
  height: 13px;
  border: 1px solid #ddd;
  margin-right: 3px;
  background-color: ${(props) =>
  props.isChk
    ? '#fd3636'
    : '#fff'};
`;

const LabelCheckboxLabel = styled.label<ICheckboxLabel>`
    color: #333;
`;

const LabelSpan = styled.span<ILabelCheckbox>`
    display: inline-block;
    width: fit-content;
    font-size: 12px;
    font-family: ${theme.font.bold};
`;

const LabelCheckSpanWrapper = styled(Wrapper)`
    display: flex;
    align-items: start;
    margin: 3px 0;
`;

const activeStyle = `
    // .active .area
    .area {
      display: block;
      text-align: left;

      span {
        display: block;
      }
    }

    // .active .box
    .box {
      display: block;

      strong {
        margin-bottom: 8px;
        position: absolute;
        text-align: center;
        display: block;
        letter-spacing: -1px;
        font-size: 11px;
        line-height: 12px;
        z-index: 20;
        padding-top: 2px;
        font-family: ${theme.font.bold};
      }
    }
`;

const _ImgSpan = styled.span<any>`
 ${({styleCss}) => styleCss};
  
  display: block;
  position: absolute;
  color: #333;
  
  i {
    font-family: ${theme.font.bold};
    color: ${theme.color.notice};
    position: absolute;
    display: block;
    text-align: center;
    width: 100%;
    z-index: 1;
    font-size: 13px;

    //.checked-i
    &.checked-i {
        color: #e8e8e8;
        &::after {
            content: '';
            position: absolute;
            display: inline-block;
            z-index: -1;
            width: 22px;
            height: 22px;
            border-radius: 11px;
            background: ${theme.color.notice};
        }
    }
  }  
  
  // area
  .area {
    display: block;
    text-align: left;
    
    span {
      display: none;
      position: absolute;
      background-size: contain;

      &.checked-area-span {
          display: block;
      }
    }
  }

  // box
  .box {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-5%);
    width: 184px;
    height: auto;
    margin-left: -87px;
    padding: 11px 9px;
    background-color: ${theme.color.white};
    border: 1px solid ${theme.color.tableBorder};
    border-radius: 2px;

    &::before {
        content: '';
        position: absolute;
        width: 0px;
        height: 0px;
        top: -10px;
        left: 86px;
        border-bottom: 10px solid #d8d8d8;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        // z-index: 2;
    }
    &::after {
        content: '';
        position: absolute;
        width: 0px;
        height: 0px;
        top: -8px;
        left: 88px;
        border-bottom: 8px solid #fff;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        // z-index: 7;
    }

    // &.checked-box {
    //     display: block;
    // }
  }
  
  // 마우스 오버시 active
    ${activeStyle};

`;

const LeftTd = styled.td`
    text-align: left;
    padding: 7px 12px;
    height: 50px;
`;

const ImgPart = styled.div<any>`
    .area {
        span {
            display: none;
        }
    }

    .active-checked {
        .area {
            span {
                display: block;
            }
        }
    }
`;
