import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeDetailsCocktail, openDetailsCocktail } from '../../redux/actions/cocktailActions';
import { useStyles } from './styles';
import CardMedia from '@material-ui/core/CardMedia';

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
          <Grid item xs={11}>
            <DialogTitle id="customized-dialog-title">
              {details?.title}
            </DialogTitle>
          </Grid>
          <Grid item xs={1}>
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