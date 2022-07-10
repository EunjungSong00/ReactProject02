import {Select, Wrapper} from '@components/atoms';
import {Section} from '@components/molecules';
import {useState, useEffect, ReactElement} from 'react';
import {Aggregation, DailyStatistics, RatioDonut} from '@container/vehicle-management';
import getTotalProfitAndLossPeriodStatisticsApi from '@api/aggregation/getTotalProfitAndLossPeriodStatisticsApi';
import getTotalProfitAndLossMonthStatisticsApi from '@api/aggregation/getTotalProfitAndLossMonthStatisticsApi';
// import getTotalCostMonthStatisticsApi from '@api/aggregation/getTotalCostMonthStatisticsApi';
// import getTotalCostPeriodStatisticsApi from '@api/aggregation/getTotalCostPeriodStatisticsApi';
import getProfitAndLossPeriodChartStatisticsApi from '@api/aggregation/getProfitAndLossPeriodChartStatisticsApi';
import getProfitAndLossMonthChartStatisticsApi from '@api/aggregation/getProfitAndLossMonthChartStatisticsApi';
import {EasyVehicleRegistration} from '@components/organisms';

export type PnlType = {
  calcIcon?: '+' | '-' | '=' | undefined;
  label: string;
  data: number;
  // totalPurchase: number;
  // totalSales: number;
  // totalProfitAndLoss: number;
  // totalFinanceInterestExpense: number;
  // totalInventoryLossCost: number;
};
const Pnl = (): ReactElement => {
  const [searchSort, setSearchSort] = useState<'월별 조회' | '기간별 조회'>('월별 조회');
  const [searchTerm, setSearchTerm] = useState<'MONTH_1' | 'MONTH_3' | 'MONTH_6' | 'YEAR'>('MONTH_1');
  // const [searchMonthDate, setSearchMonthDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [searchMonth, setSearchMonth] = useState<number>(new Date().getMonth() - 1);
  const [pnl, setPnl] = useState<PnlType[]>([
    {label: '매출총액', data: 0},
    {label: '매입제시가', data: 0, calcIcon: '-'},
    {label: '상품화비용', data: 0, calcIcon: '-'},
    {label: '금융비용', data: 0, calcIcon: '-'},
    {label: '손익', data: 0}
  ]);
  const [donutElements, setDonutElements] = useState<PnlType[]>([
    {label: '매입제시가', data: 0, calcIcon: '-'},
    {label: '상품화비용', data: 0, calcIcon: '-'},
    {label: '금융비용', data: 0, calcIcon: '-'},
    {label: '손익', data: 0}
  ]);
  const [donutTotal, setDonutTotal] = useState<PnlType>({label: '매출총액', data: 0});
  // const [pnlDetail, setPnlDetail] = useState<pnlDetailType>({
  //   totalPurchaseOffer: 0,
  //   totalRepair: 0,
  //   totalInspection: 0,
  //   totalConsignment: 0,
  //   totalFinance: 0,
  //   totalAdvertisement: 0
  // });
  const [dailyPnlStatisticsX, setDailyPnlStatisticsX] = useState<string[]>(['']);
  // const [dailyPnlStatisticsY, setDailyPnlStatisticsY] = useState<string[]>(['']);
  const [dailyPnlStatisticsY, setDailyPnlStatisticsY] = useState<string[]>(['']);

  const getTotalProfitAndLossMonthStatistics = async () => {
    const result: any = await getTotalProfitAndLossMonthStatisticsApi(searchMonth);
    result &&
      result.getTotalProfitAndLossMonthStatistics &&
      result.getTotalProfitAndLossMonthStatistics.profitAndLoss &&
      setPnl([
        {label: '매출총액', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalSales},
        {label: '매입제시가', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalPurchase, calcIcon: '-'},
        {label: '상품화비용', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalInventoryLossCost, calcIcon: '-'},
        {label: '금융비용', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalFinanceInterestExpense, calcIcon: '-'},
        {label: '손익', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalProfitAndLoss}
      ]);
    setDonutElements([
      {label: '매입제시가', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalPurchase, calcIcon: '-'},
      {label: '상품화비용', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalInventoryLossCost, calcIcon: '-'},
      {label: '금융비용', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalFinanceInterestExpense, calcIcon: '-'},
      {label: '손익', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalProfitAndLoss}
    ]);
    setDonutTotal({label: '매출총액', data: result.getTotalProfitAndLossMonthStatistics.profitAndLoss.totalSales});
  };

  const getTotalProfitAndLossPeriodStatistics = async () => {
    const result: any = await getTotalProfitAndLossPeriodStatisticsApi(searchTerm);
    result &&
      result.getTotalProfitAndLossPeriodStatistics &&
      result.getTotalProfitAndLossMonthStatistics.profitAndLoss &&
      setPnl(result.getTotalProfitAndLossPeriodStatistics.profitAndLoss);
  };

  // const getTotalCostMonthStatistics = async () => {
  //   const result: any = await getTotalCostMonthStatisticsApi(searchMonth);
  //   result && result.getTotalCostMonthStatistics && setPnlDetail(result.getTotalCostMonthStatistics.cost);
  // };

  // const getTotalCostPeriodStatistics = async () => {
  //   const result: any = await getTotalCostPeriodStatisticsApi(searchTerm);
  //   result && result.getTotalCostPeriodStatistics && setPnlDetail(result.getTotalCostPeriodStatistics.cost);
  // };

  const getProfitAndLossMonthChartStatistics = async () => {
    const result: any = await getProfitAndLossMonthChartStatisticsApi(searchMonth);
    const xAxisTemp: string[] = [];
    const yAxisSalesTemp: string[] = [];
    const yAxisPnlTemp: string[] = [];
    result &&
      result.getProfitAndLossMonthChartStatistics.map((data: any) => {
        xAxisTemp.push(`${new Date(data.date).toLocaleDateString('es').split('/')[1]}/${new Date(data.date).toLocaleDateString('es').split('/')[0]}`);
        yAxisSalesTemp.push((Number(data.sale) * 10000).toString());
        yAxisPnlTemp.push((Number(data.profitAndLoss) * 10000).toString());
      });
    setDailyPnlStatisticsX(xAxisTemp);
    // setDailyPnlStatisticsY(yAxisSalesTemp);
    setDailyPnlStatisticsY(yAxisPnlTemp);
  };

  const getProfitAndLossPeriodChartStatistics = async () => {
    const result: any = await getProfitAndLossPeriodChartStatisticsApi(searchTerm);
    const xAxisTemp: string[] = [];
    const yAxisSalesTemp: string[] = [];
    const yAxisPnlTemp: string[] = [];
    result &&
      result.getProfitAndLossPeriodChartStatistics.map((data: any) => {
        xAxisTemp.push(`${new Date(data.date).toLocaleDateString('es').split('/')[1]}/${new Date(data.date).toLocaleDateString('es').split('/')[0]}`);
        yAxisSalesTemp.push((Number(data.sale) * 10000).toString());
        yAxisPnlTemp.push((Number(data.profitAndLoss) * 10000).toString());
      });
    setDailyPnlStatisticsX(xAxisTemp);
    // setDailyPnlStatisticsY(yAxisSalesTemp);
    setDailyPnlStatisticsY(yAxisPnlTemp);
  };

  useEffect(() => {
    searchSort === '월별 조회' ? getTotalProfitAndLossMonthStatistics() : getTotalProfitAndLossPeriodStatistics();
    // searchSort === '월별 조회' ? getTotalCostMonthStatistics() : getTotalCostPeriodStatistics();
    searchSort === '월별 조회' ? getProfitAndLossMonthChartStatistics() : getProfitAndLossPeriodChartStatistics();
  }, [searchSort, searchMonth, searchTerm]);

  function PnlSettings() {
    // useEffect(() => {
    //   const searchMonthTemp = formattedDate(searchMonthDate).slice(0, 7) + '-01';
    //   setSearchMonth(searchMonthTemp);
    //   // // console.info('searchMonthDate', searchMonthDate);
    // }, [searchMonthDate]);

    // useEffect(() => {
    //   // console.info('searchMonth', searchMonth);
    // }, [searchMonth]);

    // useEffect(() => {
    //   // console.info('searchMonth', searchMonth);
    // }, [searchMonth]);

    return (
      <>
        <Select
          options={['월별 조회', '기간별 조회']}
          value={searchSort}
          width="150px"
          height="30px"
          onChange={(e) => setSearchSort(e.target.value === '월별 조회' ? e.target.value : '기간별 조회')}
        />
        {searchSort === '월별 조회' ? (
          // 달력으로 연별 선택도 가능하게 수정될것임
          // <Input
          //   width="150px"
          //   height="30px"
          //   type="calendar"
          //   monthOnly
          //   date={searchMonthDate}
          //   setDate={(date: Date) => (date === searchMonthDate ? {} : setSearchMonthDate(date))}
          //   maxDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
          // />
          <Select
            options={[
              {value: 0, label: '1월'},
              {value: 1, label: '2월'},
              {value: 2, label: '3월'},
              {value: 3, label: '4월'},
              {value: 4, label: '5월'},
              {value: 5, label: '6월'},
              {value: 6, label: '7월'},
              {value: 7, label: '8월'},
              {value: 8, label: '9월'},
              {value: 9, label: '10월'},
              {value: 10, label: '11월'},
              {value: 11, label: '12월'}
            ]}
            value={searchMonth}
            onChange={(e: any) => setSearchMonth(e.target.value)}
            width="150px"
            height="30px"
          />
        ) : (
          // 기간별 조회
          <Select
            options={[
              {value: 'MONTH_1', label: '1개월'},
              {value: 'MONTH_3', label: '3개월'},
              {value: 'MONTH_6', label: '6개월'},
              {value: 'YEAR', label: '1년'}
            ]}
            value={searchTerm}
            onChange={(e) =>
              e.target.value === 'MONTH_1' || e.target.value === 'MONTH_3' || e.target.value === 'MONTH_6' || e.target.value === 'YEAR' ? setSearchTerm(e.target.value) : {}
            }
            width="150px"
            height="30px"
          />
        )}
      </>
    );
  }

  return (
    <>
      <EasyVehicleRegistration />
      <Section
        // title={searchSort === '월별 조회' ? `${searchMonth && searchMonth.split('-')[1] && searchMonth.split('-')[1].replace('0', '')}월 손익 현황` : '손익 현황'}
        title={searchSort === '월별 조회' ? `${Number(searchMonth) + 1}월 손익 현황` : '손익 현황'}
        setting={<PnlSettings />}
      >
        <Wrapper mt={30} width="100%" w h>
          <Aggregation data={pnl} />
          <RatioDonut elements={donutElements} total={donutTotal} />
        </Wrapper>
        <DailyStatistics title="일별 손익 통계" xAxis={dailyPnlStatisticsX} yAxis={dailyPnlStatisticsY} />
      </Section>
    </>
  );
};

export default Pnl;
