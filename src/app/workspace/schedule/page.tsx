"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase.config";
import { collection, addDoc } from 'firebase/firestore';

const SchedulePage = () => {
  const [modalFlag, setModal] = useState<boolean>(false);
  const [eventData, setEventData] = useState<Object>({
    clientName: "",
    date: "",
    time: null,
    description: "",
  });
  const [_data, setData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData = window.localStorage.getItem("key");

      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  const handleDateClick = () => {
    setModal(!modalFlag);
    console.log("Abrir modal para visualizar eventos");
  };

  const handleChangeForm = (e: Object) => {
    // @ts-ignore
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: Object) => {
    // @ts-ignore
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "appointments"), eventData);
      console.log(
        "Objeto JSON enviado correctamente. ID del documento: ",
        docRef.id
      );
    } catch (error) {
      console.error("Error al enviar el objeto JSON a Firestore: ", error);
    }

    setEventData({ clientName: "", date: "", time: null, description: "" });
    setModal(false);
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

  const renderEventForm = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-[50vw] h-[50vh]">
          <div className="flex justify-between items-center px-4 py-2">
            <h2 className="text-xl font-semibold">Eventos</h2>
            <button
              className="text-2xl font-semibold text-gray-500 hover:text-gray-700"
              onClick={() => setModal(false)}
            >
              X
            </button>
          </div>
          <form
            className="flex items-start flex-col px-10 pt-10 space-y-10 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full">
              <label className="w-1/3 flex items-center">Nombre Cliente:</label>
              <input
                className="border-2 border-gray-300 rounded-md px-2  w-full"
                type="text"
                name="clientName"
                // @ts-ignore
                value={eventData.clientName}
                onChange={handleChangeForm}
              />
            </div>

            <div className="flex w-full">
              <label className="w-1/4 flex items-center">Fecha:</label>
              <input
                className="border-2 border-gray-300 rounded-md px-2  w-full"
                type="date"
                name="date"
                // @ts-ignore
                value={eventData.date}
                onChange={handleChangeForm}
              />

              <label className="w-1/4 flex items-center pl-3">Hora:</label>
              <input
                className="border-2 border-gray-300 rounded-md px-2  w-full"
                type="time"
                name="time"
                // @ts-ignore
                value={eventData.time}
                onChange={handleChangeForm}
              />
            </div>
            <div className="flex w-full">
              <label className="w-1/4 flex items-center">Descripcion:</label>
              <input
                className="border-2 border-gray-300 rounded-md px-2  w-full"
                type="text"
                name="description"
                // @ts-ignore
                value={eventData.description}
                onChange={handleChangeForm}
              />
            </div>
            <button
              className=" bg-[#FF4D84] px-2 rounded-md text-[#FAFAFA] text-2l p-2"
              type="submit"
            >
              Save Event
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderCalendarWeek = () => {
    const days = [];

    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      days.push(currentDate);
    }

    return days.map((date) => {
      return (
        <div
          key={date.toDateString()}
          className="border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 w-[11vw] h-[70vh]"
        >
          <div className="flex justify-center text-2xl font-semibold center mt-5">
            {date.toLocaleDateString() === new Date().toLocaleDateString() ? (
              <div
                key={date.toLocaleDateString()}
                className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-[#FAFAFA] text-l"
              >
                {date.getDate()}
              </div>
            ) : (
              date.getDate()
            )}
          </div>
          <div className="flex justify-center mb-3">
            {date
              .toLocaleDateString("es-PE", { weekday: "long" })
              .charAt(0)
              .toUpperCase()}
            {date.toLocaleDateString("es-PE", { weekday: "long" }).slice(1)}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="ml-10 mt-10">
      <h1 className="Documents__title">Calendario</h1>
      <input type="text" className="Documents__search" />
      <div className="flex justify-between mb-2">
        <h2 className="Documents__subtitle mb-4">
          {months[startDate.getMonth()]}
        </h2>
        <input
          type="button"
          className="border-2 border-[#FF4D84] px-2 rounded-md text-[#FF4D84] hover:bg-gray-100"
          value="SEMANA"
        />
      </div>

      <div className="flex gap-4 wrap ">{renderCalendarWeek()}</div>
      <div className="fixed top-[90%] left-[85%]">
        <button
          className=" bg-[#FF4D84] px-2 rounded-md text-[#FAFAFA] text-2l p-2"
          onClick={handleDateClick}
        >
          Añadir
        </button>
      </div>
      <div className={`flex gap-4 wrap ${!modalFlag ? "hidden" : ""}`}>
        {renderEventForm()}
      </div>
    </section>
  );
};

export default SchedulePage;
