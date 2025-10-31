// Optional Zod-based validators.
// This file is intentionally not imported by the server by default.
// Install Zod and then use these functions if you prefer schema-based validation.

import { z } from 'zod';
import { Gender } from '../types';

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string()
});

export type NewPatientType = z.infer<typeof NewPatientSchema>;

const BaseEntry = z.object({
  date: z.string(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HealthCheckSchema = BaseEntry.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number()
});

const OccupationalSchema = BaseEntry.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string(), endDate: z.string() }).optional()
});

const HospitalSchema = BaseEntry.extend({
  type: z.literal('Hospital'),
  discharge: z.object({ date: z.string(), criteria: z.string() })
});

export const EntrySchema = z.discriminatedUnion('type', [HealthCheckSchema, OccupationalSchema, HospitalSchema]);

export function parseNewPatientWithZod(obj: unknown): NewPatientType {
  return NewPatientSchema.parse(obj);
}

export function parseNewEntryWithZod(obj: unknown) {
  return EntrySchema.parse(obj);
}
