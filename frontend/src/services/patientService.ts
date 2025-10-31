import axios from 'axios';
import { Patient, NewPatient, PatientFull, NewEntry, Entry } from '../types';

const baseUrl = '/api/patients';

export const getAll = async (): Promise<Patient[]> => {
  const res = await axios.get<Patient[]>(baseUrl);
  // log the payload shape in the browser console to aid debugging
  // (kept as debug so it can be removed later)
   
  console.debug('patientService.getAll response:', res.data);
  return res.data;
};

export const createPatient = async (p: NewPatient): Promise<Patient> => {
  const res = await axios.post<Patient>(baseUrl, p);
  return res.data;
};

export const getById = async (id: string): Promise<PatientFull> => {
  const res = await axios.get<PatientFull>(`${baseUrl}/${id}`);
  return res.data;
};

export const addEntry = async (id: string, entry: NewEntry): Promise<Entry> => {
  const res = await axios.post<Entry>(`${baseUrl}/${id}/entries`, entry);
  return res.data;
};

export default { getAll, createPatient, getById, addEntry };
