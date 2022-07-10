import React, {memo, ReactNode, useMemo} from 'react';
import Select, {StylesConfig} from 'react-select';

const selectOption = {
  padding: '12px 5px 11px',
  fontSize: '14px'
};

interface ISelectImg {
  options: Array<any>;
  value?: string | number;
  onChange: any;
  placeholder?: ReactNode;
  isDisabled: boolean;
  type: string;
}

const _SelectImg = ({options, value, onChange, placeholder, isDisabled, type}: ISelectImg) => {
  const setIcon = (value = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      background: `url(/images/${type}/${type}_${value + 1}.png) no-repeat`,
      backgroundSize: '100%',
      content: '" "',
      display: 'block',
      marginRight: 8,
      marginTop: -3,
      // padding: 10,
      height: 20,
      width: 20
    }
  });

  const customStyles: StylesConfig = useMemo(
    () => ({
      option: (styles, {data}: any) => ({
        ...styles,
        ...setIcon(data?.index),
        padding: '15px 15px 12px',
        borderBottom: 'solid 1px #e2e6ee',
        fontSize: selectOption.fontSize,
        imageRendering: '-webkit-optimize-contrast'
      }),
      control: (styles) => ({
        ...styles,
        width: '100%',
        border: 'solid 1px #e2e6ee',
        fontSize: selectOption.fontSize
      }),
      singleValue: (styles, {data}: any) => ({
        ...styles,
        ...setIcon(data?.index),
        padding: selectOption.padding,
        fontSize: selectOption.fontSize
      }),
      input: (styles) => ({
        ...styles,
        padding: selectOption.padding,
        fontSize: selectOption.fontSize
      }),
      placeholder: (styles) => ({
        ...styles,
        padding: selectOption.padding,
        fontSize: selectOption.fontSize
      })
    }),
    []
  );

  return (
    <Select
      id={`${type}Select`}
      value={value}
      instanceId={`${type}Select`}
      options={options}
      styles={customStyles}
      onChange={onChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
    />
  );
};
export default memo(_SelectImg);
