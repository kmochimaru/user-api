import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'detail/:id', component: UserDetailComponent },
    { path: 'all', component: UserListComponent },
    { path: '**', component: PagenotfoundComponent }
];