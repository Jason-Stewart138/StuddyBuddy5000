import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { HeaderComponent } from './header/header.component';
import { FavoriteDirective } from './favorite.directive';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NavComponent } from './nav/nav.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionAnswerComponent,
    HeaderComponent,
    FavoriteDirective,
    UserLoginComponent,
    HomeComponent,
    CreateQuestionComponent,
    WelcomeComponent,
    NavComponent,

    UserLogoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
