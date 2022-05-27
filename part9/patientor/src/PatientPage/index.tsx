import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import EntryDetails from '../EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal';
import { useStateValue, updatePatient } from '../state';
const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<string>('');
  const [error, setError] = React.useState<string>();
  const closeModal = (): void => setModalOpen('');
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id != null) {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(updatePatient(updatedPatient));
        closeModal();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    if (id != null) {
      setPatient(patients[id]);
    }
  }, [patients]);
  if (!patient) return null;
  return (
    <div>
      <h1>{patient.name}</h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h2>entries</h2>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        type='checkup'
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <AddEntryModal
        type='hospital'
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <AddEntryModal
        type='occupational'
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={() => setModalOpen('checkup')}>
        New Checkup Entry
      </Button>

      <Button variant='contained' onClick={() => setModalOpen('hospital')}>
        New Hospital Entry
      </Button>

      <Button variant='contained' onClick={() => setModalOpen('occupational')}>
        New Occupational Entry
      </Button>
    </div>
  );
};
export default PatientPage;
