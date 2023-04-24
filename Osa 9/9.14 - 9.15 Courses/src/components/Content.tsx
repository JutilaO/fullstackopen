import Part from './Part'
import {CoursePart} from '../types/course'

const Content: React.FC<{courses: CoursePart[]}> = ({courses}) => {
    return (
        <div>
            {courses.map(course => <Part key={course.name} course={course}/>)}
        </div>
    )
}

export default Content