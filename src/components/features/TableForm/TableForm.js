import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTableById, updateTable } from '../../../redux/tablesRedux';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const TableForm = () => {
  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));
  const [status, setStatus] = useState(table?.status || 'Free');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table?.maxPeopleAmount || 0);
  const [bill, setBill] = useState(table?.bill || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!table) {
      navigate('/');
    }
  }, [table, navigate]);

  const handlePeopleAmountChange = (e) => {
    const value = Math.max(0, Math.min(maxPeopleAmount, Number(e.target.value)));
    setPeopleAmount(value);
  };

  const handleMaxPeopleAmountChange = (e) => {
    const value = Math.max(0, Math.min(10, Number(e.target.value)));
    setMaxPeopleAmount(value);
    if (value < peopleAmount) {
      setPeopleAmount(value);
    }
  };

  const handleBillChange = (e) => {
    setBill(Math.max(0, parseFloat(e.target.value) || 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedTable = {
      id,
      status,
      peopleAmount,
      maxPeopleAmount,
      bill,
    };
    dispatch(updateTable(updatedTable));
    fetch(`http://localhost:3131/api/tables/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTable),
    })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating table:', error);
        setError('Error updating table');
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mb-4"><strong>Table {id}</strong></h1>
      {error && <p className="text-danger">{error}</p>}
      <Form.Group controlId="formStatus">
      <Row className="my-3">
        <Form.Label as='legend' column sm={1}>
          <strong>Status:</strong>
        </Form.Label>
        <Col sm={4}>
          <Form.Select value= {status} onChange={ event => setStatus(event.target.value)} aria-label="Default select example">
              <option value="Free">Free</option>
              <option value="Busy">Busy</option>
              <option value="Reserved">Reserved</option>
              <option value="Cleaning">Cleaning</option>
          </Form.Select>
        </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formPeople" className="mt-3">
        <Row className="mb-3 align-items-center">
          <Form.Label column sm={1}>
            <strong>People:</strong>
          </Form.Label>
          <Col sm={2}>
          <div className="d-flex align-items-center">
            <Form.Control
              type="number"
              value={peopleAmount}
              onChange={handlePeopleAmountChange}
              min="0"
              max={maxPeopleAmount}
              className="me-2, ms-2"
              style={{ width: '60px' }}
            />
            <span className="mx-3">/</span>
            <Form.Control
              type="number"
              value={maxPeopleAmount}
              onChange={handleMaxPeopleAmountChange}
              min="0"
              max="10"
              className="ms-1"
              style={{ width: '60px' }}
            />
          </div>
          </Col>
        </Row>
      </Form.Group>
      {status === 'Busy' && (
        <Form.Group controlId="formBill" className="mt-3">
          <Row className='mb-3'>
            <Form.Label column sm={1} htmlFor="bill">
              <strong>Bill:</strong>
            </Form.Label>
            <Col sm={2}>
            <span className="me-1">$</span>
              <Form.Control
                type="number"
                value={bill}
                onChange={handleBillChange}
                min="0"
                className="d-inline-block"
                style={{ width: '60px' }}
              />
            </Col>
          </Row>
        </Form.Group>
      )}
      <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Updating...
          </>
        ) : (
          'Update'
        )}
      </Button>
    </Form>
  );
};

export default TableForm;
