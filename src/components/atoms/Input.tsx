import {Dispatch, SetStateAction, ChangeEventHandler, Fragment, forwardRef, Ref, KeyboardEventHandler, LegacyRef, ReactText} from 'react';
import styled from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import {
  variant,
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
import {WhcbrType} from 'src/types';
import {assumePixelOrNot, exportThemeIntoWhcbr, getAutoBorderRadiusSize} from '@modules/replaceStrings';
import theme from '../../../public/theme';
import {Wrapper, Line} from '.';

registerLocale('ko', ko);

interface IInput extends ICommonStyle {
  value?: ReactText | Date;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  message?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  paddingRight?: string;
  style?: any;
  type?: string;
  className?: string;
  disabled?: boolean;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  date?: Date;
  setDate?: Dispatch<SetStateAction<Date>> | Dispatch<SetStateAction<undefined>> | any;
  name?: string;
  readOnly?: boolean;
  maxLength?: number;
  onClick?: () => void;
  monthOnly?: boolean;
  maxDate?: Date;
  autoFocus?: boolean;
  open?: boolean;
  onSelect?: () => void;
  tabIndex?: number;
  autoComplete?: string;
  version?: 'a' | 'b';
  whcbr?: WhcbrType;
  onCalendarOpen?: () => void;
  onCalendarClose?: () => void;
  onFocus?: () => void;
  onKeyUp?: () => void;
}

const _Input = (
  {
    value,
    placeholder,
    onChange,
    onKeyPress,
    message,
    width,
    maxWidth,
    height,
    paddingRight,
    type,
    className,
    disabled,
    style,
    date,
    setDate,
    readOnly,
    onClick,
    maxLength = 40,
    monthOnly,
    maxDate,
    autoFocus,
    open,
    onSelect,
    tabIndex,
    autoComplete,
    version = 'a',
    whcbr,
    onCalendarOpen,
    onCalendarClose,
    onFocus,
    onKeyUp,
    ...props
  }: IInput,
  ref?: Ref<HTMLElement> | LegacyRef<HTMLInputElement>
) =>
  version === 'a' ? (
    <Wrapper width={width} height={height} maxWidth={maxWidth} className={className} column {...props}>
      {type !== 'calendar' ? (
        <>
          <Input
            name={props.name}
            ref={ref}
            type={type}
            value={value}
            width={width}
            hight={height}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            style={style}
            readOnly={readOnly}
            onClick={onClick}
            maxLength={maxLength}
            tabIndex={tabIndex}
            autocomplete={autoComplete}
            version={version}
            onKeyUp={onKeyUp}
          />
          {message && <StyledInputValidation>{message}</StyledInputValidation>}
        </>
      ) : (
        <CalendarWrapper height={height} width={width} paddingRight={paddingRight} ref={ref} version={version}>
          <DatePicker
            onChangeRaw={(e) => e.preventDefault()}
            disabled={disabled}
            maxDate={maxDate ?? new Date()}
            selected={date}
            onChange={(date: any) => setDate && setDate(date)}
            onSelect={onSelect}
            locale="ko"
            dateFormat={monthOnly ? 'yyyy-MM' : 'yyyy-MM-dd'}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={placeholder}
            showMonthYearPicker={monthOnly}
            autoFocus={autoFocus}
            open={open}
            onCalendarOpen={onCalendarOpen}
            onCalendarClose={onCalendarClose}
            onFocus={onFocus}
          />
        </CalendarWrapper>
      )}
      {type === 'calendar' && (
        <Wrapper position="absolute" height="0px" width={width ?? '150px'}>
          <Line vertical height={height ?? '36px'} style={{margin: paddingRight ? `0 ${paddingRight} 0 auto` : '0 36px 0 auto'}} />
        </Wrapper>
      )}
    </Wrapper>
  ) : (
    // version b
    <Wrapper width={exportThemeIntoWhcbr(whcbr)[0]} height={exportThemeIntoWhcbr(whcbr)[1]} maxWidth={maxWidth} className={className} column {...props}>
      <InputB
        whcbr={exportThemeIntoWhcbr(whcbr)}
        type={type}
        ref={ref as LegacyRef<HTMLInputElement>}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        style={style}
        readOnly={readOnly}
        onClick={onClick}
        maxLength={maxLength}
        tabIndex={tabIndex}
        placeholder={placeholder}
        disabled={disabled}
        onKeyUp={onKeyUp}
      />
      {message && <StyledInputValidation>{message}</StyledInputValidation>}
    </Wrapper>
  );

export default forwardRef(_Input);

const isWhiteInput = (color: string): boolean => color === 'white' || color === '#fff' || color === '#ffffff' || color === 'transparent' || color === 'none';
const getAutoFontSize = (height: number): number => {
  if (height < 50) return 14;
  return 14;
};
const getAutoPadding = (height: number): string => {
  if (height < 50) return '15px 12px';
  return '15px 12px';
};

const InputB = styled('input')<any>`
  outline: 0 none;
  width: ${({whcbr}) => assumePixelOrNot(whcbr[0])};
  height: ${({whcbr}) => assumePixelOrNot(whcbr[1])};
  background: ${({whcbr}) => whcbr[2]};
  border: ${({whcbr}) => whcbr[3]};
  border-radius: ${({whcbr}) => `${whcbr[4] || getAutoBorderRadiusSize(whcbr[1])}px`};
  font-family: ${({fontFamily}) => fontFamily || theme.font.regular};
  color: ${({color, whcbr}) => color || (isWhiteInput(whcbr[2]) ? '#444444' : 'white')};
  font-size: ${({fontSize, whcbr}) => (fontSize || typeof whcbr[1] === 'number' ? `${getAutoFontSize(whcbr[1])}px` : whcbr[1])};
  padding: ${({padding, whcbr}) => (padding || typeof whcbr[1] === 'number' ? getAutoPadding(whcbr[1]) : whcbr[1])};
  &:focus {
    border: 1px solid #0073eb;
    background: ${({whcbr}) => (isWhiteInput(whcbr[2]) ? '#f9fcff' : undefined)};
  }
  &::placeholder {
    opacity: 0.4;
    color: #666;
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

  &:disabled {
    background-color: #f9f9f9;
    color: #93989f;
    cursor: not-allowed;
  }
`;

const StyledInput = styled('input')<any>`
  display: ${({display}) => display && display};
  min-height: ${({minHeight}) => (minHeight && minHeight.includes('px')) || '50px'};
  max-width: ${({maxWidth}) => (maxWidth && maxWidth.includes('px')) || '100%'};
  width: ${({width}) => (width && width.includes('px')) || '100%'};
  background-color: #fff;
  border: ${(border) => border && 'solid 1px #e2e6ee'};
  border-radius: 4px;
  padding-left: 14px;
  outline: 0 none;

  &::placeholder {
    color: #93969f;
  }

  &:focus {
    padding-left: 14px;
    border: 1px solid ${theme.color.primary};
  }

  &:disabled {
    background-color: #f9f9f9;
    border: 1px solid #e2e6ee;
    color: #93989f;
  }
`;

export const StyledInputValidation = styled.span`
  font-family: 'SpoqaHanSansNeo-regular';
  position: relative;
  display: block;
  font-size: 14px;
  min-height: 40px;
  text-align: left;
  margin-top: 5px;
  padding: 13px 10px 10px 39px;
  color: ${theme.color.red};
  background-color: rgba(239, 32, 17, 0.05);
  border: 1px solid rgba(239, 32, 17, 0.2);

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    background: url(/images/icon-fail@2x.png) no-repeat;
    background-size: contain;
  }
`;

export const StyledInputValidationSuccess = styled.span`
  position: relative;
  display: block;
  font-size: 14px;
  min-height: 40px;
  text-align: left;
  margin-top: 5px;
  padding: 13px 10px 10px 39px;
  color: #16b70a;
  background-color: rgba(22, 183, 10, 0.05);
  border: 1px solid rgba(22, 183, 10, 0.2);

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    background: url(/images/icon-ok@2x.png) no-repeat;
    background-size: contain;
  }
`;

const Input = styled(StyledInput)(
  variant({
    prop: 'type',
    variants: {
      roundInput: {
        minHeight: '36px',
        paddingRight: '14px',
        borderRadius: '18px',
        borderColor: `${theme.color.background}`,
        backgroundColor: `${theme.color.background}`,
        '&:focus': {
          backgroundColor: '#fff',
          border: `1px solid ${theme.color.primary}`
        }
      },
      roundInputSearch: {
        minHeight: '36px',
        borderRadius: '18px',
        paddingRight: '48px',
        borderColor: `${theme.color.background}`,
        background: 'url(/images/icon-search-19-px@3x.png) no-repeat 90% 50%',
        backgroundSize: '19px',
        backgroundColor: `${theme.color.background}`,
        '&:focus': {
          backgroundColor: '#fff',
          border: `1px solid ${theme.color.primary}`
        }
      },
      squareInputSmall: {
        minHeight: '36px',
        minWidth: '130px',
        borderRadius: '4px',
        '&:focus': {
          backgroundColor: '#fff',
          paddingLeft: '13px',
          border: `1px solid ${theme.color.primary}`
        }
      },
      squareInput: {
        minHeight: '50px',
        borderRadius: '4px',
        '&:focus': {
          backgroundColor: '#fff',
          paddingLeft: '14px',
          border: `1px solid ${theme.color.primary}`
        },
        '&:disabled': {
          padding: '15px 20px',
          textAlign: 'right'
        }
      },
      squareInputSearchSmall: {
        minHeight: '36px',
        borderRadius: '4px',
        background: 'url(/images/icon-search-26-px@3x.png) no-repeat 95% 50%',
        backgroundSize: '19px',
        '&:focus': {
          backgroundColor: '#fff',
          paddingLeft: '14px',
          border: `1px solid ${theme.color.primary}`
        }
      }
    }
  })
);

export const CalendarWrapper = styled.div<any>`
  min-height: 36px;
  width: ${({width}) => width ?? '150px'};
  height: ${({height}) => height ?? '36px'};
  border-radius: 4px;
  &:focus {
    background-color: #fff;
    padding-left: 13px;
    border: 1px solid ${theme.color.primary};
  }

  input {
    ${({height}) => height || 'min-height: 36px'};
    height: ${({height}) => height ?? '36px'};
    width: 100%;
    background-color: #fff;
    border: ${(border) => border && 'solid 1px #e2e6ee'};
    border-radius: 4px;
    padding-left: 14px;
    outline: 0 none;
    padding-right: ${({paddingRight}) => paddingRight ?? '40px'};
    background: url(/images/ic-calendar.svg) no-repeat ${({paddingRight}) => (paddingRight ? '94.5%' : '94%')} 50%;
    caret-color: transparent;
  }

  font-family: ${theme.font[5]};
  .react-datepicker-wrapper {
    display: block;
    height: ${({height}) => height ?? '36px'};
  }
  .react-datepicker__input-container {
    height: ${({height}) => height ?? '36px'};
  }
  .react-datepicker {
    border: solid 1px #e2e6ee;
  }
  .react-datepicker__header {
    border-bottom: none;
    background: none;
  }
  .react-datepicker__current-month.react-datepicker__current-month--hasYearDropdown.react-datepicker__current-month--hasMonthDropdown {
    display: none;
  }
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
    margin-top: 5px;
  }
  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown,
  .react-datepicker__month-year-dropdown {
    background: #fff;
  }
  .react-datepicker__year-dropdown.react-datepicker__year-dropdown--scrollable {
    display: flex;
    height: 600px;
    flex-direction: column-reverse;
  }
  .react-datepicker__month-read-view--selected-month,
  .react-datepicker__year-read-view--selected-year,
  .react-datepicker__header.react-datepicker-year-header {
    border: none;
    outline: none;
    color: ${theme.color.darkgray};
    font-family: ${theme.font['3']};
    margin: 0px;
    margin-bottom: 10px;
    font-size: 16pt;
    padding-left: 3px;
    background-size: 12px;
  }
  .react-datepicker__header.react-datepicker-year-header {
    margin-top: 10px;
  }
  .react-datepicker__month-read-view--selected-month,
  .react-datepicker__year-read-view--selected-year {
    border-bottom: 1px solid #808080;
  }
  .react-datepicker__navigation--years-previous,
  .react-datepicker__navigation--month-previous {
    background: url(/images/ico-arrow-drop-down@3x.png) no-repeat 50%;
    transform: rotate(180deg);
    background-size: 18px;
  }
  .react-datepicker__navigation--years-upcoming,
  .react-datepicker__navigation--month-upcoming {
    background: url(/images/ico-arrow-drop-down@3x.png) no-repeat 50%;
    background-size: 18px;
  }
  .react-datepicker__month-option,
  .react-datepicker__year-option {
    font-size: 13pt;
    padding: 10px;
    background: #fff;
    &:hover {
      background: #f5f5f5;
    }
  }
  .react-datepicker__header__dropdown--select {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    border-bottom: none;
    background: none;
    margin: 4px 0 19px 0;
    align-items: center;
    gap: 18px;
    select {
      font-family: ${theme.font['3']};
      margin: 0 0 7px;
      font-size: 15pt;
      color: ${theme.color.black};
      background: url(/images/ico-arrow-drop-down@3x.png) no-repeat 85%;
      background-size: 17px;
      border: none;
      border-bottom: 1px solid #808080;
    }
  }
  .react-datepicker__year-select {
    width: 80px;
    option {
      display: none;
    }
    option:nth-of-type(n + 81):nth-of-type(-n + ${121 + new Date().getFullYear() - 2020}) {
      display: block;
    }
  }
  .react-datepicker__month-select {
    width: 70px;
  }
  .react-datepicker__week {
    height: 45px;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${theme.color.main}66;
  }
  .react-datepicker__day--selected {
    background-color: ${theme.color.main};
  }
  .react-datepicker__month {
    border-top: 3px double #cdd1d4;
    padding: 11px 7px;
  }
  .react-datepicker__current-month {
  }
  .react-datepicker__navigation.react-datepicker__navigation--previous {
    height: 56px;
  }
  .react-datepicker__navigation.react-datepicker__navigation--next {
    height: 50px;
  }
  .react-datepicker__month.react-datepicker__monthPicker {
    margin: 0;
    width: 220px;
  }
  .react-datepicker__month-wrapper {
    width: 100%;
    div {
      font-family: ${theme.font[2]};
      font-size: ${theme.fontSize.sm};
      width: 33%;
      height: 100%;
      margin: 0;
      padding: 10px;
    }
  }
  name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2.4rem;
    line-height: 2.7rem;
    font-size: 14pt;
    font-family: ${theme.font[2]};
  }
  .react-datepicker__day--outside-month:not(.react-datepicker__day--disabled) {
    color: #c5c5c5;
  }
  .react-datepicker__day--disabled {
    color: #e9e9e9;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__week :nth-of-type(1):not(.react-datepicker__day--disabled, .react-datepicker__day--outside-month) {
    color: ${theme.color.red};
  }
  .react-datepicker__week :nth-of-type(7):not(.react-datepicker__day--disabled, .react-datepicker__day--outside-month) {
    color: ${theme.color.hoverBlue};
  }
  .react-datepicker__day-names {
    gap: 11px;
    display: flex;
    justify-content: center;
  }
  .react-datepicker__day-name:nth-of-type(1) {
    color: ${theme.color.red};
  }
  .react-datepicker__day-name:nth-of-type(7) {
    color: ${theme.color.hoverBlue};
  }
  .react-datepicker__day--today {
    font-family: ${theme.font[4]};
  }

  &::placeholder {
    color: #93969f;
  }

  &:focus {
    padding-left: 14px;
    border: 1px solid ${theme.color.primary};
  }

  &:disabled {
    background-color: #f9f9f9;
    border: 1px solid #e2e6ee;
    color: #93989f;
  }
`;
