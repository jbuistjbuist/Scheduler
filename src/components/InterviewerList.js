import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {

    const {interviewers, onChange, value} = props;

    const Interviewers = interviewers.map(person => {
      const { id, name, avatar } = person;

      return (
        <InterviewerListItem
          key={id}
          name={name}
          avatar={avatar}
          setInterviewer={() => onChange(id)}
          selected={id === value}
        />
      )
    })


  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">

          {Interviewers}

      </ul>
    </section>
  )
}