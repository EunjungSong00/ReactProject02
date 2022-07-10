export const getAdditionalCost = (vehicleInventory: any): number =>
  vehicleInventory?.sheetMetal ??
  0 + vehicleInventory?.repair ??
  0 + vehicleInventory?.advertisement ??
  0 + vehicleInventory?.inspection ??
  0 + vehicleInventory?.consignment ??
  0 + vehicleInventory?.etc ??
  0 + vehicleInventory?.loss ??
  0;

export const getPnlCost = (
  sale: number,
  vehicleInventory: any,
  purchaseOffer: number,
  purchase: number,
  vehicleFinanceList: {loan: number; interestRate: number; date: string}[]
): number =>
  // // console.info('@@@@@', sale, vehicleInventory, purchaseOffer, purchase, vehicleFinanceList);
  sale -
  (vehicleInventory?.sheetMetal +
    vehicleInventory?.repair +
    vehicleInventory?.advertisement +
    vehicleInventory?.inspection +
    vehicleInventory?.consignment +
    vehicleInventory?.etc +
    vehicleInventory?.loss +
    purchaseOffer +
    purchase +
    Math.floor(getInterestCost(vehicleFinanceList)));
export const getInterestCost = (vehicleFinanceList: {loan: number; interestRate: number; date: string}[]): number => {
  let interestCost = 0;
  let i = 0;
  const now: any = new Date();
  if (vehicleFinanceList?.length === 0) return 0;
  while (i < vehicleFinanceList?.length) {
    const vehicleFinance = vehicleFinanceList[i];
    const date: any = new Date(vehicleFinance.date);
    const difDay: number = Math.floor(Math.abs(now - date) / (1000 * 3600 * 24));
    interestCost += Math.round((((vehicleFinance.loan * vehicleFinance.interestRate) / 100) * difDay) / 360);
    // // console.info('interestCost', i, Math.round((((vehicleFinance.loan * vehicleFinance.interestRate) / 100) * difDay) / 360));
    i += 1;
  }
  return interestCost;
};

export const getTotalCost = (vehicleInventory: any, purchaseOffer: number, purchase: number, vehicleFinanceList: {loan: number; interestRate: number; date: string}[]): number =>
  vehicleInventory?.sheetMetal +
  vehicleInventory?.repair +
  vehicleInventory?.advertisement +
  vehicleInventory?.inspection +
  vehicleInventory?.consignment +
  vehicleInventory?.etc +
  vehicleInventory?.loss +
  purchaseOffer +
  purchase +
  Math.floor(getInterestCost(vehicleFinanceList));

export const getTotalCost2 = (vehicleInventory: any, purchase: number, transferCost: number, vehicleFinanceList: {loan: number; interestRate: number; date: string}[]): number =>
  vehicleInventory?.sheetMetal +
  vehicleInventory?.inspection +
  vehicleInventory?.consignment +
  vehicleInventory?.etc +
  transferCost +
  purchase +
  Math.floor(getInterestCost(vehicleFinanceList));
