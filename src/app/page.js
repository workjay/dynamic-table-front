"use client";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTablesAction } from "@/app/redux/reducers/common";
import PrimaryTable from "./components/PrimaryTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 20px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedTable, setSelectedTable] = useState("users");

  const { tables } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(getTablesAction());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        {tables?.isLoading ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"50px 0px"}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid gap={2} display={"flex"} flexDirection={"column"}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="10px"
            >
              <Typography variant="h4" fontWeight={600}>
                Dynamic Table
              </Typography>
              <Select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                size="small"
              >
                {(tables.data ?? []).map((table) => (
                  <MenuItem key={table.tableName} value={table.tableName}>
                    {table.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <PrimaryTable selectedTable={selectedTable} />
          </Grid>
        )}
      </Container>
    </Box>
  );
}
