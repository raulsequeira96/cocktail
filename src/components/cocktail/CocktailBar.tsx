import React, { ChangeEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type { PaletteMode } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import Drawer from '@mui/material/Drawer';
import { useStyles } from './styles';
import MenuCocktail from './MenuCocktail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setAlcoholFilter, setSkillSearch } from '../../redux/actions/cocktailActions';
import { AlcoholFilter, Clases, SubmenuState } from '../../interfaces/cocktailInterfaces';

interface CocktailBarProps {
  mode: PaletteMode;
  onToggleTheme: () => void;
  onSurprise: () => void;
  isLoading: boolean;
}

export const CocktailBar: React.FC<CocktailBarProps> = ({ mode, onToggleTheme, onSurprise, isLoading }) => {
  const classes: Clases = useStyles();
  const dispatch = useDispatch<any>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sections: SubmenuState = useSelector((state: RootState) => state.cocktail.sections);
  const alcoholFilter = useSelector((state: RootState) => state.cocktail.alcoholFilter);

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

  const handleAlcoholChange = (event: SelectChangeEvent<string>) => {
    dispatch(setAlcoholFilter(event.target.value as AlcoholFilter));
  };

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.appToolbar}>
          <Box className={classes.toolbarLeft}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
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
              <FormControl size="small" className={classes.filterControl}>
                <Select
                  labelId="alcohol-filter-label"
                  value={alcoholFilter}
                  onChange={handleAlcoholChange}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="alcoholic">Con alcohol</MenuItem>
                  <MenuItem value="non_alcoholic">Sin alcohol</MenuItem>
                </Select>
              </FormControl>
              <InputBase
                placeholder="Buscar cocktail..."
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
                onChange={searchHandleChange}
                className={classes.searchInput}
              />
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
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
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
