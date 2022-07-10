import {useState, useEffect, ReactElement, useCallback} from 'react';
import {Text, Wrapper, Select} from '@components/atoms';
import {Chart} from 'src/components/organisms';
import theme from 'public/theme';
import {Section} from '@components/molecules';
import {useRouter} from 'next/router';
import useSelect from '@modules/hooks/useSelect';
import useQueries, {IQueries} from '@modules/hooks/useQueries';
import getVehicleDashBoardSaleApi from '@api/home/getVehicleDashBoardSaleApi';

const DailySales = ({response, query}: any): ReactElement => {
  const router = useRouter();
  const [saleTerm, onChangeSaleTerm] = useSelect<number>(Number(query?.saleTerm) || 0);
  const [termDate, setTermDate] = useState<string[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [yAxis, setYAxis] = useState<string[]>([]);
  const queryVal: IQueries = {
    response,
    value: {saleTerm},
    api: () => getVehicleDashBoardSaleApi(Number(saleTerm))
  };
  const [res, clickSearch] = useQueries(queryVal);

  useEffect(() => {
    const _xAxis: string[] = [];
    res &&
      res.getVehicleDashBoardSale &&
      res.getVehicleDashBoardSale.saleStatistics.map((_data: any) => {
        _xAxis.push(getParsedXAxis(_data.date));
        setXAxis(_xAxis);
      });
    const _yAxis: string[] = [];
    res &&
      res.getVehicleDashBoardSale &&
      res.getVehicleDashBoardSale.saleStatistics.map((_data: any) => {
        _yAxis.push(getParsedYAxis(_data.cost));
        setYAxis(_yAxis);
      });
  }, [res]);

  const getParsedXAxis = useCallback((date) => `${new Date(date).toLocaleDateString('es').split('/')[1]}/${new Date(date).toLocaleDateString('es').split('/')[0]}`, []);
  const getParsedYAxis = useCallback((cost) => (Number(cost) * 10000).toString(), []);

  useEffect(() => {
    saleTerm !== Number(query?.saleTerm) && clickSearch();
  }, [saleTerm]);

  function DateSelect() {
    return (
      <Wrapper mr="0px" ml="auto" h>
        <Text size="13px" mr="15px">
          {termDate && termDate.length
            ? `${new Date(termDate[0]).toLocaleDateString().replace('.', '년').replace('.', '월').replace('.', '일')} ~ ${new Date(termDate[1])
                .toLocaleDateString()
                .substring(6)
                .replace('.', '월')
                .replace('.', '일')}`
            : ''}
        </Text>
        <Select
          value={saleTerm}
          options={[
            {value: 1, label: '1개월'},
            {value: 0, label: '3개월'},
            {value: 2, label: '6개월'},
            {value: 3, label: '1년'}
          ]}
          onChange={(e: any) => onChangeSaleTerm(e.target.value)}
          width="130px"
          height="36px"
        />
      </Wrapper>
    );
  }

  return (
    <Section>
      <Wrapper column>
        <Wrapper display="flex" width="100%">
          <Wrapper style={{cursor: 'pointer'}} onClick={() => router.push('/data-aggregation/cost')}>
            <Text arrow type="sectionHeading4">
              기간별 비용
            </Text>
          </Wrapper>
          <DateSelect />
        </Wrapper>
        <Wrapper mt="20px">
          <Chart type="line" width="100%" height={250} xAxis={xAxis} yAxis={yAxis} color={theme.color.main} yAxisType="억원" />
        </Wrapper>
      </Wrapper>
    </Section>
  );
};

export default DailySales;
