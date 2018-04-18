import { UserDeleteComponent } from './../user-delete/user-delete.component';
import { UserUpdateComponent } from './../user-update/user-update.component';
import { UserNewComponent } from './../user-new/user-new.component';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { UsersService } from './../shared/users.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { User } from '../shared/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, AfterViewInit {

  user: User;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'password', 'manage'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _userService: UsersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUser();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  newUserDialog(): void {
    const dialogRef = this.dialog.open(UserNewComponent, {
      width: '400px'
    }).afterClosed().subscribe(() => {
      this.loadUser();
    });
  }

  updateUserDialog(id): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '400px',
      data: { id: id }
    }).afterClosed().subscribe(() => {
      this.loadUser();
    });
  }

  deleteUserDialog(id: number): void {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '400px',
      data: { id: id }
    }).afterClosed().subscribe(() => {
      this.loadUser();
    });
  }

  loadUser() {
    this._userService.findAll().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

}