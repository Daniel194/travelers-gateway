import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from './user-management';
import Logs from './logs/logs';
import Health from './health/health';
import Metrics from './metrics/metrics';
import Configuration from './configuration/configuration';
import Audits from './audits/audits';
import Docs from './docs/docs';
import Gateway from './gateway/gateway';
import Tracker from './tracker/tracker';
import Statistics from './statistics/statistics';

const Routes = ({match}) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement}/>
    <ErrorBoundaryRoute exact path={`${match.url}/tracker`} component={Tracker}/>
    <ErrorBoundaryRoute exact path={`${match.url}/health`} component={Health}/>
    <ErrorBoundaryRoute exact path={`${match.url}/gateway`} component={Gateway}/>
    <ErrorBoundaryRoute exact path={`${match.url}/metrics`} component={Metrics}/>
    <ErrorBoundaryRoute exact path={`${match.url}/docs`} component={Docs}/>
    <ErrorBoundaryRoute exact path={`${match.url}/configuration`} component={Configuration}/>
    <ErrorBoundaryRoute exact path={`${match.url}/audits`} component={Audits}/>
    <ErrorBoundaryRoute exact path={`${match.url}/logs`} component={Logs}/>
    <ErrorBoundaryRoute exact path={`${match.url}/statistics`} component={Statistics}/>
  </div>
);

export default Routes;
