import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { NewPatientEntry, Patient, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};
const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (
  id: string,
  entry: NewEntry
): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (typeof patient !== 'undefined') {
    const entryToBeAdded = {
      id: uuid(),
      ...entry,
    };
    patient.entries.push(entryToBeAdded);
    // const updatedPatient = {
    //   ...patient,
    //   entries: patient.entries.concat(entryToBeAdded),
    // };
    // patients.map((patient) => (patient.id === id ? updatedPatient : patient));
    return patient;
  }
  return undefined;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntryToPatient,
};
