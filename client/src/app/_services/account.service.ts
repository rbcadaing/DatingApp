import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        this.setCurrentUser(user);
        return user;
      })
    );
  }
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    console.log(roles);
    //Check if user have an array or roles or a single role 
  //  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);

    localStorage.setItem("user", JSON.stringify(user));
    //next value to the observable buffer
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    // atob allows us to get the information in the token
    // token is 3 part the header , payload and the signature what we need is the payload the second element of the array
    return JSON.parse(atob(token.split('.')[1]));
  }
}
