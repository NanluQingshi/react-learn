/*
 * @Author: NanluQingshi
 * @Date: 2025-03-30 02:36:58
 * @LastEditors: NanluQingshi
 * @LastEditTime: 2025-04-08 09:39:12
 * @Description: 日历组件 - 周天
 */
import React, { useContext } from 'react';
import { Dayjs } from 'dayjs';
import cs from 'classnames';
import { ICalendarProps } from '../../calendar';
import './index.scss';
import LocaleContext from '../../context/LocaleContext';
import allLocales from '../../locale';

interface IMonthCalendarProps extends ICalendarProps{
  curMonth: Dayjs,
  selectHandler?: (date: Dayjs) => void;
};

interface IDaysInfo {
  date: Dayjs;
  currentMonth: boolean;
};

function getAllDays(date: Dayjs) {
  /* 月份日数 */
  const daysInMonth = date.daysInMonth();
  /* 该月的起始日期 */
  const startDate = date.startOf('month');
  /* 这天是星期几 */
  const day = startDate.day();

  const daysInfo: Array<IDaysInfo> = new Array(6 * 7);
  /* 填充本月之前的日期 */
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false,
    };
  }
  /* 填充剩下的日期 */
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() == date.month(),
    };
  }

  return daysInfo;
};

const MonthCalendar = ({ 
  value, 
  curMonth,
  dateRender, 
  dateInnerContent, 
  selectHandler 
}: IMonthCalendarProps) => {
  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const allDays = getAllDays(curMonth);

  const localeContext = useContext(LocaleContext);
  const CalendarLocale = allLocales[localeContext.locale];

  /* 渲染数据 */
  function renderDays(days: Array<IDaysInfo>) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = <div 
          className={"calendar-month-body-cell " + (item.currentMonth ? "calendar-month-body-cell-current" : "")} 
          key={i * 7 + j}
          onClick={() => selectHandler?.(item.date)}
        >
        {
          dateRender ? dateRender(item.date) : (
            <div className="calendar-month-body-cell-date">
              <div className={
                cs("calendar-month-body-cell-date-value",
                  value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                  ? "calendar-month-body-cell-date-selected"
                  : ""
                )
              }>{item.date.date()}</div>
              <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
            </div>
          )
        }
        </div>;
      }
      rows.push(row);
    }
    return rows.map((row, index) => <div className="calendar-month-body-row" key={index}>{row}</div>);
  };

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {renderDays(allDays)}
      </div>
    </div>
  );
};

export default MonthCalendar;
