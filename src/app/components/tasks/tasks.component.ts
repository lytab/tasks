import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task.service';
import { Task } from './../../modules/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  search="";
tasks:Task[]=[];
showForm=false;
editForm=false;
myTask={
label:'',
completed:false
}
  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks(){
this.taskService.getTasks(this.search).subscribe(data=>this.tasks=data);
  }
  deleteTask(id){
this.taskService.delete(id).subscribe(()=>{
this.tasks=this.tasks.filter(task=>task.id!=id);
})
  }
  persistTask(){
    this.taskService.persist(this.myTask).subscribe((data)=>{
      this.tasks.push(data);
      //this.tasks=[this.myTask,...this.tasks];
      this.resetTask();
    })
  }
  resetTask(){
    this.showForm=!this.showForm;
    this.myTask={
      label:'',
      completed:false
      }
      this.editForm=false;

  }
  toggleCompleted(task){
this.taskService.completed(task.id,task.completed).subscribe(()=>{
task.completed=!task.completed;
})
  }
  editTask(task){
    this.showForm=true;
this.myTask=task;
this.editForm=true;
  }
  updateTask(){
this.taskService.update(this.myTask).subscribe(()=>{
this.resetTask();
});
  }
/*seachTasks(){
this.tasks=this.tasks.filter((task)=>task.label.includes(this.search))
}*/
}
