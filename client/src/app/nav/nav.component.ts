import { Component, OnInit } from '@angular/core';
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
  constructor(public accountService: AccountService) { }

  ngOnInit() {

    // check if there is currently logged in user 
    // using subscribe method
    //this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    console.log(this.login);
  }
  logout() {
    this.accountService.logout();
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
