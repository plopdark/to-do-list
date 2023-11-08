import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ITask {
  title?: string;
  isDone?: boolean;
  id?: number;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  public list: ITask[] = [];
  public taskInput = new FormControl<string>('');
  public readonly icon = 'assets/images/icon.png';

  ngOnInit(): void {
    const storeData = localStorage.getItem('app-todo-item');
    if (storeData) {
      this.list = JSON.parse(storeData);
    }
  }

  public get lengthCompleted(): number {
    return this.list.filter((item) => item.isDone).length;
  }

  public get disabledButton(): boolean {
    return !this.taskInput.value;
  }

  public onAddInput(): void {
    this.list.push({
      title: this.taskInput.value!,
      isDone: false,
      id: this.list.length,
    });
    this.taskInput.setValue('');
    this.setLocalStorage();
  }

  public handleSelect(item: ITask) {
    this.list.forEach((task) => {
      if (task.id === item.id) {
        task.isDone = !task.isDone;
      }
    });
    this.setLocalStorage();
  }

  public handleDelete(item: ITask) {
    const index = this.list.findIndex((task) => task.id === item.id);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    this.setLocalStorage();
  }

  public setLocalStorage(): void {
    localStorage.setItem('app-todo-item', JSON.stringify(this.list));
  }
}
