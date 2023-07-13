import { add, sub } from "date-fns";
import { startOfMonth, getDaysInMonth, startOfWeek } from "date-fns";
import { subMonths, addMonths, getMonth } from "date-fns";
import { format } from "date-fns";

export const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const today = new Date();

export const previousWeek = sub(today, { weeks: 1 });
export const nextWeek = add(today, { weeks: 1 });
export const firstDayOfWeek = startOfWeek(today);

export const getWeekDates = (startDate?: Date) => {
  const _today = startDate ? new Date(startDate) : new Date();
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(_today.getTime() - i * 24 * 60 * 60 * 1000);
    weekDates.push(date);
  }

  return weekDates;
};

export const currentMonth = getMonth(today);
export const previousMonth = subMonths(today, 1);
export const nextMonth = addMonths(today, 1);

export const firstDayOfMonth = startOfMonth(today);
export const monthLength = getDaysInMonth(today);

export const getMonthDates = (month?: number, year?: number) => {
  const currentDate = new Date();
  const targetMonth = month ?? currentDate.getMonth();
  const targetYear = year ?? currentDate.getFullYear();

  const monthDates = [];
  const startDate = new Date(targetYear, targetMonth, 1);
  const endDate = new Date(targetYear, targetMonth + 1, 0);

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    monthDates.push(new Date(date));
  }

  return monthDates;
};

export const todayToLocale = today.toLocaleDateString();

export const formatDate = (date: string, _format?: string) => {
  const _date = new Date(+date);
  return format(_date, _format ?? "dd/MM/yyyy");
};
