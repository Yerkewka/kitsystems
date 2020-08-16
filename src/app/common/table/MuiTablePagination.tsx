import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import MuiTablePaginationActions from './MuiTablePaginationActions';
import { IPagination } from '../../models/table';

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      flexFlow: 'row wrap',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('xs')]: {
        height: 150,
        justifyContent: 'space-between',
      },
    },
    '& *': {
      fontSize: '1.3rem',
    },
    '& svg': {
      fontSize: '1.8rem',
    },
  },
}));

const MuiTablePagination: React.FC<IPagination> = ({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const classes = useStyles();

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={MuiTablePaginationActions}
          labelRowsPerPage={'Записей на странице'}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}-${to} из ${count}`;
          }}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
        />
      </TableRow>
    </TableFooter>
  );
};

export default MuiTablePagination;
