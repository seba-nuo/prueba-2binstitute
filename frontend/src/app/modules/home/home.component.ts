import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './service/home.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  userList: User[] = [];
  filteredUsers: User[] = [];
  search: string = ''

  constructor(private router: Router, private homeService: HomeService) {
    this.homeService.verifyToken().subscribe({
      next: (res) => {
        if (!res.success) {
          this.router.navigate(["/login"])
        }
      },
      error: () => {
        // errors thrown by jwt 
        this.router.navigate(["/login"])
      }
    });

    this.homeService.findAllUsers().subscribe(users => {
      this.userList = users['data']
    })
  }

  onValueChange(value: string) {
    this.filteredUsers = this.userList.filter(user => {
      return user.email.toLowerCase().includes(value.toLowerCase());
    });
  }

}
