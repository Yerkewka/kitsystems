import React from 'react';
import { ITableData, IPagination } from '../../models/table';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTablePagination from './MuiTablePagination';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '1.2rem',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  body: {
    fontSize: '1.3rem',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

interface IProps {
  data: ITableData;
  pagination: IPagination;
}

const MuiTable: React.FC<IProps> = ({ data, pagination }) => {
  const classes = useStyles();

  const headers = [];
  for (const key in data.headers) {
    headers.push(
      <TableCell key={key} className={classes.header}>
        {data.headers[key]}
      </TableCell>
    );
  }

  if (data.actions?.edit !== null || data.actions?.delete !== null) {
    headers.push(
      <TableCell key={Object.keys(data.headers).length}></TableCell>
    );
  }

  const body = data.body.map((dict, idx) => {
    const row = [];
    for (const key in data.headers) {
      row.push(
        <TableCell key={key} className={classes.body}>
          {dict[key]}
        </TableCell>
      );
    }

    if (data.actions?.edit !== null || data.actions?.delete !== null) {
      row.push(
        <TableCell key={Object.keys(data.headers).length}>
          {data.actions!.edit !== null && (
            <IconButton onClick={() => data.actions!.edit!(dict.id)}>
              <EditIcon />
            </IconButton>
          )}
          {data.actions!.delete !== null && (
            <IconButton onClick={() => data.actions!.delete!(dict.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </TableCell>
      );
    }

    return <TableRow key={idx}>{row}</TableRow>;
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>{body}</TableBody>
        <MuiTablePagination {...pagination} />
      </Table>
    </TableContainer>
  );
};

export default MuiTable;
