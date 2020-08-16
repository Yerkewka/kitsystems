import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';

const useStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(1) * 2.5,
  },
}));

const MuiTablePaginationActions: React.FC<TablePaginationActionsProps> = (
  props
) => {
  const classes = useStyle();
  const { page, rowsPerPage, count, onChangePage } = props;

  const handleClickFirstPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onChangePage(event, 0);
  };

  const handleClickPrevPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleClickNextPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleClickLastPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onChangePage(event, Math.floor(count / rowsPerPage));
  };

  return (
    <span className={classes.root}>
      <IconButton
        disabled={page === 0}
        aria-label={'Первая страница'}
        onClick={handleClickFirstPage}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        disabled={page === 0}
        aria-label={'Предыдущая страница'}
        onClick={handleClickPrevPage}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        disabled={page === Math.floor(count / rowsPerPage)}
        aria-label={'Следующая страница'}
        onClick={handleClickNextPage}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        disabled={page === Math.floor(count / rowsPerPage)}
        aria-label={'Последняя страница'}
        onClick={handleClickLastPage}
      >
        <LastPageIcon />
      </IconButton>
    </span>
  );
};

export default MuiTablePaginationActions;
