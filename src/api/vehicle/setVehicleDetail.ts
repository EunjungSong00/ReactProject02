import {formattedDate, getOnlyNumber} from '@modules/replaceStrings';
import {gql, GraphQLClient} from 'graphql-request';
import {toJS} from 'mobx';

export default async function setVehicleDetail(store: any) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ?? '';
  const token = localStorage.getItem('token');
  // console.info(token);

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const list = toJS(store.vehicleFinanceList);
  const items = list.map((item: any) => ({...item, loan: Number(item.loan || 0), interestRate: parseFloat(item.interestRate), date: `${formattedDate(item.date)} 00:00:00`}));
  const temp = JSON.stringify(items);
  const unquoted = temp.replace(/"([^"]+)":/g, '$1:');

  const mutation = gql`
    mutation{
        setVehicleDetail(id:${store.id}, detail: {
            inventory: {
                advertisement: ${Number(store.advertisement || 0)},
                consignment: ${Number(store.consignment || 0)},
                etc: ${Number(store.etc || 0)},
                inspection: ${Number(store.inspection || 0)},
                loss: ${Number(store.loss || 0)},
                parkingLocation: "${store.parkingLocation}",
                repair: ${Number(store.repair || 0)},
                sheetMetal: ${Number(store.sheetMetal || 0)}
            },
            finance:${unquoted.replaceAll('"FINANCE"', 'FINANCE').replaceAll('"COMPANY"', 'COMPANY')},
            appearanceType: ${store.appearanceType},
            jatoVehicleId: "${store.vehicleId}",
            mileage:${store.mileage || 0},
            purchase:${Number(store.purchase || 0)},
            purchaseDate:"${store.purchaseDate ? formattedDate(new Date(store.purchaseDate)) : formattedDate(new Date())} 00:00:00",
            purchaseOffer:${Number(store.purchaseOffer || 0)},
            sale:${Number(store.sale || 0)},
            saleDate:"${store.saleDate ? formattedDate(new Date(store.saleDate)) : formattedDate(new Date())} 00:00:00",
            status:${store.status || 'REGISTER'},
          }){
                id
                number
                modelYear
                mileage
                manufacturer
                modelName
                modelDetail
                modelTrim
                createdDate
                jatoVehicleId
                purchaseOffer
                purchase
                status
            }
        }
    `;
  // console.info('setVehicleDetail mutation', mutation);
  const response = await graphQLClient.request(mutation).catch((error) => {
    const {extensions} = error.response.errors[0];
    const {message} = error.response.errors[0];
    console.error('extensions', extensions);
    console.error('errorMessage', message);
    return message;
  });
  if (response) {
    // console.info('setVehicleDetail response', response);
  }

  return response && response;
}
