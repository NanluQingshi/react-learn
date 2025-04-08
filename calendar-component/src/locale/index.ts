/*
 * @Author: NanluQingshi
 * @Date: 2025-04-08 09:03:24
 * @LastEditors: NanluQingshi
 * @LastEditTime: 2025-04-08 09:06:39
 * @Description: 国际化资源包入口文件
 */
import zhCN from "./zh-CN";
import enUS from "./en-US";
import { CalendarType } from "./interface";

const allLocales: Record<string, CalendarType>= {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export default allLocales;
