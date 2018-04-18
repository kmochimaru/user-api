import { UserListComponent } from './../user-list/user-list.component';
import { Component, Inject, NgModule, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { User } from '../shared/user';
import { UsersService } from '../shared/users.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})

export class UserNewComponent {
  user = new User();
  hide = true; // Password Show

  // Input Valid
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private _usersService: UsersService,
    private _toastrService: ToastrService,
    private dialogRef: MatDialogRef<UserNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onSubmit(): void {
    if (this.emailFormControl.valid &&
      this.firstNameFormControl.valid &&
      this.lastNameFormControl.valid &&
      this.passwordFormControl.valid) {
      this._usersService.create(this.user).subscribe(
        response => {
          this._toastrService.success('Add new user done.', 'Success');
        });
      this.dialogRef.close();
    } else {
      this._toastrService.error('Please check the information again.', 'Field Required');
    }
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
