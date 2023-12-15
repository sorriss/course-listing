import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CourseDetailInterface} from "../../interfaces/course.interface";
import {ApiService} from "../../services/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private apiService: ApiService) { }

  public getData(id: number): Observable<CourseDetailInterface> {
    return this.apiService.get('/api/courses/' + id)
  }
}
