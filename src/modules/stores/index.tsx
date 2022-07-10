import createAuthStore from './authStore';
import createDetailVehicleMgtStore from './detailVehicleMgtStore';
import createEasyVehicleSearchStore from './easyVehicleSearchStore';
import createVehicleInspectionRecordStore from './vehicleInspectionRecordStore';
import createNiceStore from './niceStore';

export default {
  authStore: createAuthStore(),
  detailVehicleMgtStore: createDetailVehicleMgtStore(),
  easyVehicleSearchStore: createEasyVehicleSearchStore(),
  vehicleInspectionRecordStore: createVehicleInspectionRecordStore(),
  niceStore: createNiceStore()
};
