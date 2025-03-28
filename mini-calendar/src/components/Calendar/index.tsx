import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './index.css';

const monthNames = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];

export interface ICalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export interface CalendarRef {
  getDate: () => Date;
  setDate: (dat: Date) => void;
}

const Calendar = forwardRef<CalendarRef, ICalendarProps>((props, ref) => {
  const {
    value = new Date(),
    onChange
  } = props;
  const [date, setDate] = useState(value);

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      }
    }
  });

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // 获取指定年月的天数
  const daysOfMonth = (year: number, month: number) => {
    // 示例:
    // daysOfMonth(2023, 1) 返回 31 - 一月有31天
    // daysOfMonth(2023, 2) 返回 28 - 二月有28天(非闰年)
    console.log('dom...', month);
    /* 0 是获取上个月的最后一天，所以 month + 1 */
    return new Date(year, month + 1, 0).getDate();
  };

  // 获取指定年月第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    // 示例:
    // firstDayOfMonth(2023, 1) 返回 0 - 一月一号是星期日
    // firstDayOfMonth(2023, 2) 返回 3 - 二月一号是星期三
    console.log('fdm....', month);
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    // 获取上个月的天数
    const prevMonthDays = daysOfMonth(date.getFullYear(), date.getMonth() - 1);
    // 填充上个月的日期
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthDays - firstDay + i + 1;
      days.push(
        <div key={`empty-${i}`} className="empty prev-month">
          {day}
        </div>
      );
    }

    for (let i = 1; i <= daysCount; i++) {
      // 创建点击事件处理函数,将选中的日期通过 onChange 回调传递给父组件
      const clickHandler = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i));
      if (i === date.getDate()) {
        days.push(<div key={i} className="day selected" onClick={clickHandler}>{i}</div>);
      } else {
        days.push(<div key={i} className="day" onClick={clickHandler}>{i}</div>);
      }
    }

    // 计算当前月份的总天数(包括第一天的偏移量)
    const totalDays = firstDay + daysCount;
    // 计算还需要补充多少天才能填满最后一行
    const remainingSpaces = 7 - (totalDays % 7);
    // 如果不是正好填满(即 remainingSpaces 不等于7),则需要补充下个月的日期
    if (remainingSpaces !== 7) {
      // 补充下个月的前几天
      for (let i = 1; i <= remainingSpaces; i++) {
        days.push(
          <div key={`next-${i}`} className="empty next-month">
            {i}
          </div>
        );
      }
    }

    return days;
  }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{date.getFullYear()} 年 {date.getMonth() + 1} 月</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
})

export default Calendar;
