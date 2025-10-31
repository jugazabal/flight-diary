import { Patient, Gender } from '../src/types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = [
  {
    id: uuid(),
    name: 'John Doe',
    ssn: '123-45-6789',
    occupation: 'Pilot',
    gender: Gender.Male,
    dateOfBirth: '1980-01-01',
    entries: []
  },
  {
    id: uuid(),
    name: 'Jane Roe',
    ssn: '987-65-4321',
    occupation: 'Flight Attendant',
    gender: Gender.Female,
    dateOfBirth: '1990-05-12',
    entries: []
  }
];

export default patients;
