/* angular imports */
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

/* rxjs imports */
import {Observable} from "rxjs";

/* project imports */
import {User} from "./model/user.model";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>('/api/login', {email, password});
    }

}
