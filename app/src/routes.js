import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './containers/Dashboard'
import TemplatePage from './containers/TemplatePage'
import Admin from './containers/Admin'
import SampleForm from './containers/SampleForm'
import SampleTable from './containers/SampleTable'
import Main from './containers/Main'
import Signup from './containers/Signup'
import Cards from './containers/Cards'
import ScrollToTop from './components/ScrollTop'
import SampleGrid1 from './containers/SampleGrid1'
import SampleGrid2 from './containers/SampleGrid2'
import SampleHooks from './containers/SampleHooks'
import SampleHooks2 from './containers/SampleHooks2'
import SampleApp from './containers/SampleApp'

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/templatepage' component={TemplatePage} />
        <Route exact path='/sampleform' component={SampleForm} />
        <Route exact path='/sampletable' component={SampleTable} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/cards' component={Cards} />
        <Route exact path='/samplegrid1' component={SampleGrid1} />
        <Route exact path='/samplegrid2' component={SampleGrid2} />
        <Route exact path='/samplehooks' component={SampleHooks} />
        <Route exact path='/samplehooks2' component={SampleHooks2} />
        <Route exact path='/sampleapp' component={SampleApp} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
)
