import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Drawer from '@mui/material/Drawer';
import type { PaletteMode } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './styles';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setAlcoholFilter,
  setCategoryFilter,
  setGlassFilter,
  setIngredientFilter,
  setSkillSearch,
  setSortOrder,
} from '../../redux/actions/cocktailActions';
import { AlcoholFilter, Category, Clases, Skill, SortOrder } from '../../interfaces/cocktailInterfaces';

const FILTERS_STORAGE_KEY = 'cocktail-studio-filters-v1';
type ActiveFilter = 'none' | 'search' | 'alcohol' | 'category' | 'glass' | 'ingredient';

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

const matchesSearch = (cocktail: Skill, searchTerm: string): boolean => {
  const searchValue = searchTerm.trim().toLowerCase();

  if (!searchValue) {
    return true;
  }

  const ingredientsText = (cocktail.ingredientItems || []).map((ingredient) => ingredient.name.toLowerCase());
  const tagsText = (cocktail.tags || []).map((tag) => tag.toLowerCase());

  return (
    cocktail.title.toLowerCase().includes(searchValue)
    || (cocktail.category || '').toLowerCase().includes(searchValue)
    || (cocktail.glass || '').toLowerCase().includes(searchValue)
    || (cocktail.alcoholic || '').toLowerCase().includes(searchValue)
    || ingredientsText.some((ingredient) => ingredient.includes(searchValue))
    || tagsText.some((tag) => tag.includes(searchValue))
  );
};

interface CocktailBarProps {
  mode: PaletteMode;
  onToggleTheme: () => void;
  onSurprise: () => void;
  isLoading: boolean;
}

