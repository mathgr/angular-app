import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly API_KEY = 'AIzaSyDHdL06Ekeu0oaac3W-3YXIhEGEEEKVjhI';

  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(response => this.handleAuthentication(
          response.localId,
          response.email,
          response.idToken,
          +response.expiresIn)
        )
      )
    ;
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(response => this.handleAuthentication(
          response.localId,
          response.email,
          response.idToken,
          +response.expiresIn)
        )
      )
    ;
  }

  autoLogin() {
    const userData: {
      id: string,
      email: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDateValue = new Date(userData._tokenExpirationDate).getTime();
      const currentDateValue = new Date().getTime();
      this.autoLogout(expirationDateValue - currentDateValue);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration)
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    this.router.navigate(['/auth']);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue.';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorResponse);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'L\'adresse mail renseignée n\'a pas de compte associé.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Le mot de passe renseigné est incorrect.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'L\'adresse mail est déjà utilisée.';
        break;
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(
    userId: string,
    email: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, email, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }
}
