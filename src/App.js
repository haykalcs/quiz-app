import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
// import LoadingProgress from "./components/lazyLoad/LoadingProgress";
import PrivateRoutes from "./routes/PrivateRoutes";
import LandingPage from "./pages/general/guest/LandingPage";
import CircularLoading from "./components/lazyLoad/CircularLoading";
import QuizDev from "./pages/quiz/multipeChoices/quizDev";
import QuizDetailPage from "./pages/quiz/multipeChoices/QuizDetailPage";
import EssayPage from "./pages/quiz/uploadFiles/EssayPage";
// import My404Component from "./pages/general/guest/My404Component";

const ResultsPage = lazy(() =>
  import("./pages/quiz/multipeChoices/ResultsPage")
);
const HomePage = lazy(() => import("./pages/general/authenticated/HomePage"));
const PurposePage = lazy(() =>
  import("./pages/general/authenticated/PurposePage")
);
const ProfilePage = lazy(() =>
  import("./pages/general/authenticated/ProfilePage")
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route exact={true} path="/login" component={Login} />
        <Suspense fallback={<CircularLoading />}>
          <PrivateRoutes exact={true} path="/home" component={HomePage} />
          <PrivateRoutes exact={true} path="/profile" component={ProfilePage} />
          <PrivateRoutes exact={true} path="/tujuan" component={PurposePage} />
          <PrivateRoutes exact={true} path="/quiz" component={QuizDev} />
          <PrivateRoutes
            exact={true}
            path="/quiz/start/:slug"
            component={QuizDetailPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/result"
            component={ResultsPage}
          />
          <PrivateRoutes exact={true} path="/essay" component={EssayPage} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
