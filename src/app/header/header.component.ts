import { Component, Input, OnInit } from '@angular/core';
import { CurrencyApiDataService } from '../currency-api-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() currencyValueUsd;
  @Input() currencyValueEur;

  constructor(private currency: CurrencyApiDataService) { }
  
  ngOnInit(): void {
    this.getCurrencyValue('USD').then(data => {
      this.convert(data);
    });
    this.getCurrencyValue('EUR').then(data => {
      this.convert(data);
    });
  }

  getCurrencyValue(baseCode): Promise<unknown> {
    const promise = new Promise((resolve, reject) => {
      this.currency.getDataForOperations(baseCode).subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }

  convert(data) {
    
    for (let curr in data['rates']) {
      if (curr === 'UAH') {
        if (data['base_code'] === 'USD') {
          this.currencyValueUsd = data['rates'][curr].toFixed(2)
        } else if (data['base_code'] === 'EUR') {
          this.currencyValueEur = data['rates'][curr].toFixed(2)
        }
      }
    }
  }
}
