"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  where,
} from "firebase/firestore";
import { format, parse, startOfToday, add } from "date-fns";
import CalendarWeek from "@/components/calendar/calendarWeek";
import CalendarMonth from "@/components/calendar/calendarMonth";
import Link from "next/link";

const schedulePage = () => {
  const [modalFlag, setModal] = useState<boolean>(false);
  const [eventData, setEventData] = useState<Object>({
    clientName: "",
    clientEmail: "",
    date: "",
    time: null,
    description: "",
    workerId: "AtnCKk4MQEYIbQOftB7d8lVFI3o2",
  });
  const [_data, setData] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [fullDocs, setFullDocs] = useState([]);
  const [selectedHour, setSelectedHour] = useState([]);
  const [viewType, setViewType] = useState<boolean>(true);
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  const [startDate, setStartDate] = useState(new Date());
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);

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
      //@ts-ignore
      setClientNames((prev) => [...prev, doc.data().clientName]);
      let dias = new Date(doc.data().date);
      dias.setDate(dias.getDate() + 1);
      //@ts-ignore
      setAppointments((prev) => [...prev, dias.toDateString()]);
      //@ts-ignore
      setSelectedHour((prev) => [...prev, doc.data().time]);
      //@ts-ignore
      setFullDocs((prev) => [...prev, doc.data()]);
    });
  };

  const handleDateClick = () => {
    setEventData({
      clientName: "",
      clientEmail: "",
      date: "",
      time: null,
      description: "",
      workerId: "AtnCKk4MQEYIbQOftB7d8lVFI3o2",
    });
    setModal(!modalFlag);
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
      const clientRef = collection(db, "appointments")
      const q = query(clientRef, where("clientName", "==", eventData.clientName));
      const querySnapshot = await getDocs(q);
      // const clientRef = doc(db, "appointments", {'clientName' : eventData.clientName});
      await deleteDoc(querySnapshot.docs[0].ref);
      try {
        const docRef = await addDoc(collection(db, "appointments"), eventData);
        console.log(
          "Objeto JSON enviado correctamente. ID del documento: ",
          docRef.id
        );
      } catch (error) {
        console.error("Error al enviar el objeto JSON a Firestore: ", error);
      }
    } catch (error) {
      console.error("Error al enviar el objeto JSON a Firestore: ", error);
      try {
        const docRef = await addDoc(collection(db, "appointments"), eventData);
        console.log(
          "Objeto JSON enviado correctamente. ID del documento: ",
          docRef.id
        );
      } catch (error) {
        console.error("Error al enviar el objeto JSON a Firestore: ", error);
      }
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

  // @ts-ignore
  const renderEventForm = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-[40vw] h-[90vh]">
          <div className="flex justify-between items-center px-4 pt-4">
            <h2 className="text-xl font-semibold">Programar cita</h2>
            <button
              className="text-2xl font-semibold text-gray-500 hover:text-gray-700"
              onClick={() => {
                setModal(false);
                setIsRecurrent(false);
              }}
            >
              X
            </button>
          </div>
          <form
            className="flex items-start flex-col px-10 pt-5 space-y-5 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full">
              <div className="text-m">Asignar a</div>
              <div className="flex items-center gap-4 w-full px-2 pt-2">
                {/* imagen en un circulo y el nombre al lado de este */}
                <img
                  className="w-8 h-8 rounded-full border-solid border-2 border-[#2A2A2A]"
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                  alt="profile"
                />
                <div>Dr. Sebastian Hidalgo</div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-m m-2">Cliente(s)</div>
              <div className="flex flex-col items-center gap-4 w-full px-2 py-1">
                <div className="flex w-full">
                  <label className="w-1/3 flex items-center">Nombre:</label>
                  <input
                    className="border-2 border-gray-300 rounded-md px-2  w-full"
                    type="text"
                    name="clientName"
                    // @ts-ignore
                    value={eventData.clientName || ""}
                    onChange={handleChangeForm}
                  />
                </div>
                <div className="flex w-full">
                  <label className="w-1/3 flex items-center">E-Mail:</label>
                  <input
                    className="border-2 border-gray-300 rounded-md px-2  w-full"
                    type="text"
                    name="clientEmail"
                    // @ts-ignore
                    value={eventData.clientEmail || ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div>Fecha y Hora</div>
              <div className="flex w-full mt-1 gap-2">
                <input
                  className="border-2 border-gray-300 rounded-md px-2  w-full"
                  type="date"
                  name="date"
                  // @ts-ignore
                  value={eventData.date || ""}
                  onChange={handleChangeForm}
                />
                <input
                  className="border-2 border-gray-300 rounded-md px-2  w-full"
                  type="time"
                  name="time"
                  // @ts-ignore
                  value={eventData.time || ""}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="flex w-full gap-2 mt-1 mx-3">
                <label>
                  <input
                    type="checkbox"
                    name="recurrente"
                    checked={isRecurrent}
                    onChange={() => setIsRecurrent(!isRecurrent)}
                  />{" "}
                  Recurrente
                </label>
                {isRecurrent && (
                  <div>
                    <input
                      className="border-2 border-gray-300 rounded-md px-2  w-full"
                      type="number"
                      name="recurrences"
                      min="0"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full">
              <label className="w-1/4 flex items-center">Descripcion:</label>
              <input
                className="border-2 border-gray-300 rounded-md px-2  w-full"
                type="text"
                name="description"
                // @ts-ignore
                value={eventData.description || ""}
                onChange={handleChangeForm}
              />
            </div>

            <div className="flex w-full justify-between">
              <input
                type="button"
                className=" px-2 rounded-md underline text-2l p-2 cursor-pointer"
                value="Cancelar"
                onClick={() => {
                  setModal(false);
                  setEventData({
                    clientName: "",
                    clientEmail: "",
                    date: "",
                    time: null,
                    description: "",
                    workerId: "AtnCKk4MQEYIbQOftB7d8lVFI3o2",
                  });
                  setIsRecurrent(false);
                }}
              />

              <button
                className=" bg-[#FF4D84] px-2 rounded-md text-[#FAFAFA] text-2l p-2"
                type="submit"
              >
                Guardar cita
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // @ts-ignore
  const renderAppointment = (title, hour, tmp) => {
    console.log(tmp);
    return (
      <button
        key={title}
        className="flex border border-solid border-green-500 rounded-lg flex-col justify-center items-center w-full h-full mt-4 "
        onClick={() => {
          setEventData(tmp);
          setModal(true);
        }}
      >
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
              onClick={handlePrevEvent}
            >
              &lt;
            </button>
            <button
              className="cursor-pointer font-bold"
              onClick={handleNextEvent}
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
            fullDocs={fullDocs}
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
      <div className="fixed top-[10%] left-[50%]">
        <Link
          href="/workspace/publishdocs"
          className=" bg-[#FF4D84] px-2 rounded-md text-[#FAFAFA] text-2l p-2"
        >
          Send
        </Link>
      </div>
      <div className={`flex gap-4 wrap ${!modalFlag ? "hidden" : ""}`}>
        {/* putt hidden in the first conditional */}
        {renderEventForm()}
      </div>
    </section>
  );
};

export default schedulePage;
