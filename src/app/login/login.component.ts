import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PartyManagementService } from '../party-management.service';
import { Router } from '@angular/router';
interface LoginCredentials {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private partyService: PartyManagementService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.partyService
      .login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logged in successfully',
          });
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/party-management']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while login',
          });
          this.errorMessage = 'Invalid username or password.';
        },
      });
  }

  
}
