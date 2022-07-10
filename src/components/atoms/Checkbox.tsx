import React, {ReactElement} from 'react';
import styled from '@emotion/styled';
import Wrapper from '@components/atoms/Wrapper';
import theme from '@public/theme';
import {Text} from '.';

interface ICheckboxIcon {
  isChk: boolean;
}
interface ICheckboxLabel {
  htmlFor: string;
  weight?: '1' | '2' | '3' | '4' | '5' | '6' | 'light' | 'regular' | 'medium' | 'bold';
  theme?: any;
}
interface ICheckbox {
  isChk: boolean;
  onChange?: () => void;
  labelText?: string;
  name: string;
  weight?: '1' | '2' | '3' | '4' | '5' | '6' | 'light' | 'regular' | 'medium' | 'bold';
  size?: string;
  color?: string;
  mr?: string;
  onKeyPress?: any;
}

const _Checkbox = ({name, isChk, onChange, labelText, weight, color, mr, onKeyPress}: ICheckbox): ReactElement => (
  <Wrapper h height="fit-content" mr={mr}>
    <CheckboxInput id={name} checked={isChk} onChange={onChange} name={name} />
    <CheckboxLabel htmlFor={name} weight={weight}>
      <Wrapper h>
        <CheckboxIcon isChk={isChk} style={{marginRight: 11, paddingTop: 2}} tabIndex={0} onKeyPress={onKeyPress} />
        <Text color={color ?? theme.color.black} size="15px" lineHeight="0px">
          {labelText}
        </Text>
      </Wrapper>
    </CheckboxLabel>
  </Wrapper>
);
export default _Checkbox;

const CheckboxInput = styled.input`
  display: none;
`;
CheckboxInput.defaultProps = {type: 'checkbox'};
const CheckboxIcon = styled.div<ICheckboxIcon>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.isChk ? "url('/images/chk_on@2x.png') no-repeat 0 0" : "url('/images/chk_off@2x.png') no-repeat 0 0")};
  background-size: contain;
  margin-right: 11px;
  vertical-align: bottom;
`;
const CheckboxLabel = styled.label<ICheckboxLabel>`
  cursor: pointer;
  font-family: ${({weight}: ICheckboxLabel) => (weight ? theme.font[weight] : theme.font['3'])};
  font-size: 15px;
  color: #303236;
`;
