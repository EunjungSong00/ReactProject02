import {gql, GraphQLClient} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

enum ImprovementAnswerType {
  INCONVENIENT_SERVICE,
  LACK_OF_ADDITIONAL_FEATURES,
  NO_REQUIRED_INFORMATION
}

enum ShortcomingAnswerType {
  AUTOMATIC_VEHICLE_REGISTRATION,
  IDENTIFY_BUYING_TRENDS,
  INVENTORY_MANAGEMENT
}

enum SatisfactionAnswerType {
  AUTOMATIC_VEHICLE_REGISTRATION,
  IDENTIFY_BUYING_TRENDS,
  INVENTORY_MANAGEMENT
}

type QueryType = {
  improvementList: string[];
  satisfactionList: string[];
  shortcomingList: string[];
  opinion: string;
  password: string;
}

export default async function withdrawalPartnerApi({improvementList, satisfactionList, shortcomingList, opinion, password}: QueryType): Promise<any> {
  const mutation = gql`
    mutation {
      withdrawalPartner(
        request: {
          ${improvementList.length ?
            `improvementList: {
              ${improvementList.includes('서비스 불편함') ? 'answer:INCONVENIENT_SERVICE' : ''}
              ${improvementList.includes('추가 기능이 부족함') ? 'answer:LACK_OF_ADDITIONAL_FEATURES' : ''}
              ${improvementList.includes('필요한 정보가 없음') ? 'answer:NO_REQUIRED_INFORMATION' : ''}
            }`
            : ''
          }
          ${satisfactionList.length ?
            `satisfactionList: {
                ${satisfactionList.includes('차량 자동 등록') ? 'answer:AUTOMATIC_VEHICLE_REGISTRATION' : ''}
                ${satisfactionList.includes('매입 추세 파악') ? 'answer:IDENTIFY_BUYING_TRENDS' : ''}
                ${satisfactionList.includes('재고관리 데이터') ? 'answer:INVENTORY_MANAGEMENT' : ''}
              }`
              : ''
          }
          ${shortcomingList.length ?
            `shortcomingList: {
              ${shortcomingList.includes('차량 자동 등록') ? 'answer:AUTOMATIC_VEHICLE_REGISTRATION' : ''}
              ${shortcomingList.includes('매입 추세 파악') ? 'answer:IDENTIFY_BUYING_TRENDS' : ''}
              ${shortcomingList.includes('재고관리 데이터') ? 'answer:INVENTORY_MANAGEMENT' : ''}
            }`
            : ''
          }
          opinion: "${opinion.replaceAll('\n', '<span><br/></span>')}"
          ${password ? `password: "${password}"` : ''}
        }
      ){
        dealer {
          assocType
          dealerNum
          dealerName
          position
        },
        deletedDate,
        email,
        id
      }
    }
  `;
  // console.log('mut', mutation);
  const response = await graphQLClientRequest(mutation, undefined);
  // console.log('res', response);
  return response && response;
}
