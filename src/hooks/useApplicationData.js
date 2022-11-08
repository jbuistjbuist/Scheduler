import React, {useState, useEffect, useReducer} from 'react'
import axios from 'axios';

const SET_DAY = "SET_DAY"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_INTERVIEW = "SET_INTERVIEW"


function reducer(state, action) {

  const {day, days, interviewers, appointments} = {...action};

  switch(action.type) {
    case SET_DAY:
      return {...state, day};
    case SET_APPLICATION_DATA:
      return {...state, days, interviewers, appointments};
    case SET_INTERVIEW: 
      return {...state, days, appointments}
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
  }, [])

  function bookInterview(id, interview) {

   const appointment = {
    ...state.appointments[id],
    interview: {...interview}
   };

   const appointments = {
    ...state.appointments,
    [id]: appointment
   }

   return axios.put(`/api/appointments/${id}`, { interview })
    .then((res) => {

      const days = updateSpotsRemaining(state, id, appointments);

      dispatch({type: SET_INTERVIEW, days, appointments})
      
    })
  }

  const cancelInterview = function(apptId) {

    const appointment = {
      ...state.appointments[apptId],
      interview : null
    }

    const appointments = {
      ...state.appointments,
      [apptId] : appointment
    }

    return axios.delete(`/api/appointments/${apptId}`)
      .then((res) => {

       const days = updateSpotsRemaining(state, apptId, appointments);

       dispatch({type: SET_INTERVIEW, days, appointments})

      })
  }

  return {state, setDay, bookInterview, cancelInterview}

}

const updateSpotsRemaining = function(state, id, appointments) {
  const days = [...state.days]
  const dayIndex = days.findIndex((day) => day.appointments.includes(id));
  const dayAppts = days[dayIndex].appointments;
  const spots = Object.keys(appointments).reduce((accumulator, key) => {
    const appt = appointments[key];

    if (dayAppts.includes(appt.id) && !appt.interview) {
      return accumulator + 1;
    }
    return accumulator;
    }, 0)

  days[dayIndex] = {...days[dayIndex], spots} 

  return days;
}



export default useApplicationData;




