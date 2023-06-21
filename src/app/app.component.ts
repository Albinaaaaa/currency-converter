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

  @Input() currencyFrom: string = 'USD';
  @Input() currencyTo: string = 'USD';
  // @Input() currencyValues: number[] = [];

  constructor(private currency: CurrencyApiDataService) { }

  changeBase(baseCode) {
    this.currency.getDataForOperations(baseCode).subscribe(data => {
      this.parseJson(data);
      this.setCurrency(this.currJson.rates);
    });
    console.log('changeBase amount value: ', this.amountValue);
    console.log('changeBase result value: ', this.result);
    // this.convert(this.amountValue);
  }



    toCountry(baseCode: string) {
      this.currencyTo = baseCode;
      // this.convert(this.amountValue);
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
    // console.log('base code ' + this.currencyFrom);
  }

  setCurrency(data: ICurrency): void {
    this.currencies = data;
    // console.log('rates ', this.currencies);
  } 
  
  convert(amount: number) {
    console.log('convert amount: ', amount);
    for (let curr in this.currencies) {
      if (this.currencyTo === curr) {
        this.result = +(amount * this.currencies[curr]).toFixed(2);
      }
    }
    console.log('convert result: ', this.result);
  }

  switchCurrencies() {
    let temp = this.currencyTo;
    // this.currencyFrom = this.currencyTo;
    // this.currencyTo = temp;
    this.amountValue = this.result;
    this.result = 0;
    this.changeBase(temp);
    this.toCountry(this.currencyFrom);
    console.log('switchCurrencies from', this.currencyFrom);
    console.log('switchCurrencies amount', this.amountValue);
    console.log('switchCurrencies result', this.result);
    console.log('switchCurrencies to', this.currencyTo);
    // console.log('amount value', this.amountValue);
    // this.convert(this.amountValue);
  }

  
}
