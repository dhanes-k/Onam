import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  myForm: FormGroup | any;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private _toastr: ToastrService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this._api.getUsers().subscribe((users) => {
      console.log(users, 'users');
    });
  }

  notify(type: string, title: string, content: string) {
    this.notification.create(type, title, content);
  }

  formInit() {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      mobile_number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[6789]\\d{9}$'),
        ],
      ],
      user_type: [false],
    });
  }
  get name() {
    return this.myForm.get('username');
  }
  get mobile() {
    return this.myForm.get('mobile_number');
  }
  onSubmit() {
    const formData = this.myForm['value'];
    formData.user_type = formData.user_type ? 1 : 0;
    if (!this.myForm.invalid) {
      this._api.postUsers(formData).subscribe(
        (res: any) => {
          const { message } = res;
          this.notify('success','',message);
          this.router.navigate(['/Home']);
          this.myForm.reset();
        },
        (err: any) => {
          this.router.navigate(['/Home']);
        }
      );
    } else {
      this.submitted = true;
    }
  }

  validateNumberInput(event: any) {
    let input = event.target.value;
    
    // Remove non-numeric characters
    input = input.replace(/[^0-9]/g, '');
    
    // Ensure the number starts with 6, 7, 8, or 9
    if (input.length > 0 && !['6', '7', '8', '9'].includes(input[0])) {
      input = ''; // Clear the input if it starts with an invalid digit
    }
  
    // Restrict to 10 digits
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
  
    this.myForm.get('mobile_number')?.setValue(input);
  }

 validateNameInput(event: any) {
    let input = event.target.value;

    // Remove non-alphabet characters and leading spaces
    input = input.replace(/[^a-zA-Z\s]/g, '');

    // Ensure the input starts with an alphabet
    if (input.length > 0 && !/^[a-zA-Z]/.test(input)) {
      input = ''; // Clear the input if it does not start with an alphabet
    }

    // Update the form control value
    this.myForm.get('username')?.setValue(input, { emitEvent: false });
  }
}