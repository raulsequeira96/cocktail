import {
  RESET_COCKTAIL_STATE,
  SET_ALCOHOL_FILTER,
  SET_CATEGORY_FILTER,
  SET_GLASS_FILTER,
  SET_INGREDIENT_FILTER,
  SET_ALL_CATEGORY_COCKTAIL,
  SET_ALL_SKILL_COCKTAIL,
  SET_ALL_SKILL_SEARCH,
  SET_DIALOG_DETAILS,
  SET_SORT_ORDER,
  SET_SKILL_COCKTAIL,
} from "../../constants/cocktailConstant";
import { AlcoholFilter, CocktailSkill, Skill, SortOrder } from "../../interfaces/cocktailInterfaces";
import { CocktailAction } from "../actions/cocktailActions"

const normalizeAlcoholValue = (value?: string): AlcoholFilter | 'other' => {
  const normalized = (value || '').toLowerCase().trim();

  if (!normalized) {
    return 'other';
  }

  if (normalized.includes('non') && normalized.includes('alcohol')) {
    return 'non_alcoholic';
  }

  if (normalized.includes('alcohol')) {
    return 'alcoholic';
  }

  return 'other';
};

const applySort = (cocktails: Skill[], sortOrder: SortOrder): Skill[] => {
  const list = [...cocktails];

  switch (sortOrder) {
    case 'name_asc':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'name_desc':
      return list.sort((a, b) => b.title.localeCompare(a.title));
    case 'ingredients_desc':
      return list.sort((a, b) => (b.ingredientItems?.length || 0) - (a.ingredientItems?.length || 0));
    case 'ingredients_asc':
      return list.sort((a, b) => (a.ingredientItems?.length || 0) - (b.ingredientItems?.length || 0));
    case 'random': {
      for (let index = list.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
      }

      return list;
    }
    case 'featured':
    default:
      return list;
  }
};

const applyFilters = (
  cocktails: Skill[],
  searchTerm: string,
  alcoholFilter: AlcoholFilter,
  categoryFilter: string,
  glassFilter: string,
  ingredientFilter: string,
  sortOrder: SortOrder,
): Skill[] => {
  const searchValue = searchTerm.trim().toLowerCase();

  const filtered = cocktails.filter((cocktail) => {
    const ingredientsText = (cocktail.ingredientItems || []).map((ingredient) => ingredient.name.toLowerCase());
    const tagsText = (cocktail.tags || []).map((tag) => tag.toLowerCase());
    const matchesSearch =
      !searchValue
      || cocktail.title.toLowerCase().includes(searchValue)
      || (cocktail.category || '').toLowerCase().includes(searchValue)
      || (cocktail.glass || '').toLowerCase().includes(searchValue)
      || (cocktail.alcoholic || '').toLowerCase().includes(searchValue)
      || ingredientsText.some((ingredient) => ingredient.includes(searchValue))
      || tagsText.some((tag) => tag.includes(searchValue));

    const normalizedAlcohol = normalizeAlcoholValue(cocktail.alcoholic);
    const matchesAlcohol =
      alcoholFilter === 'all'
        ? true
        : alcoholFilter === normalizedAlcohol;

    const matchesCategory = categoryFilter === 'all' || (cocktail.category || '') === categoryFilter;
    const matchesGlass = glassFilter === 'all' || (cocktail.glass || '') === glassFilter;
    const matchesIngredient =
      ingredientFilter === 'all'
      || (cocktail.ingredientItems || []).some((ingredient) => ingredient.name === ingredientFilter);

    return matchesSearch && matchesAlcohol && matchesCategory && matchesGlass && matchesIngredient;
  });

  return applySort(filtered, sortOrder);
};

const initialState: CocktailSkill = {
  cocktails: [],
  cocktailsSearch: [],
  categories: {},
  sections: {},
  dialog: { open: false },
  searchTerm: '',
  alcoholFilter: 'all',
  categoryFilter: 'all',
  glassFilter: 'all',
  ingredientFilter: 'all',
  sortOrder: 'featured',
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
        cocktailsSearch: applyFilters(
          payload.value,
          state.searchTerm,
          state.alcoholFilter,
          state.categoryFilter,
          state.glassFilter,
          state.ingredientFilter,
          state.sortOrder,
        )
      }
    case SET_ALL_SKILL_SEARCH:
      return {
        ...state,
        searchTerm: payload.value,
        cocktailsSearch: applyFilters(
          cocktails,
          payload.value,
          state.alcoholFilter,
          state.categoryFilter,
          state.glassFilter,
          state.ingredientFilter,
          state.sortOrder,
        )
      }
    case SET_ALCOHOL_FILTER:
      return {
        ...state,
        alcoholFilter: payload.value,
        cocktailsSearch: applyFilters(
          cocktails,
          state.searchTerm,
          payload.value,
          state.categoryFilter,
          state.glassFilter,
          state.ingredientFilter,
          state.sortOrder,
        )
      }
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: payload.value,
        cocktailsSearch: applyFilters(
          cocktails,
          state.searchTerm,
          state.alcoholFilter,
          payload.value,
          state.glassFilter,
          state.ingredientFilter,
          state.sortOrder,
        )
      }
    case SET_GLASS_FILTER:
      return {
        ...state,
        glassFilter: payload.value,
        cocktailsSearch: applyFilters(
          cocktails,
          state.searchTerm,
          state.alcoholFilter,
          state.categoryFilter,
          payload.value,
          state.ingredientFilter,
          state.sortOrder,
        )
      }
    case SET_INGREDIENT_FILTER:
      return {
        ...state,
        ingredientFilter: payload.value,
        cocktailsSearch: applyFilters(
          cocktails,
          state.searchTerm,
          state.alcoholFilter,
          state.categoryFilter,
          state.glassFilter,
          payload.value,
          state.sortOrder,
        )
      }
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: payload.value,
        cocktailsSearch: applyFilters(
          cocktails,
          state.searchTerm,
          state.alcoholFilter,
          state.categoryFilter,
          state.glassFilter,
          state.ingredientFilter,
          payload.value,
        )
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
        categoryFilter: 'all',
        glassFilter: 'all',
        ingredientFilter: 'all',
        sortOrder: 'featured',
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