import Header from "./header.js"
import Content from "./content.js"
import Total from "./total.js"

const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            {props.course.parts.map(part => <Content part={part} key={part.id}/>)}
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course