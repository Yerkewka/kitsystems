import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(3),
  },
  dialogTitle: {
    marginRight: theme.spacing(4),
  },
  title: {
    fontSize: '2.4rem',
    lineHeight: '2.8rem',
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: 'pointer',
    color: '#666666',
  },
}));

interface IProps {
  open: boolean;
  title?: string;
  content: React.ReactElement | null;
  onClose: () => void;
  fullScreen?: boolean;
}

const MuiDialog: React.FC<IProps> = ({
  open,
  onClose,
  title,
  content,
  fullScreen = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const smfullWidth = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth={smfullWidth}
      scroll="body"
      maxWidth="lg"
      aria-labelledby="dialog-title"
      classes={{
        paper: classes.root,
      }}
    >
      <DialogTitle
        id="dialog-title"
        className={classes.dialogTitle}
        disableTypography
      >
        <Typography className={classes.title}>{title}</Typography>
        <IconButton className={classes.closeIcon} onClick={onClose}>
          <CloseIcon color="inherit" fontSize="inherit" />
        </IconButton>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default MuiDialog;
