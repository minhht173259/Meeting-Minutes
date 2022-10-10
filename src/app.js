import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Browse, Signin, Signup } from './page';
import { ProtectedRoute, IsUserRedirect } from './helpers/routers';
import * as ROUTES from './constants/routes';
import { useAuthListener } from './hooks';
import ComponentCustom from './page/component-custom';

export default function App() {
  const { user } = useAuthListener();

  return (
    <Router>
      <Switch>
        <Route exact path="/custom">
          <ComponentCustom />
        </Route>
        <ProtectedRoute user={user} exact path={ROUTES.HOME}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute user={user} exact path={ROUTES.BROWSE}>
          <Browse />
        </ProtectedRoute>
        <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} exact path={ROUTES.SIGN_UP}>
          <Signup />
        </IsUserRedirect>
        <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} exact path={ROUTES.SIGN_IN}>
          <Signin />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}
