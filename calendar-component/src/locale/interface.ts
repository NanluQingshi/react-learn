/*
 * @Author: NanluQingshi
 * @Date: 2025-04-08 08:53:16
 * @LastEditors: NanluQingshi
 * @LastEditTime: 2025-04-08 09:34:49
 * @Description: 国际化配置
 */
export interface CalendarType {
  formatYear: string;
  formatMonth: string;
  today: string;
  month: {
    January: string;
    February: string;
    March: string;
    April: string;
    May: string;
    June: string;
    July: string;
    August: string;       
    September: string;
    October: string;
    November: string;
    December: string;
  } & Record<string, any>;
  week: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  } & Record<string, any>
}
