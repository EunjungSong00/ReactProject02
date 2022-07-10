export const validateId = (value: string): string => {
  let bool = false;
  let result = '';
  if (value !== '') {
    bool = /^[a-z0-9]{6,10}$/.test(value) && /^(?=.*[a-z]).{6,10}$/.test(value);
    !bool ? (result = '6~10자의 영문(소문자)과 숫자만을 조합해주세요.') : '';
  }
  return result;
};

export const validateEmail = (value: string): string => {
  let bool = false;
  let result = '';
  if (value !== '') {
    bool = /^[\w+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(value);
    !bool ? (result = '이메일이 맞는지 확인해주세요.') : '';
  }
  return result;
};

export const validatePassword = (value: string, id: string): string => {
  let bool = false;
  let result = '';
  if (value !== '') {
    bool = /^[a-zA-Z0-9\_\`\~\․\!\@\\\#\$\%\^\&\*\(\)\-\+\=\[\]\[\]\|\;\:\'\"\<\>\,\.\?\/\{\}\"\']{8,15}$/.test(value) && /^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/.test(value);
    !bool ? (result = '8~15자의 영문과 숫자를 포함해주세요(특수기호 포함 가능).') : value.includes(id) ? (result = '비밀번호에 아이디가 포함될 수 없습니다.') : '';
  }
  return result;
};

export const validatePasswordCheck = (value: string, password: string): string => {
  let bool = false;
  let result = '';
  if (value !== '') {
    bool = value === password;
    !bool ? (result = '비밀번호가 일치하지 않습니다.') : '';
  }
  return result;
};

export const validatePhone = (value: any): string => {
  let bool = false;
  let result = '';
  if (value) {
    bool = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(`${value}`);
    !bool ? (result = '번호를 올바르게 입력하세요.') : '';
  }
  return result;
};

/* 문의하기 이름 */
export const validateName = (value: string): string => {
  let bool = false;
  let result = '';
  if (value !== '') {
    bool = value.trim().length >= 2;
    !bool ? (result = '이름을 입력해주세요') : '';
  }
  return result;
};

/* 사업자 등록번호 체크 */
export const checkBusinessNumber = (value: string): boolean => {
  const numberMap = value
    .replace(/-/gi, '')
    .split('')
    .map((d) => parseInt(d, 10));

  if (numberMap.length == 10) {
    const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    let chk = 0;

    keyArr.forEach((d, i) => {
      chk += d * numberMap[i];
    });

    chk += parseInt(String((keyArr[8] * numberMap[8]) / 10), 10);
    return Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10;
  }

  return false;
};
