import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  id: number;

  constructor(private _usersService: UsersService,
    private _toastrService: ToastrService,
    private dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this._usersService.delete(this.id).subscribe(
      response => {
        this._toastrService.success('Delete user done.', 'Success');
      });
    this.dialogRef.close();
  }

}
