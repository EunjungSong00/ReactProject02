import React, {ReactElement} from 'react';
import styled from '@emotion/styled';
import Wrapper from '@components/atoms/Wrapper';
import theme from '@public/theme';
import {Text} from '.';

interface ICheckboxIcon {
  checked: boolean;
  disabled?: boolean;
}
interface ICheckboxLabel {
  htmlFor: string;
  weight?: string;
  theme?: any;
}
interface ICheckbox {
  id: string;
  name: string;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean | undefined;
  labelText?: string;
  weight?: string;
  mr?: string;
}

const _RadioRed = ({id, name, checked, onChange, disabled, labelText, weight, mr}: ICheckbox): ReactElement => (
  <Wrapper h height="fit-content" mr={mr}>
    {console.log(onChange)}
    <CheckboxInput id={name} name={name} value={id} checked={checked} onChange={onChange} disabled={disabled} />
    <CheckboxLabel htmlFor={id} style={{color: disabled ? '#999' : '#222'}} weight={weight}>
      <Wrapper h>
        <CheckboxIcon checked={checked} disabled={disabled} style={{marginRight: 11, paddingTop: 2}} />
        <Text size="15px" lineHeight="0px">
          {labelText}
        </Text>
      </Wrapper>
    </CheckboxLabel>
  </Wrapper>
);
export default _RadioRed;

const CheckboxInput = styled.input`
  display: none;
`;
CheckboxInput.defaultProps = {type: 'radio'};
const CheckboxIcon = styled.span<ICheckboxIcon>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.checked
      ? "url('/images/radio_on@2x.png') no-repeat 0 0"
      : props.disabled
      ? "url('/images/radio_off@2x.png') no-repeat 0 0"
      : "url('/images/radio_bg@2x.png') no-repeat 0 0"};
  background-size: contain;
  margin-right: 11px;
  vertical-align: bottom;
`;
const CheckboxLabel = styled.label<ICheckboxLabel>`
  cursor: pointer;
  font-family: ${({weight, theme}) => (weight ? theme.font[weight] : theme.font['3'])};
  font-size: 15px;
  color: #303236;
`;
