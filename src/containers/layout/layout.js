import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { editColName } from "../../reducers/columnsList";
import { login } from "../../reducers/login";
import classes from "./layout.module.css";
import Column from "../../components/column/column";
import Login from "../../components/login/login";
import { getLogin } from "../../selectors/login";
import { getColumns } from "../../selectors/columns";
import PropTypes from "prop-types";

function Layout(props) {
  const { dispatch } = props;

  const columnsList = useSelector(getColumns);
  const username = useSelector(getLogin);

  const [isShowLogin, setIsShowLogin] = useState(!Boolean(username));

  const onHide = username => {
    dispatch(login({ text: username }));
    setIsShowLogin(false);
  };

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
                    dispatch(editColName({ id: column.id, text: value }))
                  }
                />
              </Col>
            );
          })}
        </Row>
      </Container>
      <Login show={isShowLogin} onHide={onHide} />
    </>
  );
}

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(Layout);
