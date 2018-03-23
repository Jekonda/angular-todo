import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToDo} from './to-do.model';

@Injectable()
export class ToDoService {

  reqHeader = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  /**
   *load all items
   * @return {Observable<Object>}
   */
  loadTaskList() {
    const getUrl = 'api/todo/all';
    return this.http.get(getUrl);
  }

  /**
   *send request to create a new item
   * @param {ToDo} item
   * @return {Observable<Object>}
   */
  createTask(item: ToDo) {
    const url = 'api/todo/create';
    return this.http.post(url, JSON.stringify(item), {headers: this.reqHeader});
  }

  /**
   *send request to remove item
   * @param {number} id
   * @return {Observable<Object>}
   */
  removeTask(id: number) {
    const removeUrl = 'api/todo/remove/' + id;
    return this.http.delete(removeUrl);
  }

  /**
   *send request to update item
   * @param {ToDo} item
   * @return {Observable<Object>}
   */
  updateTask(item: ToDo) {
    const url = 'api/todo/update';
    return this.http.put(url, JSON.stringify(item), {headers: this.reqHeader});
  }


}
