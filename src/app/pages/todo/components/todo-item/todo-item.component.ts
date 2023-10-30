import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ITask } from '../../todo.component';
import { FormControl } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [
    trigger('fadeInLeft', [
      state('void', style({ opacity: 0, transform: 'translateX(-20px)' })),
      transition(':enter', [
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class TodoItemComponent implements OnInit {
  @Input() item: ITask = {};
  @Output() handleSelect = new EventEmitter<ITask>();
  @Output() handleDelete = new EventEmitter<ITask>();
  public taskSelect = new FormControl<boolean>(this.item.isDone!);
  public readonly trashIcon = 'assets/images/trash.png';

  ngOnInit(): void {
    this.taskSelect.valueChanges.subscribe((value) => {
      this.handleSelect.emit(this.item);
    });
  }

  onDeleteTask(task: ITask): void {
    this.handleDelete.emit(task);
  }
}
