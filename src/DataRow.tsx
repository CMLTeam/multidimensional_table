import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

interface DataRowProps {
  rowName: string;
  data: number[];
}

export const DataRow = (props: DataRowProps) => {
  return (
    <TableRow>
      <TableCell align="right">{props.rowName}</TableCell>
      {props.data.map((value, i) => (
        <TableCell key={i} align="right">
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
};
