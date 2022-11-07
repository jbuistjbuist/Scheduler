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
      setState(prev =>  ({...prev, appointments}))
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
      .then((res) => setState(prev => ({...prev, appointments})))
  }

  return {state, setDay, bookInterview, cancelInterview}

}


export default useApplicationData;




