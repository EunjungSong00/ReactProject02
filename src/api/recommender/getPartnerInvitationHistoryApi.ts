import graphQLClientRequest, {ContextType} from '@api/graphQLClientRequest';

type QueryType = {
  pageNo?: number;
  keyword?: string;
};

export default function getPartnerInvitationHistoryApi({pageNo, keyword}: QueryType, context?: ContextType): any {
  const query = `
    query {
      getPartnerInvitationHistory(
        request: {
          pageNo: ${Number(pageNo) ? Number(pageNo) - 1 : 0}
          pageSize: 10
          ${keyword ? `keyword: "${keyword}"` : ''}
        }
      ) {
        totalPages
        results {
          email
          phoneNumber
          name
          dealerNumber
          loginId
          complexName
          companyName
          partnerYN
          createdDate
        }
      }
    }
  `;

  const response = graphQLClientRequest(query, context);
  return response;
}
