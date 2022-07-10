import {makeAutoObservable} from 'mobx';

interface IVehicleInspectRecord {
  // 사고 교환 수리 이력
  query: any;
  setQuery: (query: any) => void;
  pricing: any;
  setPricing: (_pricing: any) => void;
  specialty: any;
  setSpecialty: (_specialty: any) => void;
  // 자동차 종합상태
  overallQuery: any;
  setOverallQuery: (overallQuery: any) => void;
  overallPricing: any;
  setOverallPricing: (_overallPricing: any) => void;
  overallSpecialty: any;
  setOverallSpecialty: (_overallSpecialty: any) => void;
  // 자동차 세부사항
  vehicleDetailsQuery: any;
  setVehicleDetailsQuery: (vehicleDetailsQuery: any) => void;
  vehicleDetailsPricing: any;
  setVehicleDetailsPricing: (_vehicleDetailsPricing: any) => void;
  vehicleDetailsSpecialty: any;
  setVehicleDetailsSpecialty: (_vehicleDetailsSpecialty: any) => void;
  // 자동차 기타정보
  vehicleOtherInformationQuery: any;
  setVehicleOtherInformationQuery: (vehicleOtherInformationQuery: any) => void;
  vehicleOtherInformationPricing: any;
  setVehicleOtherInformationPricing: (_vehicleOtherInformationPricing: any) => void;
  vehicleOtherInformationSpecialty: any;
  setVehicleOtherInformationSpecialty: (_vehicleOtherInformationSpecialty: any) => void;

}

export default function vehicleInspectionRecordStore():any {
  const store: IVehicleInspectRecord = makeAutoObservable({
    // 사고 교환 수리 이력
    query: '',
    setQuery(query) {
      this.query = query;
    },
    pricing: '',
    setPricing(_pricing) {
      this.pricing = _pricing;
    },
    specialty: '',
    setSpecialty(_specialty) {
      this.specialty = _specialty;
    },
    // 자동차 종합상태
    overallQuery: '',
    setOverallQuery(overallQuery) {
      this.overallQuery = overallQuery;
    },
    overallPricing: '',
    setOverallPricing(_overallPricing) {
      this.overallPricing = _overallPricing;
    },
    overallSpecialty: '',
    setOverallSpecialty(_overallSpecialty) {
      this.overallSpecialty = _overallSpecialty;
    },
    // 자동차 세부사항
    vehicleDetailsQuery: '',
    setVehicleDetailsQuery(vehicleDetailsQuery) {
      this.vehicleDetailsQuery = vehicleDetailsQuery;
    },
    vehicleDetailsPricing: '',
    setVehicleDetailsPricing(_vehicleDetailsPricing) {
      this.vehicleDetailsPricing = _vehicleDetailsPricing;
    },
    vehicleDetailsSpecialty: '',
    setVehicleDetailsSpecialty(_vehicleDetailsSpecialty) {
      this.vehicleDetailsSpecialty = _vehicleDetailsSpecialty;
    },
    // 자동차 기타정보
    vehicleOtherInformationQuery: '',
    setVehicleOtherInformationQuery(vehicleOtherInformationQuery) {
      this.vehicleOtherInformationQuery = vehicleOtherInformationQuery;
    },
    vehicleOtherInformationPricing: '',
    setVehicleOtherInformationPricing(_vehicleOtherInformationPricing) {
      this.vehicleOtherInformationPricing = _vehicleOtherInformationPricing;
    },
    vehicleOtherInformationSpecialty: '',
    setVehicleOtherInformationSpecialty(_vehicleOtherInformationSpecialty) {
      this.vehicleOtherInformationSpecialty = _vehicleOtherInformationSpecialty;
    }
  });
  return store;
}
