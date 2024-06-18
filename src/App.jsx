import Dashboard from './components/Dashboard'
import Receita  from './components/Receita'
import Saida from './components/Saida'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/receita" component={Receita} />
          <Route path="/saida" component={Saida} />
        </Switch>
        
      </Router>
    </>
  )
}

export default App