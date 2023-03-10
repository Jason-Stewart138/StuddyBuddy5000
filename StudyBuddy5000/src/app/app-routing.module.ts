import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';

const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'create-question', component: CreateQuestionComponent },
  { path: 'user-logout', component: UserLogoutComponent},
  { path: '', redirectTo: '/Home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
