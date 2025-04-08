/*
 * @Author: NanluQingshi
 * @Date: 2025-03-30 02:36:38
 * @LastEditors: NanluQingshi
 * @LastEditTime: 2025-04-08 09:29:02
 * @Description: 日历组件 - 年月
 */
import React, { useContext } from 'react';
import './index.scss';
import { Dayjs } from 'dayjs';
import LocaleContext from '../../context/LocaleContext';
import allLocales from '../../locale';

interface IHeaderProps {
  curMonth: Dayjs,
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}

const Header = ({ 
  curMonth, 
  prevMonthHandler, 
  nextMonthHandler,
  todayHandler 
}: IHeaderProps) => {
  const localeContext = useContext(LocaleContext);
  const CalendarContext = allLocales[localeContext.locale];

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>&lt;</div>
        <div className="calendar-header-value">{curMonth.format(CalendarContext.formatMonth)}</div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>&gt;</div>
        <div className="calendar-header-btn" onClick={todayHandler}>{CalendarContext.today}</div>
      </div>
    </div>
  );
};

export default Header;
