import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import classes from "./layout.module.css";
import Column from "../../components/column/column";
import Login from "../../components/login/login";
import { getColumns } from "../../selectors";
import PropTypes from "prop-types";

class Layout extends Component {
  state = {
    isLoginShow: false
  };

  onHide = username => {
    this.setState({ username: username, isLoginShow: false }, () =>
      localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  render() {
    const { isLoginShow } = this.state;
    const { columnsList, editColName } = this.props;

    return (
      <>
        <Container className={classes.Layout}>
          <Row className={classes.Header}>
            <Col md={12}>
              <h1 className="text-center">Trello</h1>
            </Col>
          </Row>
          <Row>
            {columnsList.map(column => {
              return (
                <Col xs={6} sm={3} md={3} key={column.id}>
                  <Column
                    colName={column.name}
                    colId={column.id}
                    changeColumnName={value =>
                      editColName({ id: column.id, text: value })
                    }
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
        <Login show={isLoginShow} onHide={this.onHide} />
      </>
    );
  }
}

Layout.propTypes = {
  columnsList: PropTypes.array.isRequired,
  editColName: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    columnsList: getColumns(state)
  };
}

export default connect(mapStateToProps, actions)(Layout);
