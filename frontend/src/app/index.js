import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../store/slices/patientSlice';

export default function Home() {
    const dispatch = useDispatch();
    const { list: patients, loading, error } = useSelector((state) => state.patients);

    // Fetch patients when the component mounts
    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    return (
        <div>
            <h1>Patient List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.full_name} - {patient.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
}
