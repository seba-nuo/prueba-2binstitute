import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('badInputModal') badInputModal: any;
  @ViewChild('badRoleModal') badRoleModal: any;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private modalService: NgbModal, private loginService: LoginService, private router: Router) {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(res => {
        if (res.success) {
          localStorage.setItem('token', res['token']);
          this.router.navigate(['/home'])
        } else {
          this.modalService.open(this.badRoleModal, { centered: true });
        }
      })
    } else {
      this.modalService.open(this.badInputModal, { centered: true });
    }
  }
}
