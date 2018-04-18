import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


import { RouterModule, NavigationStart } from '@angular/router';
import { appRoutes } from './rootConfig';

import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { UsersService } from './user/shared/users.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    UserNewComponent,
    UserListComponent,
    UserUpdateComponent,
    PagenotfoundComponent,
    NavBarComponent,
    HomeComponent,
    UserDeleteComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [UsersService],
  entryComponents: [UserNewComponent, UserUpdateComponent, UserDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }