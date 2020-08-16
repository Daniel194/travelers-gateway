import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {translate} from 'react-jhipster';
import {AvForm, AvField} from 'availity-reactstrap-validation';

import {IRootState} from 'app/shared/reducers';
import {getPostById, updatePost, deletePost} from "app/modules/account/post/post.reducer";

export interface IPostDetailsProps extends StateProps, DispatchProps {
}

export const PostDetailsPage = (props: IPostDetailsProps) => {
  const {id} = useParams();
  const {post} = props;
  const history = useHistory();

  useEffect(() => {
    props.getPostById(id)
  }, []);

  const handleValidSubmit = (event, values) => {
    values.login = props.account.login;
    values.id = id;

    props.updatePost(values);
    event.persist();
  }

  const handleDelete = () => {
    props.deletePost(id);
    history.push("");
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2>
            Create new post
          </h2>
          <AvForm onValidSubmit={handleValidSubmit}>
            <AvField
              className="form-control"
              name="country"
              label={translate('post.form.country')}
              id="country"
              placeholder={translate('post.form.country')}
              value={post.country}
            />
            <AvField
              className="form-control"
              name="coverImageUrl"
              label={translate('post.form.coverImageUrl')}
              id="coverImageUrl"
              placeholder={translate('post.form.coverImageUrl')}
              value={post.coverImageUrl}
            />
            <AvField
              className="form-control"
              name="title"
              label={translate('post.form.title')}
              id="title"
              placeholder={translate('post.form.title')}
              value={post.title}
            />
            <AvField
              className="form-control"
              name="description"
              label={translate('post.form.description')}
              id="facebook"
              placeholder={translate('post.form.description')}
              value={post.description}
            />
            <AvField
              className="form-control"
              name="endDate"
              label={translate('post.form.endDate')}
              id="endDate"
              placeholder={translate('post.form.endDate')}
              value={post.endDate}
            />
            <AvField
              className="form-control"
              name="startDate"
              label={translate('post.form.startDate')}
              id="startDate"
              placeholder={translate('post.form.startDate')}
              value={post.startDate}
            />
            <AvField
              className="form-control"
              name="rating"
              label={translate('post.form.rating')}
              id="rating"
              placeholder={translate('post.form.rating')}
              value={post.rating}
            />
            <Button color="primary" type="submit"> Update </Button>
            &nbsp;
            <Button color="danger" onClick={() => handleDelete()}> Delete </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = ({authentication, post}: IRootState) => ({
  account: authentication.account,
  post: post.post
});

const mapDispatchToProps = {getPostById, updatePost, deletePost}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsPage);
