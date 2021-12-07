import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../interface/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  ApiServer = environment.basedApiServer
  constructor(private http: HttpClient) { }

  public getContactByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.ApiServer}/contact/all-by-user?id=${userId}`)
  }
  public addContactWIthImageAndId(id: number, contact: Contact): Observable<any> {
    return this.http.post<any>(`${this.ApiServer}/contact/users/${id}/add`, contact);
  }
  public deleteContactByID(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiServer}/contact/delete/${id}`);
  }
  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.ApiServer}/Contact/update`, contact);
  }
}
