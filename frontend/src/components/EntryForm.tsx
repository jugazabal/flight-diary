import React, { useState } from 'react';

export type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

export interface EntryFormValuesBase {
  date: string;
  description: string;
  specialist: string;
}

export interface HealthCheckValues extends EntryFormValuesBase {
  type: 'HealthCheck';
  healthCheckRating: number;
}

export interface HospitalValues extends EntryFormValuesBase {
  type: 'Hospital';
  discharge: { date: string; criteria: string };
}

export interface OccupationalValues extends EntryFormValuesBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export type EntryFormValues = HealthCheckValues | HospitalValues | OccupationalValues;

// Alias for consistency with backend/client types
export type EntryFormNewEntry = EntryFormValues;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const EntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [base, setBase] = useState<EntryFormValuesBase>({ date: '', description: '', specialist: '' });
  const [type, setType] = useState<EntryType>('HealthCheck');

  // type-specific
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState<string>('');
  const [sickStart, setSickStart] = useState<string>('');
  const [sickEnd, setSickEnd] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBase(prev => ({ ...prev, [name]: value } as unknown as EntryFormValuesBase));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // basic client-side validation
    if (!base.date || !base.description || !base.specialist) {
      setError('date, description and specialist are required');
      return;
    }

  const payloadBase: EntryFormValuesBase = { ...base };
  const payload: EntryFormValues = { ...(payloadBase as unknown as Record<string, unknown>), type } as EntryFormValues;

    if (type === 'HealthCheck') {
  (payload as HealthCheckValues).healthCheckRating = Number(healthCheckRating);
    } else if (type === 'Hospital') {
      if (!dischargeDate || !dischargeCriteria) {
        setError('discharge date and criteria are required for Hospital entries');
        return;
      }
  (payload as HospitalValues).discharge = { date: dischargeDate, criteria: dischargeCriteria };
    } else if (type === 'OccupationalHealthcare') {
      if (!employerName) {
        setError('employerName is required for OccupationalHealthcare entries');
        return;
      }
      (payload as OccupationalValues).employerName = employerName;
      if (sickStart && sickEnd) {
        (payload as OccupationalValues).sickLeave = { startDate: sickStart, endDate: sickEnd };
      }
    }

    onSubmit(payload);
    // reset
    setBase({ date: '', description: '', specialist: '' });
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickStart('');
    setSickEnd('');
    setHealthCheckRating(0);
  };

  return (
    <form onSubmit={submit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Date</label>
        <input name="date" value={base.date} onChange={handleBaseChange} />
      </div>
      <div>
        <label>Description</label>
        <input name="description" value={base.description} onChange={handleBaseChange} />
      </div>
      <div>
        <label>Specialist</label>
        <input name="specialist" value={base.specialist} onChange={handleBaseChange} />
      </div>
      <div>
        <label>Type</label>
        <select name="type" value={type} onChange={(e) => setType(e.target.value as EntryType)}>
          <option value="HealthCheck">HealthCheck</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">OccupationalHealthcare</option>
        </select>
      </div>

      {type === 'HealthCheck' && (
        <div>
          <label>Health check rating (0-3)</label>
          <input type="number" min={0} max={3} value={healthCheckRating} onChange={e => setHealthCheckRating(Number(e.target.value))} />
        </div>
      )}

      {type === 'Hospital' && (
        <>
          <div>
            <label>Discharge date</label>
            <input value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} />
          </div>
          <div>
            <label>Discharge criteria</label>
            <input value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} />
          </div>
        </>
      )}

      {type === 'OccupationalHealthcare' && (
        <>
          <div>
            <label>Employer name</label>
            <input value={employerName} onChange={e => setEmployerName(e.target.value)} />
          </div>
          <div>
            <label>Sick leave start</label>
            <input value={sickStart} onChange={e => setSickStart(e.target.value)} />
          </div>
          <div>
            <label>Sick leave end</label>
            <input value={sickEnd} onChange={e => setSickEnd(e.target.value)} />
          </div>
        </>
      )}

      <button type="submit">Add Entry</button>
    </form>
  );
};

export default EntryForm;
