import diagnoseData from '../data/diagnoses';
import {Diagnose} from '../types/diagnose';

const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export default getDiagnoses;