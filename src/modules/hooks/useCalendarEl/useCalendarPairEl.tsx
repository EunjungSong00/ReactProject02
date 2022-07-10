import {
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useState,
  useCallback,
  ForwardRefExoticComponent,
  RefAttributes,
  ForwardedRef,
  useEffect
} from 'react';
import ICommonStyle from '@interface/ICommonStyle';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import Wrapper from '@components/atoms/Wrapper';
import {CalendarWrapper} from './useCalendarElStyle';

registerLocale('ko', ko);

interface IUseCalendar extends ICommonStyle {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  style?: any;
  className?: string;
  disabled?: boolean;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  onClick?: () => void;
  monthOnly?: boolean;
  maxDate?: Date;
  autoFocus?: boolean;
  open?: boolean;
  onSelect?: () => void;
  tabIndex?: number;
  autoComplete?: string;
  version?: 'a';
}

type UseCalendarElType = [
  [Date | undefined, Date | undefined],
  [ForwardRefExoticComponent<IUseCalendar & RefAttributes<HTMLDivElement>>, ForwardRefExoticComponent<IUseCalendar & RefAttributes<HTMLDivElement>>],
  [Dispatch<SetStateAction<Date | undefined>>, Dispatch<SetStateAction<Date | undefined>>]
];
const useCalendarPairEl = (initialDate1: Date | undefined, initialDate2: Date | undefined): UseCalendarElType => {
  const [date1, setDate1] = useState<Date | undefined>(initialDate1 ? new Date(initialDate1) : undefined);
  const [date2, setDate2] = useState<Date | undefined>(initialDate2 ? new Date(initialDate2) : undefined);
  const [openTrigger, setOpenTrigger] = useState(false);

  const Calendar1 = useCallback(
    ({placeholder, className, disabled, monthOnly, maxDate, autoFocus, open, version, onSelect, onChange, ...props}: IUseCalendar, ref?: ForwardedRef<HTMLDivElement>) => {
      const [active, setActive] = useState<boolean>(false);

      return (
        <Wrapper className={className} column style={{background: active ? '#f9fcff' : '#fff'}} {...props}>
          <CalendarWrapper version={version} active={active} ref={ref} {...props}>
            <DatePicker
              onChangeRaw={(e) => e.preventDefault()}
              disabled={disabled}
              maxDate={maxDate ?? new Date()}
              selected={date1}
              onChange={(val: Date) => setDate1(val)}
              onSelect={() => {
                setActive(false);
                setOpenTrigger(true);
                onSelect && onSelect();
              }}
              locale="ko"
              dateFormat={monthOnly ? 'yyyy-MM' : 'yyyy-MM-dd'}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText={placeholder}
              showMonthYearPicker={monthOnly}
              autoFocus={autoFocus}
              open={open}
              onCalendarOpen={() => setActive(true)}
              onCalendarClose={() => setActive(false)}
              {...props}
            />
          </CalendarWrapper>
        </Wrapper>
      );
    },
    [date1]
  );
  const Calendar2 = useCallback(
    ({placeholder, className, disabled, monthOnly, maxDate, autoFocus, version, onChange, onSelect, ...props}: IUseCalendar, ref?: ForwardedRef<HTMLDivElement>) => {
      const [active, setActive] = useState<boolean>(false);

      useEffect(() => {
        setActive(openTrigger);
      }, [openTrigger]);

      return (
        <Wrapper className={className} column style={{background: active ? '#f9fcff' : '#fff'}} {...props}>
          <CalendarWrapper version={version} active={active} ref={ref} {...props}>
            <DatePicker
              onFocus={() => setOpenTrigger(true)}
              onClickOutside={() => setOpenTrigger(false)}
              open={openTrigger}
              onChangeRaw={(e) => e.preventDefault()}
              disabled={disabled}
              maxDate={maxDate ?? new Date()}
              selected={date2}
              onChange={(val: Date) => setDate2(val)}
              onSelect={() => {
                setActive(false);
                setOpenTrigger(false);
                onSelect && onSelect();
              }}
              locale="ko"
              dateFormat={monthOnly ? 'yyyy-MM' : 'yyyy-MM-dd'}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText={placeholder}
              showMonthYearPicker={monthOnly}
              autoFocus={autoFocus}
              {...props}
            />
          </CalendarWrapper>
        </Wrapper>
      );
    },
    [date2, openTrigger]
  );

  return [
    [date1, date2],
    [forwardRef(Calendar1), forwardRef(Calendar2)],
    [setDate1, setDate2]
  ];
};
export default useCalendarPairEl;
