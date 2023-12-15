import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {
  }

  public get<T>(url: string, options = {}) {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, obj: unknown, options = {}) {
    return this.http.post<T>(url, obj, options);
  }

  public put<T>(url: string, obj: unknown) {
    return this.http.put<T>(url, obj)
  }

  public delete<T>(url: string) {
    return this.http.delete<T>(url)
  }

}


