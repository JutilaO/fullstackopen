import axios from "axios";
import { Patient, PatientFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
}

const getDiagnoses = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
  return data;
}

const addEntry = async (object: Entry, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    {entry: object, patientId: id}
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getById, getDiagnoses, addEntry
};

