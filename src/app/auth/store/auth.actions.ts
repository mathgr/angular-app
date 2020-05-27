import { Action } from '@ngrx/store';

export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const LOGIN_START = 'LOGIN_START';
export const SIGNUP_START = 'SIGNUP_START';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AUTO_LOGIN = 'AUTO_LOGIN';

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(
    public payload: string,
  ) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      userId: string,
      email: string,
      token: string,
      expirationDate: Date,
      redirect: boolean,
    }
  ) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(
    public payload: {email: string, password: string},
  ) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(
    public payload: {email: string, password: string},
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements  Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticateFail
  | AuthenticateSuccess
  | LoginStart
  | SignupStart
  | Logout
  | ClearError
  | AutoLogin
;
