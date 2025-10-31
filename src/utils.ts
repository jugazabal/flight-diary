import { Gender } from './types';

export class ValidationError extends Error {
  issues: Array<{ path: Array<string | number>; message: string }>;
  constructor(issues: Array<{ path: Array<string | number>; message: string }>) {
    super('Validation error');
    this.issues = issues;
  }
}

type NewPatientType = {
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
};
export type NewEntryType = unknown; // validated and narrowed at runtime

function isString(s: unknown): s is string {
  return typeof s === 'string' || s instanceof String;
}

function isDate(s: unknown): boolean {
  return isString(s) && Boolean(Date.parse(s));
}

export function parseNewPatient(obj: unknown): NewPatientType {
  const issues: Array<{ path: Array<string | number>; message: string }> = [];
  if (!obj || typeof obj !== 'object') {
    throw new ValidationError([{ path: [], message: 'Expected object' }]);
  }
  const anyObj = obj as Record<string, unknown>;
  if (!isString(anyObj.name)) issues.push({ path: ['name'], message: 'name must be a string' });
  if (!isString(anyObj.ssn)) issues.push({ path: ['ssn'], message: 'ssn must be a string' });
  if (!isString(anyObj.occupation)) issues.push({ path: ['occupation'], message: 'occupation must be a string' });
  if (!isString(anyObj.gender) || !Object.values(Gender).includes(anyObj.gender as Gender)) issues.push({ path: ['gender'], message: 'gender invalid' });
  if (!isString(anyObj.dateOfBirth) || !isDate(anyObj.dateOfBirth)) issues.push({ path: ['dateOfBirth'], message: 'dateOfBirth must be a valid date string' });
  if (issues.length) throw new ValidationError(issues);
  return {
    name: anyObj.name as string,
    ssn: anyObj.ssn as string,
    occupation: anyObj.occupation as string,
    gender: anyObj.gender as Gender,
    dateOfBirth: anyObj.dateOfBirth as string
  };
}

export function parseNewEntry(obj: unknown): NewEntryType {
  const issues: Array<{ path: Array<string | number>; message: string }> = [];
  if (!obj || typeof obj !== 'object') {
    throw new ValidationError([{ path: [], message: 'Expected object' }]);
  }
  const anyObj = obj as Record<string, unknown>;
  const baseFields = ['date', 'description', 'specialist'];
  for (const f of baseFields) if (!isString(anyObj[f])) issues.push({ path: [f], message: `${f} must be string` });
  if (!isString(anyObj.type)) issues.push({ path: ['type'], message: 'type must be string' });
  const type = anyObj.type as string;
  if (type === 'HealthCheck') {
    if (typeof anyObj.healthCheckRating !== 'number') issues.push({ path: ['healthCheckRating'], message: 'healthCheckRating must be number' });
  } else if (type === 'Hospital') {
    if (!anyObj.discharge || !isString((anyObj.discharge as Record<string, unknown>).date) || !isString((anyObj.discharge as Record<string, unknown>).criteria)) issues.push({ path: ['discharge'], message: 'discharge.date and discharge.criteria required' });
  } else if (type === 'OccupationalHealthcare') {
    if (!isString(anyObj.employerName)) issues.push({ path: ['employerName'], message: 'employerName required' });
    if (anyObj.sickLeave) {
      const sl = anyObj.sickLeave as Record<string, unknown>;
      if (!isString(sl.startDate) || !isString(sl.endDate)) issues.push({ path: ['sickLeave'], message: 'sickLeave must have startDate and endDate' });
    }
  } else {
    issues.push({ path: ['type'], message: 'unknown entry type' });
  }

  if (issues.length) throw new ValidationError(issues);
  return anyObj;
}
