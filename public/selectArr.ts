import {SearchType} from '@api/mypage/qna/qnaListApi';
import {EPartnerPosition} from '@api/auth/signUpPartnerApi';
import {EDealersAssociationType} from '@api/auth/authenticateDealerApi';
import {CorporationType} from '@api/auth/certificationCorporationApi';

export const statusArr: any = {
  COMPLETED: {title: '답변완료', color: '#0073e7'},
  DELETE: {title: '삭제', color: 'red'},
  WAITING: {title: '미답변', color: 'darkgray'}
};

export const dealersAssociationTypeArr = [
  {value: EDealersAssociationType[0], label: '한국자동차매매사업조합연합회'},
  {value: EDealersAssociationType[1], label: '전국자동차매매사업조합연합회'}
];

export const corporationTypeArr = [
  {value: CorporationType[0], label: '법인사업자'},
  {value: CorporationType[1], label: '개인사업자'}
];

export const positionArr = [
  {value: EPartnerPosition[0], label: '사업주'},
  {value: EPartnerPosition[1], label: '딜러'}
];

export const categoryArr = ['차량 조회 결과', '대표 차량 소유주명', '매물 등록', '이미지 업로드', '주변 매물 검색', '프로세스 개선', '기타'];

export const columnArr = [
  {value: SearchType[0], label: '제목 + 내용'},
  {value: SearchType[1], label: '제목'},
  {value: SearchType[2], label: '내용'}
];
export const statusOpt = [
  {
    value: 'SALE',
    label: '판매중'
  },
  {
    value: 'SALE_COMPLETED',
    label: '판매완료'
  },
  {
    value: 'REGISTER',
    label: '등록중'
  },
  {
    value: 'CONSIGNMENT',
    label: '탁송중'
  }
];
export const appearanceTypeOpt = [
  {
    value: '',
    label: '선택'
  },
  {
    value: 'COUPE',
    label: '쿠페'
  },
  {
    value: 'HATCH_BAG',
    label: '해치백'
  },
  {
    value: 'PICK_UP',
    label: '픽업트럭'
  },
  {
    value: 'RV',
    label: 'RV'
  },
  {
    value: 'SEDAN',
    label: '세단'
  },
  {
    value: 'SUV',
    label: 'SUV'
  }
];
export const detaiolOption1 = [
  [
    ['마사지시트 (뒷좌석)', 'interior_back_massage_seats'],
    ['마사지시트(동승석)', 'interior_passenger_massage_seats'],
    ['마사지시트(운전석, 동승석)', 'interior_driver_massage_seats']
  ],
  [
    ['메모리시트(동승석)', 'interior_passenger_memory_seat'],
    ['메모리시트(운전석)', 'interior_driver_memory_seat'],
    ['시트재질', 'interior_seat_main_seat_material']
  ],
  [
    ['열선시트(뒷자석)', 'interior_back_heated_seat'],
    ['열선시트(앞좌석)', 'interior_front_heated_seat'],
    ['전동시트(동승석)', 'interior_passenger_electric_seat']
  ],
  [
    ['전동시트(뒷자석)', 'interior_back_electric_seat'],
    ['전동시트(운전석)', 'interior_driver_electric_seat'],
    ['커튼/블라인드(뒷자석)', 'interior_back_blind']
  ],
  [
    ['커튼/블라인드(후방)', 'interior_rear_blind'],
    ['통풍시트(동승석)', 'interior_passenger_ventilated_seats'],
    ['통풍시트(뒷자석)', 'interior_back_ventilated_seats']
  ],
  [
    ['통풍시트(운전석)', 'interior_driver_ventilated_seats'],
    ['하이패스', 'utility_hipass'],
    ['고스트 도어 클로징', 'utility_automatic_door_closing']
  ],
  [
    ['루프랙', 'exterior_roof_rails'],
    ['썬루프', 'exterior_sun_roof'],
    ['알루미늄휠', 'exterior_rim_type']
  ],
  [
    ['오토라이트', 'exterior_auto_light'],
    ['전동접이 사이드 미러', 'exterior_side_mirror'],
    ['파워전동트렁크', 'utility_electric_trunk']
  ],
  [['헤드램프', 'exterior_head_lamp']]
];
export const detaiolOption2 = [
  [
    ['내비게이션', 'multimedia_navigation'],
    ['레인센서', 'exterior_rain_sensor'],
    ['미끄럼 방지 (TCS)', 'safety_tcs']
  ],
  [
    ['브레이크 잠김방지 (ABS)', 'safety_abs'],
    ['사이드 에어백', 'safety_side_airbag'],
    ['어댑티브 크루즈 컨트롤', 'utility_adaptive_cruise_control']
  ],
  [
    ['에어백 (운전석,동승석)', 'safety_airbag'],
    ['열선 스티어링 휠', 'exterior_heated_steering_wheel'],
    ['전자식 주차브레이크(EPB)', 'utility_epb']
  ],
  [
    ['전자제어 서스펜션 (ECS)', 'safety_ecs'],
    ['주차감지센서(전방)', 'safety_front_parking_sensor'],
    ['주차감지센서(후방)', 'safety_rear_parking_sensor']
  ],
  [
    ['차선이탈 경보시스템(LDWS)', 'safety_ldws'],
    ['차체 자세 제어장치 (ESC)', 'safety_esc'],
    ['커튼에어백', 'safety_curtain_airbag']
  ],
  [
    ['타이어 공기압 센서 (TPMS)', 'safety_tpms'],
    ['패들', 'utility_paddle_shift'],
    ['시프트 후방카메라', 'safety_rear_parking_camera']
  ],
  [
    ['후측방 경고시스템', 'safety_rear_warning_sensor'],
    ['ECM 룸미러', 'interior_ecm_room_mirror'],
    ['', '']
  ]
];
export const detaiolOption3 = [
  [
    ['360도 어라운드뷰', 'safety_around_view_parking_camera'],
    ['뒷좌석 AV 모니터 (BS: 앞좌석뒷면)', 'multimedia_back_av_monitor'],
    ['블루투스', 'multimedia_bluetooth']
  ],
  [
    ['앞좌석 AV 모니터', 'multimedia_front_av_monitor'],
    ['헤드업디스플레이', 'multimedia_front_av_monitor'],
    ['AUX단자', 'multimedia_aux']
  ],
  [
    ['CD 플레이어', 'multimedia_inc_single_cd'],
    ['USB단자', 'multimedia_usb'],
    ['무선도어 잠금장치', 'utility_wireless_door_lock']
  ],
  [
    ['스마트키', 'utility_smart_card_key'],
    ['스티어링 휠 리모컨', 'utility_steering_wheel_remote_control'],
    ['자동에어컨', 'air_conditioning']
  ],
  [
    ['전동조절 스티어링 휠', 'exterior_motorized_steering_wheel'],
    ['파워 스티어링 휠', 'interior_power_steering_wheel'],
    ['파워 윈도우', 'interior_power_windows']
  ]
];
