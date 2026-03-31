import { useCallback, useEffect, useState, useRef } from 'react';
import { Box, Container, Fade, Stack, Typography } from '@mui/material';
import type { PaletteMode } from '@mui/material/styles';
import { CocktailBar } from './CocktailBar';
import CocktailCatalog from './CocktailCatalog';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, doSetallSkill, fetchDataCocktail, openDetailsCocktailById } from "../../redux/actions/cocktailActions";
import DialogCocktailDetails from "./DialogCocktailDetails";
import { useStyles } from './styles';
import { RootState } from '../../redux/store';
import { AlcoholFilter, Category, Skill } from '../../interfaces/cocktailInterfaces';

interface CocktailProps {
  mode: PaletteMode;
  onToggleTheme: () => void;
}

const Cocktail = ({ mode, onToggleTheme }: CocktailProps) => {
  const dispatch = useDispatch<any>();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultCocktails, setDefaultCocktails] = useState<Skill[]>([]);
  const previousUriRef = useRef<string | undefined>(undefined);
  const searchTerm = useSelector((state: RootState) => state.cocktail.searchTerm);
  const alcoholFilter = useSelector((state: RootState) => state.cocktail.alcoholFilter);
  const categoryFilter = useSelector((state: RootState) => state.cocktail.categoryFilter);
  const glassFilter = useSelector((state: RootState) => state.cocktail.glassFilter);
  const ingredientFilter = useSelector((state: RootState) => state.cocktail.ingredientFilter);
  const categories = useSelector((state: RootState) => state.cocktail.categories as Category);

  const normalizeFilterValue = (value: string) => encodeURIComponent(value.trim().replace(/\s+/g, '_'));

  const buildApiUri = useCallback((
    currentSearchTerm: string,
    currentAlcoholFilter: AlcoholFilter,
    currentCategoryFilter: string,
    currentGlassFilter: string,
    currentIngredientFilter: string,
  ): string | undefined => {
    const normalizedSearch = currentSearchTerm.trim();

    if (currentIngredientFilter !== 'all') {
      return `filter.php?i=${normalizeFilterValue(currentIngredientFilter)}`;
    }

    if (currentCategoryFilter !== 'all') {
      return `filter.php?c=${normalizeFilterValue(currentCategoryFilter)}`;
    }

    if (currentGlassFilter !== 'all') {
      return `filter.php?g=${normalizeFilterValue(currentGlassFilter)}`;
    }

    if (currentAlcoholFilter === 'alcoholic') {
      return 'filter.php?a=Alcoholic';
    }

    if (currentAlcoholFilter === 'non_alcoholic') {
      return 'filter.php?a=Non_Alcoholic';
    }

    if (normalizedSearch) {
      const searchValue = normalizedSearch.toLowerCase();
      const matchFrom = (list: string[] = []) => list.find((item) => item.toLowerCase() === searchValue);

      const categoryMatch = matchFrom(categories?.Category?.subMenus || []);
      if (categoryMatch) {
        return `filter.php?c=${normalizeFilterValue(categoryMatch)}`;
      }

      const glassMatch = matchFrom(categories?.Glasses?.subMenus || []);
      if (glassMatch) {
        return `filter.php?g=${normalizeFilterValue(glassMatch)}`;
      }

      const ingredientMatch = matchFrom(categories?.Ingredients?.subMenus || []);
      if (ingredientMatch) {
        return `filter.php?i=${normalizeFilterValue(ingredientMatch)}`;
      }

      const alcoholicMatch = matchFrom(categories?.Alcoholic?.subMenus || []);
      if (alcoholicMatch) {
        return `filter.php?a=${normalizeFilterValue(alcoholicMatch)}`;
      }

      return `search.php?s=${encodeURIComponent(normalizedSearch)}`;
    }

    return undefined;
  }, [categories]);

  const loadCocktails = useCallback(async (uri?: string, persistAsDefault: boolean = false) => {
    setIsLoading(true);
    try {
      const fetched = await dispatch(fetchDataCocktail(uri));

      if (persistAsDefault && fetched.length > 0) {
        setDefaultCocktails(fetched);
      }

      return fetched;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      try {
        await dispatch(addCategory());
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // buildApiUri is included but not in deps because changes to categories will still
    // produce the same URI given fixed filter parameters. URI comparison prevents refetching.
    // defaultCocktails changes only in this effect, so it's safe to exclude from deps.
    const uri = buildApiUri(
      searchTerm,
      alcoholFilter,
      categoryFilter,
      glassFilter,
      ingredientFilter,
    );

    // Only load if URI changed (prevents infinite loops from array reference changes)
    if (uri !== previousUriRef.current) {
      previousUriRef.current = uri;
      if (uri) {
        loadCocktails(uri);
      } else {
        // No filters - load defaults if we don't have any data cached
        if (defaultCocktails.length === 0) {
          loadCocktails(undefined, true);
        } else {
          // Use cached defaults
          dispatch(doSetallSkill(defaultCocktails));
        }
      }
    }
  }, [
    searchTerm,
    alcoholFilter,
    categoryFilter,
    glassFilter,
    ingredientFilter,
    loadCocktails,
    dispatch,
  ]);

  const handleSurprise = async () => {
    await loadCocktails(undefined, true);
  };

  const dialog = useSelector((state: RootState) => state.cocktail.dialog);
  const previousDrinkIdRef = useRef<number | null>(null);

  // Initialize modal from URL on app mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const drinkId = params.get('drink');

    if (drinkId) {
      const id = parseInt(drinkId, 10);
      if (!isNaN(id)) {
        previousDrinkIdRef.current = id;
        dispatch(openDetailsCocktailById(id));
      }
    }
  }, [dispatch]);

  // Sync dialog state with URL - only update if ID actually changed
  useEffect(() => {
    const currentId = dialog.open && dialog.details?.id ? dialog.details.id : null;
    const previousId = previousDrinkIdRef.current;

    // Only update URL if ID changed
    if (currentId !== previousId) {
      previousDrinkIdRef.current = currentId;

      const params = new URLSearchParams(window.location.search);

      if (currentId) {
        params.set('drink', currentId.toString());
      } else {
        params.delete('drink');
      }

      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, [dialog.open, dialog.details?.id]);

  return (
    <>
      <CocktailBar mode={mode} onToggleTheme={onToggleTheme} onSurprise={handleSurprise} isLoading={isLoading} />
      <Box className={classes.appShell}>
        <Container maxWidth="xl" className={classes.contentContainer}>
          <Fade in timeout={550}>
            <Stack spacing={0.75} sx={{ mb: { xs: 2.5, md: 3.5 } }}>
              <Typography variant="h4" className={classes.pageTitle}>
                Descubri tu proximo cocktail
              </Typography>
              <Typography variant="body1" className={classes.pageSubtitle}>
                Explora recetas por categoria, ingrediente o tipo de bebida, y encontra ideas para cualquier ocasion.
              </Typography>
            </Stack>
          </Fade>
          <Fade in timeout={800}>
            <Box>
              <CocktailCatalog isLoading={isLoading} onSurprise={handleSurprise} />
            </Box>
          </Fade>
        </Container>
      </Box>
      <DialogCocktailDetails/>
    </>
  )
}

export default Cocktail