import graphQLClientRequest from '@api/graphQLClientRequest';
import {formattedDate} from '@modules/replaceStrings';
import {toJS} from 'mobx';

export default async function saleRegistration(data: any) {
  const list = toJS(data.vehicleFinanceList);
  const items = list.map((item: any) => ({...item, loan: Number(item.loan || 0), interestRate: parseFloat(item.interestRate), date: `${formattedDate(item.date)} 00:00:00`}));
  const temp = JSON.stringify(items);
  const unquoted = temp.replace(/"([^"]+)":/g, '$1:');
  // console.log('data', data);
  const mutation = `
    mutation{
        saleRegistration(id:${data.id}, request: {
            purchaseDate:"${data.purchaseDate ? formattedDate(new Date(data.purchaseDate)) : formattedDate(new Date())} 00:00:00",
            saleDate:"${data.saleDate ? formattedDate(new Date(data.saleDate)) : formattedDate(new Date())} 00:00:00",
            purchase:${Number(data.purchase || 0)},
            transferCost:${Number(data.transferCost || 0)},
            salePrice:${Number(data.salePrice || 0)},
            inventory: {
                consignment: ${Number(data.consignment || 0)},
                etc: ${Number(data.etc || 0)},
                inspection: ${Number(data.inspection || 0)},
                parkingLocation: "${data.parkingLocation}",
                sheetMetal: ${Number(data.sheetMetal || 0)}
            },
            finance:${unquoted.replaceAll('"FINANCE"', 'FINANCE').replaceAll('"COMPANY"', 'COMPANY')},
            mileage:${data.mileage || 0},
            jatoVehicleId: "${data.jatoVehicleId}",
            pickupZipCode:"${data.pickupZipCode}"
            pickupAddress:"${data.pickupAddress}"
            pickupAddressDetail:"${data.pickupAddressDetail}"
            pickupLatitude:${data.pickupLatitude}
            pickupLongitude:${data.pickupLongitude}
          }){
                status
            }
        }
    `;
  // console.log('mutation', mutation);
  return graphQLClientRequest(mutation);
}
