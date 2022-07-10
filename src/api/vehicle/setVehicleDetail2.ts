import graphQLClientRequest from '@api/graphQLClientRequest';
import {formattedDate} from '@modules/replaceStrings';
import {toJS} from 'mobx';

export default async function setVehicleDetail(store: any) {
  const list = toJS(store.vehicleFinanceList);
  const items = list.map((item: any) => ({...item, loan: Number(item.loan || 0), interestRate: parseFloat(item.interestRate), date: `${formattedDate(item.date)} 00:00:00`}));
  const temp = JSON.stringify(items);
  const unquoted = temp.replace(/"([^"]+)":/g, '$1:');
  console.log('store', store)
  const mutation = `
    mutation{
        setVehicleDetail(id:${store.id}, detail: {
            inventory: {
                consignment: ${Number(store.consignment || 0)},
                etc: ${Number(store.etc || 0)},
                inspection: ${Number(store.inspection || 0)},
                parkingLocation: "${store.parkingLocation}",
                sheetMetal: ${Number(store.sheetMetal || 0)}
            },
            finance:${unquoted.replaceAll('"FINANCE"', 'FINANCE').replaceAll('"COMPANY"', 'COMPANY')},
            appearanceType: ${store.appearanceType},
            jatoVehicleId: "${store.jatoVehicleId}",
            mileage:${store.mileage || 0},
            purchase:${Number(store.purchase || 0)},
            transferCost:${Number(store.transferCost || 0)},
            purchaseDate:"${store.purchaseDate ? formattedDate(new Date(store.purchaseDate)) : formattedDate(new Date())} 00:00:00",
            sale:${Number(store.sale || 0)},
            saleDate:"${store.saleDate ? formattedDate(new Date(store.saleDate)) : formattedDate(new Date())} 00:00:00",
            ${store.dealerId && `dealerId: ${store.dealerId}`}
          }){
                status
            }
        }
    `;
    // console.log('mutation', mutation);
    return graphQLClientRequest(mutation);
}
