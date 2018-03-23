import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToDo} from './to-do/to-do.model';
import {ToDoService} from './to-do/to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  todos: ToDo[];

  /**
   * load collection of items
   */
  ngOnInit() {
    this.service.loadTaskList().subscribe(data => this.todos = data as ToDo[]);
  }

  constructor(private http: HttpClient, private service: ToDoService) {
  }

  /**
   *remove current item in todos list
   * @param element
   * @return {boolean}
   */
  onTaskDeleted(element): boolean {
    const index = this.todos.indexOf(element);
    this.service.removeTask(element.id).subscribe(res => console.log(res));
    this.todos.splice(index, 1);
    return false;
  }

  /**
   *update current item in todos list
   * @param element
   * @return {boolean}
   */
  onTaskUpdated(element): boolean {
    this.service.updateTask(element).subscribe(res => console.log(res));
    return false;
  }

  /**
   *add new item to task collection
   * @param {HTMLInputElement} title
   * @param {HTMLInputElement} desc
   * @param {HTMLInputElement} deadline
   * @return {boolean}
   */
  addTask(title: HTMLInputElement, desc: HTMLInputElement, deadline: HTMLInputElement): boolean {
    const item = new ToDo(title.value, desc.value, new Date(deadline.value));
    this.service.createTask(item).subscribe(res => {
      this.todos.push(res as ToDo);
    });

    title.value = '';
    desc.value = '';
    deadline.value = '';
    return false;
  }


}
