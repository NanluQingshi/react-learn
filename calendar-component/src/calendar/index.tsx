/*
 * @Author: NanluQingshi
 * @Date: 2025-03-30 01:53:27
 * @LastEditors: NanluQingshi
 * @LastEditTime: 2025-04-08 09:38:06
 * @Description: 日历组件
 */
import React, { CSSProperties, ReactNode, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import cs from 'classnames';
import './index.scss';
import CalendarHeader from '../components/header';
import MonthCalendar from '../components/month-calendar';
import LocaleContext from '../context/LocaleContext';

export interface ICalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

const Calendar = ({ value, style, className, locale, onChange }: ICalendarProps) => {
  const [curValue, setCurValue] = useState(value);
  const [curMonth, setCurMonth] = useState(value);
  const classNames = cs("calendar", className);

  const changeDate = (date: Dayjs) => {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  };

  function selectHandler(date: Dayjs) {
    changeDate(date);
  };

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'));
  };

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'));
  };

  function todayHandler() {
    const date = dayjs(new Date());
    changeDate(date);
  };

  return (
    <LocaleContext.Provider value={{
      locale: locale || navigator.language
    }}>
      <div className={classNames} style={style}>
        <CalendarHeader 
          curMonth={curMonth} 
          prevMonthHandler={prevMonthHandler} 
          nextMonthHandler={nextMonthHandler} 
          todayHandler={todayHandler} 
        />
        {/* 将日期传递给 MonthCalendar */}
        <MonthCalendar 
          value={curValue} 
          curMonth={curMonth} 
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
};

export default Calendar;
