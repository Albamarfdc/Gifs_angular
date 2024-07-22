import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SeachResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apikey: string = 'A4ccN1MczBeDRCJcHimZ5XRnwFV2N3Yp';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    // Solo llamarlo cuando se cargue la página
    if (this._tagsHistory.length === 0) return
    this.searchTag(this._tagsHistory[0]);


  }


  searchTag(tag: string): void {
    if (!tag.length) return;
    this.organizeHistory(tag);

    // Hacer la petición http con HttpClient
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('q', tag)
      .set('limit', '1');

    this.http
      .get<SeachResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      });
  }
}
