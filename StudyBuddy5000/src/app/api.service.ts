import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { questionAnswer } from 'src/app/interfaces/questionAnswer.interface'
import { userData } from './interfaces/userData.interface';
import { LoggedInUser } from './interfaces/loggedInUser.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  userURI: string = 'https://localhost:7215/api/UserData/';
  loginURI: string = '';
  selectFavoriteURI: string = 'https://localhost:7215/api/UserData/AddUserFavorite/';
  removeFavoriteURI: string = 'https://localhost:7215/api/UserData/DeleteUserFavorite/';
  studyURI: string = 'https://localhost:7215/api/QuestionsAnswers';

  bounceFromNavToStudy:EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  loggedInUser: LoggedInUser | null = null;

  @Output()doorBell:EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() loggedInEvent: EventEmitter<LoggedInUser> = new EventEmitter<LoggedInUser>();
  @Output() showAnswersEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  selectFavorite(studyId: number) {

    let userId = -1;
    let user = this.loggedInUser as LoggedInUser;
    if (user) {
      userId = user.User.id;
      let favorites = user.Favorites;
      let study = favorites.filter(x => x.id === studyId)[0];
      let magicIndex = favorites.indexOf(study);
      let length = favorites.length;
      if (user.Favorites.some(x => x.id === studyId)) {
        favorites = favorites.slice(0, (Math.abs(magicIndex)))
          .concat(favorites.slice(-Math.abs(length - magicIndex)));
        this.removeFavorite(userId, studyId);
        
        
      } else {
        this.http.post<questionAnswer>(this.selectFavoriteURI + `${studyId}/${userId}`, {}).subscribe(
          (x)=>{
            if(x){
              this.setUser(user.User)
              return this.onComponentLoad()
            }
      });
      }
    }
  }
  removeFavorite(userId: number, studyId: number) {
    return this.http.post<boolean>(this.removeFavoriteURI + `${studyId}/${userId}`, {})
    .subscribe(
      (x) => {
        if(x) {
          this.setUser(this.giveCurrentUser().User)
          return this.onComponentLoad();
        }
    })
  }

  getAllUsers() {
    return this.http.get<userData[]>(this.userURI, {});
  }

  getLoggedInUserFavorites(user:userData) {

      return this.http.get<questionAnswer[]>(this.studyURI + `/GetAllUserFavorites/${user.id}`)
      .subscribe(
        (x) => {
          if(x){
            this.loggedInUser = {
              User: user,
              Favorites: x
            }
          }else{
            this.loggedInUser = {
              User: user,
              Favorites:[]
            }
          }
          return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
      });
  }

  getUser(user: userData) { // api call to get the user that logged in, only used by login component
    let userName = user.userName;
    let userPassword = user.userPassword;
    return this.http.get<userData>(this.userURI + `Login/${userName}/${userPassword}`)
    .subscribe(
      (x) => {
        let user:userData;
        if(x) {
          user = x;
          this.getLoggedInUserFavorites(user);
        }
    });
  }

  onComponentLoad() {
    return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
  }

  getRegisteredUser(user: userData) {
    this.registerUser(user);
    this.onComponentLoad();
  }

  onLogout() {
    this.loggedInUser = null;
    this.onComponentLoad();
  }

  registerUser(user: userData) { // api call to add the newly registered user, only used by login component
    let userName = user.userName;
    let password = user.userPassword;
    return this.http.post<userData>(this.userURI + `CreateLogin/${userName}/${password}`, user)
    .subscribe(
      (x) => {
        this.loggedInUser = {
          User: x,
          Favorites: []
        }
        this.onComponentLoad()
    })
  }

  setUser(currentUser: userData) { // sets the currently logged in user in this service so that its globally available to all components, also only used by login component
    
      this.getUser(currentUser);
  }

  giveCurrentUser() { // provides the currently logged in user or null to components so they can provide the appropriate functionality, used by any component that needs this data
    return this.loggedInUser as LoggedInUser;
  }

  getStudy() {
    return this.http.get<questionAnswer[]>(this.studyURI);
  }

  createStudy(study: questionAnswer) {
    let question = study.question.split(
      ' '
    ).join('%20');
    let answer = study.answer.split(
      ' '
    ).join('%20');
    return this.http.post(this.studyURI + `/AddQuestionAnswer/${question}/${answer}`, study);
  }
  homeComponentShowAnswersClick(e:boolean) {
    return this.showAnswersEvent.emit(e);

  }
  homeComponentDoorbell(e:MouseEvent) {
    if(this.loggedInUser){
      return this.doorBell.emit(e);
    }
    return;
  }

}
