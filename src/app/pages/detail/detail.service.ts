import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetailInterface } from '../../interfaces/course.interface';
import { ApiService } from '../../services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private readonly apiService = inject(ApiService);

  // while you providing all the data in request for all courses, there is no need to make this request when user comes from courses table. It is needed only on page refresh i guess
  public getData(id: string): Observable<CourseDetailInterface> {
    return this.apiService.get(`/api/courses/${id}`);
  }
}
