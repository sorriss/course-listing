import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { CourseInterface } from '../../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public filter$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  constructor(private apiService: ApiService) {}
  public getData(): Observable<CourseInterface[]> {
    return this.apiService.get<CourseInterface[]>('/api/courses').pipe(
      tap(this.prepFilterData)
    );
  }

  private prepFilterData(data: CourseInterface[]): void {
    const statusArr: string[] = [];
    data.forEach((item: CourseInterface) => {
      if (statusArr.indexOf(item.status) === -1) {
        statusArr.push(item.status);
      }
    });

    this.filter$.next(statusArr);
  }
}
