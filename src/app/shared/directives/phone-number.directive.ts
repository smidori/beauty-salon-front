import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[matInput][appPhoneNumber]'
})
export class PhoneNumberDirective {

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const allowedKeys = [ 
      'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Tab'
    ];

    const input = event.target as HTMLInputElement;
    const key = event.key;
    const isAllowedKey = allowedKeys.includes(key);
    const isAllowedInput = /^[0-9+()\-\s]*$/.test(key);

    if (!isAllowedKey && !isAllowedInput) {
      event.preventDefault();
    }
  } 
}