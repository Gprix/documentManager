"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { format, parse, startOfToday, add } from "date-fns";
import CalendarWeek from "@/components/calendar/calendarWeek";
import CalendarMonth from "@/components/calendar/calendarMonth";

const schedulePage = () => {
  const [modalFlag, setModal] = useState<boolean>(false);
  const [eventData, setEventData] = useState<Object>({
    clientName: "",
    date: "",
    time: null,
    description: "",
  });
  const [_data, setData] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedHour, setSelectedHour] = useState([]);
  const [viewType, setViewType] = useState<boolean>(true);
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData = window.localStorage.getItem("key");

      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }

    getDocuments();
  }, []);

  const getDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data().clientName, " ", doc.data().date);
      //@ts-ignore
      setClientNames((prev) => [...prev, doc.data().clientName]);
      let dias = new Date(doc.data().date);
      dias.setDate(dias.getDate() + 1);
      //@ts-ignore
      setAppointments((prev) => [...prev, dias.toDateString()]);
      //@ts-ignore
      setSelectedHour((prev) => [...prev, doc.data().time]);
    });
  };

  const handleDateClick = () => {
    setModal(!modalFlag);
    console.log("Abrir modal para visualizar eventos");
  };

  const handlevViewTypeChange = () => {
    setViewType(!viewType);
    setStartDate(new Date());
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

    window.location.reload();
  };

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

  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const getPrevWeek = () => {
    const prevWeek = new Date(startDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setStartDate(prevWeek);
  };

  const getNextWeek = () => {
    const nextWeek = new Date(startDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setStartDate(nextWeek);
  };

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
    const nextWeek = new Date(startDate);
    nextWeek.setDate(nextWeek.getDate() - 31);
    setStartDate(nextWeek);
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
    const nextWeek = new Date(startDate);
    nextWeek.setDate(nextWeek.getDate() + 31);
    setStartDate(nextWeek);
  };

  const handleNextEvent = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (viewType) {
      getNextWeek();
    } else {
      getNextMonth();
    }
  };

  const handlePrevEvent = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (viewType) {
      getPrevWeek();
    } else {
      getPrevMonth();
    }
  };

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

  const renderAppointment = (title: string, hour: string) => {
    return (
      <button className="flex border border-solid border-green-500 rounded-lg flex-col justify-center items-center w-full h-full mt-4 ">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p className="text-xs font-semibold">{title}</p>
          <p className="text-xs font-semibold">{hour}</p>
        </div>
      </button>
    );
  };

  return (
    <section className="m-10 flex-grow">
      <h1 className="Documents__title">Calendario</h1>
      <input type="text" className="Documents__search" />
      <div className="flex justify-between mb-2">
        <h2 className="Documents__subtitle mb-4">
          {months[startDate.getMonth()]}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              className="cursor-pointer font-bold"
              onClick={() => {
                handlePrevEvent;
              }}
            >
              &lt;
            </button>
            <button
              className="cursor-pointer font-bold"
              onClick={() => {
                handleNextEvent;
              }}
            >
              &gt;
            </button>
          </div>
          <div>
            <button
              className={`border-2 border-[#FF4D84] py-2 
            ${viewType ? "px-8" : "px-4"} 
            rounded-md text-[#FF4D84] hover:bg-gray-100`}
              onClick={handlevViewTypeChange}
            >
              {viewType ? "Mes" : "Semana"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex mb-10">
        {viewType ? (
          <CalendarWeek
            startDate={startDate}
            appointments={appointments}
            selectedHour={selectedHour}
            renderAppointment={renderAppointment}
            clientNames={clientNames}
          />
        ) : (
          <CalendarMonth currMonth={currMonth} today={today} />
        )}
      </div>
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

export default schedulePage;
