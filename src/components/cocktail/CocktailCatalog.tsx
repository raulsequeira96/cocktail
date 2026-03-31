import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CocktailCard } from './cocktail-card/CocktailCard';
import Grid from '@mui/material/Grid';
import { Skill } from '../../interfaces/cocktailInterfaces';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Grow, Paper, Skeleton, Snackbar, Stack, Typography } from '@mui/material';
import CardImage from './cocktail-card/CardImage';
import Cardtitle from './cocktail-card/Cardtitle';
import CardButton from './cocktail-card/CardButton';
import { useStyles } from './styles';
import {
  setAlcoholFilter,
  setCategoryFilter,
  setGlassFilter,
  setIngredientFilter,
  setSkillSearch,
  setSortOrder,
} from '../../redux/actions/cocktailActions';

interface CocktailCatalogProps {
  isLoading?: boolean;
  onSurprise: () => void;
}

const FAVORITES_STORAGE_KEY = 'cocktail-studio-favorites';
const PAGE_SIZE = 8;

interface FavoritesStorageValue {
  ids: number[];
  cocktails: Skill[];
}

const getInitialFavorites = (): FavoritesStorageValue => {
  try {
    const storageValue = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!storageValue) {
      return { ids: [], cocktails: [] };
    }

    const parsed = JSON.parse(storageValue);

    if (Array.isArray(parsed)) {
      if (parsed.every((item) => typeof item === 'number')) {
        return { ids: parsed as number[], cocktails: [] };
      }

      const cocktails = parsed.filter((item) => item && typeof item === 'object' && typeof item.id === 'number') as Skill[];
      return { ids: cocktails.map((cocktail) => cocktail.id), cocktails };
    }

    if (parsed && typeof parsed === 'object') {
      const ids = Array.isArray(parsed.ids) ? parsed.ids.filter((item: unknown) => typeof item === 'number') as number[] : [];
      const cocktails = Array.isArray(parsed.cocktails)
        ? parsed.cocktails.filter((item: unknown) => item && typeof item === 'object' && typeof (item as Skill).id === 'number') as Skill[]
        : [];

      return {
        ids: ids.length ? ids : cocktails.map((cocktail) => cocktail.id),
        cocktails,
      };
    }

    return { ids: [], cocktails: [] };
  } catch (error) {
    return { ids: [], cocktails: [] };
  }
};

