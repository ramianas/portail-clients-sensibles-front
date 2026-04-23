import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientPm, ClientSuspPp, Page } from '../models/client-susp.model';

@Injectable({
  providedIn: 'root'
})
export class SuspService {
  private pmUrl = 'http://localhost:8080/api/clients/susp-pm';
  private ppUrl = 'http://localhost:8080/api/clients/susp-pp';

  constructor(private http: HttpClient) { }

  // PERSONNES MORALES (PM)
  listerSuspPms(userId: number, page: number = 0, size: number = 10): Observable<Page<ClientPm>> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<ClientPm>>(this.pmUrl, { params });
  }

  creerSuspPm(pm: ClientPm, userId: number): Observable<ClientPm> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<ClientPm>(this.pmUrl, pm, { params });
  }

  modifierSuspPm(id: number, pm: ClientPm): Observable<ClientPm> {
    return this.http.put<ClientPm>(`${this.pmUrl}/${id}`, pm);
  }

  supprimerSuspPm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.pmUrl}/${id}`);
  }

  // PERSONNES PHYSIQUES (PP)
  listerSuspPps(userId: number, page: number = 0, size: number = 10): Observable<Page<ClientSuspPp>> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<ClientSuspPp>>(this.ppUrl, { params });
  }

  creerSuspPp(pp: ClientSuspPp, userId: number): Observable<ClientSuspPp> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<ClientSuspPp>(this.ppUrl, pp, { params });
  }

  modifierSuspPp(id: number, pp: ClientSuspPp): Observable<ClientSuspPp> {
    return this.http.put<ClientSuspPp>(`${this.ppUrl}/${id}`, pp);
  }

  supprimerSuspPp(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ppUrl}/${id}`);
  }
}
