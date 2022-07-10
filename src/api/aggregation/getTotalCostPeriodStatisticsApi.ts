import {gql, GraphQLClient} from 'graphql-request';

export default async function getTotalCostPeriodStatisticsApi(period: 'MONTH_1' | 'MONTH_3' | 'MONTH_6' | 'YEAR') {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const token = localStorage.getItem('token');

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const query = gql`
  query {
    getTotalCostPeriodStatistics(dateType:${period}){
      cost {
        totalPurchaseOffer  #매입제시가	1
        totalRepair #판금 및 수리비	2
        totalInspection #성능점검비	3
        totalConsignment    #탁송비	4
        totalFinance    #금융비용	5
        totalAdvertisement  #광고비	6
      }
    }
  }
  `;

  // console.info('getTotalCostPeriodStatistics query', query);

  const response = await graphQLClient.request(query).catch((error) => {
    const extensions = error?.response.errors[0].extensions;
    const errorMessage = error?.response.errors[0].message;
    console.error('extensions', extensions);
    console.error('errorMessage', errorMessage);
    return errorMessage;
  });
  if (response) {
    // console.info('getTotalCostPeriodStatistics response', response);
  }

  return response && response;
}
