import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeDetailsCocktail } from '../../redux/actions/cocktailActions';
import { useStyles } from './styles';
import CardMedia from '@mui/material/CardMedia';

const DialogCocktailDetails = () => {
  const { open, details } = useSelector((state: RootState) => state.cocktail.dialog);
  const dispatch = useDispatch<any>();
  const classes = useStyles();

  const handleClose = () => {
    dispatch(closeDetailsCocktail());
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" sx={{ pr: 6, fontWeight: 800 }}>
          {details?.title || 'Detalle del cocktail'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <CardMedia
                component="img"
                className={classes.cardMediaLong}
                image={details?.image || ''}
                alt={details?.title || 'Cocktail'}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {details?.description || 'No hay descripcion disponible para este cocktail.'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  color="primary"
                  variant="outlined"
                  label={details?.category ? `Categoria: ${details.category}` : 'Categoria no disponible'}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button autoFocus variant="contained" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogCocktailDetails