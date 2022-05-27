import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AddHealthCheckEntryForm } from './AddHealthCheckEntryForm';
import { AddHospitalEntryForm } from './AddHospitalEntryForm';
import { AddOccupationalEntryForm } from './AddOccupationalEntryForm';
import { Entry } from '../types';
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  modalOpen: string;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  type: string;
  error?: string;
}

const AddEntryModal = ({
  type,
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen === type} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity='error'>{`Error: ${error}`}</Alert>}
      {type === 'checkup' ? (
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      ) : type === 'hospital' ? (
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      ) : (
        <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      )}
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
