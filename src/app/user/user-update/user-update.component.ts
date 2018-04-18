import { UserListComponent } from './../user-list/user-list.component';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from './../shared/users.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})

export class UserUpdateComponent implements OnInit {

  user = new User();
  hide = true; // Password Show

  // Input Valid
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private _usersService: UsersService,
    private _toastrService: ToastrService,
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._usersService.findBydId(data.id).subscribe(
      response => {
        const myData = JSON.parse(JSON.stringify(response));
        this.user.first_name = myData.first_name;
        this.user.last_name = myData.last_name;
        this.user.email = myData.email;
        this.user.password = myData.password;
        this.user.id = myData.id;
      });
  }

  ngOnInit() {

  }

  onSubmit(): void {
    if (this.emailFormControl.valid &&
      this.firstNameFormControl.valid &&
      this.lastNameFormControl.valid &&
      this.passwordFormControl.valid) {
      this._usersService.update(this.user).subscribe(
        response => {
          this._toastrService.success('Update user done.', 'Success');
        });
      this.dialogRef.close();
    } else {
      this._toastrService.error('Please check the information again.', 'Field Required');
    }
  }

}

