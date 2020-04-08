import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  mail: string = "";
  isconnected: boolean = false;

  constructor() { }
}
