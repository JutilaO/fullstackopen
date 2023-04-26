import { Entry, HealthCareEntryTypes, HealthCheckEntry, HospitalEntry, Discharge, OccupationalHealthCareEntry, SickLeave } from '../types/patient';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number;
};


const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)) throw new Error('Incorrect or missing description');
    return description;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date)) throw new Error('Incorrect or missing date');
    return date;
};


const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)) throw new Error('Incorrect or missing specialist');
    return specialist;
};

const parseHealthRating = (rating: unknown): number => {
    if(!rating || !isNumber(rating)) throw new Error('Incorrect or missing health rating');
    return rating;
};

const parseCriteria = (criteria: unknown): string => {
    if(!criteria || !isString(criteria)) throw new Error('Incorrect or missing criteria');
    return criteria;
};

const parseEmployer = (employer: unknown): string => {
    if(!employer || !isString(employer)) throw new Error('Incorrect or missing employer');
    return employer;
};

const toNewEntry = (object: any): Entry => {
    if(!object || typeof object !== 'object') throw new Error('Incorrect or missing data');
    if('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'id' in object){
        switch(object.type){
            case HealthCareEntryTypes.HealthCheck:
                const CheckEntry: HealthCheckEntry = {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: HealthCareEntryTypes.HealthCheck,
                    healthCheckRating: parseHealthRating(object.healthCheckRating),
                    id: object.id
                };
                return CheckEntry;
            
            case HealthCareEntryTypes.Hospital:

                const discharge: Discharge = {
                    date: parseDate(object.date),
                    criteria: parseCriteria(object.date)
                };

                const HospitalEntry: HospitalEntry = {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: HealthCareEntryTypes.Hospital,
                    id: object.id,
                    discharge: discharge
                };
                return HospitalEntry;

            case HealthCareEntryTypes.OccupationalHealthcare:

                const OccupationalEntry: OccupationalHealthCareEntry = {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: HealthCareEntryTypes.OccupationalHealthcare,
                    id: object.id,
                    employerName: parseEmployer(object.employerName)
                };

                if(object.sickLeave){
                    const sickleave: SickLeave = {
                        startDate: parseDate(object.sickLeave.startDate),
                        endDate: parseDate(object.sickLeave.endDate)
                    };
                    OccupationalEntry.sickLeave= sickleave;
                }

                return OccupationalEntry;
        }
    }
    throw new Error('Incorrect data: missing fields');
};

export default toNewEntry;