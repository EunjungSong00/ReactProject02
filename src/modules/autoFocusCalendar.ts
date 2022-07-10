import {RefObject} from 'react';

export const autoFocusCalendar = (calendarRef: RefObject<HTMLDivElement>): void => {
  calendarRef &&
    calendarRef.current &&
    calendarRef.current.children[0] &&
    calendarRef.current.children[0].children[0] &&
    calendarRef.current.children[0].children[0].children[0] &&
    (calendarRef.current.children[0].children[0].children[0] as HTMLElement)?.click();
};
