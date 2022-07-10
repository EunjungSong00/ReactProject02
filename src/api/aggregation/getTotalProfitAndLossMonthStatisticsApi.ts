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

export default async function getTotalProfitAndLossMonthStatistics(month: MonthType) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const token = localStorage.getItem('token');

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const query = gql`
  query {
    getTotalProfitAndLossMonthStatistics(monthType:${MonthType[month]}) {
      profitAndLoss{
        totalFinanceInterestExpense
        totalInventoryLossCost
        totalProfitAndLoss
        totalPurchase
        totalSales
      }
    }
  }
  `;

  // console.info('getTotalProfitAndLossMonthStatistics query', query);

  const response = await graphQLClient.request(query).catch((error) => {
    const extensions = error?.response.errors[0].extensions;
    const errorMessage = error?.response.errors[0].message;
    // const errorMessage = error;
    console.error('extensions', extensions);
    console.error('errorMessage', errorMessage);
    return errorMessage;
  });
  if (response) {
    // console.info('getTotalProfitAndLossMonthStatistics response', response);
  }

  return response && response;
}
