import MazeOnePage from './maze-one-page'
import MazeTwoPage from './maze-two-page'
import { Route, Switch } from 'react-router-dom'
import './App.css'

export default function App(props) {

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={MazeOnePage}
      />
      <Route
        path="/cal"
        component={MazeTwoPage}
      />
    </Switch>
  )
}

