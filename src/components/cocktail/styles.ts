import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  ({
    appShell: {
      minHeight: '100vh',
      background:
        theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 10% 10%, rgba(41, 211, 166, 0.14), transparent 32%), radial-gradient(circle at 90% 0%, rgba(126, 203, 255, 0.18), transparent 30%), linear-gradient(180deg, #0c1526 0%, #0a111d 100%)'
          : 'radial-gradient(circle at 0% 0%, rgba(17, 122, 101, 0.1), transparent 30%), radial-gradient(circle at 100% 10%, rgba(11, 92, 173, 0.1), transparent 26%), linear-gradient(180deg, #f8fbff 0%, #eef3f9 100%)',
    },
    contentContainer: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(5),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(7),
      },
    },
    pageTitle: {
      fontWeight: 800,
      letterSpacing: 0.2,
      color: theme.palette.text.primary,
    },
    pageSubtitle: {
      maxWidth: 760,
      color: alpha(theme.palette.text.primary, 0.74),
      lineHeight: 1.7,
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      borderRadius: 0,
      borderBottom: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.16 : 0.14)}`,
      background:
        theme.palette.mode === 'dark'
          ? 'linear-gradient(90deg, #101826 0%, #152238 55%, #1d3557 100%)'
          : 'linear-gradient(90deg, #dff0ec 0%, #e6eef7 55%, #d8e7f8 100%)',
      boxShadow: '0 10px 28px rgba(0, 0, 0, 0.25)',
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
    },
    appToolbar: {
      display: 'grid',
      gridTemplateColumns: 'minmax(220px, 1fr) minmax(480px, 980px) minmax(170px, 1fr)',
      alignItems: 'center',
      columnGap: theme.spacing(1.5),
      minHeight: 72,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'minmax(200px, 1fr) minmax(380px, 760px) minmax(138px, 1fr)',
      },
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'minmax(180px, 1fr) minmax(260px, 620px) minmax(126px, 1fr)',
      },
      [theme.breakpoints.down('sm')]: {
        minHeight: 64,
        gridTemplateColumns: '1fr auto auto',
        gridTemplateRows: 'auto',
        columnGap: theme.spacing(0.75),
        paddingTop: theme.spacing(0.75),
        paddingBottom: theme.spacing(0.75),
        paddingLeft: theme.spacing(0.75),
        paddingRight: theme.spacing(0.75),
      },
    },
    toolbarLeft: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
    },
    brandIdentity: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      maxWidth: '100%',
      paddingLeft: theme.spacing(0.5),
    },
    brandLogo: {
      width: 32,
      height: 32,
      marginRight: theme.spacing(1.1),
      objectFit: 'contain',
      flexShrink: 0,
    },
    toolbarCenter: {
      display: 'flex',
      justifyContent: 'center',
      padding: 8,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
        gridColumn: '1',
      },
    },
    toolbarRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        gap: theme.spacing(0.75),
      },
      [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(0.5),
      },
    },
    title: {
      display: 'none',
      fontWeight: 800,
      letterSpacing: 0.2,
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
      whiteSpace: 'nowrap',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: '1.35rem',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem',
      },
    },
    searchPanel: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(0.9),
      borderRadius: 20,
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.18 : 0.14)}`,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.white, 0.06)
          : alpha(theme.palette.common.white, 0.68),
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : alpha(theme.palette.text.primary, 0.92),
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.11)
            : alpha(theme.palette.common.white, 0.88),
      },
      width: '100%',
      maxWidth: 900,
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        gap: 0,
        padding: 0,
        maxWidth: '100%',
      },
    },
    searchMain: {
      width: '100%',
      borderRadius: 12,
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.18 : 0.14)}`,
      backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.3 : 0.78),
      '& .MuiInputBase-root.Mui-disabled': {
        opacity: 0.55,
        cursor: 'not-allowed',
      },
      [theme.breakpoints.down('sm')]: {
        borderRadius: 24,
        backgroundColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.08 : 0.72),
      },
    },
    filtersRow: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(0.75),
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    filterButton: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'inline-flex',
      },
    },
    filterControl: {
      minWidth: 132,
      flex: '1 1 132px',
      '& .MuiInputLabel-root': {
        color: alpha(theme.palette.text.primary, 0.72),
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.22 : 0.58),
        '& fieldset': {
          borderColor: alpha(theme.palette.text.primary, 0.22),
        },
        '&:hover fieldset': {
          borderColor: alpha(theme.palette.text.primary, 0.32),
        },
        '&.Mui-disabled': {
          opacity: 0.55,
          backgroundColor: alpha(theme.palette.action.disabledBackground, theme.palette.mode === 'dark' ? 0.3 : 0.7),
          '& fieldset': {
            borderColor: alpha(theme.palette.text.primary, 0.16),
          },
        },
      },
      '& .MuiSelect-select': {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
    searchInput: {
      width: '100%',
      borderRadius: 12,
      paddingLeft: theme.spacing(0.75),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0.5),
      },
    },
    inputRoot: {
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1.15, 1, 1.15, 0),
      fontSize: '1rem',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.9, 0.8, 0.9, 0),
        fontSize: '0.95rem',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    cardRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 18,
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.12 : 0.1)}`,
      background:
        theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #1a2335 0%, #141b2a 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%)',
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 12px 30px rgba(2, 6, 15, 0.28)'
          : '0 12px 28px rgba(15, 23, 42, 0.1)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        borderColor: alpha(theme.palette.primary.main, 0.55),
        boxShadow: '0 18px 36px rgba(2, 6, 15, 0.4)',
      },
    },
    cardMedia: {
      height: 210,
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        height: 190,
      },
    },
    cardMediaLong: {
      width: '100%',
      maxHeight: 430,
      objectFit: 'cover',
      borderRadius: 14,
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.14 : 0.1)}`,
    },
    drawerPaper: {
      width: 280,
      background:
        theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #172036 0%, #101827 100%)'
          : 'linear-gradient(180deg, #f5fbff 0%, #edf4fb 100%)',
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
      borderRight: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.12 : 0.1)}`,
      [theme.breakpoints.up('sm')]: {
        width: 320,
      },
    },
    themeToggleButton: {
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.2 : 0.16)}`,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.black, 0.2)
          : alpha(theme.palette.common.white, 0.65),
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.16)
            : alpha(theme.palette.common.white, 0.92),
      },
    },
    surpriseButton: {
      borderRadius: 999,
      textTransform: 'none',
      fontWeight: 700,
      borderColor: alpha(theme.palette.text.primary, 0.2),
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.black, 0.16)
          : alpha(theme.palette.common.white, 0.6),
      '&:hover': {
        borderColor: alpha(theme.palette.text.primary, 0.32),
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.12)
            : alpha(theme.palette.common.white, 0.88),
      },
      [theme.breakpoints.down('md')]: {
        minWidth: 0,
        paddingLeft: theme.spacing(1.1),
        paddingRight: theme.spacing(1.1),
        '& .MuiButton-startIcon': {
          marginRight: 0,
        },
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    surpriseLabel: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    nested: {
      paddingLeft: theme.spacing(4.5),
    },
  }),
);