import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientPpe, Page } from '../models/client-ppe.model';

@Injectable({
  providedIn: 'root'
})
export class PpeService {
  private apiUrl = 'http://localhost:8080/api/clients/ppe';

  constructor(private http: HttpClient) { }

  creerPpe(ppe: ClientPpe, userId: number): Observable<ClientPpe> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<ClientPpe>(this.apiUrl, ppe, { params });
  }

  listerPpes(userId: number, page: number = 0, size: number = 10, sort: string = 'nom,asc'): Observable<Page<ClientPpe>> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    
    return this.http.get<Page<ClientPpe>>(this.apiUrl, { params });
  }

  chercherPpes(userId: number, criteria: any, page: number = 0, size: number = 10): Observable<Page<ClientPpe>> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.post<Page<ClientPpe>>(`${this.apiUrl}/search`, criteria, { params });
  }

  modifierPpe(id: number, ppe: ClientPpe): Observable<ClientPpe> {
    return this.http.put<ClientPpe>(`${this.apiUrl}/${id}`, ppe);
  }

  supprimerPpe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
