import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, Validator, ValidationErrors} from '@angular/forms';
import { ListService } from './list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appUniqueListValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueListValidatorDirective,
      multi: true
    }
  ],

})
export class UniqueListValidatorDirective implements Validator {

  data: any[];
  constructor(private listservice: ListService) { }

  validate(control: AbstractControl) : Observable<ValidationErrors | null>
  {
    let list_name = control.value;

    return this.listservice.getListData().pipe(map((response) => {
      this.data = response;
      let found = this.data.some(el => el.name === list_name);
      if(found){
        return { alreadyListPresent: {valid:false}};   // invalid
      }else{
        return null;  //valid
      }
    }));
  }  
}
