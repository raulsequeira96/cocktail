import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Fade, Stack, Typography } from '@mui/material';
import type { PaletteMode } from '@mui/material/styles';
import { CocktailBar } from './CocktailBar';
import CocktailCatalog from './CocktailCatalog';
import { useDispatch } from 'react-redux';
import { fetchDataCocktail, addCategory } from "../../redux/actions/cocktailActions";
import DialogCocktailDetails from "./DialogCocktailDetails";
import { useStyles } from './styles';

interface CocktailProps {
  mode: PaletteMode;
  onToggleTheme: () => void;
}

const Cocktail = ({ mode, onToggleTheme }: CocktailProps) => {
  const dispatch = useDispatch<any>();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const loadCocktails = useCallback(async (uri?: string) => {
    setIsLoading(true);
    try {
      await dispatch(fetchDataCocktail(uri));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      try {
        await loadCocktails();
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
  }, [dispatch, loadCocktails]);

  const handleSurprise = async () => {
    await loadCocktails();
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
              <CocktailCatalog isLoading={isLoading} />
            </Box>
          </Fade>
        </Container>
      </Box>
      <DialogCocktailDetails/>
    </>
  )
}

export default Cocktail