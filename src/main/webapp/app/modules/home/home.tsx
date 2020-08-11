import './home.scss';

import React from 'react';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Row, Col, Alert} from 'reactstrap';
import {RouteComponentProps, Redirect} from 'react-router-dom';

export interface IHomeProp extends StateProps, RouteComponentProps<{}> {
}

export const Home = (props: IHomeProp) => {
  const {account, location} = props;

  const {from} = (location.state as any) || {from: {pathname: '/login', search: location.search}};

  if (!account || !account.login) {
    return <Redirect to={from}/>;
  }

  return (
    <Row>
      <Col md="9">
        <h2>
          <Translate contentKey="home.title">Welcome to Travelers !</Translate>
        </h2>
        <div>
          <Alert color="success">
            <Translate contentKey="home.logged.message" interpolate={{username: account.login}}>
              You are logged in as user {account.login}.
            </Translate>
          </Alert>
        </div>
      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded"/>
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
