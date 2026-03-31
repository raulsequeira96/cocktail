import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Fade, Stack, Typography } from '@mui/material';
import type { PaletteMode } from '@mui/material/styles';
import { CocktailBar } from './CocktailBar';
import CocktailCatalog from './CocktailCatalog';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, doSetallSkill, fetchDataCocktail } from "../../redux/actions/cocktailActions";
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
  const searchTerm = useSelector((state: RootState) => state.cocktail.searchTerm);
  const alcoholFilter = useSelector((state: RootState) => state.cocktail.alcoholFilter);
  const categoryFilter = useSelector((state: RootState) => state.cocktail.categoryFilter);
  const glassFilter = useSelector((state: RootState) => state.cocktail.glassFilter);
  const ingredientFilter = useSelector((state: RootState) => state.cocktail.ingredientFilter);
  const categories = useSelector((state: RootState) => state.cocktail.categories as Category);
  const loadedCocktails = useSelector((state: RootState) => state.cocktail.cocktails as Skill[]);

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

  const isSameCocktailSet = (source: Skill[], target: Skill[]) => {
    if (source.length !== target.length) {
      return false;
    }

    const sourceIds = new Set(source.map((cocktail) => cocktail.id));
    return target.every((cocktail) => sourceIds.has(cocktail.id));
  };

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

  useEffect(() => {
    const uri = buildApiUri(
      searchTerm,
      alcoholFilter,
      categoryFilter,
      glassFilter,
      ingredientFilter,
    );

    if (uri) {
      loadCocktails(uri);
      return;
    }

    if (defaultCocktails.length > 0) {
      if (!isSameCocktailSet(defaultCocktails, loadedCocktails)) {
        dispatch(doSetallSkill(defaultCocktails));
      }

      return;
    }

    if (loadedCocktails.length === 0) {
      loadCocktails(undefined, true);
      return;
    }

    setDefaultCocktails(loadedCocktails);
  }, [
    buildApiUri,
    searchTerm,
    alcoholFilter,
    categoryFilter,
    glassFilter,
    ingredientFilter,
    defaultCocktails,
    loadedCocktails,
    dispatch,
    loadCocktails,
  ]);

  const handleSurprise = async () => {
    await loadCocktails(undefined, true);
  };

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