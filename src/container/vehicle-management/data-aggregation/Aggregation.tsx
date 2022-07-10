import {Wrapper, Text, Line} from '@components/atoms';
import styled from '@emotion/styled';
import theme from '@public/theme';
import {getKrCommas} from '@modules/replaceStrings';
import {PnlType} from '@pages/data-aggregation/pnl';
import {useEffect, ReactElement} from 'react';

const Aggregation = ({data}: {data: PnlType[]}): ReactElement => {
  function PnlElement({title, amount, calcIcon, result}: {title: string; amount: number; calcIcon?: '+' | '-' | '=' | undefined; result?: boolean}) {
    return (
      <Wrapper height="46px" width="100%" flex mb="15px">
        <Wrapper width="80px" w h>
          {calcIcon && <CalcIcon w>{calcIcon}</CalcIcon>}
        </Wrapper>
        <Wrapper flex width="100px">
          <Wrapper h ml="auto" mr="0px">
            <Text type={result ? 'sectionHeading4' : 'sectionHeading5'} color={theme.color.darkgray}>
              {title}
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper flex width="270px">
          <Wrapper h ml="auto" mr="0px">
            <Text type={result ? 'sectionHeading2' : 'sectionHeading3'}>
              {getKrCommas(amount * 10000)
                .replace('억', ' 억')
                .replace('만원', ' 만원')}
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    );
  }
  useEffect(() => {
    // console.info('@@@data', data);
  }, [data]);
  return (
    <Wrapper column ml="1.5%" mr="auto">
      <Wrapper mb="15px" column>
        {data.map((_data: PnlType, index: number) => index !== data.length - 1 && <PnlElement title={_data.label} amount={_data.data} calcIcon={_data.calcIcon} key={index} />)}
      </Wrapper>
      <Line height="2px" />
      <Line height="2px" mt="-12px" />
      <PnlElement title={data[data.length - 1].label} amount={data[data.length - 1].data ?? 0} calcIcon={data[data.length - 1].calcIcon} result />
    </Wrapper>
  );
};

export default Aggregation;

const CalcIcon = styled(Wrapper)`
  width: 36px;
  height: 36px;
  border: 1px solid ${theme.color.borderColor};
  border-radius: 23px;
  position: relative;
  font-size: 31px;
  color: ${theme.color.darkgray};
  padding: 3px 0 0 0;
`;
