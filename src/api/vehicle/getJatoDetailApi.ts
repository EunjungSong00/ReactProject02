import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function getJatoDetail(jatoId: string) {
  const query = `
        query {
          getJatoDetail(
            jatoId: "${jatoId}"
              ) {
                    transmission
                    fuel
                    maxPower
                    fuelConsumption
                    engineDisplacement
                    price
                    wheelDrive
              }
        }
    `;

  return graphQLClientRequest(query);
}
