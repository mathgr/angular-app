import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  userId: string,
  email: string,
  token: string,
  expiresIn: number,
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(userId, email, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    userId: userId,
    email: email,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes) => {
  let errorMessage = 'Une erreur est survenue.';

  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorRes);
  }

  switch (errorRes.error.error.message) {
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

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
          email: signupData.payload.email,
          password: signupData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
          map(resData => {
            return handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          }),
        );
    }),
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
          map(resData => {
            return handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          }),
        );
    }),
  );

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        id: string,
        email: string,
        _token: string,
        _tokenExpirationDate: string,
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return {type: 'EMPTY'};
      }

      const loadedUser = new User(
        userData.id,
        userData.email,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDate)

        return new AuthActions.AuthenticateSuccess({
          userId: userData.id,
          email: userData.email,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false,
        });
      }

      return {type: 'EMPTY'};
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authData: AuthActions.AuthenticateSuccess) => {
      if (authData.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}
}
