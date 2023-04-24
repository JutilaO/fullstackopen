interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
  
interface CoursePartBasic extends CoursePartIncludingDescription {
    kind: "basic"
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}
  
interface CoursePartBackground extends CoursePartIncludingDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartIncludingDescription extends CoursePartBase {
    description: string;
    kind: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
}

interface CourseWithRequirements extends CoursePartIncludingDescription {
    requirements: string[];
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartIncludingDescription | CourseWithRequirements;