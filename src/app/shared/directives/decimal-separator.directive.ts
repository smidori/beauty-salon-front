import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[decimalSeparator]',
})
export class DecimalSeparatorDirective {
  constructor(private el: ElementRef<HTMLInputElement>) { }

  @HostListener('input', ['$event']) onInputChange(event: InputEvent) {
    const input = this.el.nativeElement;
    const value = input.value;
    const selectionStart = input.selectionStart || 0;

    const newValue = this.removeInvalidCharacters(value);

    if (newValue !== value) {
      input.value = newValue;
      input.setSelectionRange(selectionStart - 1, selectionStart - 1);
    }
  }

  private removeInvalidCharacters(value: string): string {
    // Remove all characters except numbers and a single decimal point
    //const validRegex = /^[0-9]+(\.[0-9]{2})?$/;

    let newValue = '';
    let decimalPointCount = 0;

    for (let i = 0; i < value.length; i++) {
      var ignore = false;
      const char = value[i];
      if (char === '.') {
        ignore = true;
        decimalPointCount++;
        if (decimalPointCount > 1) {
          continue;
        }
        newValue += char;
      // } else if(!ignore && value.match(validRegex)){
      //   console.log("match")
      //   newValue += char;
      // }
      } else if (isNaN(Number(char))) {
        continue;
      } else {
        newValue += char;
      }
    }
    return newValue;
  }
}

// import { Directive, ElementRef, HostListener } from '@angular/core';

// @Directive({
//   selector: 'input[appDecimalSeparator]',
// })
// export class DecimalSeparatorDirective {
//   constructor(private el: ElementRef<HTMLInputElement>) {}

//   @HostListener('input', ['$event']) onInputChange(event: InputEvent) {
//     const input = this.el.nativeElement;
//     const value = input.value;
//     const selectionStart = input.selectionStart || 0;

//     const newValue = this.removeInvalidCharacters(value, selectionStart);
//     console.log("newValue = " + newValue);

//     if (newValue !== value) {
//       input.value = newValue;
//       input.setSelectionRange(selectionStart, selectionStart);
//     }
//   }

//   private removeInvalidCharacters(value: string, position: number): string {
//     // Remove all characters except numbers and the first decimal point
//     const validRegex = /^[0-9]+(\.[0-9]{0,2})?$/;
//     const match = value.match(validRegex);
//     return match ? match[0] : '';
//   }
// }


