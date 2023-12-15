import {Request, Response} from 'express';
import {COURSES} from "./db-data";

export function getAllCourses(req: Request, res: Response) {
  res.status(200).json(Object.values(COURSES));
}

export function getCourseById(req: Request, res: Response) {
  const courseId = req.params["id"];
  const courses: any = Object.values(COURSES);
  let course = courses.find((course: { id: string; }) => course.id == courseId);
  course.images = ["https://picsum.photos/300/300", "https://picsum.photos/300/300", "https://picsum.photos/300/300"];
  res.status(200).json(course);
}
