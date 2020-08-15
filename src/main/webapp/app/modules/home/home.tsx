import './home.scss';

import React, {useEffect} from 'react';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps, Redirect} from 'react-router-dom';
import {IRootState} from "app/shared/reducers";
import {getCurrentPosts} from "app/modules/account/post/post.reducer";

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const Home = (props: IHomeProp) => {
  const {account, location, posts} = props;

  const {from} = (location.state as any) || {from: {pathname: '/login', search: location.search}};

  if (!account || !account.login) {
    return <Redirect to={from}/>;
  }

  useEffect(() => {
    props.getCurrentPosts();
  }, []);

  const postDetails = () => {

  }

  return (
    <Row>
      <Col md="9">
        <h2>
          <Translate contentKey="home.title">Welcome to Travelers !</Translate>
        </h2>
        <div>
          {posts.map((post, i) => (
            <Card key={post.id} style={{width: '18rem'}}>
              <Card.Img variant="top" src={post.coverImageUrl}/>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.description}
                </Card.Text>
                <Button variant="primary" onClick={postDetails()}>See details</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded"/>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({post, authentication}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  posts: post.posts
});

const mapDispatchToProps = {getCurrentPosts}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
