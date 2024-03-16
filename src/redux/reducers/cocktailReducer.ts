import { RESET_COCKTAIL_STATE, SET_ALL_CATEGORY_COCKTAIL, SET_ALL_SKILL_COCKTAIL, SET_ALL_SKILL_SEARCH, SET_DIALOG_DETAILS, SET_SKILL_COCKTAIL } from "../../constants/cocktailConstant";
import { CocktailSkill } from "../../interfaces/cocktailInterfaces";
import { CocktailAction } from "../actions/cocktailActions"

const initialState: CocktailSkill = {
  cocktails: [{
    id: -1,
    title: "",
    price: -1,
    category: "",
    description: "",
    image: ""
  }],
  cocktailsSearch: [{
    id: -1,
    title: "",
    price: -1,
    category: "",
    description: "",
    image: ""
  }],
  categories: {},
  sections: {},
  dialog: { open: false },
};

export const cocktailReducer = (state: CocktailSkill = initialState, action: CocktailAction): CocktailSkill => {
  const { type, payload } = action;
  const { cocktails } = state;
  console.log("El estado global es: ", state);
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
        cocktailsSearch: payload.value
      }
    case SET_ALL_SKILL_SEARCH:
      return {
        ...state,
        cocktailsSearch: cocktails && payload.value
          ? cocktails.filter((c) => c.title.toLowerCase().includes(payload.value.toLowerCase()))
          : cocktails
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
        dialog: { open: false }
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