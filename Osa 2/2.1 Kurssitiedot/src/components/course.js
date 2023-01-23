import Header from "./header.js"
import Content from "./content.js"

const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            {props.course.parts.map(part => <Content part={part} key={part.id}/>)}
        </div>
    )
}

export default Course