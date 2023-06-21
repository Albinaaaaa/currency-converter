import { Component, Input } from '@angular/core';
import { ICurrency } from '../Currency';
import { CurrencyApiDataService } from '../currency-api-data.service';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent {
  public currJson;
  public currencies: ICurrency;
  public amountValue: number = 0;
  public result: number = 0;

  @Input() currencyFrom: string = 'USD';
  @Input() currencyTo: string = 'USD';
  @Input() currencyValues: number[] = [];

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
        console.log('start');
        console.log(data);
        this.parseJson(data);
        this.setCurrency(this.currJson.rates);
      })
    }
    
  parseJson(data): void {
    this.currJson = JSON.stringify(data);
    this.currJson = JSON.parse(this.currJson);
    this.currencyFrom = this.currJson.base_code;
    console.log('base code ' + this.currencyFrom);
  }

  setCurrency(data: ICurrency): void {
    this.currencies = data;
    console.log('rates ', this.currencies);
  } 
  
  convert(amount) {
    console.log('amount: ', amount);
    for (let curr in this.currencies) {
      if (this.currencyTo === curr) {
        this.result = +(amount * this.currencies[curr]).toFixed(2);
      }
    }
    console.log('result: ', this.result);
  }

  // changeAmountValue(amount) {
  //   // this.amountValue = this.result;
  //   this.amountValue = +(Math.round( this.amountValue * 100) / 100).toFixed(4);
  //   console.log('amountValue ' + this.amountValue);
  // }

  switchCurrencies() {
    let temp = this.currencyFrom;
    this.currencyFrom = this.currencyTo;
    this.currencyTo = temp;
    this.amountValue = this.result;
    this.changeBase(this.currencyFrom);
    this.toCountry(this.currencyTo);
  }

//  selectedCar: number;

//     cars = [
//         { id: 1, name: 'Volvo' },
//         { id: 2, name: 'Saab' },
//         { id: 3, name: 'Opel' },
//         { id: 4, name: 'Audi' },
//     ];
}
