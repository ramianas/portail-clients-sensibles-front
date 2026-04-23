import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../models/tache.model';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:8080/api/taches';

  constructor(private http: HttpClient) { }

  listerTachesEnAttente(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/en-attente`);
  }

  validerTache(id: number, validateurId: number): Observable<void> {
    const params = new HttpParams().set('validateurId', validateurId.toString());
    return this.http.post<void>(`${this.apiUrl}/${id}/valider`, {}, { params });
  }

  rejeterTache(id: number, validateurId: number, motifRejet: String): Observable<void> {
    const params = new HttpParams()
      .set('validateurId', validateurId.toString())
      .set('motifRejet', motifRejet.toString());
    return this.http.post<void>(`${this.apiUrl}/${id}/rejeter`, {}, { params });
  }
}
