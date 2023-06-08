"use client";

import React, { useState } from "react";

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleDateClick = (date: Date) => {
    // setSelectedDate(date);
    console.log("Abrir modal para visualizar eventos");
  };

  const startDate = new Date();
  const months = [
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

  const renderCalendarWeek = () => {
    const days = [];

    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      days.push(currentDate);
    }

    return days.map((date) => (
      <div
        key={date.toDateString()}
        onClick={() => handleDateClick(date)}
        className="border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 w-[11vw] h-[70vh]"
      >
        <div className="flex justify-center text-2xl font-semibold center mt-5">
          {date.getDate()}
        </div>
        <div className="flex justify-center mb-3">
          {date
            .toLocaleDateString("es-PE", { weekday: "long" })
            .charAt(0)
            .toUpperCase()}
          {date.toLocaleDateString("es-PE", { weekday: "long" }).slice(1)}
        </div>
      </div>
    ));
  };

  return (
    <section className="ml-10 mt-10">
      <h1 className="Documents__title">Calendario</h1>
      <input type="text" className="Documents__search" />
      <div className="flex justify-between mb-2">
        <h2 className="Documents__subtitle mb-4">{months[startDate.getMonth()]}</h2>
        <input type="button" className='border-2 border-[#FF4D84] px-2 rounded-md text-[#FF4D84] hover:bg-gray-100' value="SEMANA" />
      </div>

      <div className="flex gap-4 wrap ">{renderCalendarWeek()}</div>
    </section>
  );
};

export default SchedulePage;
