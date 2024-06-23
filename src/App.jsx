import ConsultaDRE from './components/ConsultaDRE'
import Dashboard from './components/Dashboard'
import Receita  from './components/Receita'
import Saida from './components/Saida'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
    <div className='bg-gray-900'>
      <Router basename='/final'>
        <Sidebar />
        
        <Switch>
          <Route exact path="/final" component={Dashboard} />
          <Route path="/receita" component={Receita} />
          <Route path="/saida" component={Saida} />
          <Route path="/dre" component={ConsultaDRE} />
        </Switch>
        
      </Router>
    </div>
    </>
  )
}

export default App