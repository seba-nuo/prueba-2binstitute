import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private homeService: HomeService) {
    this.homeService.verifyToken().subscribe({
      error: () => {
        this.router.navigate(["/login"])
      }
    });

    this.homeService.findAllUsers().subscribe(res => {
      console.log("🤖 ~ file: home.component.ts:19 ~ HomeComponent ~ constructor ~ res:", res);
      return ;
    });
  }


}
