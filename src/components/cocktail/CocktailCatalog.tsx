import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CocktailCard } from './cocktail-card/CocktailCard';
import Grid from '@material-ui/core/Grid';
import { Skill } from '../../interfaces/cocktailInterfaces';
import { Card, CardActionArea, CardActions, CardContent } from '@material-ui/core';
import CardImage from './cocktail-card/CardImage';
import Cardtitle from './cocktail-card/Cardtitle';
import CardButton from './cocktail-card/CardButton';
import { useStyles } from './styles';


const CocktailTable = () => {
  const cocktails: Skill[] = useSelector((state: RootState) => state.cocktail.cocktailsSearch);
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={1}>
        {cocktails
          ? cocktails.map((cocktail) => (
            <Grid item xs={3} key={cocktail.id}>
              {/* <CocktailCard {...cocktail} /> */}
              <CocktailCard skill = {cocktail}>
                <Card className={classes.cardRoot}>
                  <CardActionArea>
                    <CardImage />
                    <CardContent>
                      <Cardtitle />
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <CardButton />
                  </CardActions>
                </Card>
              </CocktailCard>
            </Grid>
          ))
          : <></>}
      </Grid >
    </>
  );
};

export default CocktailTable