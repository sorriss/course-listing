import { Request, Response } from 'express';
import { COURSES } from './db-data';
import { CourseInterface } from '../src/app/interfaces/course.interface';

export function getAllCourses(req: Request, res: Response) {
  res.status(200).json(Object.values(COURSES));
}

export function getCourseById(req: Request, res: Response) {
  const courseId: string = req.params['id'];
  const courses: CourseInterface[] = Object.values(COURSES);
  const course = courses.find((course) => course.id == courseId);
  if (course) {
    course.images = [
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
    ];
    res.status(200).json(course);
  } else {
    res.status(404);
  }
}
