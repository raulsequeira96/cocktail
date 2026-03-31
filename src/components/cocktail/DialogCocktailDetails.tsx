import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  icon_x: {
    position: 'absolute'
  }
}));

const DialogCocktailDetails = () => {
  const { open, details } = useSelector((state: RootState) => state.cocktail.dialog);
  const dispatch = useDispatch<any>();
  const classes = useStyles();

  const handleClose = () => {
    dispatch(closeDetailsCocktail());
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <Grid container spacing={1}>
          <Grid size={11}>
            <DialogTitle id="customized-dialog-title">
              {details?.title}
            </DialogTitle>
          </Grid>
          <Grid size={1}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              className='icon_x'
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent dividers>
          <Typography gutterBottom>
            {details?.description}
          </Typography>
          <CardMedia
            className={classes.cardMediaLong}
            image={details?.image}
            title={details?.title}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default DialogCocktailDetails