import { createContext } from "react";

export interface ILocaleContexType {
  locale: string;
}

const LocaleContext = createContext<ILocaleContexType>({
  locale: 'zh-CN',
});

export default LocaleContext;
