import type { Meta, StoryObj } from '@storybook/react';
import Calendar, { ICalendarProps } from '../calendar/index';
import dayjs from 'dayjs';

const meta = {
  title: '日历组件',
  component: Calendar,
  parameters: {
      layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderCalendar = (args: ICalendarProps) => {
  if(typeof args.value === 'number') {
    return <Calendar {...args} value={dayjs(new Date(args.value))}/>
  }

  return <Calendar {...args}/>
}

export const Value: Story = {
  args: {
    value: dayjs('2025-04-08'),
  },
  render: renderCalendar,
};

export const DateRender: Story = {
  args: {
    value: dayjs('2025-04-08'),
    dateRender(currentDate) {
      return <div>
        日期{currentDate.date()}
      </div>
    },
  },
  render: renderCalendar,
};

export const DateInnerContent: Story = {
  args: {
    value: dayjs('2025-04-08'),
    dateInnerContent(currentDate) {
      return <div>
        日期{currentDate.date()}
      </div>
    },
  },
  render: renderCalendar,
};

export const Locale: Story = {
  args: {
    value: dayjs('2025-04-08'),
    locale: 'en-US',
  },
  render: renderCalendar,
};
