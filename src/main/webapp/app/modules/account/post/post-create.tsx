import React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {Translate, translate} from 'react-jhipster';
import {AvForm, AvField} from 'availity-reactstrap-validation';

import {IRootState} from 'app/shared/reducers';
import {savePost} from "app/modules/account/post/post.reducer";

export interface IPostCreateProps extends StateProps, DispatchProps {
}

export const PostCreatePage = (props: IPostCreateProps) => {

  const handleValidSubmit = (event, values) => {
    values.login = props.account.login;

    props.savePost(values);
    event.persist();
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
            />
            <AvField
              className="form-control"
              name="coverImageUrl"
              label={translate('post.form.coverImageUrl')}
              id="coverImageUrl"
              placeholder={translate('post.form.coverImageUrl')}
            />
            <AvField
              className="form-control"
              name="title"
              label={translate('post.form.title')}
              id="title"
              placeholder={translate('post.form.title')}
            />
            <AvField
              className="form-control"
              name="description"
              label={translate('post.form.description')}
              id="facebook"
              placeholder={translate('post.form.description')}
            />
            <AvField
              className="form-control"
              name="endDate"
              label={translate('post.form.endDate')}
              id="endDate"
              placeholder={translate('post.form.endDate')}
            />
            <AvField
              className="form-control"
              name="startDate"
              label={translate('post.form.startDate')}
              id="startDate"
              placeholder={translate('post.form.startDate')}
            />
            <AvField
              className="form-control"
              name="rating"
              label={translate('post.form.rating')}
              id="rating"
              placeholder={translate('post.form.rating')}
            />
            <Button color="primary" type="submit">
              <Translate contentKey="details.form.button">Save</Translate>
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = ({authentication, details}: IRootState) => ({
  account: authentication.account
});

const mapDispatchToProps = {savePost}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostCreatePage);
