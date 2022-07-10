import {Wrapper, Text} from '@components/atoms';
import {Chart} from '@components/organisms';
import {PnlType} from '@pages/data-aggregation/pnl';
import {useState, useEffect} from 'react';
import theme from '@public/theme';

const RatioDonut = ({elements, total}: {elements: PnlType[]; total: PnlType}) => {
  const [labelArr, setLabelArr] = useState<string[]>([]);
  const [dataArr, setDataArr] = useState<number[]>([]);
  useEffect(() => {
    let labelArrTemp: string[] = [];
    let dataArrTemp: number[] = [];
    elements.map((el: PnlType) => {
      labelArrTemp.push(el.label);
      dataArrTemp.push(el.data);
    });
    setLabelArr(labelArrTemp);
    setDataArr(dataArrTemp);
  }, [elements]);
  return (
    <Wrapper width="calc(100% - 540px)" w>
      {total.data !== 0 ? (
        <Chart
          width="430px"
          height="430px"
          type="donut"
          donutData={dataArr}
          donutLabels={labelArr}
          donutColors={['#00000088', '#00000066', '#00000011', theme.color.subColors[1]]}
          totalValue={total.data}
          totalLabel={total.label}
        />
      ) : (
        <Text type="listZero" padding="30px">
          손익은 판매 완료된 차량을 기준으로 산정됩니다
          <br />
          <br />
          차량 판매를 완료해주세요
        </Text>
      )}
    </Wrapper>
  );
};
export default RatioDonut;
