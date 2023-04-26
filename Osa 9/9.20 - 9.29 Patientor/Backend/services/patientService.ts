import patients from '../data/patients';
import {Patient, NewPatient, PatientComplete} from '../types/patient';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getCompletePatients = (): PatientComplete[] => {
    return patients;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const updatePatient = (newPatient: PatientComplete) => {
    patients.map(patient => patient.id === newPatient.id ? newPatient : patient);
    return newPatient;
};

export default {getPatients, getCompletePatients ,addPatient, updatePatient};