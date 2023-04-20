interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number) => {

    let total = 0;

    for(let i = 0; i < hours.length; i++){
        total += hours[i];
    }

    const average = total / hours.length;
    let rating = 0;
    let ratingDescription = 'TBD';
    let success = false;

    if(average < target){
        rating = 1;
        ratingDescription = 'terrible job';
    }
    if(average >= target){
        rating = 2;
        ratingDescription = 'good job';
        success = true;
    }
    if(average >= target+1){
        rating = 3;
        ratingDescription = 'great job';
    }


    const result: result = {
        periodLength: hours.length,
        trainingDays: hours.filter(hours => hours !== 0).length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };

    return result;

};

//const array = [];
//for(let i = 3; i < process.argv.length; i++){
//    if(isNaN(Number(process.argv[i]))) throw new Error('Values must be numbers');
//    array.push(Number(process.argv[i]));
//}

//console.log(calculateExercises(array, Number(process.argv[2])));

export default calculateExercises;