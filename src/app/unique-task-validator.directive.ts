import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, Validator, ValidationErrors} from '@angular/forms';
import { ListService } from './list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appUniqueTaskValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueTaskValidatorDirective, 
      multi: true
    }
  ]
})
export class UniqueTaskValidatorDirective {

  data: any[];

  constructor(private listservice: ListService) { }

  validate(control: AbstractControl) : Observable<ValidationErrors | null>
  {
    let task_name = control.value;
    let status = 0;
    return this.listservice.getListData().pipe(map((response) => {
      this.data = response;
      let found = 0;
      this.data.forEach(element => {
        this.data.map( function(list){
          let found = list['tasks'].some(el => el.taskname == task_name);
          if(found){ status = 1; }
        });
      });

      if(status){
        return { alreadyTaskPresent: {valid:false}};   // invalid
      }else{
        return null;  //valid
      }
    })); 
  }  

}
