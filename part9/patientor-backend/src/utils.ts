import {
  NewPatientEntry,
  Gender,
  Diagnose,
  BaseEntry,
  Discharge,
  SickLeave,
  HealthCheckRating,
  NewEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};
export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSSN(ssn),
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosis = (
  diagnosisCodes: any
): diagnosisCodes is Array<Diagnose['code']> => {
  if (Array.isArray(diagnosisCodes)) {
    for (let i = 0; i < diagnosisCodes.length; i++) {
      if (typeof diagnosisCodes[i] !== 'string') {
        return false;
      }
    }
    return true;
  }
  return false;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnose['code']> => {
  if (!diagnosisCodes || !isDiagnosis(diagnosisCodes)) {
    throw new Error(`Incorrect or missing diagnosis codes: ${diagnosisCodes}`);
  }
  return diagnosisCodes;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
  return (
    typeof discharge.date === 'string' && typeof discharge.criteria === 'string'
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }
  return discharge;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employer name: ${employerName}`);
  }
  return employerName;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return (
    typeof sickLeave.startDate === 'string' &&
    typeof sickLeave.endDate === 'string'
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error(`Incorrect or missing sick leave: ${sickLeave}`);
  }
  return sickLeave;
};

const isHealthCheckRating = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      `Incorrect or missing healthcheck rating: ${healthCheckRating}`
    );
  }
  return healthCheckRating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry | undefined => {
  const baseEntry: Omit<BaseEntry, 'id'> = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };
  switch (object.type) {
    case 'Hospital':
      return {
        ...baseEntry,
        type: object.type as 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: object.type as 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave)
          : undefined,
      };
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: object.type as 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    default:
      throw new Error(`Incorrect or missing entry type: ${object.type}`);
  }
};
