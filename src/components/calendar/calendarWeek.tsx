
const CalendarWeek = ({startDate, appointments, selectedHour, renderAppointment, clientNames}) => {
    const days = [];

    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 7) % 7));

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      days.push(currentDate);
    }

    const ordenarPorHora = (citaA: Object, citaB: Object) => {
      // @ts-ignore
      const horaA = citaA.hour.split(':')[0];
      // @ts-ignore
      const minutoA = citaA.hour.split(':')[1];
      // @ts-ignore
      const horaB = citaB.hour.split(':')[0];
      // @ts-ignore
      const minutoB = citaB.hour.split(':')[1];
    
      if (horaA === horaB) {
        return minutoA.localeCompare(minutoB);
      }
    
      return horaA.localeCompare(horaB);
    };

    return (
      <div className="flex flex-row w-full h-full gap-2">
        {days.map((date) => {

          const citas = appointments.map((fecha, indice) => ({ fecha, indice, hour: selectedHour[indice]})).filter((fecha) => fecha.fecha == date.toDateString())

          const citasOrdenadas = citas.sort(ordenarPorHora);

          citas.map(cita => console.log(cita.fecha, " => ", cita.indice))
          return (
            <div className="flex-grow h-[60vh]">
              <div className="flex justify-center mb-3 font-bold">
                {date
                  .toLocaleDateString("es-PE", { weekday: "long" })
                  .charAt(0)
                  .toUpperCase()}
                {date.toLocaleDateString("es-PE", { weekday: "long" }).slice(1)}
              </div>
              <div
                key={date.toDateString()}
                className="border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 h-full"
              >
                <div className="flex justify-center text-2xl font-semibold center mt-5">
                  {date.toLocaleDateString() ===
                  new Date().toLocaleDateString() ? (
                    <div
                      key={date.toLocaleDateString()}
                      className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[#FAFAFA] text-l"
                    >
                      {date.getDate()}
                    </div>
                  ) : (
                    date.getDate()
                  )}
                </div>
                <div>
                  {citasOrdenadas.map((cita) => renderAppointment(clientNames[cita.indice], selectedHour[cita.indice]))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

export default CalendarWeek;