import {gql, GraphQLClient} from 'graphql-request';

export default async function getProfitAndLossPeriodChartStatisticsApi(period: 'MONTH_1' | 'MONTH_3' | 'MONTH_6' | 'YEAR') {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const token = localStorage.getItem('token');

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const query = gql`
  query {
    getProfitAndLossPeriodChartStatistics(dateType:${period}){
        date
        #sale
        profitAndLoss
      }
    }
  `;

  // console.info('getProfitAndLossPeriodChartStatistics query', query);

  const response = await graphQLClient.request(query).catch((error) => {
    const extensions = error?.response.errors[0].extensions;
    const errorMessage = error?.response.errors[0].message;
    console.error('extensions', extensions);
    console.error('errorMessage', errorMessage);
    return errorMessage;
  });
  if (response) {
    // console.info('getProfitAndLossPeriodChartStatistics response', response);
  }

  return response && response;
}
