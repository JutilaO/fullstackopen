export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum HealthCareEntryTypes {
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
  HealthCheck = "HealthCheck"
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: HealthCareEntryTypes.HealthCheck;
  healthCheckRating: HealthCheckRating;
}


export interface OccupationalHealthCareEntry extends BaseEntry {
  type: HealthCareEntryTypes.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: HealthCareEntryTypes.Hospital;
  discharge: Discharge;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}


export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;