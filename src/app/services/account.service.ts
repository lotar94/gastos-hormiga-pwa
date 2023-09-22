import { 
    Auth, 
    authState, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    sendEmailVerification, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithRedirect, 
    User, 
    UserCredential 
} from '@angular/fire/auth';

import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ErrorResponse {
    code: string;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
    private readonly auth = inject(Auth);
    private readonly router = inject(Router);
    private readonly googleProvider = new GoogleAuthProvider();

    constructor(
        // private http: HttpClient,
        // private auth: Auth,
        // private router: Router,
        // private googleProvider: GoogleAuthProvider,
    ) {
    }

    get userState$() {
        return authState(this.auth);
    }

    async register(email: string, password: string): Promise<void> {
        try {
            const { user } = await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );
            await this.sendEmailVerification(user);
            this.router.navigate(['/home']);
        } catch (error: unknown) {
            const { code, message } = error as ErrorResponse;
            console.log('Code ', code);
            console.log('Message ', message);
        }
    }

    async signInGoogle(): Promise<void> {
        try {
          await signInWithRedirect(this.auth, this.googleProvider);
        } catch (error) {
          console.log('Google login', error);
        }
      }

    async sendEmailVerification(user: User): Promise<void> {
        try {
            await sendEmailVerification(user);
        } catch (error: unknown) {
            console.log(error);
        }
    }








    login(username: string, password: string) {
        // return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('user', JSON.stringify(user));
        //         this.userSubject.next(user);
        //         return user;
        //     }));
    }

    logout() {
        // remove user from local storage and set current user to null
        // localStorage.removeItem('user');
        // this.userSubject.next(null);
        // this.router.navigate(['/account/login']);
    }



    getAll() {
        // return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        // return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        // return this.http.put(`${environment.apiUrl}/users/${id}`, params)
        //     .pipe(map(x => {
        //         // update stored user if the logged in user updated their own record
        //         if (id == this.userValue?.id) {
        //             // update local storage
        //             const user = { ...this.userValue, ...params };
        //             localStorage.setItem('user', JSON.stringify(user));

        //             // publish updated user to subscribers
        //             this.userSubject.next(user);
        //         }
        //         return x;
        //     }));
    }

    delete(id: string) {
        // return this.http.delete(`${environment.apiUrl}/users/${id}`)
        //     .pipe(map(x => {
        //         // auto logout if the logged in user deleted their own record
        //         if (id == this.userValue?.id) {
        //             this.logout();
        //         }
        //         return x;
        //     }));
    }
}