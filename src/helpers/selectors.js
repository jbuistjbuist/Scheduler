export function getAppointmentsForDay(state, day) {

  const dayAppointments = [];
  const dayApptIds = state.days.find((el) => el.name === day)?.appointments || undefined;

  dayApptIds && dayApptIds.forEach((id) => {
    dayAppointments.push(state.appointments[id])
  })

  return dayAppointments;

}

