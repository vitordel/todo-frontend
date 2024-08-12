import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe({
        next: (response: { token: string }) => {
          // Verifica se o token está presente na resposta
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/tasks']);
          } else {
            this.errorMessage = 'Erro no login. Token não recebido.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Erro no login. Por favor, tente novamente.';
          console.error('Erro no login', error);
        },
      });
    }
  }
}
