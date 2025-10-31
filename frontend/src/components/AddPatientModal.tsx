import React, { useState } from 'react';
import PatientForm, { PatientFormValues } from './PatientForm.tsx';
import patientService from '../services/patientService';
import { NewPatient, Patient } from '../types';

interface Props {
  onClose: () => void;
  onCreated: (patient: Patient) => void;
}

const AddPatientModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[] | null>(null);

  const handleSubmit = async (values: PatientFormValues) => {
    try {
      setError(null);
      setIssues(null);
      const payload: NewPatient = {
        name: values.name,
        ssn: values.ssn,
        occupation: values.occupation,
        dateOfBirth: values.dateOfBirth || '',
        gender: values.gender,
      };
      const created = await patientService.createPatient(payload);
      onCreated(created);
      onClose();
    } catch (err) {
      const e = err as unknown;
      // axios error shape handling (best-effort)
  const body = ((e as unknown) as { response?: { data?: unknown } })?.response?.data;
      if (body) {
        const recBody = body as Record<string, unknown>;
        if (Array.isArray(recBody.issues)) {
          setError((recBody.error as string) || 'Validation error');
          setIssues((recBody.issues as Array<unknown>).map((it: unknown) => {
            const rec = it as { path?: Array<string | number>; message?: string };
            return `${(rec.path || []).join('.')}: ${rec.message || 'issue'}`;
          }));
          return;
        }
        setError((recBody.error as string) || JSON.stringify(recBody));
        return;
      }

      setError((e as Error)?.message || 'Network error');
    }
  };

  return (
    <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)' }}>
      <div style={{ background: 'white', padding: 20, margin: '40px auto', maxWidth: 600 }}>
        <h2>Add Patient</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {issues && (
          <ul style={{ color: 'red' }}>
            {issues.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        )}
        <PatientForm onSubmit={handleSubmit} onCancel={onClose} />
      </div>
    </div>
  );
};

export default AddPatientModal;
