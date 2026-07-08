import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, obj: unknown, options = {}): Observable<T> {
    return this.http.post<T>(url, obj, options);
  }

  public put<T>(url: string, obj: unknown): Observable<T> {
    return this.http.put<T>(url, obj);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
