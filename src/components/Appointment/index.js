import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";


export default function Appointment(props) {

  

  const {time} = props;
  const {interview} = props || {};

  return(
    <article className="appointment">
      <Header time={time} /> 

      {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}


    </article>
  )
}