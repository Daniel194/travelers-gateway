import './home.scss';

import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
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

  const history = useHistory();

  const postDetails = (id) => {
    history.push(`/account/post/${id}`);
  }

  return (
    <Row>
      <Col md="12">
        <h2>
          <Translate contentKey="home.title">Welcome to Travelers !</Translate>
        </h2>
      </Col>
      {posts.map((post, i) => (
        <Col md="3" key={post.id}>
          <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={post.coverImageUrl}/>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.description}
              </Card.Text>
              <Button variant="primary" onClick={() => postDetails(post.id)}>See details</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
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
