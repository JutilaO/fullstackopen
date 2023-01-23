const Total = (props) => {
    return (
      <p><b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</b></p>
    )
}

export default Total