import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AppRoutingModule } from './app-routing.module';
import { UniqueListValidatorDirective } from './unique-list-validator.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UniqueTaskValidatorDirective } from './unique-task-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    UniqueListValidatorDirective,
    UniqueTaskValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  exports: [
    UniqueListValidatorDirective,
    UniqueTaskValidatorDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
