import React, {useState, useEffect} from 'react'
import axios from 'axios';


const useApplicationData = function() {

  const[state, setState] = useState({
    days : [],
    day : "Monday",
    appointments : {},
    interviewers: {}
  })

  const setDay = day => setState(prev => ({...prev, day}));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(([daysRes, appointmentsRes, interviewersRes]) =>
      setState(prev => ({
        ...prev, days: daysRes.data, 
        appointments : appointmentsRes.data, 
        interviewers : interviewersRes.data})))
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

      setState(prev =>  ({...prev, appointments, days}))
      
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

        setState(prev => ({...prev, appointments, days}))
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




