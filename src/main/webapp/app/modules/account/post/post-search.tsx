import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps} from 'react-router-dom';
import {IRootState} from "app/shared/reducers";
import {resetPosts, searchPost} from "app/modules/account/post/post.reducer";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {translate} from 'react-jhipster';

export interface IPostSearchProp extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const PostSearch = (props: IPostSearchProp) => {
  const {posts} = props;
  const [country, setCountry] = useState('');
  const history = useHistory();

  useEffect(() => {
    props.resetPosts();
  }, []);

  const searchCountry = () => {
    props.searchPost("country=" + country)
  }

  const postDetails = (id) => {
    history.push(`/account/post/information/${id}`);
  }

  return (
    <Row>
      <Col md="12">
        <h2>
          Search Posts
        </h2>
        <AvForm>
          <AvField
            className="form-control"
            name="country"
            label={translate('post.form.country')}
            id="country"
            placeholder={translate('post.form.country')}
            value={country}
            onInput={e => setCountry(e.target.value)}
          />
          <Button color="primary" onClick={() => searchCountry()}> Search </Button>
        </AvForm>
        <br/>
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

const mapDispatchToProps = {resetPosts, searchPost}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostSearch);
