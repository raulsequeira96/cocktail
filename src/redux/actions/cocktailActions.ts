import axios from 'axios';
import { Category, CocktailResponse, CocktailSkill, ListResponse, Skill, responseCategory, responseSubCategory } from '../../interfaces/cocktailInterfaces';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RESET_COCKTAIL_STATE, SET_ALL_CATEGORY_COCKTAIL, SET_ALL_SKILL_COCKTAIL, SET_ALL_SKILL_SEARCH, SET_DIALOG_DETAILS, SET_SKILL_COCKTAIL, URI_ALCOHOLIC, URI_CATEGORY, URI_GLASSES, URI_INGREDIENTS, URL_MAIN } from '../../constants/cocktailConstant';

export type CocktailAction =
  | { type: typeof SET_SKILL_COCKTAIL, payload: { value: Skill; } }
  | { type: typeof SET_ALL_SKILL_COCKTAIL, payload: { value: Skill[]; } }
  | { type: typeof SET_ALL_CATEGORY_COCKTAIL, payload: { value: Category; } }
  | { type: typeof SET_ALL_SKILL_SEARCH, payload: { value: string; } }
  | { type: typeof RESET_COCKTAIL_STATE, payload?: never }
  | { type: typeof SET_DIALOG_DETAILS, payload: { value?: Skill; open: boolean } };


export const doReset = (): CocktailAction => ({
  type: RESET_COCKTAIL_STATE
});

export const doSetSkill = (value: Skill): CocktailAction => ({
  type: SET_SKILL_COCKTAIL,
  payload: { value }
});

export const doSetallSkill = (value: Skill[]): CocktailAction => ({
  type: SET_ALL_SKILL_COCKTAIL,
  payload: { value }
});

export const setSkillSearch = (value: string): CocktailAction => ({
  type: SET_ALL_SKILL_SEARCH,
  payload: { value }
});

export const fetchDataCocktail = (uri: string = "search.php?f=a"): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const response = await axios.get(URL_MAIN + uri);
    dispatch({ type: SET_ALL_SKILL_COCKTAIL, payload: { value: formatResponse(response.data.drinks) } });
  } catch (error) {
    console.log("Ocurrio un error al obtener los cocktail: ", error);
  }
};

const formatResponse = (listCocktails: CocktailResponse[]) => {
  return listCocktails.map((cocktail: CocktailResponse) => ({
    id: cocktail.idDrink,
    title: cocktail.strDrink,
    price: 0,
    category: cocktail.strCategory,
    description: cocktail.strInstructionsES,
    image: cocktail.strDrinkThumb
  }));
};

const parseListToObject = (data: Category[]) => data.reduce((accumulator, current) => {
  const key = Object.keys(current)[0];
  accumulator[key] = current[key];
  return accumulator;
}, {});;

const getCategory = async () => {
  let categoryList: Category = {};
  try {
    const typeCategoryResponse: responseCategory = await axios.get(URL_MAIN + URI_CATEGORY);
    const typeGlassesResponse: responseCategory = await axios.get(URL_MAIN + URI_GLASSES);
    const typeIngredientsResponse: responseCategory = await axios.get(URL_MAIN + URI_INGREDIENTS);
    const typeAlcoholicResponse: responseCategory = await axios.get(URL_MAIN + URI_ALCOHOLIC);

    const responses: ListResponse = {
      Category: typeCategoryResponse,
      Glasses: typeGlassesResponse,
      Ingredients: typeIngredientsResponse,
      Alcoholic: typeAlcoholicResponse
    };

    categoryList = parseListToObject(Object.keys(responses).map((cat: string) => ({
      [cat]: {
        desc: cat,
        subMenus: responses[cat].data.drinks.map((subcat: responseSubCategory) => (subcat[Object.keys(subcat)[0]]))
      }
    })));
  } catch (error) {
    console.log("Ocurrio un error al obtener la categoria: ", error);
  }

  return categoryList;
};

export const addCategory = () =>
  async (dispatch: any, getState: CocktailSkill) => {
    try {
      const list = await getCategory(); // Espera a que getCategory termine y devuelva su resultado
      console.log(list);
      dispatch({ type: SET_ALL_CATEGORY_COCKTAIL, payload: { value: list } });
    } catch (error) {
      console.log("Ocurrio un error al añadir la categoria: ", error);
    }
  };

export const openDetailsCocktail = (skill: Skill) =>
  async (dispatch: any, getState: CocktailSkill) => {
    try {
      dispatch({ type: SET_DIALOG_DETAILS, payload: { value: skill, open: true } });
    } catch (error) {
      console.log("Error en el dialog: ", error);
    }
  };

export const closeDetailsCocktail = () =>
  async (dispatch: any, getState: CocktailSkill) => {
    try {
      dispatch({ type: SET_DIALOG_DETAILS, payload: { value: {}, open: false } });
    } catch (error) {
      console.log("Error en el dialog: ", error);
    }
  };
