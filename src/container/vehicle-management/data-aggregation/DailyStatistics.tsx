import {Wrapper, Text} from '@components/atoms';
import {Chart} from '@components/organisms';
import theme from '@public/theme';

const DailyStatistics = ({title, xAxis, yAxis}: {title: string; xAxis: string[]; yAxis: string[]}) => {
  return (
    <Wrapper>
      <Text type="sectionHeading5" ml={20} mt={50}>
        {title}
      </Text>
      <Chart type="line" width="100%" height={250} xAxis={xAxis} yAxis={yAxis} yAxisType="억원" colors={theme.color.main} />
    </Wrapper>
  );
};

export default DailyStatistics;
