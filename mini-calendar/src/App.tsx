import React, { useEffect, useRef } from 'react';
import Calendar, { CalendarRef } from './components/Calendar';
import './index.css'

function App() {
  const calendarRef = useRef<CalendarRef>(null);

  // useEffect(() => {
  //   console.log(calendarRef.current?.getDate().toLocaleDateString());
  //   setTimeout(() => {
  //     calendarRef.current?.setDate(new Date(2025, 3, 28));
  //   }, 3000)
  // }, []);

  return (
    <div>
      <Calendar ref={calendarRef}></Calendar>
    </div>
  )
}

export default App