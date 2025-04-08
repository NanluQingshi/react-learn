/*
 * @Author: NanluQingshi
 * @Date: 2025-03-30 01:45:09
 * @LastEditors: NanluQingshi
 * @LastEditTime: 2025-04-08 09:13:25
 * @Description: 
 */
import React from 'react';
import dayjs from 'dayjs';
import Calendar from './calendar';

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs(new Date())}/>
    </div>
  );
};

export default App;
