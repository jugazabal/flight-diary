import React, { useState } from 'react';

export interface PatientFormValues {
  name: string;
  ssn: string;
  occupation: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
}

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [values, setValues] = useState<PatientFormValues>({
    name: '',
    ssn: '',
    occupation: '',
    dateOfBirth: '',
    gender: 'other',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Name</label>
        <input name="name" value={values.name} onChange={handleChange} />
      </div>
      <div>
        <label>SSN</label>
        <input name="ssn" value={values.ssn} onChange={handleChange} />
      </div>
      <div>
        <label>Occupation</label>
        <input name="occupation" value={values.occupation} onChange={handleChange} />
      </div>
      <div>
        <label>Date of birth</label>
        <input name="dateOfBirth" value={values.dateOfBirth} onChange={handleChange} />
      </div>
      <div>
        <label>Gender</label>
        <select name="gender" value={values.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default PatientForm;
