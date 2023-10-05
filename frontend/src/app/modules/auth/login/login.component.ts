import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('modalContent') modalContent: any; 
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // todo add login to process form
      console.log('Formulario válido.');
    } else {
      console.log('Formulario inválido.');
      this.modalService.open(this.modalContent, { centered: true });
    }
  }
}
