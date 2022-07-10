import styled from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import {assumePixelOrNot, exportThemeIntoWhcbr} from '@modules/replaceStrings';
import theme from '@public/theme';
import {ReactElement, ReactText, Dispatch, SetStateAction, useCallback} from 'react';
import {WhcbrType} from 'src/types';
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
import {getAutoBorderRadiusSize} from '../../replaceStrings';
import useInput from '../useTextarea';

type UseSelectElType = [ReactText | undefined, ({...props}: SelectType) => ReactElement, Dispatch<SetStateAction<ReactText | undefined>>];

type SelectType = ICommonStyle & {
  whcbr: WhcbrType;
  style?: any;
  className?: string;
  onClick?: (e: any) => void;
  placeholder?: string;
  options?: any[];
  width?: string;
  height?: string;
  maxWidth?: string;
  disabled?: boolean;
};

const useSelectEl = (initialValue?: ReactText): UseSelectElType => {
  const [select, onChangeSelect, setSelect] = useInput(initialValue);

  const SelectEl = useCallback(
    ({whcbr, placeholder, options, width, height, maxWidth, disabled, ...props}: SelectType): ReactElement => (
      <_Select value={select} whcbr={exportThemeIntoWhcbr(whcbr)} disabled={disabled} width={width} height={height} maxWidth={maxWidth} onChange={onChangeSelect} {...props}>
        {placeholder ? (
          <option value={0} disabled>
            {placeholder}
          </option>
        ) : null}
        {options
          ? options.map((el) => (
              <option value={el.value} key={el.value || 'undefinedKey'}>
                {el.label}
              </option>
            ))
          : null}
      </_Select>
    ),
    []
  );

  return [select, SelectEl, setSelect];
};

export default useSelectEl;

const isWhiteSelect = (color: string): boolean => color === 'white' || color === '#fff' || color === '#ffffff' || color === 'transparent' || color === 'none';
const getAutoFontSize = (height: number): number => {
  if (height < 50) return 14;
  return 14;
};
const getAutoPadding = (height: number): string => {
  if (height < 50) return '15px 12px';
  return '15px 12px';
};

const _Select = styled('select')<any>`
  outline: 0 none;
  width: ${({whcbr}) => assumePixelOrNot(whcbr[0])};
  height: ${({whcbr}) => assumePixelOrNot(whcbr[1])};
  background: ${({whcbr}) => whcbr[2]};
  border: ${({whcbr}) => whcbr[3]};
  border-radius: ${({whcbr}) => `${whcbr[4] || getAutoBorderRadiusSize(whcbr[1])}px`};
  cursor: ${({cursor}) => cursor || 'pointer'};
  font-family: ${({fontFamily}) => fontFamily || theme.font.regular};
  color: ${({color, whcbr}) => color || (isWhiteSelect(whcbr[2]) ? '#444444' : 'white')};
  font-size: ${({fontSize, whcbr}) => (fontSize || typeof whcbr[1] === 'number' ? `${getAutoFontSize(whcbr[1])}px` : whcbr[1])};
  padding: ${({padding, whcbr}) => (padding || typeof whcbr[1] === 'number' ? getAutoPadding(whcbr[1]) : whcbr[1])};
  &:focus {
    border: 1px solid #0073eb;
    background: ${({whcbr}) => (isWhiteSelect(whcbr[2]) ? '#f9fcff' : undefined)};
  }
  &::placeholder {
    opacity: 0.4;
    color: #666;
  }
  &:disabled {
    background-color: #f9f9f9;
    color: #93989f;
    cursor: not-allowed;
  }
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
