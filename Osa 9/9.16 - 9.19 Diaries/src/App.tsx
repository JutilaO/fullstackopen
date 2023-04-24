import { useState, useEffect } from "react";
import axios from 'axios'

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [weather, setWeather] = useState('')
  const [visiblity, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data as Diary[])
    })
  }, [])

  const createDiary = async (event: any) => {
    event.preventDefault()
    const newDiary = {
      date: date,
      weather: weather,
      visibility: visiblity,
      comment: comment
    }
    try {
      const response = await axios.post<Diary>('http://localhost:3000/api/diaries', newDiary)
      setDiaries(diaries.concat(response.data))
      setError('')
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        if(error.response && error.response.data) setError(error.response.data)
      } else {
        console.error(error);
      }
    }
  }
  
  return (
    <div>
      <h1>Diaries</h1>
      {error && <div>{error}</div>}
      <div>
        <form onSubmit={(event) => createDiary(event)}>
          <div>date: <input type="date" onChange={(value) => setDate(value.target.value)}/></div>
          <div>visibility: 
            <input type="radio" value="great" name="visibility" onChange={(value) => setVisibility(value.target.value)}/>great
            <input type="radio" value="good" name="visibility" onChange={(value) => setVisibility(value.target.value)}/>good
            <input type="radio" value="ok" name="visibility" onChange={(value) => setVisibility(value.target.value)}/>bad
            <input type="radio" value="poor" name="visibility" onChange={(value) => setVisibility(value.target.value)}/>poor
          </div>
          <div>weather:
            <input type="radio" value="sunny" name="weather" onChange={(value) => setWeather(value.target.value)}/>sunny
            <input type="radio" value="rainy" name="weather" onChange={(value) => setWeather(value.target.value)}/>rainy
            <input type="radio" value="cloudy" name="weather" onChange={(value) => setWeather(value.target.value)}/>cloudy
            <input type="radio" value="stormy" name="weather" onChange={(value) => setWeather(value.target.value)}/>stormy
            <input type="radio" value="windy" name="weather" onChange={(value) => setWeather(value.target.value)}/>windy
          </div>
          <div>
            comment: <input type="text" onChange={(value) => setComment(value.target.value)}/>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
      <div>
        {diaries.map(diary => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>Weather: {diary.weather}</div>
            <div>Visibility: {diary.visibility}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;