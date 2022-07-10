import React, {ReactElement} from 'react';
import styled from '@emotion/styled';
import Wrapper from '@components/atoms/Wrapper';
import theme from '@public/theme';
import {Text, Txt} from '.';

interface ICheckboxIcon {
  isChk: boolean;
  disabled?: boolean;
}
interface ICheckboxLabel {
  htmlFor: string;
  weight?: string;
  theme?: any;
  readOnly?: boolean;
}
interface ICheckbox {
  isChk: boolean;
  disabled?: boolean | undefined;
  onChange?: () => void;
  readOnly?: boolean;
  labelText?: string;
  name: string;
  weight?: string;
  size?: string;
  fontSize?: string;
  color?: string;
  mr?: string;
  mb?: string;
}

const _CheckboxRed = ({name, isChk, disabled, onChange, readOnly, labelText, weight, fontSize, color, mr, mb}: ICheckbox): ReactElement => (
  <Wrapper h height="fit-content" mr={mr} mb={mb}>
    <CheckboxInput id={name} checked={isChk} onChange={onChange} name={name} disabled={disabled} readOnly={readOnly} />
    <CheckboxLabel htmlFor={name} weight={weight} readOnly={readOnly}>
      <Wrapper h>
        <CheckboxIcon isChk={isChk} disabled={disabled} />
        <Txt type={'medium'} color={color ?? theme.color.black} fontSize={fontSize ?? '14px'} mt={'3px'}>
          {labelText}
        </Txt>
      </Wrapper>
    </CheckboxLabel>
  </Wrapper>
);
export default _CheckboxRed;

const CheckboxInput = styled.input`
  display: none;
`;
CheckboxInput.defaultProps = {type: 'checkbox'};
const CheckboxIcon = styled.span<ICheckboxIcon>`
  display: inline-block;
  width: 17px;
  height: 13px;
  margin-top: 4px;
  background: ${(props) =>
    props.isChk
      ? "url('/images/chk_red_on@2x.png') no-repeat 0 0"
      : props.disabled
      ? "url('/images/chk_red_off@2x.png') no-repeat 0 0"
      : "url('/images/chk_red@2x.png') no-repeat 0 0"};
  background-size: contain;
  margin-right: 3px;
`;
const CheckboxLabel = styled.label<ICheckboxLabel>`
  font-family: ${({weight, theme}) => (weight ? theme.font[weight] : theme.font['3'])};
  font-size: 15px;
  color: #303236;
  ${({readOnly}) => (readOnly ? 'cursor:auto;' : 'cursor: pointer;')};
`;
