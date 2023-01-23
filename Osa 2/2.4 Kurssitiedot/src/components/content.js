import Part from "./part.js"

const Content = (props) => {
    return (
      <div>
        <Part name={props.part.name} exercises={props.part.exercises} />
      </div>
    )
}

export default Content