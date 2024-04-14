'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define an interface for the input configuration
interface InputConfig {
  id: string;
  displayName: string;
  variableName: string;
  required: boolean;
  placeholder: string;
}

// Define an interface for the workflow prop
interface WorkflowProps {
  workflow: {
    input_config: InputConfig[];
  };
}

// Define the initial form state type
interface FormState {
  [key: string]: string;
}

const WorkflowForm: React.FC<WorkflowProps> = ({ workflow }) => {
  const [formState, setFormState] = useState<FormState>({});

  // Typed event handler for form inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Typed event handler for form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Send formState to backend
    console.log('Submitting form:', formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {workflow.input_config.map((input) => (
        <div key={input.id}>
          <label>{input.displayName}</label>
          <input
            type="text"
            required={input.required}
            placeholder={input.placeholder}
            name={input.variableName}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default WorkflowForm;
