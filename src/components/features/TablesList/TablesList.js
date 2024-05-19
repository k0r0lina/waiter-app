import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTables, fetchTables } from '../../../redux/tablesRedux';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './TablesList.module.scss';
import clsx from 'clsx';

const TablesList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchTables());
      setLoading(false);
    };

    loadData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1><strong>All tables</strong></h1>
      <Container className="mt-4">
        {tables.map(table => (
          <Row key={table.id} className={clsx(styles.border, "align-items-center mb-4")}>
            <Col>
              <Row>
                <Col column sm={5}>
                  <h2>Table {table.id}</h2>
                </Col>
                <Col column sm={6}>
                  <p className="mb-2"></p>
                  <p><strong>Status: </strong>{table.status}</p>
                </Col>
              </Row>
            </Col>
            <Col className="text-end mb-2">
              <NavLink to={`/table/${table.id}`}>
                <Button variant="primary">Show more</Button>
              </NavLink>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default TablesList;
