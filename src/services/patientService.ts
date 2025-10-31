import patients from '../../data/patients';
import { Patient, NonSensitivePatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): Patient[] => patients;

const getNonSensitive = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));

const findById = (id: string): Patient | undefined =>
  patients.find(p => p.id === id);

const addPatient = (patient: Omit<Patient, 'id' | 'entries'>): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: Omit<Entry, 'id'>): Entry | undefined => {
  const patient = findById(patientId);
  if (!patient) return undefined;
  const newEntry: Entry = { id: uuid(), ...entry } as Entry;
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  getNonSensitive,
  findById,
  addPatient,
  addEntry
};