export const CocktailBar: React.FC<CocktailBarProps> = ({ mode, onToggleTheme, onSurprise, isLoading }) => {
  const classes: Clases = useStyles();
  const dispatch = useDispatch<any>();
  const [filtersHydrated, setFiltersHydrated] = useState(false);
  const [searchDraft, setSearchDraft] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const cocktails = useSelector((state: RootState) => state.cocktail.cocktails as Skill[]);
  const categories = useSelector((state: RootState) => state.cocktail.categories as Category);
  const searchTerm = useSelector((state: RootState) => state.cocktail.searchTerm);
  const alcoholFilter = useSelector((state: RootState) => state.cocktail.alcoholFilter);
  const categoryFilter = useSelector((state: RootState) => state.cocktail.categoryFilter);
  const glassFilter = useSelector((state: RootState) => state.cocktail.glassFilter);
  const ingredientFilter = useSelector((state: RootState) => state.cocktail.ingredientFilter);
  const sortOrder = useSelector((state: RootState) => state.cocktail.sortOrder);

  const categoryOptions = useMemo(
    () => categories?.Category?.subMenus || [],
    [categories],
  );

  const glassOptions = useMemo(
    () => categories?.Glasses?.subMenus || [],
    [categories],
  );

  const ingredientOptions = useMemo(
    () => categories?.Ingredients?.subMenus || [],
    [categories],
  );

  const baseForAlcoholCounts = useMemo(
    () => cocktails.filter((cocktail) => {
      const matchesCategory = categoryFilter === 'all' || (cocktail.category || '') === categoryFilter;
      const matchesGlass = glassFilter === 'all' || (cocktail.glass || '') === glassFilter;
      const matchesIngredient = ingredientFilter === 'all'
        || (cocktail.ingredientItems || []).some((ingredient) => ingredient.name === ingredientFilter);

      return matchesSearch(cocktail, searchTerm) && matchesCategory && matchesGlass && matchesIngredient;
    }),
    [cocktails, searchTerm, categoryFilter, glassFilter, ingredientFilter],
  );

  const alcoholCounts = useMemo(() => {
    const alcoholic = baseForAlcoholCounts.filter(
      (cocktail) => normalizeAlcoholValue(cocktail.alcoholic) === 'alcoholic',
    ).length;
    const nonAlcoholic = baseForAlcoholCounts.filter(
      (cocktail) => normalizeAlcoholValue(cocktail.alcoholic) === 'non_alcoholic',
    ).length;

    return {
      all: baseForAlcoholCounts.length,
      alcoholic,
      non_alcoholic: nonAlcoholic,
    };
  }, [baseForAlcoholCounts]);

  const activeFilter = useMemo<ActiveFilter>(() => {
    if (searchTerm.trim()) {
      return 'search';
    }

    if (ingredientFilter !== 'all') {
      return 'ingredient';
    }

    if (categoryFilter !== 'all') {
      return 'category';
    }

    if (glassFilter !== 'all') {
      return 'glass';
    }

    if (alcoholFilter !== 'all') {
      return 'alcohol';
    }

    return 'none';
  }, [searchTerm, ingredientFilter, categoryFilter, glassFilter, alcoholFilter]);

  const isAlcoholDisabled = activeFilter !== 'none' && activeFilter !== 'alcohol';
  const isCategoryDisabled = activeFilter !== 'none' && activeFilter !== 'category';
  const isGlassDisabled = activeFilter !== 'none' && activeFilter !== 'glass';
  const isIngredientDisabled = activeFilter !== 'none' && activeFilter !== 'ingredient';

  const clearOtherFilters = (keep: ActiveFilter) => {
    batch(() => {
      if (keep !== 'search') {
        dispatch(setSkillSearch(''));
      }
      if (keep !== 'alcohol') {
        dispatch(setAlcoholFilter('all'));
      }
      if (keep !== 'category') {
        dispatch(setCategoryFilter('all'));
      }
      if (keep !== 'glass') {
        dispatch(setGlassFilter('all'));
      }
      if (keep !== 'ingredient') {
        dispatch(setIngredientFilter('all'));
      }
    });

    if (keep !== 'search') {
      setSearchDraft('');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasUrlFilters = ['q', 'alcohol', 'category', 'glass', 'ingredient', 'sort'].some((key) => params.has(key));

    let source: {
      q?: string;
      alcohol?: string;
      category?: string;
      glass?: string;
      ingredient?: string;
      sort?: string;
    } = {};

    if (hasUrlFilters) {
      source = {
        q: params.get('q') || '',
        alcohol: params.get('alcohol') || 'all',
        category: params.get('category') || 'all',
        glass: params.get('glass') || 'all',
        ingredient: params.get('ingredient') || 'all',
        sort: params.get('sort') || 'featured',
      };
    } else {
      try {
        const saved = localStorage.getItem(FILTERS_STORAGE_KEY);
        if (saved) {
          source = JSON.parse(saved);
        }
      } catch (error) {
        source = {};
      }
    }

    const safeAlcohol: AlcoholFilter = source.alcohol === 'alcoholic' || source.alcohol === 'non_alcoholic' ? source.alcohol : 'all';
    const allowedSort: SortOrder[] = ['featured', 'name_asc', 'name_desc', 'ingredients_desc', 'ingredients_asc', 'random'];
    const safeSort = allowedSort.includes(source.sort as SortOrder) ? source.sort as SortOrder : 'featured';

    const incomingSearch = (source.q || '').trim();
    const incomingIngredient = source.ingredient || 'all';
    const incomingCategory = source.category || 'all';
    const incomingGlass = source.glass || 'all';

    let hydratedSearch = '';
    let hydratedAlcohol: AlcoholFilter = 'all';
    let hydratedCategory = 'all';
    let hydratedGlass = 'all';
    let hydratedIngredient = 'all';

    if (incomingSearch) {
      hydratedSearch = incomingSearch;
    } else if (incomingIngredient !== 'all') {
      hydratedIngredient = incomingIngredient;
    } else if (incomingCategory !== 'all') {
      hydratedCategory = incomingCategory;
    } else if (incomingGlass !== 'all') {
      hydratedGlass = incomingGlass;
    } else if (safeAlcohol !== 'all') {
      hydratedAlcohol = safeAlcohol;
    }

    batch(() => {
      dispatch(setSkillSearch(hydratedSearch));
      dispatch(setAlcoholFilter(hydratedAlcohol));
      dispatch(setCategoryFilter(hydratedCategory));
      dispatch(setGlassFilter(hydratedGlass));
      dispatch(setIngredientFilter(hydratedIngredient));
      dispatch(setSortOrder(safeSort));
    });

    setSearchDraft(hydratedSearch);

    setFiltersHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    setSearchDraft(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!filtersHydrated) {
      return;
    }

    const persistValue = {
      q: searchTerm,
      alcohol: alcoholFilter,
      category: categoryFilter,
      glass: glassFilter,
      ingredient: ingredientFilter,
      sort: sortOrder,
    };

    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(persistValue));

    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (alcoholFilter !== 'all') params.set('alcohol', alcoholFilter);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (glassFilter !== 'all') params.set('glass', glassFilter);
    if (ingredientFilter !== 'all') params.set('ingredient', ingredientFilter);
    if (sortOrder !== 'featured') params.set('sort', sortOrder);

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', nextUrl);
  }, [filtersHydrated, searchTerm, alcoholFilter, categoryFilter, glassFilter, ingredientFilter, sortOrder]);

  const searchHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchDraft(event.target.value);
  };

  const submitSearch = () => {
    const value = searchDraft.trim();

    if (!value) {
      dispatch(setSkillSearch(''));
      return;
    }

    clearOtherFilters('search');
    dispatch(setSkillSearch(value));
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitSearch();
    }
  };

  const handleAlcoholChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as AlcoholFilter;

    if (value === 'all') {
      dispatch(setAlcoholFilter('all'));
      return;
    }

    clearOtherFilters('alcohol');
    dispatch(setAlcoholFilter(value));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    if (value === 'all') {
      dispatch(setCategoryFilter('all'));
      return;
    }

    clearOtherFilters('category');
    dispatch(setCategoryFilter(value));
  };

  const handleGlassChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    if (value === 'all') {
      dispatch(setGlassFilter('all'));
      return;
    }

    clearOtherFilters('glass');
    dispatch(setGlassFilter(value));
  };

  const handleIngredientChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    if (value === 'all') {
      dispatch(setIngredientFilter('all'));
      return;
    }

    clearOtherFilters('ingredient');
    dispatch(setIngredientFilter(value));
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    dispatch(setSortOrder(event.target.value as SortOrder));
  };

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.appToolbar}>
          <Box className={classes.toolbarLeft}>
            <Box className={classes.brandIdentity}>
              <Box
                component="img"
                src="/coctel.png"
                alt="Logo Cocktail Studio"
                className={classes.brandLogo}
              />
              <Typography className={classes.title} variant="h5" component="h1">
                Cocktail Studio
              </Typography>
            </Box>
          </Box>
          <Box className={classes.toolbarCenter}>
            <div className={classes.searchPanel}>
              <Box className={classes.searchMain}>
                <InputBase
                  placeholder="Buscar por nombre, ingrediente, categoria o vaso..."
                  startAdornment={
                    <InputAdornment position="start" sx={{ color: 'inherit', ml: 0.5, mr: 0.25 }}>
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  }
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchDraft}
                  onChange={searchHandleChange}
                  onKeyDown={handleSearchKeyDown}
                  className={classes.searchInput}
                />
              </Box>
              <Box className={classes.filtersRow}>
                <FormControl size="small" className={classes.filterControl} disabled={isAlcoholDisabled}>
                  <Select
                    labelId="alcohol-filter-label"
                    value={alcoholFilter}
                    onChange={handleAlcoholChange}
                    displayEmpty
                  >
                    <MenuItem value="all">Todos ({alcoholCounts.all})</MenuItem>
                    <MenuItem value="alcoholic">Con alcohol ({alcoholCounts.alcoholic})</MenuItem>
                    <MenuItem value="non_alcoholic">Sin alcohol ({alcoholCounts.non_alcoholic})</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" className={classes.filterControl} disabled={isCategoryDisabled}>
                  <Select value={categoryFilter} onChange={handleCategoryChange} displayEmpty>
                    <MenuItem value="all">Todas las categorias</MenuItem>
                    {categoryOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" className={classes.filterControl} disabled={isGlassDisabled}>
                  <Select value={glassFilter} onChange={handleGlassChange} displayEmpty>
                    <MenuItem value="all">Todos los vasos</MenuItem>
                    {glassOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" className={classes.filterControl} disabled={isIngredientDisabled}>
                  <Select value={ingredientFilter} onChange={handleIngredientChange} displayEmpty>
                    <MenuItem value="all">Todos los ingredientes</MenuItem>
                    {ingredientOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" className={classes.filterControl}>
                  <Select value={sortOrder} onChange={handleSortChange} displayEmpty>
                    <MenuItem value="featured">Orden destacado</MenuItem>
                    <MenuItem value="name_asc">Nombre A-Z</MenuItem>
                    <MenuItem value="name_desc">Nombre Z-A</MenuItem>
                    <MenuItem value="ingredients_desc">Mas ingredientes</MenuItem>
                    <MenuItem value="ingredients_asc">Menos ingredientes</MenuItem>
                    <MenuItem value="random">Aleatorio</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </Box>
          <Box className={classes.toolbarRight}>
            <Button
              variant="outlined"
              startIcon={<ShuffleRoundedIcon />}
              className={classes.surpriseButton}
              onClick={onSurprise}
              disabled={isLoading}
            >
              <Box component="span" className={classes.surpriseLabel}>Sorpresa</Box>
            </Button>
            <IconButton
              color="inherit"
              aria-label="Abrir filtros"
              onClick={() => setIsFilterDrawerOpen(true)}
              className={classes.filterButton}
            >
              <TuneRoundedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label={mode === 'dark' ? 'activar modo claro' : 'activar modo oscuro'}
              onClick={onToggleTheme}
              className={classes.themeToggleButton}
            >
              {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 320,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Filtros
            </Typography>
            <IconButton
              size="small"
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <FormControl fullWidth size="small" disabled={isAlcoholDisabled}>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
              Tipo de bebida
            </Typography>
            <Select
              labelId="alcohol-filter-label"
              value={alcoholFilter}
              onChange={handleAlcoholChange}
              displayEmpty
            >
              <MenuItem value="all">Todos ({alcoholCounts.all})</MenuItem>
              <MenuItem value="alcoholic">Con alcohol ({alcoholCounts.alcoholic})</MenuItem>
              <MenuItem value="non_alcoholic">Sin alcohol ({alcoholCounts.non_alcoholic})</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" disabled={isCategoryDisabled}>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
              Categoría
            </Typography>
            <Select value={categoryFilter} onChange={handleCategoryChange} displayEmpty>
              <MenuItem value="all">Todas las categorias</MenuItem>
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" disabled={isGlassDisabled}>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
              Vaso
            </Typography>
            <Select value={glassFilter} onChange={handleGlassChange} displayEmpty>
              <MenuItem value="all">Todos los vasos</MenuItem>
              {glassOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" disabled={isIngredientDisabled}>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
              Ingrediente
            </Typography>
            <Select value={ingredientFilter} onChange={handleIngredientChange} displayEmpty>
              <MenuItem value="all">Todos los ingredientes</MenuItem>
              {ingredientOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
              Ordenar por
            </Typography>
            <Select value={sortOrder} onChange={handleSortChange} displayEmpty>
              <MenuItem value="featured">Orden destacado</MenuItem>
              <MenuItem value="name_asc">Nombre A-Z</MenuItem>
              <MenuItem value="name_desc">Nombre Z-A</MenuItem>
              <MenuItem value="ingredients_desc">Mas ingredientes</MenuItem>
              <MenuItem value="ingredients_asc">Menos ingredientes</MenuItem>
              <MenuItem value="random">Aleatorio</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>
    </div>
  );
};
