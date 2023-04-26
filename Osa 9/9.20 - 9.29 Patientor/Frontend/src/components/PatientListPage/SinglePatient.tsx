import { useParams } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'
import patientService from '../../services/patients'
import { Patient, Entry, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry, HealthCareEntryTypes, Diagnosis, Discharge, SickLeave } from "../../types";
import React from 'react'
import Select from 'react-select'
import { v1 as uuid } from 'uuid';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const SinglePatient = () => {
    const id = useParams().id
    const [patient, setPatient] = useState<Patient>()
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

    const [formType, setformType] = useState<HealthCareEntryTypes>()
    const [notification, setNotification] = useState('')
    const diagnoseCodes = useRef({})

    useEffect(() => {
        patientService.getById(String(id)).then(result => setPatient(result))
        patientService.getDiagnoses().then(result => setDiagnoses(result))
    }, [])


    let options = diagnoses.map(diagnose => ({value: diagnose.code, label: diagnose.code}))


    const Notification = () => {
        if(notification){
            setTimeout(() => {
                setNotification('')
            }, 5000);
            return <div style={{color: 'red'}}>{notification}</div>
        }
        return null
    }

    interface Diagnoses {
        diagnosis: Diagnosis["code"];
    }

    const Diagnoses: React.FC<Diagnoses> = ({ diagnosis }) => {
        let dgn = diagnoses.filter((diagnose: Diagnosis) => diagnose.code === diagnosis)
        if(!dgn[0]) return <div>None</div>
        return <li>{diagnosis} - {dgn[0].name}</li>
    }

    const HospitalEntry: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
        return (
            <div>
                <div>Date: {entry.date} - {entry.type}</div>
                <div>Description: {entry.description}</div>
                <div>Diagnosis: {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnose => <Diagnoses key={diagnose} diagnosis={diagnose}/>)}</div>
            </div>
        )
    }

    const OccupationalEntry: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
        return (
            <div>
                <div>Date: {entry.date} - {entry.type}</div>
                <div>Description: {entry.description}</div>
                <div>Diagnosis: {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnose => <Diagnoses key={diagnose} diagnosis={diagnose}/>)}</div>
                <div>Employer: {entry.employerName}</div>
            </div>
        )
    }

    const HealthCheckEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
        return (
            <div>
                <div>Date: {entry.date} - {entry.type}</div>
                <div>Description: {entry.description}</div>
                <div>Diagnosis: {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnose => <Diagnoses key={diagnose} diagnosis={diagnose}/>)}</div>
                <div>Rating: {entry.healthCheckRating}</div>
            </div>
        )
    }
    
    const Entries: React.FC<{entry: Entry}> = ({entry}) => {
        switch(entry.type){
            case HealthCareEntryTypes.Hospital:
                return <HospitalEntry entry={entry}/>
            case HealthCareEntryTypes.OccupationalHealthcare:
                return <OccupationalEntry entry={entry}/>
            case HealthCareEntryTypes.HealthCheck:
                return <HealthCheckEntry entry={entry}/>
            default:
                return assertNever(entry)
        }
    }

    const EntryForm = () => {
        return (
            <div>
                <form >
                    <input type="radio" value={HealthCareEntryTypes.HealthCheck} name="type" onChange={() => setformType(HealthCareEntryTypes.HealthCheck)} />Healthcheck
                    <input type="radio" value={HealthCareEntryTypes.OccupationalHealthcare} name="type" onChange={() => setformType(HealthCareEntryTypes.OccupationalHealthcare)} />Occ. Healthcare
                    <input type="radio" value={HealthCareEntryTypes.Hospital} name="type" onChange={() => setformType(HealthCareEntryTypes.Hospital)} />Hospital
                </form>
            </div>
        )
    }

    const HealthCheckForm = () => {
        return (
            <div>
                <form onSubmit={addNewEntry}>
                    <div>
                        Description: <input type="text" name="description"/>
                    </div>
                    <div>
                        Date: <input type="date" name="date"/>
                    </div>
                    <div>
                        Specialist: <input type="text" name="specialist"/>
                    </div>
                    <div>
                        <Select options={options} isMulti={true} name="diagnoseCodes" onChange={(event) => diagnoseCodes.current = event}/>
                    </div>
                    <div>
                        Health rating: <input type="text" name="healthRating"/>
                    </div>
                        <button type="submit">Add</button>
                </form>
            </div>
        )
    }

    const OccupationalForm = () => {
        return (
            <div>
                <form onSubmit={addNewEntry}>
                    <div>
                        Description: <input type="text" name="description"/>
                    </div>
                    <div>
                        Date: <input type="date" name="date"/>
                    </div>
                    <div>
                        Specialist: <input type="text" name="specialist"/>
                    </div>
                    <div>
                        <Select options={options} isMulti={true} name="diagnoseCodes" onChange={(event) => diagnoseCodes.current = event}/>
                    </div>
                    <div>
                        Employer<input type="text" name="employer"/>
                    </div>
                    <div>
                        Sickleave start<input type="date" name="slStart"/>
                    </div>
                    <div>
                        Sickleave end<input type="date" name="slEnd"/>
                    </div>
                        <button type="submit">Add</button>
                </form>
            </div>
        )
    }

    const HospitalForm = () => {
        return (
            <div>
                <form onSubmit={addNewEntry}>
                    <div>
                        Description: <input type="text" name="description"/>
                    </div>
                    <div>
                        Date: <input type="date" name="date"/>
                    </div>
                    <div>
                        Specialist: <input type="text" name="specialist"/>
                    </div>
                    <div>
                        <Select options={options} isMulti={true} name="diagnoseCodes" onChange={(event) => diagnoseCodes.current = event}/>
                    </div>
                    <div>
                        Discharge criteria<input type="text" name="dischargeCriteria"/>
                    </div>
                    <div>
                        Discharge date<input type="date" name="dischargeDate"/>
                    </div>
                        <button type="submit">Add</button>
                </form>
            </div>
        )
    }

    const ShowForm = () => {
        switch(formType){
            case HealthCareEntryTypes.HealthCheck: return <HealthCheckForm />
            case HealthCareEntryTypes.OccupationalHealthcare: return <OccupationalForm />
            case HealthCareEntryTypes.Hospital: return <HospitalForm />
        }
        return null
    }

    
    const addNewEntry: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let date = formData.get('date')?.toString()
        if(!date) return setNotification('Please input date')
        let description = formData.get('description')?.toString()
        if(!description) return setNotification('Please input description')
        let specialist = formData.get('specialist')?.toString()
        if(!specialist) return setNotification('Please input specialist')
        if(!formType) return setNotification('Something went wrong with the form type')


        let object = {
            date: date,
            description: description,
            specialist: specialist,
            id: uuid(),
            diagnosisCodes: []
        }

        if(diagnoseCodes.current) object.diagnosisCodes = Object(diagnoseCodes.current).map((diagnose: any) => diagnose.value)

        

        switch(formType){
            case HealthCareEntryTypes.HealthCheck:

                let healthRating = formData.get('healthRating')

                if(!healthRating) return setNotification('Please input health rating')

                let CheckObject: HealthCheckEntry = {
                    ...object,
                    type: HealthCareEntryTypes.HealthCheck,
                    healthCheckRating: Number(healthRating)
                }

                if(patient) patientService.addEntry(CheckObject, patient.id)
                setNotification('Added new entry')
                break;

            case HealthCareEntryTypes.OccupationalHealthcare:

                let sickLeaveStart = formData.get('slStart')
                let sickLeaveEnd = formData.get('slEnd')
                let employer = formData.get('employer')

                if(!employer) return setNotification('Please input employer')

                let OccupationalObject: OccupationalHealthCareEntry = {
                    ...object,
                    type: HealthCareEntryTypes.OccupationalHealthcare,
                    employerName: employer.toString(),
                };

                if(sickLeaveEnd && sickLeaveStart){
                    let sickleave: SickLeave = {
                        startDate: sickLeaveStart.toString(),
                        endDate: sickLeaveEnd.toString()
                    }
                    OccupationalObject.sickLeave = sickleave
                }

                if(patient) patientService.addEntry(OccupationalObject, patient.id)
                setNotification('Added new entry')
                break;

            case HealthCareEntryTypes.Hospital:

                let dischargeDate = formData.get('dischargeDate')
                let dischargeCriteria = formData.get('dischargeCriteria')

                if(!dischargeDate) return setNotification('Please input discharge date')
                if(!dischargeCriteria) return setNotification('Please input discharge criteria')

                let discharge: Discharge = {
                    date: dischargeDate.toString(),
                    criteria: dischargeCriteria.toString()
                }

                let HospitalObject: HospitalEntry = {
                    ...object,
                    type: HealthCareEntryTypes.Hospital,
                    discharge: discharge
                }; 
                
                if(patient) patientService.addEntry(HospitalObject, patient.id)
                setNotification('Added new entry')
                break; 
        }
    }

    if(patient){
        return (
            <div>
                <div>
                    <h3>{patient.name}</h3>
                    <div>born: {patient.dateOfBirth}</div>
                    <div>gender: {patient.gender}</div>
                    <div>ssn: {patient.ssn}</div>
                    <div>occupation: {patient.occupation}</div>
                    <div>id: {patient.id}</div>
                </div>
                <div>
                    <h3>Entries</h3>
                        {patient.entries.map(entry => <Entries key={entry.id} entry={entry} />)}
                </div>
                <div>
                    <h3>Create new entry</h3>
                    <Notification />
                    <EntryForm />
                    <ShowForm />
                </div>
            </div>
        )
    }
    return <div>No patient found</div>
}

export default SinglePatient