import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';
import nookies from 'nookies';

export default function getCorporationSettlementAccount(options?: ApiOptionsType): any {
  const context = options?.context;
  const cookies = nookies.get(context);
  const user = JSON.parse(cookies.carPartnerUserInfo);
  const {corporation} = user;
  const {id} = corporation;

  const query = `
     query {
      getCorporationSettlementAccount(corporationId: ${id}) {
        id
        accountHolder
        number
        createdDate
        updatedDate
        bank {
          id
          name
        }
        corporation {
          id
        }
        finalModifierPartner {
          id
        }
      }
    }
  `;

  // console.log('query', query);
  if (options?.getGql) return query;
  const response = graphQLClientRequest(query, options?.context);
  return response;
}
