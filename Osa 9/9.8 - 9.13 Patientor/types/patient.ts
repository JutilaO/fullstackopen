export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface PatientComplete {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type Patient = Omit<PatientComplete, 'ssn'>;
export type NewPatient = Omit<PatientComplete, 'id'>;