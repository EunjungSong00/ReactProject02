import theme from '@public/theme';
import styled from '@emotion/styled';
import {Wrapper} from '@components/atoms';

export const CalendarWrapper = styled.div<any>`
  min-height: 42px;
  width: ${({width}) => width ?? '170px'};
  height: ${({height}) => height ?? '42px'};
  border-radius: 4px;

  input {
    font-family: ${theme.font.regular};
    font-size: 15px;
    ${({height}) => height || 'min-height: 42px'};
    height: ${({height}) => height ?? '42px'};
    width: 100%;
    border: solid 1px ${({active}) => (active ? '#0073e8' : '#d8d8d8')};
    border-radius: 2px;
    padding-left: 14px;
    outline: 0 none;
    padding-right: ${({paddingRight}) => paddingRight ?? '40px'};
    background: url(/images/ic-calendar.svg) no-repeat ${({paddingRight}) => (paddingRight ? '94.5%' : '94%')} 50%;
    caret-color: transparent;
  }
  input::placeholder {
    color: #666666;
    opacity: 0.4;
  }

  font-family: ${theme.font.bold};
  .react-datepicker-wrapper {
    display: block;
    height: ${({height}) => height ?? '42px'};
  }
  .react-datepicker__input-container {
    height: ${({height}) => height ?? '42px'};
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
    font-family: ${theme.font.regular};
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
      font-family: ${theme.font.regular};
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
    font-family: ${theme.font.medium} !important;
    width: 80px;
    option {
      display: none;
    }
    option:nth-of-type(n + 81):nth-of-type(-n + ${121 + new Date().getFullYear() - 2020}) {
      display: block;
    }
  }
  .react-datepicker__month-select {
    font-family: ${theme.font.medium} !important;
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
    font-family: ${theme.font.bold} !important;
    color: white !important;
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
      font-family: ${theme.font.light};
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
    font-family: ${theme.font.light};
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
    font-family: ${theme.font.medium};
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

export const Dash = styled(Wrapper)<any>`
  width: ${({width}) => width || '10px'};
  height: ${({height}) => height || '1px'};
  margin: ${({margin}) => margin || '20px 5px'};
  background: ${({background}) => background || '#666'};
`;
