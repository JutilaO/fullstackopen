import express from 'express';
import getDiagnoses from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    res.send(getDiagnoses());
});

export default diagnosesRouter;