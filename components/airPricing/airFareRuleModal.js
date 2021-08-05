import React,{useState, useEffect} from 'react'
import { Modal } from 'react-bootstrap';
import FareRuleCard from './fareRuleCard';


const AirFareRuleModal = (params) =>{
    //const [show, setShow] = useState(false);

    return (
      <>
        {/*<Button variant="primary" onClick={() => setShow(true)}>
          Custom Width Modal
        </Button>*/}
  
        <Modal
          show={params.show}
          onHide={() => params.setShow()}
          dialogClassName="price-rule-model"
          aria-labelledby="fare-rule"
        >
          <Modal.Header closeButton>
            <Modal.Title id="far-rule-title">
              Fare Rules
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FareRuleCard changePenalty={params.changePenalty} cancelPenalty={params.cancelPenalty} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default AirFareRuleModal;