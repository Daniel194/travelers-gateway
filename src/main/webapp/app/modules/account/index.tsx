import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
import Password from './password/password';
import Details from './details/details';
import PostCreate from './post/post-create';
import PostDetails from './post/post-details';
import PostSearch from './post/post-search';

const Routes = ({match}) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings}/>
    <ErrorBoundaryRoute path={`${match.url}/password`} component={Password}/>
    <ErrorBoundaryRoute path={`${match.url}/details`} component={Details}/>
    <ErrorBoundaryRoute path={`${match.url}/create-post`} component={PostCreate}/>
    <ErrorBoundaryRoute path={`${match.url}/post/:id`} component={PostDetails}/>
    <ErrorBoundaryRoute path={`${match.url}/search-post`} component={PostSearch}/>
  </div>
);

export default Routes;
