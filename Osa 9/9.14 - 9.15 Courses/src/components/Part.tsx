import {CoursePart} from '../types/course'

const Part: React.FC<{course: CoursePart}> = ({course}) => {
    switch(course.kind){
        case 'basic':
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>Description: {course.description}</p>
                    <p>Kind: {course.kind}</p>
                </div>
            )
        case 'group':
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>Projects: {course.groupProjectCount}</p>
                    <p>Kind: {course.kind}</p>
                </div>
            )
        case 'background':
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>Description: {course.description}</p>
                    <p>Kind: {course.kind}</p>
                    <p>Background material: {course.backgroundMaterial}</p>
                </div>
            )
        case 'special':
            if(!course.requirements) course.requirements = []
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>Description: {course.description}</p>
                    <p>Kind: {course.kind}</p>
                    <p>Requirements: {course.requirements.join(" ")}</p>
                </div>
            )
    }
    return <div>Nothing to see here</div>
}

export default Part