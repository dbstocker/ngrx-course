/* angular imports */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/* ngrx imports */
import {Store} from "@ngrx/store";

import { login } from '../auth.actions';

/* rxjs imports */
import {tap} from "rxjs/operators";
import {noop} from "rxjs";

/* project imports */
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import { AppState } from '../../reducers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private _fb: FormBuilder,
      private _auth: AuthService,
      private _router: Router,
      private _store: Store<AppState>) {

      this.form = this._fb.group({
          email: ['coffeemetalcode@gmail.com', [Validators.required]],
          password: ['123456c', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;

    this._auth.login(val.email, val.password)
      .pipe(
        tap((user) => {
          console.log(user);

          const newLoginAction = login({user});

          this._store.dispatch(newLoginAction)

          this._router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      );
  }

}

