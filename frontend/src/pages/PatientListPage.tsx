import { useEffect, useState } from 'react';
import patientService from '../services/patientService';
import { Patient } from '../types';
import { Link } from 'react-router-dom';
import AddPatientModal from '../components/AddPatientModal';

const PatientListPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    patientService.getAll()
      .then(data => {
        // defensive: ensure we only set an array to avoid runtime `map` errors
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          // log unexpected payload shape for debugging
           
          console.error('Unexpected patients payload, expected array:', data);
          setPatients([]);
        }
      })
      .catch(err => {
         
        console.error('Failed to fetch patients', err);
        setPatients([]);
      });
  }, []);

  const handleCreated = (p: Patient) => {
    setPatients(prev => [...prev, p]);
  };

  return (
    <div>
      <h2>Patients</h2>
      <button onClick={() => setModalOpen(true)}>Add patient</button>
      <ul>
        {patients.map(p => (
          <li key={p.id}><Link to={`/patients/${p.id}`}>{p.name}</Link> ({p.dateOfBirth})</li>
        ))}
      </ul>
      {modalOpen && (
        <AddPatientModal onClose={() => setModalOpen(false)} onCreated={handleCreated} />
      )}
    </div>
  );
};

export default PatientListPage;
