import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ValidatorFn, AbstractControl } from '@angular/forms';  
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }
  listArray : any = [];

  getListData()
  {
    return this.httpClient.get<any[]>("/assets/lists.json");
  }

}
