import { Avatar, CardHeader, Container, Paper } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MaterialTable from "material-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";
const ResultsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [result, setResult] = useState([]);
  const slug = location.state.slug;
  const [isLoading, setLoading] = useState(true);

  const columns = [
    {
      title: "Email",
      field: "email",
    },
    {
      field: "name",
      title: "Name",
      render: (rowData) => {
        return (
          <CardHeader
            style={{ padding: 0 }}
            avatar={
              rowData.avatar !== null ? (
                <Avatar
                  src={`http://192.168.0.8:8000/assets/images/avatar/${rowData.avatar}`}
                />
              ) : (
                <AccountCircle />
              )
            }
            title={rowData.name}
          />
        );
      },
    },
    {
      title: "Score",
      field: "results[0].score",
    },
    {
      title: "Tanggal Submit",
      render: (rowData) => {
        return moment(rowData.results[0].created_at).format("l");
      },
    },
  ];

  useEffect(() => {
    if (!location.state) history.push("/quiz");
    apiQuiz
      .resultQuiz(slug, "quiz")
      .then((response) => {
        const res = response.data.data;
        console.log(res);
        setLoading(false);
        setResult(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history, location, slug]);

  return !location.state ? (
    <h1>Forbidden</h1>
  ) : (
    <Container>
      <Paper>
        <MaterialTable
          title="Hasil Kuis"
          isLoading={isLoading}
          columns={columns}
          data={result}
          options={{
            search: true,
            sorting: true,
            tableLayout: "auto",
          }}
        />
      </Paper>
    </Container>
  );
};

export default Layout(ResultsPage, "Quiz");
