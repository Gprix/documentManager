"use client";

import React from "react";
import {
  format,
  parse,
  eachDayOfInterval,
  endOfMonth,
  isSameMonth,
  isToday,
  getDay,
} from "date-fns";

const CalendarMonth = ({currMonth, today }) => {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "jueves",
    "Viernes",
    "Sabado",
  ];

  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];


  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(firstDayOfMonth),
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
        {days.map((day, idx) => {
          return (
            <div key={idx} className="font-semibold">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-6 sm:gap-12 mt-8 place-items-center">
        {daysInMonth.map((day, idx) => {
          return (
            <div key={idx} className={colStartClasses[getDay(day)]}>
              <p
                className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full  hover:text-white ${
                  isSameMonth(day, today) ? "text-gray-900" : "text-gray-400"
                } ${!isToday(day) && "hover:bg-red-500"} ${
                  isToday(day) && "bg-blue-500 text-white"
                }`}
              >
                {format(day, "d")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;
