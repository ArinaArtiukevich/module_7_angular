// import { Pipe, PipeTransform } from '@angular/core';
// import {formatCurrency, getCurrencySymbol} from "@angular/common";
//
// @Pipe({
//   name: 'customCurrency'
// })
// export class CustomCurrencyPipe implements PipeTransform {
//
//   transform(
//     value: number,
//     currencyCode: string = 'EUR',
//     display:
//       | 'code'
//       | 'symbol'
//       | 'symbol-narrow'
//       | string,
//     locale: string = 'fr',
//   ): string | null {
//     return formatCurrency(
//       value,
//       locale,
//       getCurrencySymbol(currencyCode, 'wide'),
//       currencyCode
//     );
//   }
//
// }
