import axios from 'axios';
import {
  AlcoholFilter,
  Category,
  CocktailResponse,
  CocktailSkill,
  IngredientItem,
  ListResponse,
  Skill,
  responseCategory,
  responseSubCategory,
} from '../../interfaces/cocktailInterfaces';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  RESET_COCKTAIL_STATE,
  SET_ALCOHOL_FILTER,
  SET_ALL_CATEGORY_COCKTAIL,
  SET_ALL_SKILL_COCKTAIL,
  SET_ALL_SKILL_SEARCH,
  SET_DIALOG_DETAILS,
  SET_SKILL_COCKTAIL,
  URI_ALCOHOLIC,
  URI_CATEGORY,
  URI_GLASSES,
  URI_INGREDIENTS,
  URL_MAIN,
} from '../../constants/cocktailConstant';

export type CocktailAction =
  | { type: typeof SET_SKILL_COCKTAIL, payload: { value: Skill; } }
  | { type: typeof SET_ALL_SKILL_COCKTAIL, payload: { value: Skill[]; } }
  | { type: typeof SET_ALL_CATEGORY_COCKTAIL, payload: { value: Category; } }
  | { type: typeof SET_ALL_SKILL_SEARCH, payload: { value: string; } }
  | { type: typeof SET_ALCOHOL_FILTER, payload: { value: AlcoholFilter; } }
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

export const setAlcoholFilter = (value: AlcoholFilter): CocktailAction => ({
  type: SET_ALCOHOL_FILTER,
  payload: { value }
});

const mapIngredients = (cocktail: CocktailResponse): IngredientItem[] => {
  const list: IngredientItem[] = [];

  for (let index = 1; index <= 15; index += 1) {
    const ingredient = cocktail[`strIngredient${index}` as keyof CocktailResponse] as string | undefined;
    const measure = cocktail[`strMeasure${index}` as keyof CocktailResponse] as string | undefined;
    const ingredientValue = ingredient?.trim();

    if (!ingredientValue) {
      continue;
    }

    const measureValue = measure?.trim();
    list.push({
      name: ingredientValue,
      measure: measureValue,
      thumbnail: `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredientValue)}-small.png`,
      display: measureValue ? `${measureValue} ${ingredientValue}` : ingredientValue,
    });
  }

  return list;
};

const getRandomCocktails = async (total: number = 12): Promise<CocktailResponse[]> => {
  const randomCalls = Array.from({ length: total }, () => axios.get(URL_MAIN + 'random.php'));
  const randomResponses = await Promise.all(randomCalls);
  const randomCocktails = randomResponses
    .map((response) => response.data?.drinks?.[0] as CocktailResponse | undefined)
    .filter((cocktail): cocktail is CocktailResponse => Boolean(cocktail));

  const uniqueById = new Map(randomCocktails.map((cocktail) => [cocktail.idDrink, cocktail]));
  return Array.from(uniqueById.values());
};

export const fetchDataCocktail = (uri?: string): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const drinks = uri
      ? (await axios.get(URL_MAIN + uri)).data.drinks || []
      : await getRandomCocktails();

    dispatch({ type: SET_ALL_SKILL_COCKTAIL, payload: { value: formatResponse(drinks) } });
  } catch (error) {
    console.log("Ocurrio un error al obtener los cocktail: ", error);
  }
};

const formatResponse = (listCocktails: CocktailResponse[] = []): Skill[] => {
  return listCocktails.map((cocktail: CocktailResponse) => {
    const ingredientItems = mapIngredients(cocktail);

    return {
      id: Number(cocktail.idDrink),
      title: cocktail.strDrink,
      price: 0,
      category: cocktail.strCategory || 'Sin categoria',
      description: cocktail.strInstructionsES || cocktail.strInstructions || 'Sin descripcion disponible.',
      image: cocktail.strDrinkThumb,
      alcoholic: cocktail.strAlcoholic,
      glass: cocktail.strGlass,
      iba: cocktail.strIBA,
      tags: cocktail.strTags ? cocktail.strTags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      ingredients: ingredientItems.map((ingredient) => ingredient.display),
      ingredientItems,
    };
  });
};

const fetchCocktailById = async (id: number): Promise<Skill | undefined> => {
  const response = await axios.get(`${URL_MAIN}lookup.php?i=${id}`);
  const drinks = response.data?.drinks as CocktailResponse[] | undefined;
  const [cocktail] = formatResponse(drinks || []);
  return cocktail;
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
      dispatch({ type: SET_ALL_CATEGORY_COCKTAIL, payload: { value: list } });
    } catch (error) {
      console.log("Ocurrio un error al añadir la categoria: ", error);
    }
  };

export const openDetailsCocktail = (skill: Skill) =>
  async (dispatch: any, getState: CocktailSkill) => {
    try {
      dispatch({ type: SET_DIALOG_DETAILS, payload: { value: skill, open: true } });

      const detailedCocktail = await fetchCocktailById(skill.id);
      if (detailedCocktail) {
        dispatch({ type: SET_DIALOG_DETAILS, payload: { value: detailedCocktail, open: true } });
      }
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
