import {useEffect, useReducer} from 'react'
import axios from 'axios';

const SET_DAY = "SET_DAY"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_INTERVIEW = "SET_INTERVIEW"


const updateSpotsRemaining = function(state, id, appointments) {
  const days = [...state.days]
  const dayIndex = days.findIndex((day) => day.appointments.includes(id));
  const dayAppts = days[dayIndex].appointments;

  const spots = Object.keys(appointments).filter((key) => dayAppts.includes(Number(key)) && !appointments[key].interview).length

  days[dayIndex] = {...days[dayIndex], spots} 

  return days;
}

const reducer = function(state, action) {

  const {day, days, interviewers, appointments, id, interview} = {...action};

  switch(action.type) {
    case SET_DAY:
      return {...state, day};
    case SET_APPLICATION_DATA:
      return {...state, days, interviewers, appointments};
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[id],
        interview: interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const days = updateSpotsRemaining(state, id, appointments);
      return {...state, days, appointments}
    }
    default: 
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

const useApplicationData = function() {

  const [state, dispatch] = useReducer(reducer, {
    days : [],
    day : "Monday",
    appointments : {},
    interviewers: {}
  })

  const setDay = day => dispatch({type: SET_DAY, day})

  useEffect(() => {

    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === "SET_INTERVIEW") {
        dispatch({type: SET_INTERVIEW, id : message.id, interview : message.interview})
      }
    }

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(([daysRes, appointmentsRes, interviewersRes]) =>
      dispatch({type: SET_APPLICATION_DATA, 
        days: daysRes.data,
        appointments: appointmentsRes.data,
        interviewers: interviewersRes.data
      })
    )

    return () => webSocket.close();

  }, [])
 
  const setInterview = function(id, interview = null) {
     
    return axios({method: interview ? 'put' : 'delete',  url: `/api/appointments/${id}`, data : { interview }})
    .then((res) => {
      dispatch({type: SET_INTERVIEW, id, interview})
    })
   }

  return {state, setDay, bookInterview: setInterview, cancelInterview: setInterview}
}

export default useApplicationData;




