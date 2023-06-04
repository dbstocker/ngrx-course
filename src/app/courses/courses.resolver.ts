import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private _store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._store
      .pipe(
        tap(() => {
          if (!this.loading) {
            this.loading = true;
            this._store.dispatch(loadAllCourses());
          }
        }),
        first(),
        finalize(() => this.loading = false)
      );
  }
}