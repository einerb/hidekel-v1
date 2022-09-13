import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Api } from '../utils/api';

@Injectable({
  providedIn: 'root',
})
export class VerseService {
  constructor(private http: HttpClient) {}

  public getVerse(): Observable<any> {
    const options = {
      url: 'https://multilingual-bible.p.rapidapi.com/sagradasescrituras/bible/spanish/random/verse',
      headers: {
        'X-RapidAPI-Key': '8cca247c27mshdcb66885704dad3p125633jsn555de10f631c',
        'X-RapidAPI-Host': 'multilingual-bible.p.rapidapi.com',
      },
    };

    return this.http.get(options.url, { headers: options.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
