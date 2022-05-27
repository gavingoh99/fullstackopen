import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});
router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});
router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'An error occured.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});
router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    if (typeof newEntry !== 'undefined') {
      const addedEntry = patientService.addEntryToPatient(
        req.params.id,
        newEntry
      );
      res.json(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = 'An error occured.';
    if (error instanceof Error) {
      errorMessage += ` Error ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
