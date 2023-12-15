export interface CourseInterface {
  id: number,
  name: string,
  imageUrl: string,
  status: string,
  instructors: InstructorInterface[];
}

export interface CourseDetailInterface extends CourseInterface{
  images: string[]
}

export interface InstructorInterface {
  name: string,
  image: string
}
