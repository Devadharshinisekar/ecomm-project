import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
//import { WebapiService } from '../services/webapi.service';
import { SignUpData, LoginData } from '../data-type';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
//@Input() menuType="authRole";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public menutype:string="{{authRole}}@Input()";
  authRole: string = 'user';
  showLogin: boolean = true;
  errorMessage: string = '';
  LoginerrorMessage: string = '';

  SignUpData: SignUpData = {
    email: '',
    password: '',
    role: '',
    name: ''
  };

  loginData: LoginData = {
    email: '',
    password: '',
    role: ''
  };

  constructor(private authService: AuthService, private router: Router,private logger: LoggerService) {
    // Check if the user or seller is already logged in
    if (this.authService.currentUserValue || this.authService.currentSellerValue) {
      if (this.authService.currentSellerValue) {
        this.router.navigate(['/seller-home']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  signup() {
    this.SignUpData.role = this.authRole;
    this.authService.signup(this.SignUpData, this.authRole).subscribe(
      result => {
        // Handle successful signup
        console.log(result);
        if (this.authRole === 'user') {
          this.router.navigate(['/']);
        } else if (this.authRole === 'seller') {
          this.router.navigate(['/seller-home']);
        }
        this.logger.log('The user is signed up in.');
      },
      error => {
        // Handle signup error
        console.log(error);
        if (error.status === 400 && error.error === 'Email already registered') {
          // Display error message for duplicate email
          this.errorMessage='Email already registered';
          //Swal.fire('Error', this.errorMessage, 'error');
        } else {
          // Display a generic error message
          this.errorMessage='An error occurred during signup';
          //Swal.fire('Error', this.errorMessage, 'error');
        }
      }
    );
  }

  login() {
    this.loginData.role = this.authRole;
    this.authService.login(this.loginData, this.authRole).subscribe(
      result => {
        // Handle successful login
        console.log(result);
        if (this.authRole === 'user') {
          this.router.navigate(['/']);
        } else if (this.authRole === 'seller') {
          this.router.navigate(['/seller-home']);
        }
        this.logger.log('The user is logged in.');
      },
      error => {
        // Handle login error
        console.log(error);
        if (error.status === 401 && error.error === 'Invalid email or password') {
          // Display error message for invalid email or password
          alert('Invalid email or password');
          this.LoginerrorMessage='Invalid email or password';
          //Swal.fire('Error', this.LoginerrorMessage, 'error');
        } else {
          // Display a generic error message
          this.LoginerrorMessage ='An error occurred during login';
          //Swal.fire('Error', this.LoginerrorMessage, 'error');
        }
      }
    );
  }



  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
