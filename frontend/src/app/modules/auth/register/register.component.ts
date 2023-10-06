import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from './service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('modalContent') modalContent: any;

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private modalService: NgbModal, private registerService: RegisterService, private router: Router) {
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registerService.registerUser(this.registrationForm.value).subscribe({
        next: res => {
          if (res.success) {
            this.router.navigate(["/login"])
          }
        },
        error: () => {
        }
      })
    } else {
      this.modalService.open(this.modalContent, { centered: true });
    }
  }
}
