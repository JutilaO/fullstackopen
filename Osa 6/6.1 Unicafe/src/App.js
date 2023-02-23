import { useState } from 'react'
import counterReducer from './reducer'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={addGood} text="good" />
      <Button handleClick={addNeutral} text="neutral" />
      <Button handleClick={addBad} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  let total = props.good + props.neutral + props.bad
  if(total === 0) return (<div>No feedback given</div>)
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={props.good}/>
          <StatisticsLine text="Neutral" value={props.neutral}/>
          <StatisticsLine text="Bad" value={props.bad}/>
          <StatisticsLine text="All" value={total}/>
          <StatisticsLine text="Average" value={(props.good - props.bad) / (total)}/>
          <StatisticsLine text="Positive" value={props.good / (total) * 100 + "%"}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = (props) => {
  let total = props.good + props.neutral + props.bad
  if(total === 0) return (<div>No feedback given</div>)
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

export default App
