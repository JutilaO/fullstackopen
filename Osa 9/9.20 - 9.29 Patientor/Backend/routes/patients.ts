import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

patientsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const patients = patientService.getCompletePatients();
    const patient = patients.filter(patient => patient.id === id);
    if(!patient[0]) return res.status(400).send({error: 'Patient not found'});
    return res.send(patient[0]);
});

patientsRouter.post('/:id/entries', (req, res) => {

    const patients = patientService.getCompletePatients();
    const patient = patients.filter(patient => patient.id === req.body.patientId);
    if(!patient[0]) throw new Error('Patient not found');
    const entry = req.body.entry;
    if(!patient[0].entries) patient[0].entries = [];

    try {
        toNewEntry(entry);
        patient[0].entries.push(entry);
        patientService.updatePatient(patient[0]);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

});

export default patientsRouter;