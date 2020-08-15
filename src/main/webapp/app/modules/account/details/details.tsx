import React, {useEffect} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {Translate, translate} from 'react-jhipster';
import {AvForm, AvField} from 'availity-reactstrap-validation';

import {IRootState} from 'app/shared/reducers';
import {getUserDetails, saveUserDetails} from "app/modules/account/details/details.reducer";

export interface IUserDetailsProps extends StateProps, DispatchProps {
}

export const UserDetailsPage = (props: IUserDetailsProps) => {
  const {userDetails} = props;

  useEffect(() => {
    props.getUserDetails();
  }, []);

  const handleValidSubmit = (event, values) => {
    values.socialPlatforms = {};
    values.socialPlatforms.facebook = values.facebook;
    values.socialPlatforms.instagram = values.instagram;
    values.socialPlatforms.youTube = values.youTube;

    props.saveUserDetails(values);
    event.persist();
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2>
            <Translate contentKey="details.title" interpolate={{username: props.account.login}}>
              User details for {props.account.login}
            </Translate>
          </h2>
          <AvForm onValidSubmit={handleValidSubmit}>
            <AvField
              className="form-control"
              name="description"
              label={translate('details.form.description')}
              id="description"
              placeholder={translate('details.form.description')}
              value={userDetails.description}
            />
            <AvField
              className="form-control"
              name="dateOfBirth"
              label={translate('details.form.dateOfBirth')}
              id="dateOfBirth"
              placeholder={translate('details.form.dateOfBirth')}
              value={userDetails.dateOfBirth}
            />
            <AvField
              className="form-control"
              name="placeOfBirth"
              label={translate('details.form.placeOfBirth')}
              id="placeOfBirth"
              placeholder={translate('details.form.placeOfBirth')}
              value={userDetails.placeOfBirth}
            />
            <AvField
              className="form-control"
              name="facebook"
              label={translate('details.form.facebook')}
              id="facebook"
              placeholder={translate('details.form.facebook')}
              value={userDetails.socialPlatforms?.facebook}
            />
            <AvField
              className="form-control"
              name="instagram"
              label={translate('details.form.instagram')}
              id="instagram"
              placeholder={translate('details.form.instagram')}
              value={userDetails.socialPlatforms?.instagram}
            />
            <AvField
              className="form-control"
              name="youTube"
              label={translate('details.form.youTube')}
              id="youTube"
              placeholder={translate('details.form.youTube')}
              value={userDetails.socialPlatforms?.youTube}
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
  account: authentication.account,
  userDetails: details.userDetails
});

const mapDispatchToProps = {getUserDetails, saveUserDetails}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
