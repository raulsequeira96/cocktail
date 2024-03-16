import { API_CALL_DICTIONARY_I, CocktailCardContextProps, Skill } from "../interfaces/cocktailInterfaces";

export const API_CALL_DICTIONARY: API_CALL_DICTIONARY_I = {
  Category: "c",
  Glasses: "g",
  Ingredients: "i",
  Alcoholic: "a"
};

export const INITIAL_STATE_SKILL_CTX: CocktailCardContextProps = {
  skill: {
    id: -1,
    title: "",
    price: -1,
    category: "",
    description: "",
    image: ""
  },
  handleDetailsCocktail: (skill: Skill) => { }
}


export const SET_SKILL_COCKTAIL = "setSkill";
export const SET_ALL_SKILL_COCKTAIL = "setAllSkill";
export const SET_ALL_CATEGORY_COCKTAIL = "setAllCategory";
export const SET_ALL_SKILL_SEARCH = "setAllSkillSearch";
export const RESET_COCKTAIL_STATE = "reset";
export const SET_DIALOG_DETAILS = "setDialogCocktailDetails";

export const URL_MAIN = "https://www.thecocktaildb.com/api/json/v1/1/";

export const URI_CATEGORY = 'list.php?c=list';
export const URI_GLASSES = 'list.php?g=list';
export const URI_INGREDIENTS = 'list.php?i=list';
export const URI_ALCOHOLIC = 'list.php?a=list';
