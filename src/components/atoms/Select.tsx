import React, {ReactElement, ChangeEventHandler} from 'react';
import styled from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import {
  height,
  margin,
  width,
  padding,
  color,
  flexDirection,
  textAlign,
  borderRadius,
  background,
  display,
  position,
  justifyContent,
  minWidth,
  verticalAlign,
  minHeight,
  maxWidth,
  maxHeight,
  border,
  alignItems
} from 'styled-system';

interface ISelect extends ICommonStyle {
  value?: string | number;
  placeholder?: string;
  options?: any[];
  width?: string;
  height?: string;
  maxWidth?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}

const _Select = ({value, onChange, placeholder, options, width, height, maxWidth, disabled, ...props}: ISelect): ReactElement => (
  <StyledSelect disabled={disabled} value={value} width={width} height={height} maxWidth={maxWidth} onChange={onChange} {...props}>
    {placeholder ? (
      <option value={0} disabled>
        {placeholder}
      </option>
    ) : null}
    {options
      ? options.map((item) => {
          const value = item.label ? item.value : item;
          const label = item.label ? item.label : item;
          return (
            <option value={value} key={value || 'undefinedKey'}>
              {label}
            </option>
          );
        })
      : null}
  </StyledSelect>
);

export default _Select;

const StyledSelect = styled('select')<any>`
  display: ${({display}) => display && display};
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '50px'};
  background: #fff url(/images/bt_down_off.png) no-repeat 96%;
  color: #93969f;
  border: ${(border) => border && 'solid 1px #e2e6ee'};
  border-radius: 4px;
  padding-left: 14px;
  outline: none;
  ${height}
  ${width}
  ${minWidth}
  ${maxWidth}
  ${minHeight}
  ${maxHeight}
  ${margin}
  ${padding}
  ${color}
  ${flexDirection}
  ${borderRadius}
  ${background}
  ${display}
  ${position}
  ${justifyContent}
  ${alignItems}
  ${verticalAlign}
  ${textAlign}
  ${border}
`;
