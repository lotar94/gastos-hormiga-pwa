import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  user$!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.user$ = this.authSvc.userState$;
    this.user$.subscribe(res => {
      console.log(res
        );
      this.router.navigate(['home'])
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  

  register() {
    console.log("REGISTER WITH GOOGLE");
    this.authSvc.signInGoogle();
  }

  signInGoogle() {
    //TODO
  }
}