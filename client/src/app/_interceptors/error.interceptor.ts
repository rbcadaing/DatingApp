import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                // throw list of validation error
                //flat method is for flatening array
                // to enable flat need to add es2019 in tsconfig.json
                /*    "lib": [
                     "es2019",
                     "es2018",
                     "dom"
                   ] */
                throw modalStateErrors.flat();
                //check if error is an object this is usually happens if we didnot specify error sting in the status code in the API
              } else if (typeof (error.error) === "object") {
                this.toastr.error(error.statusText, error.status);
              } else {
                this.toastr.error(error.error, error.status);
              }
              break

            case 401:
              this.toastr.error(error.statusText, error.status);
              break;

            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl("/server-error", navigationExtras);
              break;

            default:
              this.toastr.error("Something unexpected happens!");
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
