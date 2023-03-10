import { userData } from "./userData.interface";
import { questionAnswer } from "./questionAnswer.interface";

export interface LoggedInUser {
    User: userData;
    Favorites: questionAnswer[];
}