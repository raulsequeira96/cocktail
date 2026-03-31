import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CocktailCard } from './cocktail-card/CocktailCard';
import Grid from '@mui/material/Grid';
import { Skill } from '../../interfaces/cocktailInterfaces';
import { Box, Card, CardActionArea, CardActions, CardContent, Paper, Typography } from '@mui/material';
import CardImage from './cocktail-card/CardImage';
import Cardtitle from './cocktail-card/Cardtitle';
import CardButton from './cocktail-card/CardButton';
import { useStyles } from './styles';


const CocktailTable = () => {
  const cocktails: Skill[] = useSelector((state: RootState) => state.cocktail.cocktailsSearch);
  const classes = useStyles();
  const visibleCocktails = (cocktails || []).filter((cocktail) => Number(cocktail.id) !== -1);

  if (!visibleCocktails.length) {
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
          No hay resultados para esa busqueda
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Proba con otro termino o elegi una categoria desde el menu lateral.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {visibleCocktails.map((cocktail) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cocktail.id}>
            <CocktailCard skill={cocktail}>
              <Card className={classes.cardRoot} elevation={0}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}>
                  <CardImage />
                  <CardContent sx={{ width: '100%', pb: 1.5 }}>
                    <Cardtitle />
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ mt: 'auto', px: 2, pb: 2 }}>
                  <CardButton />
                </CardActions>
              </Card>
            </CocktailCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CocktailTable