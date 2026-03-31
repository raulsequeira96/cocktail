import { useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { CocktailBar } from './CocktailBar';
import CocktailCatalog from './CocktailCatalog';
import { useDispatch } from 'react-redux';
import { fetchDataCocktail, addCategory } from "../../redux/actions/cocktailActions";
import DialogCocktailDetails from "./DialogCocktailDetails";
import { useStyles } from './styles';

const Cocktail = () => {
  const dispatch = useDispatch<any>();
  const classes = useStyles();

  useEffect(() => {

    const execute = async () => {
      await dispatch(fetchDataCocktail());
      await dispatch(addCategory());
    };

    execute();
  }, [dispatch]);

  return (
    <>
      <CocktailBar />
      <Box className={classes.appShell}>
        <Container maxWidth="xl" className={classes.contentContainer}>
          <Stack spacing={0.75} sx={{ mb: { xs: 2.5, md: 3.5 } }}>
            <Typography variant="h4" className={classes.pageTitle}>
              Descubri tu proximo cocktail
            </Typography>
            <Typography variant="body1" className={classes.pageSubtitle}>
              Explora recetas por categoria, ingrediente o tipo de bebida, y encontra ideas para cualquier ocasion.
            </Typography>
          </Stack>
          <CocktailCatalog />
        </Container>
      </Box>
      <DialogCocktailDetails/>
    </>
  )
}

export default Cocktail