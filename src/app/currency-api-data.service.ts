import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CurrencyApiDataService {
  url = 'https://open.er-api.com/v6/latest';

  constructor(public http: HttpClient) { }

  getCurrencyData() {
    // let url = 'https://open.er-api.com/v6/latest';
    return this.http.get(this.url);
  } 


  getDataForOperations(baseCode: string) {
    let newUrl = this.url + '/' + baseCode;
    return this.http.get(newUrl);
  }
}
