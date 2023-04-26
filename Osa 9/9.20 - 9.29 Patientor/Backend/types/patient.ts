export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCareEntryTypes {
    OccupationalHealthcare = "OccupationalHealthcare",
    Hospital = "Hospital",
    HealthCheck = "HealthCheck"
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  
  export interface SickLeave {
    startDate: string;
    endDate: string;
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  
  export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
  }
  
  export interface Discharge {
    date: string;
    criteria: string;
  }
  
  export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
  }

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export interface PatientComplete {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[];
}

export type Patient = Omit<PatientComplete, 'ssn' | 'entries'>;
export type NewPatient = Omit<PatientComplete, 'id'>;