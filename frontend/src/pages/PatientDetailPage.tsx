import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patientService';
import { PatientFull, NewEntry } from '../types';
import EntryForm, { EntryFormValues } from '../components/EntryForm.tsx';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<PatientFull | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    patientService.getById(id).then(p => setPatient(p)).catch(() => setError('Failed to fetch'));
  }, [id]);

  const handleAddEntry = async (values: EntryFormValues) => {
    if (!id) return;
    try {
      // values match the NewEntry union shape
      const added = await patientService.addEntry(id, values as unknown as NewEntry);
      setPatient(prev => prev ? { ...prev, entries: [...prev.entries, added] } : prev);
    } catch (e) {
      setError((e as Error)?.message || 'Failed to add entry');
    }
  };

  if (error) return <div>{error}</div>;
  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      <h3>Entries</h3>
      <ul>
        {patient.entries.map(e => (
          <li key={e.id}>{e.date} - {e.description}</li>
        ))}
      </ul>

      <h3>Add Entry</h3>
      <EntryForm onSubmit={handleAddEntry} />
    </div>
  );
};

export default PatientDetailPage;
