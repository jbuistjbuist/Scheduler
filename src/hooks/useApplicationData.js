import { useEffect, useReducer } from "react";
import axios from "axios";

//constants for the reducer function
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

/**
 *
 * @param {object} state the state object containing the app data
 * @param {integer} id the id of a specific appointment
 * @param {appointments} appointments the modified appointments object
 * @returns a modified days object with an updated value for the spots remaining for the given day
 */
const updateSpotsRemaining = function (state, id, appointments) {
  const days = [...state.days];
  const dayIndex = days.findIndex((day) => day.appointments.includes(id));
  const dayAppts = days[dayIndex].appointments;

  const spots = Object.keys(appointments).filter(
    (key) => dayAppts.includes(Number(key)) && !appointments[key].interview
  ).length;

  days[dayIndex] = { ...days[dayIndex], spots };

  return days;
};

/**
 *
 * @param {object} state
 * @param {string} action
 * @returns returns updated state object to be set by useReducer
 */
const reducer = function (state, action) {
  const { day, days, interviewers, appointments, id, interview } = {
    ...action,
  };

  switch (action.type) {
    case SET_DAY:
      return { ...state, day };
    case SET_APPLICATION_DATA:
      return { ...state, days, interviewers, appointments };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[id],
        interview: interview,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      const days = updateSpotsRemaining(state, id, appointments);
      return { ...state, days, appointments };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

/**
 * responsible for fetching app data on load, connecting to web socket, and providing the function to cancel/book an interview
 * @returns {object} an object with the state and methods to be used by the application
 */

const useApplicationData = function () {
  const [state, dispatch] = useReducer(reducer, {
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    //create websocket on load
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    //listen for set_interview messages on the websocket, and update state accordingly
    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "SET_INTERVIEW") {
        dispatch({
          type: SET_INTERVIEW,
          id: message.id,
          interview: message.interview,
        });
      }
    };
    //get app data on load and update state with the data
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([daysRes, appointmentsRes, interviewersRes]) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        days: daysRes.data,
        appointments: appointmentsRes.data,
        interviewers: interviewersRes.data,
      })
    );
    //clean up function for the websocket
    return () => webSocket.close();
  }, []);

  //function used to cancel or book an interview
  const setInterview = function (id, interview = null) {
    if (interview) {
      return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
    } else {
      return axios.delete(`/api/appointments/${id}`).then((res) => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
    }
  };

  return {
    state,
    setDay,
    bookInterview: setInterview,
    cancelInterview: setInterview,
  };
};

export default useApplicationData;
