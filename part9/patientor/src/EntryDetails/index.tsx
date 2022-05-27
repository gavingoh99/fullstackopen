import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Diagnosis } from '../types';
import {
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcare,
} from '../types';
const BaseEntryDetail = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code}{' '}
              {diagnoses &&
                diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
      <div>diagnose by {entry.specialist}</div>
    </>
  );
};
const HospitalEntryDetail = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div>
      <div>Hospital Entry</div>
      <div>discharge date: {entry.discharge.date}</div>
      <div>discharge criteria: {entry.discharge.criteria}</div>
      <BaseEntryDetail entry={entry} diagnoses={diagnoses} />
    </div>
  );
};
const HealthCheckEntryDetail = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div>
      <div>Checkup Entry</div>
      <div>healthCheckRating: {entry.healthCheckRating}</div>
      <BaseEntryDetail entry={entry} diagnoses={diagnoses} />
    </div>
  );
};
const OccupationalHealthcareEntryDetail = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcare;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div>
      <div>Occupational Entry</div>
      <div>employer name: {entry.employerName}</div>
      <div>sickLeave start: {entry.sickLeave?.startDate}</div>
      <div>sickLeave end: {entry.sickLeave?.endDate}</div>
      <BaseEntryDetail entry={entry} diagnoses={diagnoses} />
    </div>
  );
};
const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[] | null>(null);
  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        if (entry.diagnosisCodes) {
          const { data: diagnoses } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          setDiagnoses(diagnoses);
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, []);
  switch (entry.type) {
    case 'Hospital':
      return (
        <HospitalEntryDetail
          entry={entry}
          diagnoses={diagnoses as Diagnosis[]}
        />
      );
    case 'HealthCheck':
      return (
        <HealthCheckEntryDetail
          entry={entry}
          diagnoses={diagnoses as Diagnosis[]}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntryDetail
          entry={entry}
          diagnoses={diagnoses as Diagnosis[]}
        />
      );
    default:
      const _exhaustivecheck: never = entry;
      return _exhaustivecheck;
  }
};
export default EntryDetails;
