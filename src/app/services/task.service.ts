import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "./../modules/task";

@Injectable({
  providedIn: "root"
})
export class TaskService {
   url="http://localhost:3000/tasks";
  constructor(private http: HttpClient) {}
  getTasks(search) {
    return this.http.get<Task[]>(`${this.url}?q=${search}`);
  }
  delete(id){
    return this.http.delete(`${this.url}/${id}`);
  }
  persist(task){
return this.http.post<Task>(this.url,task);
  }
  completed(id,completed){
return this.http.patch(`${this.url}/${id}`,{completed:!completed});
  }
update(task){
  return this.http.put<Task>(`${this.url}/${task.id}`,{label:task.label,completed:task.completed});
}
}
