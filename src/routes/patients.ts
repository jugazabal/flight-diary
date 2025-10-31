import express from 'express';
import patientService from '../services/patientService';
import { parseNewPatient, parseNewEntry, ValidationError } from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitive());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) res.json(patient);
  else res.sendStatus(404);
});

router.post('/', async (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body as unknown);
  const added = patientService.addPatient(newPatient);
  return res.json(added);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return res.status(400).send({ error: error.message, issues: error.issues });
    }

    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }

    return res.status(400).send({ error: 'Unknown error' });
  }
});

router.post('/:id/entries', async (req, res) => {
  try {
    const entry = parseNewEntry(req.body as unknown);
  const added = patientService.addEntry(req.params.id, entry as Omit<import('../types').Entry, 'id'>);
  if (added) return res.json(added);
  return res.status(404).send({ error: 'Patient not found' });
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return res.status(400).send({ error: error.message, issues: error.issues });
    }

    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }

    return res.status(400).send({ error: 'Unknown error' });
  }
});

export default router;
