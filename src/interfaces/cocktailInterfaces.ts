import { ReactElement } from "react"

export interface Skill {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string
}

export interface CocktailSkill {
  cocktails: Skill[] | [],
  cocktailsSearch: Skill[] | [],
  categories: Category | {}
  sections: SubmenuState
  dialog: DialogDetails
}

export interface DialogDetails{
  open: boolean,
  details?: Skill
}

export interface Category {
  [key: string]: {
    desc: string;
    subMenus: string[];
  };
}

export interface responseCategory {
  data: { drinks: responseSubCategory[] }
}

export interface responseSubCategory {
  [key: string]: string
}

export interface ListResponse {
  [key: string]: responseCategory
}

export interface Clases {
  [key: string]: string;
}

export interface API_CALL_DICTIONARY_I {
  Category: string;
  Glasses: string;
  Ingredients: string;
  Alcoholic: string;
}

export interface CocktailCardContextProps {
  skill: Skill,
  handleDetailsCocktail: (skill: Skill) => void
}

export interface CocktailCardProps {
  skill: Skill;
  children?: ReactElement | ReactElement[] 
}

export type AllowedKeys = keyof API_CALL_DICTIONARY_I;

export type SubmenuState = { [key: string]: boolean } | "" | {};

export interface CocktailResponse {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | undefined;
  strTags: string | undefined;
  strVideo: string | undefined;
  strCategory: string;
  strIBA: string | undefined;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string;
  strInstructionsDE: string;
  strInstructionsFR: string | undefined;
  strInstructionsIT: string;
  strInstructionsZH_HANS: string | undefined;
  strInstructionsZH_HANT: string | undefined;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string | undefined;
  strIngredient6: string | undefined;
  strIngredient7: string | undefined;
  strIngredient8: string | undefined;
  strIngredient9: string | undefined;
  strIngredient10: string | undefined;
  strIngredient11: string | undefined;
  strIngredient12: string | undefined;
  strIngredient13: string | undefined;
  strIngredient14: string | undefined;
  strIngredient15: string | undefined;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string | undefined;
  strMeasure6: string | undefined;
  strMeasure7: string | undefined;
  strMeasure8: string | undefined;
  strMeasure9: string | undefined;
  strMeasure10: string | undefined;
  strMeasure11: string | undefined;
  strMeasure12: string | undefined;
  strMeasure13: string | undefined;
  strMeasure14: string | undefined;
  strMeasure15: string | undefined;
  strImageSource: string | undefined;
  strImageAttribution: string | undefined;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}
