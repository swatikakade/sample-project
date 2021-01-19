import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

declare var $: any;


@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  // listArray: any[] = [
  //   {
  //     "name": "To Do",
  //     "tasks": [{
  //         "taskname": "Pay Electricity Bill"
  //       },
  //       {
  //         "taskname": "Make Grocery List"
  //       }
  //     ]
  //   },
  //   {
  //     "name": "In Progress",
  //     "tasks": [{
  //         "taskname": "Iron Cloths"
  //       }
  //     ]
  //   },
  //   {
  //     "name": "Done",
  //     "tasks": [{
  //         "taskname": "Buy Running Shoes"
  //       }
  //     ]
  //   }
  // ];

  listArray : any = [];
  deleteListName: string;
  deleteTaskName: string;
  taskIndex: number;
  deleteTaskIndex: number;
  connectedTo = [];

  @ViewChild('newListForm',  {static: true}) newListForm: NgForm;
  @ViewChild('newTaskForm', {static: true}) newTaskForm: NgForm;
  @ViewChild('listName', {static: true}) listName: ElementRef;
  @ViewChild('taskName', {static: true}) taskName: ElementRef;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("/assets/lists.json").subscribe(data =>{
      this.listArray = data;

      for (let list of this.listArray) {
        this.connectedTo.push('list_'+list.id);
      };
    });
  }

  onNewList(event){
    this.newListForm.resetForm();
  }

  addNewList(){
    if(this.newListForm.valid){
      var list_name = this.newListForm.controls.name.value;
      var max = 0;                
      $.map(this.listArray, function (obj) {
        if (obj.id > max)
          max = obj.id;
      });
      var id  = max+1;
      var newList = { id:id, name: list_name, tasks: [] }; 
      this.listArray.push(newList); 
      $('#newListCancel').trigger('click');
    }
  }

  deleteList(name){
    this.deleteListName = name;
  }

  deleteListConfirm(){
    var name = this.deleteListName;
    this.listArray = this.listArray.filter(function(el) { return el.name != name; }); 
  }

  /* Task */ 
  onNewTask(event, i){
    this.taskIndex = i;
    this.newTaskForm.resetForm();
  }

  addNewTask(){
    if(this.newTaskForm.valid){
      var taskname = this.newTaskForm.controls.name.value; 

      // Check name is already present
      this.listArray.map( function(list){
        const found = list['tasks'].some(el => el.taskname == taskname);
        if(found){
          alert("Task Name already present, please try another one.");
          return 0;
        }
      });

      var newTask = { taskname: taskname}; 
      this.listArray[this.taskIndex]['tasks'].push(newTask); 
      $('#newTaskCancel').trigger('click');
    }
  }

  deleteTask(index, name){
    this.deleteTaskIndex = index;
    this.deleteTaskName = name;
  }

  deleteTaskConfirm(){
    var name = this.deleteTaskName;
    var index = this.deleteTaskIndex;
    console.log(this.listArray[index]['tasks']);
    this.listArray[index]['tasks'] = this.listArray[index]['tasks'].filter(function(el) { return el.taskname != name; }); 
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
