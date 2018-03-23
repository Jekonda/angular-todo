import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ToDo} from './to-do.model';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'column';

  @Input() todo: ToDo;
  @Output() elementDeleted: EventEmitter<any> = new EventEmitter();
  @Output() elementUpdated: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  deleteItem(element): boolean {
    this.elementDeleted.emit(element);
    return false;
  }

  updateItem(element): boolean {
    this.elementUpdated.emit(element);
    return false;
  }

  ngOnInit() {
  }

}
