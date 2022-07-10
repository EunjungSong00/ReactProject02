import {Line, Wrapper, Text} from '@components/atoms';
import {detaiolOption1, detaiolOption2, detaiolOption3} from '@public/selectArr';
import theme from '@public/theme';
import {observer, inject} from 'mobx-react';
import {Fragment, useEffect, useState} from 'react';

const DetailedOptions = (props: any) => {
  const {data} = props;
  const [options, setOptions] = useState([]);

  function onCheckOpt(value: string): string {
    return options.join().includes(value) ? theme.color.main : 'gray';
  }

  useEffect(() => {
    const result: string = data.jatoDetail.optionKey.join();
    setOptions(data.jatoDetail.optionKey);

    detaiolOption1.map((items: any) => {
      items.map((item: any) => {
        // eslint-disable-next-line no-unused-expressions
        result.includes(item[1]) ? item.push(`${theme.color.main}`) : item.push('gray');
      });
    });
    detaiolOption2.map((items: any) => {
      items.map((item: any) => {
        // eslint-disable-next-line no-unused-expressions
        result.includes(item[1]) ? item.push(`${theme.color.main}`) : item.push('gray');
      });
    });
    detaiolOption3.map((items: any) => {
      items.map((item: any) => {
        // eslint-disable-next-line no-unused-expressions
        result.includes(item[1]) ? item.push(`${theme.color.main}`) : item.push('gray');
      });
    });
  }, [data]);

  return (
    <Wrapper>
      <Text weight="4">기본(외관/내장)</Text>
      <Line height="1px" width="100%" mt={10} />
      {detaiolOption1.map((items: any, opIndex: number) => (
        <Fragment key={opIndex}>
          <Wrapper flex mt={14} mb={14}>
            {items.map((item: any, index: number) => (
              <Text key={index} flex={1} textAlign="left" weight="2" color={onCheckOpt(item[1])} size="12px">
                {item[0]}
              </Text>
            ))}
          </Wrapper>
          <Line height="1px" width="100%" mt={10} />
        </Fragment>
      ))}

      <Text weight="4" mt={60}>
        안전
      </Text>
      <Line height="1px" width="100%" mt={10} />
      {detaiolOption2.map((items: any, opIndex: number) => (
        <Fragment key={opIndex}>
          <Wrapper flex mt={14} mb={14}>
            {items.map((item: any, index: number) => (
              <Text key={index} flex={1} textAlign="left" weight="2" color={onCheckOpt(item[1])} size="12px">
                {item[0]}
              </Text>
            ))}
          </Wrapper>
          <Line height="1px" width="100%" mt={10} />
        </Fragment>
      ))}

      <Text weight="4" mt={60}>
        편의/멀티미디어
      </Text>
      <Line height="1px" width="100%" mt={10} />
      {detaiolOption3.map((items: any, opIndex: number) => (
        <Fragment key={opIndex}>
          <Wrapper flex mt={14} mb={14}>
            {items.map((item: any, index: number) => (
              <Text key={index} flex={1} textAlign="left" weight="2" color={onCheckOpt(item[1])} size="12px">
                {item[0]}
              </Text>
            ))}
          </Wrapper>
          <Line height="1px" width="100%" mt={10} />
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default inject('detailVehicleMgtStore')(observer(DetailedOptions));
