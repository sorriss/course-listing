export interface CourseInterface {
  id: string;
  name: string;
  imageUrl: string;
  status: 'DRAFT' | 'PUBLISHED';
  instructors: InstructorInterface[];
  images: string[];
}

export interface CourseDetailInterface extends CourseInterface {
  images: string[];
}

export interface InstructorInterface {
  name: string;
  image: string;
}
