import {Dispatch, SetStateAction, ChangeEventHandler, forwardRef, Ref, KeyboardEventHandler, useState, useCallback, ForwardRefExoticComponent, RefAttributes} from 'react';
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

type UseCalendarElType = [Date | undefined, ForwardRefExoticComponent<IUseCalendar & RefAttributes<HTMLElement>>, Dispatch<SetStateAction<Date | undefined>>];
const useCalendar = (initialDate: Date | undefined): UseCalendarElType => {
  const [date, setDate] = useState<Date | undefined>(initialDate ? new Date(initialDate) : undefined);

  const Calendar = useCallback(
    ({placeholder, className = 'calendar', disabled, monthOnly, maxDate, autoFocus, open, version, onChange, onSelect, ...props}: IUseCalendar, ref?: Ref<HTMLElement>) => {
      const [active, setActive] = useState<boolean>(false);

      return (
        <Wrapper className={className} column style={{background: active ? '#f9fcff' : disabled ? '#f9f9f9' : '#fff'}} {...props}>
          <CalendarWrapper version={version} active={active} ref={ref} {...props}>
            <DatePicker
              onChangeRaw={(e) => e.preventDefault()}
              disabled={disabled}
              maxDate={maxDate ?? new Date()}
              selected={date}
              onChange={(val: Date) => setDate(val)}
              onSelect={() => {
                setActive(false);
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
    [date]
  );

  return [date, forwardRef(Calendar), setDate];
};
export default useCalendar;
