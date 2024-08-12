import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  token: string | null = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.apiService.getTasks(this.token).subscribe(
        (response) => {
          this.tasks = response;
        },
        (error) => {
          console.error('Erro ao listar tarefas', error);
        }
      );
    }
  }

  completeTask(taskId: number) {
    if (this.token) {
      this.apiService.completeTask(taskId, this.token).subscribe(
        (response) => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
        },
        (error) => {
          console.error('Erro ao concluir tarefa', error);
        }
      );
    }
  }
}
