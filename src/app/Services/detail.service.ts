import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailContact } from '../interface/detail-contact';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  apiServer = environment.basedApiServer;
  constructor(private http: HttpClient) { }

  public getDetailsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServer}/detail/fetch-detail-contact/${id}`)
  }
  public getContactById(contactId: number): Observable<any> {
    return this.http.get<any>(`${this.apiServer}/contact/find/${contactId}`);
  }
  public addDetails(details: DetailContact): Observable<DetailContact> {
    return this.http.post<DetailContact>(`${this.apiServer}/detail/save/details`, details);
  }
}
