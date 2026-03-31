import {
  RESET_COCKTAIL_STATE,
  SET_ALCOHOL_FILTER,
  SET_ALL_CATEGORY_COCKTAIL,
  SET_ALL_SKILL_COCKTAIL,
  SET_ALL_SKILL_SEARCH,
  SET_DIALOG_DETAILS,
  SET_SKILL_COCKTAIL,
} from "../../constants/cocktailConstant";
import { AlcoholFilter, CocktailSkill, Skill } from "../../interfaces/cocktailInterfaces";
import { CocktailAction } from "../actions/cocktailActions"

const applyFilters = (cocktails: Skill[], searchTerm: string, alcoholFilter: AlcoholFilter): Skill[] => {
  const searchValue = searchTerm.trim().toLowerCase();

  return cocktails.filter((cocktail) => {
    const matchesSearch = !searchValue || cocktail.title.toLowerCase().includes(searchValue);
    const alcoholicValue = (cocktail.alcoholic || '').toLowerCase();
    const matchesAlcohol =
      alcoholFilter === 'all'
        ? true
        : alcoholFilter === 'alcoholic'
          ? alcoholicValue.includes('alcoholic') && !alcoholicValue.includes('non')
          : alcoholicValue.includes('non');

    return matchesSearch && matchesAlcohol;
  });
};

const initialState: CocktailSkill = {
  cocktails: [],
  cocktailsSearch: [],
  categories: {},
  sections: {},
  dialog: { open: false },
  searchTerm: '',
  alcoholFilter: 'all',
};

export const cocktailReducer = (state: CocktailSkill = initialState, action: CocktailAction): CocktailSkill => {
  const { type, payload } = action;
  const { cocktails } = state;
  switch (type) {
    case SET_SKILL_COCKTAIL:
      return {
        ...state,
        cocktails: [...cocktails, payload.value]
      }
    case SET_ALL_SKILL_COCKTAIL:
      return {
        ...state,
        cocktails: payload.value,
        cocktailsSearch: applyFilters(payload.value, state.searchTerm, state.alcoholFilter)
      }
    case SET_ALL_SKILL_SEARCH:
      return {
        ...state,
        searchTerm: payload.value,
        cocktailsSearch: applyFilters(cocktails, payload.value, state.alcoholFilter)
      }
    case SET_ALCOHOL_FILTER:
      return {
        ...state,
        alcoholFilter: payload.value,
        cocktailsSearch: applyFilters(cocktails, state.searchTerm, payload.value)
      }
    case SET_ALL_CATEGORY_COCKTAIL:
      return {
        ...state,
        categories: payload.value,
        sections: (Object.keys(payload.value) as (keyof typeof payload.value)[]).map((secKey) => payload.value[secKey].desc).reduce((acc, curr) => (Object.assign(acc, { [curr]: false })), {})
      }
    case RESET_COCKTAIL_STATE:
      return {
        cocktails: [],
        cocktailsSearch: [],
        categories: {},
        sections: {},
        dialog: { open: false },
        searchTerm: '',
        alcoholFilter: 'all',
      }
    case SET_DIALOG_DETAILS:
      return {
        ...state,
        dialog: { open: payload.open, details: payload.value }
      }
    default:
      return {
        ...state
      }
  }
}

export default cocktailReducer