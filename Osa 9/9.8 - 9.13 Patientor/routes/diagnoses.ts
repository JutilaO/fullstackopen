import express from 'express';
import getDiagnoses from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    console.log(getDiagnoses());
    res.send('gets all');
});

export default diagnosesRouter;