/**
 *
 * @param {object} state
 * @param {string} day
 * @returns {Array<T>} a array of the appiontments for the provided day
 */
export function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  const dayApptIds =
    state.days.find((el) => el.name === day)?.appointments || undefined;

  dayApptIds &&
    dayApptIds.forEach((id) => {
      dayAppointments.push(state.appointments[id]);
    });

  return dayAppointments;
}

/**
 *
 * @param {object} state
 * @param {object} interview
 * @returns {object} an object containing the interview information, replacing the integer which references the interview
 */
export function getInterview(state, interview) {
  const interviewOut = interview ? { ...interview } : null;

  if (interviewOut) {
    interviewOut.interviewer = state.interviewers[interviewOut.interviewer];
  }

  return interviewOut;
}

/**
 *
 * @param {object} state
 * @param {string} day
 * @returns {Array<T>} a array of the interviewers for the provided day
 */
export function getInterviewersForDay(state, day) {
  const dayInterviewers = [];
  const dayIntvIds =
    state.days.find((el) => el.name === day)?.interviewers || undefined;

  dayIntvIds &&
    dayIntvIds.forEach((id) => {
      dayInterviewers.push(state.interviewers[id]);
    });

  return dayInterviewers;
}
