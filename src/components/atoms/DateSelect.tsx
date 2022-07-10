import styled from '@emotion/styled';
import theme from '../../../public/theme';

const DateOptionList = [
  {
    dateNumb: 7
  },
  {
    dateNumb: 14
  },
  {
    dateNumb: 30
  },
  {
    dateNumb: 60
  },
  {
    dateNumb: 90
  }
];

const _DateSelect = () => (
  <DateSelect>
    <DateText>2021년 3월 1일 ~ 3월 15일</DateText>
    <select>
      {DateOptionList.map((item, index) => (
        <option key={index} value={item.dateNumb}>
          Last {item.dateNumb} Days
        </option>
      ))}
    </select>
  </DateSelect>
);

export default _DateSelect;

export const DateText = styled.span`
  display: inline-block;
  font-family: ${theme.font['3']};
  font-size: 12px;
  padding-right: 10px;
`;

export const DateSelect = styled.p`
  select {
    width: 130px;
    height: 32px;
    border: 1px solid ${theme.color.borderColor};
    border-radius: 4px;
    padding-left: 12px;
    background: url(/images/ico-arrow-drop-down@2x.png) no-repeat 90% 52%;
    background-size: 12px;

    &:focus {
      outline: none;
    }
    &:focus-visible {
      outline: none;
    }
  }
`;
