import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/:height?/:weight?', (req, res) => {
    if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){
        res.send({error: 'malformatted parameters'});
    } else {
        res.send({weight: req.query.weight, height: req.query.height, bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))});
    }
});

app.post('/exercises', (req, res) => {
    if(!req.body.daily_exercises || !req.body.daily_exercises.length || !req.body.target) return res.status(400).send({error: 'missing parameters'});
    for(let i = 0; i < req.body.daily_exercises.length; i++){
        if(isNaN(Number(req.body.daily_exercises[i]))) return res.status(400).send({error: 'hour array must consist of numbers'});
    }
    if(isNaN(Number(req.body.target))) return res.status(400).send({error: 'target must be a number'});
    return res.send(calculateExercises(req.body.daily_exercises, req.body.target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});