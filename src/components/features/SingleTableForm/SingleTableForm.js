import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTableById } from '../../../redux/tablesRedux';
import { Row, Col } from 'react-bootstrap';
import { editTableRequest } from '../../../redux/tablesRedux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const SingleTableForm = () => {
    
  const {id} = useParams();
  const singleTable = useSelector(state => getTableById(state, id));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(singleTable.status);
  const [maxPeopleAmount, setMaxPeopleAmount]= useState(singleTable.maxPeopleAmount);
  const [peopleAmount, setPeopleAmount]= useState(singleTable.peopleAmount);
  const [bill, setBill]= useState(singleTable.bill);
  
  const validationAndParseData = (value) => {
      const parseValue = parseInt(value, 10)
      return isNaN(parseValue) || parseValue <0 ? 0 : parseValue;
  };

  const handleEditTable= (event) =>{
      event.preventDefault();
      const parsedPeopleAmount = validationAndParseData(peopleAmount);
      const parsedMaxPeopleAmount = validationAndParseData(maxPeopleAmount);
      const parsedBill = validationAndParseData(bill);

      const updatedBill = status !== "Busy" ? 0 : parsedBill;
      const updatedPeopleAmount = status === "Free" || status === "Cleaning" ? 0 : parsedPeopleAmount;
      const updatedMaxPeopleAmount = status === "Free" || status === "Cleaning" ? 0 : parsedMaxPeopleAmount;
      
      const thisTable = {
          id: parseInt(id),
          status: status,
          peopleAmount: updatedPeopleAmount,
          maxPeopleAmount: updatedMaxPeopleAmount,
          bill: updatedBill,
      };
  
      dispatch(editTableRequest(thisTable, navigate('/')));
  };

  useEffect(() => {
      if (!singleTable){
          navigate('/');
          return null;
      }
  },[singleTable,navigate]);

  useEffect(() => { 
      const peopleAmountValue = parseInt(peopleAmount);
      const maxPeopleAmountValue = parseInt(maxPeopleAmount);
  
      if (peopleAmountValue > maxPeopleAmountValue){
          setPeopleAmount(maxPeopleAmountValue)
      };
  
      if (peopleAmountValue < 0 || isNaN(peopleAmountValue)) {
          setPeopleAmount(0);
      }
  
      if (maxPeopleAmountValue < 0 || isNaN(maxPeopleAmountValue)){
          setMaxPeopleAmount(0);
      }
  }, [peopleAmount, maxPeopleAmount]);

  if (!singleTable) {
      return <div>Loading...</div>; 
  }
  
  return(
      <div>
          <h1 className="mb-3">Table {id}</h1>
          <Form>
              <Form.Group>
                  <Row className="mb-3">
                      <Form.Label as='legend' column sm={1}>
                          <strong>Status: </strong>
                      </Form.Label>
                      <Col sm={3}>
                          <Form.Select value= {status} onChange={ event => setStatus(event.target.value)} aria-label="Default select example">
                              <option value="Free">Free</option>
                              <option value="Busy">Busy</option>
                              <option value="Reserved">Reserved</option>
                              <option value="Cleaning">Cleaning</option>
                          </Form.Select>
                      </Col>
                  </Row>
              </Form.Group>
              <Form.Group>
                  <Row className="mb-3 align-items-center">
                      <Form.Label column sm={1}>
                          <strong>People: </strong>
                      </Form.Label>
                      <Col sm={2}>
                          <div className="d-flex align-items-center">
                              <Form.Control type='number' min='0' max={maxPeopleAmount} value={peopleAmount} placeholder='Table peopleAmount...' onChange={event => setPeopleAmount(event.target.value)} />
                              <span className="mx-2">/</span>
                              <Form.Control type='number' max="10" value={maxPeopleAmount} placeholder='Table maxPeopleAmount...' onChange={event => setMaxPeopleAmount(event.target.value)} />
                          </div>
                      </Col>
                  </Row>
              </Form.Group>
              {status === "Busy" && (
              <Form.Group>
                  <Row className='mb-3'>
                      <Form.Label column sm={1} htmlFor="bill">
                          <strong>Bill:</strong> 
                      </Form.Label>
                      <Col sm={1}>
                          <Form.Control id="bill" type='number' value={bill} placeholder="Table bill" onChange={event => setBill(event.target.value)} />
                      </Col>
                  </Row>
              </Form.Group>
              )}
              <Form.Group>
                  <Row className='mb-2'>
                      <Col>
                          <Button type='submit' variant='primary' onClick={event => handleEditTable(event)}>Update</Button>
                      </Col>
                  </Row>
              </Form.Group>
          </Form>
      </div>
  );
};

export default SingleTableForm;
