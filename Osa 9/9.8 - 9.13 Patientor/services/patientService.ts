import patients from '../data/patients';
import {Patient, NewPatient} from '../types/patient';
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

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {getPatients, addPatient};