const CocktailTable = ({ isLoading = false, onSurprise }: CocktailCatalogProps) => {
  const cocktails: Skill[] = useSelector((state: RootState) => state.cocktail.cocktailsSearch);
  const searchTerm = useSelector((state: RootState) => state.cocktail.searchTerm);
  const alcoholFilter = useSelector((state: RootState) => state.cocktail.alcoholFilter);
  const categoryFilter = useSelector((state: RootState) => state.cocktail.categoryFilter);
  const glassFilter = useSelector((state: RootState) => state.cocktail.glassFilter);
  const ingredientFilter = useSelector((state: RootState) => state.cocktail.ingredientFilter);
  const sortOrder = useSelector((state: RootState) => state.cocktail.sortOrder);
  const dispatch = useDispatch<any>();
  const classes = useStyles();
  const initialFavorites = getInitialFavorites();
  const [favoriteIds, setFavoriteIds] = useState<number[]>(initialFavorites.ids);
  const [favoriteCocktails, setFavoriteCocktails] = useState<Skill[]>(initialFavorites.cocktails);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [shareMessage, setShareMessage] = useState('');

  const visibleCocktails = useMemo(
    () => (cocktails || []).filter((cocktail) => Number(cocktail.id) !== -1),
    [cocktails],
  );
  const favoritesSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const cocktailsToRender = useMemo(
    () => (showFavoritesOnly ? favoriteCocktails.filter((cocktail) => favoritesSet.has(cocktail.id)) : visibleCocktails),
    [showFavoritesOnly, favoriteCocktails, visibleCocktails, favoritesSet],
  );
  const pagedCocktails = cocktailsToRender.slice(0, visibleCount);
  const canLoadMore = visibleCount < cocktailsToRender.length;

  const applyDefaultFilters = useCallback(() => {
    dispatch(setSkillSearch(''));
    dispatch(setAlcoholFilter('all'));
    dispatch(setCategoryFilter('all'));
    dispatch(setGlassFilter('all'));
    dispatch(setIngredientFilter('all'));
    dispatch(setSortOrder('featured'));
  }, [dispatch]);

  const clearSearch = useCallback(() => dispatch(setSkillSearch('')), [dispatch]);
  const clearAlcohol = useCallback(() => dispatch(setAlcoholFilter('all')), [dispatch]);
  const clearCategory = useCallback(() => dispatch(setCategoryFilter('all')), [dispatch]);
  const clearGlass = useCallback(() => dispatch(setGlassFilter('all')), [dispatch]);
  const clearIngredient = useCallback(() => dispatch(setIngredientFilter('all')), [dispatch]);
  const clearSort = useCallback(() => dispatch(setSortOrder('featured')), [dispatch]);

  const activeFilterChips = useMemo(() => {
    const chips: Array<{ label: string; onDelete: () => void }> = [];

    if (searchTerm) {
      chips.push({ label: `Busqueda: ${searchTerm}`, onDelete: clearSearch });
    }
    if (alcoholFilter !== 'all') {
      chips.push({
        label: alcoholFilter === 'alcoholic' ? 'Con alcohol' : 'Sin alcohol',
        onDelete: clearAlcohol,
      });
    }
    if (categoryFilter !== 'all') {
      chips.push({ label: `Categoria: ${categoryFilter}`, onDelete: clearCategory });
    }
    if (glassFilter !== 'all') {
      chips.push({ label: `Vaso: ${glassFilter}`, onDelete: clearGlass });
    }
    if (ingredientFilter !== 'all') {
      chips.push({ label: `Ingrediente: ${ingredientFilter}`, onDelete: clearIngredient });
    }
    if (sortOrder !== 'featured') {
      chips.push({ label: `Orden: ${sortOrder}`, onDelete: clearSort });
    }

    return chips;
  }, [searchTerm, alcoholFilter, categoryFilter, glassFilter, ingredientFilter, sortOrder, clearSearch, clearAlcohol, clearCategory, clearGlass, clearIngredient, clearSort]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify({ ids: favoriteIds, cocktails: favoriteCocktails }));
  }, [favoriteIds, favoriteCocktails]);

  useEffect(() => {
    if (!favoriteIds.length) {
      setFavoriteCocktails([]);
      return;
    }

    setFavoriteCocktails((prevFavorites) => {
      const byId = new Map(prevFavorites.map((cocktail) => [cocktail.id, cocktail]));
      let changed = false;

      visibleCocktails.forEach((cocktail) => {
        if (favoriteIds.includes(cocktail.id) && !byId.has(cocktail.id)) {
          byId.set(cocktail.id, cocktail);
          changed = true;
        }
      });

      const nextFavorites = Array.from(byId.values()).filter((cocktail) => favoriteIds.includes(cocktail.id));

      if (nextFavorites.length !== prevFavorites.length) {
        changed = true;
      }

      return changed ? nextFavorites : prevFavorites;
    });
  }, [favoriteIds, visibleCocktails]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [cocktailsToRender.length]);

  const handleToggleFavorite = useCallback((skill: Skill) => {
    setFavoriteIds((prevIds) => (prevIds.includes(skill.id)
      ? prevIds.filter((id) => id !== skill.id)
      : [...prevIds, skill.id]));

    setFavoriteCocktails((prevFavorites) => {
      if (prevFavorites.some((item) => item.id === skill.id)) {
        return prevFavorites.filter((item) => item.id !== skill.id);
      }

      return [...prevFavorites, skill];
    });
  }, []);

  const handleShare = useCallback(async (skill: Skill) => {
    const shareText = `${skill.title} - ${skill.category}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: skill.title,
          text: `${shareText}\n${skill.description}`,
          url: window.location.href,
        });
        setShareMessage('Cocktail compartido.');
        return;
      }

      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setShareMessage('Enlace copiado al portapapeles.');
    } catch (error) {
      setShareMessage('No se pudo compartir este cocktail.');
    }
  }, []);

  const handleToggleFavoritesOnly = useCallback(() => {
    setShowFavoritesOnly((prev) => !prev);
  }, []);

  if (isLoading) {
    return (
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
            <Card className={classes.cardRoot} elevation={0}>
              <Skeleton variant="rectangular" animation="wave" sx={{ height: { xs: 190, sm: 210 }, borderRadius: '18px 18px 0 0' }} />
              <CardContent sx={{ pb: 1 }}>
                <Skeleton animation="wave" height={30} width="80%" />
                <Skeleton animation="wave" height={24} width="52%" />
              </CardContent>
              <CardActions sx={{ mt: 'auto', px: 2, pb: 2 }}>
                <Skeleton animation="wave" variant="rounded" width={110} height={34} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!cocktailsToRender.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'linear-gradient(180deg, #162137 0%, #111827 100%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {showFavoritesOnly ? 'No tenes favoritos guardados' : 'No hay resultados para esa busqueda'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {showFavoritesOnly
            ? 'Marca cocktails con el icono de corazon para verlos aca.'
            : 'Proba con otro termino o elegi una categoria desde el menu lateral.'}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {showFavoritesOnly && (
            <Button
              variant="outlined"
              onClick={() => setShowFavoritesOnly(false)}
            >
              Ver todos
            </Button>
          )}
          {!showFavoritesOnly && (
            <>
              <Button variant="outlined" onClick={applyDefaultFilters}>Limpiar filtros</Button>
              {alcoholFilter !== 'all' && (
                <Button variant="outlined" onClick={() => dispatch(setAlcoholFilter('all'))}>Quitar filtro alcohol</Button>
              )}
              <Button variant="contained" onClick={onSurprise}>Ver sorpresas</Button>
            </>
          )}
        </Stack>
      </Paper>
    );
  }

  return (
    <Box>      
      {activeFilterChips.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          {activeFilterChips.map((filter) => (
            <Chip key={filter.label} label={filter.label} onDelete={filter.onDelete} color="primary" variant="outlined" />
          ))}
          <Button size="small" onClick={applyDefaultFilters}>Limpiar todo</Button>
        </Stack>
      )}

      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando {pagedCocktails.length} de {cocktailsToRender.length} cocktails
        </Typography>
        <Chip
          clickable
          color={showFavoritesOnly ? 'primary' : 'default'}
          variant={showFavoritesOnly ? 'filled' : 'outlined'}
          label={showFavoritesOnly ? 'Mostrar todos' : 'Solo favoritos'}
          onClick={handleToggleFavoritesOnly}
        />
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {pagedCocktails.map((cocktail, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cocktail.id}>
            <Grow in timeout={380 + index * 70}>
              <Box>
                <CocktailCard skill={cocktail}>
                  <Card className={classes.cardRoot} elevation={0}>
                    <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}>
                      <CardImage />
                      <CardContent sx={{ width: '100%', pb: 1.5 }}>
                        <Cardtitle />
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ mt: 'auto', px: 2, pb: 2 }}>
                      <CardButton
                        isFavorite={favoritesSet.has(cocktail.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onShare={handleShare}
                      />
                    </CardActions>
                  </Card>
                </CocktailCard>
              </Box>
            </Grow>
          </Grid>
        ))}
      </Grid>
      {canLoadMore && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}>
            Cargar mas
          </Button>
        </Box>
      )}
      <Snackbar
        open={Boolean(shareMessage)}
        autoHideDuration={2200}
        onClose={() => setShareMessage('')}
        message={shareMessage}
      />
    </Box>
  );
};

export default CocktailTable