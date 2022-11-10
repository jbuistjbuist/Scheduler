import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component representing the form to create or edit a component
 */
export default function Form(props) {
  const {
    interviewers,
    interviewer: inhInterviewer,
    student: inhStudent,
    onSave,
    onCancel,
  } = { ...props };

  //use preexisting student and interviewer values if editing appointment, otherwise they will be null
  const [student, setStudent] = useState(inhStudent || "");
  const [interviewer, setInterviewer] = useState(inhInterviewer?.id || null);
  const [error, setError] = useState("");

  /**
   *
   * validates that the user has input a name and selected an interviewer before submitting the data
   */
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    onSave(student, interviewer);
  };

  /**
   * used to reset the form values if the user cancels their submission
   */
  const reset = () => {
    setError("");
    setStudent("");
    setInterviewer(null);
  };

  /**
   * resets the form values and calls the onCancel method from the parent element when the user clicks 'cancel'
   */
  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
