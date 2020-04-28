import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DataRow } from "./DataRow";
import { IconButton } from "@material-ui/core";
import { Save, Edit } from "@material-ui/icons";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    button: {
      textAlign: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const initial: number[][] = [
  [70, 75, 85, 90, 100],
  [60, 70, 80, 85, 90],
  [50, 60, 65, 80, 85],
  [30, 50, 60, 65, 75],
  [25, 30, 50, 60, 70],
];

const now = (): string => {
  return moment().format("YYYY-DD-MM hh:mm:ss");
};

export default function SimpleTable() {
  const [data, setData] = useState<number[][]>(initial);
  const [lastUpdate, setLastUpdate] = useState<string>(now());

  useEffect(() => {
    // Logic to fetch data every 2 sec
    const int = setInterval(() => {
      setData(
        data.map((row) => row.map((value) => Math.round(Math.random() * 100)))
      );
      setLastUpdate(now());
    }, 2000);
    return () => clearInterval(int);
  });

  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={7}
                style={{ fontWeight: "bold" }}
              >
                Network Scores
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={6} style={{ fontWeight: "bold" }}>
                Claim Scores
              </TableCell>
              <TableCell />
              <TableCell align="right">>0-20</TableCell>
              <TableCell align="right">>25 - 50</TableCell>
              <TableCell align="right">>50 - 80</TableCell>
              <TableCell align="right">>80 - 99</TableCell>
              <TableCell align="right">99+</TableCell>
            </TableRow>
            <DataRow rowName={"99+"} data={data[0]} />
            <DataRow rowName={">80 - 99"} data={data[1]} />
            <DataRow rowName={">50 - 80"} data={data[2]} />
            <DataRow rowName={">25 - 50"} data={data[3]} />
            <DataRow rowName={">0 - 25"} data={data[4]} />
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.button} style={{}}>
        <IconButton color="primary" aria-label={"Save"} title={"Save"}>
          <Save fontSize={"large"} />
        </IconButton>
        <IconButton color="secondary" aria-label={"Edit"} title={"Edit"}>
          <Edit fontSize={"large"} />
        </IconButton>
        <div>Last update: {lastUpdate}</div>
      </div>
    </div>
  );
}
