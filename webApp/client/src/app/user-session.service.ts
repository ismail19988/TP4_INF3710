import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  mail: string = "1";
  isconnected: boolean = false;

  constructor() { }
}
