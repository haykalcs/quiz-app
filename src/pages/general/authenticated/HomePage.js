import React, { useEffect, useState } from "react";
import { Avatar, Box, CardHeader, Typography } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UserFeed from "../../../components/UserFeed";
import UserOnline from "../../../components/UserOnline";
import instance from "../../../actions/instance";
import { token } from "../../../config/token";
import PostFeed from "../../../components/PostFeed";
import { useSelector } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import apiFeeds from "../../../actions/feeds/feedsAction";
import { useHistory } from "react-router";
import FeedSkeleton from "../../../components/FeedSkeleton";
import SkeletonUserOnline from "../../../components/SkeletonUserOnline";

const Home = () => {
  const auth = useSelector((state) => state.auth.data.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  // const userOnline = [
  //   {
  //     id: 1,
  //     name: "Dr.Hendrawan, S.Pd",
  //     email: "hendrawanspd@gmail.com",
  //     caption:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere",
  //   },
  //   {
  //     id: 2,
  //     name: "Dr.Dwiki Yosafat, S.Pd",
  //     email: "hendrawanspd@gmail.com",
  //     caption:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere",
  //   },
  //   {
  //     id: 3,
  //     name: "Dr.Heri Purwanto, S.Pd",
  //     email: "hendrawanspd@gmail.com",
  //     caption:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere",
  //   },
  // ];

  const [feeds, setFeeds] = useState([]);

  const sortByDate = (a, b) => {
    if (a.created_at < b.created_at) {
      return 1;
    }
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 0;
  };

  const goToUserProfile = (id) => {
    history.push({ pathname: `/users/${id}` });
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      const response = await apiFeeds.indexFeed();
      const data = response.data.data;
      setFeeds(data);
      setLoading(false);
      console.log(data);
    };
    const fetchUser = async () => {
      instance
        .get("api/users", {
          headers: {
            Authorization: "Bearer " + token(),
          },
        })
        .then((response) => {
          setOnlineUsers(response.data.data);
          setLoading(false);
        });
    };
    fetchFeeds();
    fetchUser();
  }, [auth]);

  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} className={classes.rootGrid}>
        {/* <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item style={{ border: "1px solid black" }}>
              Recent User
            </Grid>
            <Grid item style={{ border: "1px solid black" }}>
              Post Feed
            </Grid>
            <Grid item style={{ border: "1px solid black" }}>
              Feeds
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12} lg={3} className={classes.gridItem}>
          <Paper className={classes.userPaper}>
            <Box>
              <CardHeader
                style={{ padding: 5 }}
                avatar={
                  auth.avatar ? (
                    <Avatar
                      src={`http://192.168.0.8:8000/assets/images/avatar/${auth.avatar}`}
                      aria-label="recipe"
                      className={classes.avatar}
                    />
                  ) : (
                    <AccountCircle />
                  )
                }
                title={
                  <Typography
                    variant="body1"
                    style={{ fontSize: 20, margin: 0 }}
                  >
                    {auth.name}
                    <br />
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: 12, margin: 0 }}
                    gutterBottom
                  >
                    {auth.email}
                  </Typography>
                }
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5} className={classes.gridItem}>
          <Paper
            style={{ minHeight: 180, overflow: "hidden" }}
            className={classes.userInputFeed}
          >
            <Grid container>
              <Grid item xs={12} style={{ width: "100%" }}>
                <PostFeed setFeeds={setFeeds} />
              </Grid>
            </Grid>
          </Paper>
          {loading ? (
            <FeedSkeleton />
          ) : (
            feeds.sort(sortByDate).map((item) => {
              return (
                <UserFeed
                  key={item.id}
                  id={item.id}
                  name={item.user.name}
                  dateCreated={item.created_at}
                  image={item.image}
                  setFeeds={setFeeds}
                  caption={item.message}
                  comments={item.replies}
                  userID={item.user.id}
                />
              );
            })
          )}
        </Grid>
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.userOnlinePaper}>
            <div>
              <Typography variant="h6" gutterBottom>
                <b>User Online</b>
              </Typography>
              {loading ? (
                <div>
                  <SkeletonUserOnline />
                  <SkeletonUserOnline />
                </div>
              ) : (
                onlineUsers.map((user) => {
                  return (
                    <UserOnline
                      key={user.id}
                      name={user.name}
                      email={user.email}
                      goToUserProfile={() => goToUserProfile(user.id)}
                    />
                  );
                })
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  gridItem: {
    [theme.breakpoints.up("lg")]: {
      margin: 0,
    },
  },
  rootGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  userDetailInputFeed: {
    margin: "15px auto",
    [theme.breakpoints.up("lg")]: {
      display: "none",
      margin: 15,
    },
  },
  userGridInput: {
    width: 560,
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
    },
  },
  userPaper: {
    padding: 10,
    position: "sticky",
    alignSelf: "flex-start",
    top: 80,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      width: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
      display: "none",
    },
  },
  userOnlinePaper: {
    height: "auto",
    position: "sticky",
    alignSelf: "flex-start",
    top: 80,
    padding: 15,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  userInputFeed: {
    minHeight: 260,
    [theme.breakpoints.up("lg")]: {
      minHeight: 100,
    },
    padding: 20,
    marginBottom: 20,
  },
  userFeed: {
    padding: 20,
    marginBottom: 20,
  },
  media: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "none",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default Layout(Home, "Home");
