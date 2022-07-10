import {EasyVehicleRegistration} from '@components/organisms';
import {SalesCompletionHistory} from '@container/vehicle-management/index';
import {ReactElement} from 'react';
import {getParsedResponse} from '@modules/replaceStrings';
import {GetServerSideProps} from 'next';
import getSaleCompletedListApi, {SalesCompletionHistoryType} from '@api/vehicle/getSaleCompletedListApi';

const SalesCompletion = ({pageProps}: any): ReactElement => (
  <>
    <EasyVehicleRegistration />
    <SalesCompletionHistory response={pageProps.response[0]} query={pageProps.query} />
  </>
);
export default SalesCompletion;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context?.query;
  const queries: SalesCompletionHistoryType = {
    keyword: query.keyword?.toString(),
    pageNo: Number(query.pageNo),
    pageSize: Number(query.pageSize),
    sort: query.sort?.toString(),
    direction: query.direction?.toString(),
    start: query.start?.toString(),
    end: query.end?.toString()
  };
  return getParsedResponse(context, [await getSaleCompletedListApi(queries, context)]);
};
