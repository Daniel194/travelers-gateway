import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Table} from 'reactstrap';
import {RouteComponentProps} from 'react-router-dom';
import {IRootState} from "app/shared/reducers";
import {getCountryStatistics, getUserStatistics} from "app/modules/administration/statistics/statistics.reducer";

export interface IStatisticsProp extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const Statistics = (props: IStatisticsProp) => {
  const {userStatistics, countryStatistics} = props;

  useEffect(() => {
    props.getUserStatistics();
    props.getCountryStatistics();
  }, []);

  return (
    <Row>
      <Col md="12">
        <h2>
          Statistics - User
        </h2>
      </Col>
      <Table responsive striped>
        <thead>
        <tr>
          <th className="hand">
            Date
          </th>
          <th className="hand">
            Count
          </th>
        </tr>
        </thead>
        <tbody>
        {userStatistics.map((user, i) => (
          <tr key={`user-${i}`}>
            <td>{user.date}</td>
            <td>{user.count}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <hr/>
      <Col md="12">
        <h2>
          Statistics - Country
        </h2>
      </Col>
      <Table responsive striped>
        <thead>
        <tr>
          <th className="hand">
            Country
          </th>
          <th className="hand">
            Count
          </th>
        </tr>
        </thead>
        <tbody>
        {countryStatistics.map((country, i) => (
          <tr key={`user-${i}`}>
            <td>{country.country}</td>
            <td>{country.count}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </Row>
  );
};

const mapStateToProps = ({statistics}: IRootState) => ({
  userStatistics: statistics.userStatistics,
  countryStatistics: statistics.countryStatistics,
});

const mapDispatchToProps = {getUserStatistics, getCountryStatistics}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
