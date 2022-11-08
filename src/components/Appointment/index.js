import React, {useEffect} from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const {time, interviewers, id, bookInterview, cancelInterview} = props;
  const {interview} = props || {};

  const { mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY)

  useEffect(() => {

    if (interview && mode === EMPTY) {
      transition(SHOW)
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY)
    }
    
  }, [interview, transition, mode]);

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true))
  }

  const deleteAppt = function() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }

  return(
    <article className="appointment">
      <Header time={time} /> 

      {mode === SHOW && interview && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}

      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} onSave={save}/> }

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={back} onConfirm={deleteAppt}/>}

      {mode === EDIT &&  <Form interviewers={interviewers} onCancel={back} onSave={save} student={interview.student} interviewer={interview.interviewer}/>}

      {mode === ERROR_SAVE && <Error message={"Error Saving Appointment"} onClose={back}/>}

      {mode === ERROR_DELETE && <Error message={"Error Deleting Appointment"} onClose={back}/>}

    </article>
  )
}