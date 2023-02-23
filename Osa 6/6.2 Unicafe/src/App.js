const App = ({store}) => {

const good = store.getState().good
const bad = store.getState().bad
const neutral = store.getState().ok
const total = good + bad + neutral

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({good, bad, ok}) => {
  if(total === 0) return (<div>No feedback given</div>)
  return (
    <div>
      <table>
        <tbody>
        <StatisticsLine text="Good" value={good}/>
          <StatisticsLine text="Neutral" value={neutral}/>
          <StatisticsLine text="Bad" value={bad}/>
          <StatisticsLine text="All" value={total}/>
          <StatisticsLine text="Average" value={(good - bad) / (total)}/>
          <StatisticsLine text="Positive" value={good / (total) * 100 + "%"}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = (props) => {
  if(total === 0) return (<div>No feedback given</div>)
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={e => store.dispatch({ type: 'GOOD' })} text="good" />
      <Button handleClick={e => store.dispatch({ type: 'OK' })} text="neutral" />
      <Button handleClick={e => store.dispatch({ type: 'BAD' })} text="bad" />
      <Button handleClick={e => store.dispatch({ type: 'ZERO' })} text="reset" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App
