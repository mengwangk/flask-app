import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Template from './components/Template'
import Admin from './components/Admin'
import SampleForm from './components/SampleForm'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/admin' component={ Admin } />
          <Route exact path='/template' component={ Template } />
          <Route exact path='/sampleform' component={ SampleForm } />
          <Route exact path='/dashboard' component={ Dashboard } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )