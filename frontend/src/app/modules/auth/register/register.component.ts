import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('modalContent') modalContent: any; 
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // todo add login to process form
      console.log('Formulario válido.');
    } else {
      console.log('Formulario inválido.');
      this.modalService.open(this.modalContent, { centered: true });
    }
  }
}
