import {gql, GraphQLClient} from 'graphql-request';

enum MonthType {
  JANUARY,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER
}

export default async function getProfitAndLossMonthChartStatisticsApi(month: MonthType) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const token = localStorage.getItem('token');

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const query = gql`
  query {
    getProfitAndLossMonthChartStatistics(monthType:${MonthType[month]}){
        date
        #sale
        profitAndLoss
    }
  }
  `;

  // console.info('getProfitAndLossMonthChartStatistics query', query);

  const response = await graphQLClient.request(query).catch((error) => {
    const extensions = error?.response.errors[0].extensions;
    const errorMessage = error?.response.errors[0].message;
    console.error('extensions', extensions);
    console.error('errorMessage', errorMessage);
    return errorMessage;
  });
  if (response) {
    // console.info('getProfitAndLossMonthChartStatistics response', response);
  }

  return response && response;
}
