import dynamic from 'next/dynamic';
import {ApexOptions} from 'apexcharts';
import theme from 'public/theme';
import styled from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import {getKrCommas} from '@modules/replaceStrings';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

interface IChart extends ICommonStyle {
  type: 'line' | 'bar' | 'donut';
  // | 'area'
  // | 'histogram'
  // | 'pie'
  // | 'radialBar'
  // | 'scatter'
  // | 'bubble'
  // | 'heatmap'
  // | 'treemap'
  // | 'boxPlot'
  // | 'candlestick'
  // | 'radar'
  // | 'polarArea'
  // | 'rangeBar';
  width: string | number;
  height: string | number;
  xAxis?: string[];
  yAxis?: string[] | string[][];
  yAxisName?: string[];
  donutData?: number[];
  donutLabels?: string[];
  donutColors?: string[];
  totalValue?: number;
  totalLabel?: string;
  colors?: string | string[];
  yAxisType?: '억원' | '개' | '대' | '건'; // 값에 커서 올렸을 때 나타나는 hover text
}

const Charts = (props: IChart) => {
  const series =
    props.type === 'donut'
      ? props.donutData
      : props.yAxis && Array.isArray(props.yAxis[0])
      ? [
          {
            data: props.yAxis[0],
            name: props.yAxisName && props.yAxisName[0]
          },
          {
            data: props.yAxis[1],
            name: props.yAxisName && props.yAxisName[1]
          }
        ]
      : [
          {
            data: props.yAxis
          }
        ];

  const options: ApexOptions =
    props.type === 'donut'
      ? {
          chart: {
            height: 550,
            stacked: true,
            zoom: {enabled: false},
            animations: {enabled: false},
            selection: {enabled: false}
          },
          labels: props.donutLabels,
          colors: props.donutColors,
          tooltip: {
            enabled: true,
            intersect: false,
            fillSeriesColor: true,
            onDatasetHover: {
              highlightDataSeries: false
            },
            y: {
              formatter: (val: number, apex: any): string => (props.donutLabels ? `[${props.donutLabels[apex.dataPointIndex]}] ${getKrCommas(val * 10000)}` : '-')
            },
            marker: {
              show: true
            }
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                    label: props.totalLabel ?? '합계',
                    formatter(): string {
                      return props.totalValue
                        ? getKrCommas(props.totalValue * 10000)
                        : props.donutData
                        ? getKrCommas(props.donutData.reduce((a: number, b: number) => a + b, 0) * 10000)
                        : '-';
                    }
                  }
                }
              }
            }
          }
        }
      : {
          tooltip: {fillSeriesColor: true},
          chart: {
            dropShadow: {
              enabled: false,
              enabledOnSeries: undefined,
              top: 1.5,
              left: 1.5,
              blur: 2,
              color: 'gray',
              opacity: 0.5
            },
            height: 550,
            // stacked: true,
            zoom: {enabled: false},
            animations: {enabled: false}
          },
          markers: {
            strokeColors: props.colors ? (Array.isArray(props.colors) ? props.colors : [props.colors]) : [theme.color.main],
            size: 4,
            colors: ['#fff'],
            hover: {
              size: 7
            }
          },
          colors: props.colors ? (Array.isArray(props.colors) ? props.colors : [props.colors]) : [theme.color.main],
          dataLabels: {
            // marker위치에 값 표현
            enabled: false
            // style: {colors: props.colors ? (Array.isArray(props.colors) ? props.colors : [props.colors]) : [theme.color.main]}
          },
          stroke: {
            width: [2, 2]
          },
          grid: {show: true, borderColor: theme.color.lineGray},
          xaxis: {
            categories: props.xAxis,
            tickPlacement: 'between'
          },
          states: {active: {filter: {type: 'darken'}}},
          yaxis: [
            {
              show: false,
              labels: {
                show: true,
                formatter(val: number | string, apex: any): string {
                  // // console.info('apex', apex);
                  return props.yAxisType === '억원'
                    ? getKrCommas(val)
                    : props.yAxisType === '개'
                    ? `${val.toString()}개`
                    : props.yAxisType === '대'
                    ? `${val.toString()}대`
                    : props.yAxisType === '건'
                    ? `${val.toString()}건`
                    : val.toString();
                }
              },
              tooltip: {
                enabled: false // true시 현재 커서 위치 y값 실시간 render
              }
            },
            {
              show: false,
              opposite: false,
              labels: {
                show: true,
                formatter(val: number | string, apex: any): string {
                  // // console.info('apex', apex);
                  return props.yAxisType === '억원'
                    ? getKrCommas(val)
                    : props.yAxisType === '개'
                    ? `${val.toString()}개`
                    : props.yAxisType === '대'
                    ? `${val.toString()}대`
                    : props.yAxisType === '건'
                    ? `${val.toString()}건`
                    : val.toString();
                }
              },
              tooltip: {
                enabled: false // true시 현재 커서 위치 y값 실시간 render
              }
            }
          ]
        };

  return (
    <_Chart labelColors={props.colors}>
      <ReactApexChart options={options} series={series} type={props.type} height={props.height} width={props.width} />
    </_Chart>
  );
};

export default Charts;

const _Chart = styled.div<any>`
  .apexcharts-tooltip {
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
    &.apexcharts-theme-light .apexcharts-tooltip-title {
      display: none;
      border-bottom: 0;
      font-weight: bold;
    }
    /* &.apexcharts-theme-light {
      background: ${theme.color.main};
      border-radius: 5px;
    } */
    .apexcharts-tooltip-text-value {
      font-weight: normal;
      color: #fff;
    }
  }
  .apexcharts-gridline {
    width: 100%;
    stroke: #e2e6ee;
    stroke-dasharray: 2;
  }
  .apexcharts-tooltip-text-y-label {
    color: white;
    font-family: ${theme.font[3]};
    font-size: 13px;
    font-weight: 900;
  }
  .apexcharts-xaxis line,
  .apexcharts-xaxis-tick,
  .apexcharts-xcrosshairs,
  .apexcharts-xaxistooltip,
  .apexcharts-tooltip-marker,
  .apexcharts-yaxis line {
    display: none !important;
  }
  .apexcharts-tooltip-text-y-label,
  .apexcharts-yaxis,
  .apexcharts-yaxis-texts-g,
  .apexcharts-yaxis-texts-g > text {
    display: none !important;
  }
  .apexcharts-tooltip-text-y-value {
    font-family: ${theme.font['3']};
    color: #fff;
    font-size: 13px;
    margin: 0;
  }
  .apexcharts-tooltip-series-group {
    &.apexcharts-active {
      height: 35px;
    }
    padding: 4px 12px;
  }
  .apexcharts-xaxis-texts-g text tspan {
    font-family: ${theme.font['3']};
    font-size: 11px;
    color: ${theme.color.black};
  }
  /* donut */
  .apexcharts-legend-series {
    display: flex;
    align-items: center;
    pointer-events: none;
  }
  .apexcharts-text.apexcharts-datalabel-label {
    color: #000;
    font-family: ${theme.font[3]};
    font-size: 20px;
    font-weight: 500;
  }
  .apexcharts-text.apexcharts-datalabel-value {
    color: #000 !important;
    font-family: ${theme.font[4]};
    font-size: 20px;
    font-weight: 800;
  }
`;
