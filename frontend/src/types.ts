export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
}

export interface NewPatient {
  name: string;
  ssn: string;
  occupation: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
}

export interface Entry {
  id: string;
  date: string;
  description: string;
  specialist: string;
}

export interface PatientFull extends Patient {
  ssn: string;
  entries: Entry[];
}

// NewEntry types used when creating entries from the client (no `id`)
export interface HealthCheckValues {
  type: 'HealthCheck';
  date: string;
  description: string;
  specialist: string;
  healthCheckRating: number;
}

export interface HospitalValues {
  type: 'Hospital';
  date: string;
  description: string;
  specialist: string;
  discharge: { date: string; criteria: string };
}

export interface OccupationalValues {
  type: 'OccupationalHealthcare';
  date: string;
  description: string;
  specialist: string;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export type NewEntry = HealthCheckValues | HospitalValues | OccupationalValues;
