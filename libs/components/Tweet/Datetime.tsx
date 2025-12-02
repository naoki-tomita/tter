"use client";

type DatetimeFormatter = (date: Date) => string;

const defaultFormatter: DatetimeFormatter = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
export const Datetime = ({ style, date, formatter = defaultFormatter }: { style?: React.CSSProperties, date: Date, formatter?: DatetimeFormatter }) => {
  return (
    <span style={style}>{formatter(date)}</span>
  )
}
