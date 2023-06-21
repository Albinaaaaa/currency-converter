import { Component, Input, OnInit } from '@angular/core';
import { CurrencyApiDataService } from './currency-api-data.service';
import { ICurrency } from './Currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public title = 'my-currency-converter';
  // public currJson;
  // public currencies: ICurrency;
  @Input() amountValue: number = 0;

  public currJson;
  public currencies: ICurrency;
  @Input() result: number = 0;
  @Input() lastUpdated;

  @Input() currencyFrom: string = 'USD';
  @Input() currencyTo: string = 'USD';
  // @Input() currencyValues: number[] = [];

  constructor(private currency: CurrencyApiDataService) { }

  changeBase(baseCode) {
    this.currency.getDataForOperations(baseCode).subscribe(data => {
      this.parseJson(data);
      this.setCurrency(this.currJson.rates);
    });
  }



    toCountry(baseCode: string) {
      this.currencyTo = baseCode;
    }

  ngOnInit(): void {
    this.currency.getCurrencyData()
      .subscribe(data => {
        this.parseJson(data);
        this.setCurrency(this.currJson.rates);
      })
    }
    
  parseJson(data): void {
    this.currJson = JSON.stringify(data);
    this.currJson = JSON.parse(this.currJson);
    this.currencyFrom = this.currJson.base_code;
    this.lastUpdated = this.currJson.time_last_update_utc;
  }

  setCurrency(data: ICurrency): void {
    this.currencies = data;
  } 
  
  convert(amount: number) {
    for (let curr in this.currencies) {
      if (this.currencyTo === curr) {
        this.result = +(amount * this.currencies[curr]).toFixed(2);
      }
    }
  }

  switchCurrencies() {
    let temp = this.currencyTo;
    this.amountValue = this.result;
    this.result = 0;
    this.changeBase(temp);
    this.toCountry(this.currencyFrom);
  }

}
