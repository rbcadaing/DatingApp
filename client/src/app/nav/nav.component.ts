import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  //loggedIn: boolean;
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    // check if there is currently logged in user 
    // using subscribe method
    //this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model)
      .subscribe(response => {
        this.router.navigateByUrl("/members");
      }, error => {
        this.toastr.error(error.error)
        console.log(error);
      });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      // !! turns an object into boolean if the object is null
      //this.loggedIn = !!user;
    }, error => {
      console.log(error);
    })
  }

}
