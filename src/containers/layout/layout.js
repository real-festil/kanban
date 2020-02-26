import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { editColName } from "../../actions";
import classes from "./layout.module.css";
import Column from "../../components/column/column";
import Login from "../../components/login/login";
import { getColumns } from "../../selectors";

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
    const { columnsList, dispatch } = this.props;

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
              const { comments, username } = this.state;

              return (
                <Col xs={6} sm={3} md={3} key={column.id}>
                  <Column
                    colName={column.name}
                    colId={column.id}
                    changeColumnName={value => {
                      dispatch(editColName({ id: column.id, text: value }));
                    }}
                    comments={comments}
                    username={username}
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

function mapStateToProps(state) {
  return {
    columnsList: getColumns(state)
  };
}

export default connect(mapStateToProps)(Layout);
