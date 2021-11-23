import React, { useEffect } from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Router } from 'react-router'
import * as Routes from './helpers/routes'
import LogIn from './pages/Auth/LogIn'
import BooksPage from './pages/Home/Books'
import UsersPage from './pages/Home/Users'
import SignUp from './pages/Auth/SignUp'
import history from './helpers/history'
import Header from './components/Header'

export default function App() {
  const token = localStorage.getItem('token')

  useEffect(() => {
    console.log(history.location.pathname)
    if (token && (history.location.pathname === Routes.SIGNUP || history.location.pathname === Routes.LOGIN)) {
      history.push(Routes.HOME)
      return
    } else if (!!token && history.location.pathname !== Routes.SIGNUP && history.location.pathname !== Routes.LOGIN) {
      history.push(Routes.LOGIN)
      return
    }
  }, [token])
  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route path={Routes.HOME}>
            <BooksPage />
          </Route>
          <Route path={Routes.USERS}>
            <UsersPage />
          </Route>
          <Route path={Routes.LOGIN}>
            <LogIn />
          </Route>
          <Route path={Routes.SIGNUP}>
            <SignUp />
          </Route>
          <Route component={EmptyPage} />
        </Switch>
      </div>
    </Router>
  );
}
const EmptyPage = () => {
  return (
    <>
      <h1>Something went wrong</h1>
    </>
  )
}