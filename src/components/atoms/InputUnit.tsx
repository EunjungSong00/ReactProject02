/* eslint-disable no-confusing-arrow */
import styled from '@emotion/styled';
import theme from '@public/theme';
import React, {Ref, LegacyRef, forwardRef} from 'react';
import {background, boxShadow, fontFamily, FontFamilyProps, fontSize} from 'styled-system';
import {Wrapper} from '.';
import {StyledInputValidation} from './Input';

interface ITextInput {
  right?: boolean;
  largeFont?: boolean;
  height?: string;
  width?: string;
  value?: any;
  onChange?: any;
  onKeyUp?: any;
  name?: string;
  maxLength?: number;
  disabled?: boolean;
  message?: string;
  border?: string;
  warningBorder?: boolean;
  placeholder?: any;
  fontFamily?: string;
  fontSize?: string;
  boxShadow?: boolean;
  notOpacity?: boolean;
  background?: string;
}

interface IInputUnit extends ITextInput {
  unit?: any;
  unitFont?: string;
  unitColor?: string;
}

const TextInput = styled.input<ITextInput>`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 2px;
  background: #ffffff00;
  height: ${({height}) => height};
  ${({right}) =>
    right
      ? `
    text-align: right;
    padding-right: 10px;
    font-family: ${theme.font[5]};
    font-size: 20px;`
      : `
    padding-left: 12px;
    font-family: ${theme.font[3]};
    font-size: 13px;
    `};
  ${fontFamily}
  ${fontSize}
  ${({largeFont}) =>
    largeFont
      ? `
        font-family: 'SpoqaHanSansNeo-Regular';
        font-size: 16px;`
      : `

    `};
  &:disabled {
    ${background}
    color: #111111;
    opacity: ${({notOpacity}) => (notOpacity ? '1' : '0.2')};
  }
`;

const TextInputUnit = styled.span<IInputUnit>`
  white-space: nowrap;
  font-family: ${({unitFont}) => unitFont || theme.font.regular};
  align-items: center;
  justify-content: right;
  padding-right: 12px;
  display: flex;
  font-size: 14px;
  border-radius: 2px;
  color: ${({unitColor}) => unitColor || theme.color[4]};
  ${({disabled, notOpacity}) =>
    disabled &&
    `
    color: #111111;
    opacity: ${notOpacity ? '1' : '0.2'};
      `};
`;

const TextInputWrapper = styled(Wrapper)<any>`
  border-radius: 2px;
  ${background}
  ${({warningBorder}) => (warningBorder ? 'border :2px solid red' : 'border :1px solid #d8d8d8')};
  ${({border}) => `border :${border}` || ''};
  &:focus-within {
    border: 1px solid ${theme.color.primary};
    background: #f9fcff;
  }
`;

const InputUnit = ({...props}: IInputUnit, ref?: Ref<HTMLElement> | LegacyRef<HTMLInputElement>) => (
  <>
    <TextInputWrapper
      between
      h
      border={props.border}
      warningBorder={props.warningBorder}
      width={props.width}
      background={props.background}
      style={{
        // border: `${props.warningBorder ? '2px solid red' : '1px solid #e2e6ee'}`,
        boxShadow: `${props.boxShadow ? '0 2px 4px 0 rgba(0, 0, 0, 0.15)' : ''}`
      }}
    >
      <TextInput
        ref={ref as LegacyRef<HTMLInputElement>}
        background={props.background}
        placeholder={props.placeholder || 0}
        onWheel={(event) => event.currentTarget.blur()}
        disabled={props.disabled}
        notOpacity={props.notOpacity}
        height={props.height}
        right={props.right}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        maxLength={props.maxLength || 6}
        largeFont={props.largeFont}
        fontFamily={props.fontFamily || theme.font.regular}
        fontSize={props.fontSize}
      />
      <TextInputUnit
        notOpacity={props.notOpacity}
        disabled={props.disabled}
        unitColor={props.unitColor}
        unitFont={props.unitFont}
        style={{height: props.height}}
        // style={{height: props.height, background: props.disabled ? '#fff' : ''}}
      >
        {' '}
        {props.unit}
      </TextInputUnit>
    </TextInputWrapper>
    {props.message && <StyledInputValidation>{props.message}</StyledInputValidation>}
  </>
);

export default forwardRef(InputUnit);
