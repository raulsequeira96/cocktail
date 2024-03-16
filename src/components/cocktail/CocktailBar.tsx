import React, { ChangeEvent, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { useStyles } from './styles';
import MenuCocktail from './MenuCocktail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSkillSearch } from '../../redux/actions/cocktailActions';
import { Clases, SubmenuState } from '../../interfaces/cocktailInterfaces';

export const CocktailBar: React.FC = () => {
  const classes: Clases = useStyles();
  const dispatch = useDispatch<any>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sections: SubmenuState = useSelector((state: RootState) => state.cocktail.sections);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const searchHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(setSkillSearch(value));
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            style={{ marginRight: '8px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Cocktail App yeah
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchHandleChange}
            />

          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuCocktail classes={classes} sections={sections} />
        </div>
      </Drawer>
    </div>
  );
};
