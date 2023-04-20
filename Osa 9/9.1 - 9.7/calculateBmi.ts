const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if(bmi > 18.5 && bmi < 25) return 'Normal (healthy weight)';
  if(bmi < 18.5) return 'Underweight';
  if(bmi > 25) return 'Overweight';
  return;
};

//if(process.argv.length < 4) throw new Error('Please input height and weight')
//if(isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) throw new Error('Height and weight must be numbers')

//console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));


export default calculateBmi;