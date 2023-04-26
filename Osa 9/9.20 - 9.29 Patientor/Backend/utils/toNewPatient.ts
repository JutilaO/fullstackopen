import { NewPatient, Gender } from '../types/patient';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) throw new Error('Incorrect or missing name');
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    const regex = new RegExp('((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])');
    if(!dateOfBirth || !isString(dateOfBirth)) throw new Error('Incorrect or missing date of birth');
    if(!regex.test(dateOfBirth)) throw new Error('Incorrect date of birth');
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) throw new Error('Incorrect or missing social security number');
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender');
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) throw new Error('Incorrect or missing occupation');
    return occupation;
};

const toNewPatient = (object: any): NewPatient => {
    if(!object || typeof object !== 'object') throw new Error('Incorrect or missing data');
    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        const newPatient: NewPatient = {
            name: parseName(object.name),
            ssn: parseSSN(object.ssn),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: missing fields');
};

export default toNewPatient;