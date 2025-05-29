import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckApiService {
  private baseUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) {}

  crearMazo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/new/shuffle/?deck_count=1`);
  }

  sacarCarta(deckId: string, cantidad = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/${deckId}/draw/?count=${cantidad}`);
  }
}
