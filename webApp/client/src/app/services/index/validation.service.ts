import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // https://www.w3resource.com/javascript/form/email-validation.php
  validateEmail(mail: string): boolean {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
  }


  validateDate(date: string): boolean { 
    return (/^\d{4}-\d{2}-\d{2}$/.test(date));
  }

  validateNumber(number: string): boolean {
    return !isNaN(+number);
  } 

  validatePostalCode(postalCode: string): boolean{
    return (/[a-zA-Z][0-9][a-zA-Z](-||)[0-9][a-zA-Z][0-9]/.test(postalCode));
  }

  validateNotNull(text: string): boolean {
    return text.length > 0;
  } 
  validateInteger(number: string){
    return Number.isInteger(+number);
  }

}
