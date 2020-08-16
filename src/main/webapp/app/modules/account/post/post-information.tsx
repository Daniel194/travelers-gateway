import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import {connect} from 'react-redux';

import {IRootState} from 'app/shared/reducers';
import {getPostById} from "app/modules/account/post/post.reducer";
import {getUserDetailsByLogin} from "app/modules/account/details/details.reducer";

export interface IPostInformationProps extends StateProps, DispatchProps {
}

export const PostInformationPage = (props: IPostInformationProps) => {
  const {id} = useParams();
  const {post, userDetails} = props;

  useEffect(() => {
    props.getPostById(id);
  }, []);

  useEffect(() => {
    if (post && post.login) {
      props.getUserDetailsByLogin(post.login)
    }
  }, [post]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="10">
          <Row>
            <h2>
              {post.title}
            </h2>
          </Row>
          <Row>
            <img className="cover-image" src={post.coverImageUrl} alt="No image"/>
          </Row>
          <Row>
            <b>Country:</b> {post.country}
          </Row>
          <Row>
            <b>Rating:</b> {post.rating}
          </Row>
          <Row>
            <b>Interval:</b> {post.startDate} - {post.endDate}
          </Row>
          <Row>
            <b>Description:</b> {post.description}
          </Row>
        </Col>
      </Row>
      <hr/>
      <Row className="justify-content-center">
        <Col md="10">
          <Row>
            <h4>
              <img className="profile-image" src={userDetails.imageUrl} alt="No image"/>
              &nbsp;
              {userDetails.firstName + ' ' + userDetails.lastName}
            </h4>
          </Row>
          <Row>
            <b>Place of Birth:</b> {userDetails.placeOfBirth}
          </Row>
          <Row>
            <b>Facebook:</b> {userDetails.socialPlatforms?.facebook}
          </Row>
          <Row>
            <b>Instagram:</b> {userDetails.socialPlatforms?.instagram}
          </Row>
          <Row>
            <b>YouTube:</b> {userDetails.socialPlatforms?.youTube}
          </Row>
          <Row>
            <b>Visited countries:</b>
            {
              Object.entries(userDetails.visitedCountries).map(([key, val]) =>
                <span key={key}>{key}</span>
              )
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = ({authentication, post, details}: IRootState) => ({
  account: authentication.account,
  post: post.post,
  userDetails: details.userDetails
});

const mapDispatchToProps = {getPostById, getUserDetailsByLogin}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostInformationPage);
