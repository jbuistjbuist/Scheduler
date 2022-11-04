import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  const {time, interviewers} = props;
  const {interview} = props || {};

  const { mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY)

  return(
    <article className="appointment">
      <Header time={time} /> 

      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer}/>}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}

      {mode === CREATE && <Form interviewers={interviewers} onCancel={back}/> }


    </article>
  )
}