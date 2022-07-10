import {Text} from '@components/atoms';
import {Section} from '@components/molecules';
import styled from '@emotion/styled';
import {ReactElement} from 'react';
import {getKrCommas} from '@modules/replaceStrings';
import theme from '@public/theme';

const _Inventory = ({response}: any): ReactElement => {
  const status: any = response?.getVehicleDashBoardInventory?.status ?? [{status: 'NEW', count: 0}];
  const size: any = response?.getVehicleDashBoardInventory?.size;
  return (
    <Section>
      <Text type="sectionHeading4">재고 현황</Text>
      <Container>
        <LeftCont>
          {status &&
            [
              ['신규', status[status.findIndex((el: any) => el.status === 'NEW')]?.count.toString() ?? '0'],
              ['등록중', status[status.findIndex((el: any) => el.status === 'REGISTER')]?.count.toString() ?? '0'],
              ['판매중', status[status.findIndex((el: any) => el.status === 'SALE')]?.count.toString() ?? '0'],
              ['판매완료', status[status.findIndex((el: any) => el.status === 'SALE_COMPLETE')]?.count.toString() ?? '0']
            ].map((parsedStatus: string[], index: number) => (
              <Circle key={index}>
                <Text type="sectionTableHeader" pt={14} pb={10} color={theme.color.darkgray}>
                  {parsedStatus[0]}
                </Text>
                <Text weight="5" size="xl" color={index ? theme.color.black : theme.color.main}>
                  {parsedStatus[1]}
                </Text>
              </Circle>
            ))}
        </LeftCont>
        <RightCont>
          <Text arrow type="sectionHeading6">
            전체 재고 규모
          </Text>
          <NumbText>
            <span>{size && size.totalAmount ? getKrCommas(size.totalAmount * 10000) : 0}</span>
          </NumbText>
          {size &&
            [
              ['총 재고수량', '대'],
              ['재고평균일수', '일']
            ].map((item, index) => (
              <AvgCont key={index}>
                <Text type="sectionBodyText" color={theme.color.darkgray}>
                  {item[0]}
                </Text>
                <Text type="sectionBodyText">
                  <Numb>{index ? size.averageDay ?? 0 : size.totalCount ?? 0}</Numb>
                  {item[1]}
                </Text>
              </AvgCont>
            ))}
        </RightCont>
      </Container>
    </Section>
  );
};

export default _Inventory;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
const LeftCont = styled.div`
  margin-top: 50px;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Circle = styled.div`
  display: inline-block;
  width: 117px;
  height: 117px;
  border-radius: 59px;
  border: 8px solid ${theme.color.bg};
  text-align: center;
  margin: 0 5px;
`;

const RightCont = styled.div`
  margin-top: 10px;
`;

const NumbText = styled.p`
  font-size: 32px;
  min-width: 270px;
  font-family: ${theme.font['3']};
  padding: 20px 0;
  span {
    font-family: ${theme.font['5']};
  }
`;

const AvgCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Numb = styled.span`
  font-size: ${theme.fontSize.md};
  color: ${theme.color.black};
  font-family: ${theme.font['5']};
  padding-right: 10px;
`;
