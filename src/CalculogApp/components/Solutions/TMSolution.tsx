import ListGroup from 'react-bootstrap/ListGroup';
import { TMAnsprops } from "../../types";

export default function TMSolution(props: TMAnsprops) {
  return (
    <div className="col-12 col-lg-6 p-0 p-sm-2">
      <div className="tm p-4">
        <h3>Answer</h3>
        <ListGroup variant="flush" as="ol" numbered>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">True Value</div>
              {props.trueVal}
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Approximated Value (Rounded)</div>
              {props.approxValueRounded}
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Absolute Error (Rounded)</div>
              {props.absoluteErrorRounded}
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Percentage Relative Error (Rounded)</div>
              {props.percentageRelativeErrorRounded}%
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Approximated Value (Chopped)</div>
              {props.approxValueChopped}
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Absolute Error (Chopped)</div>
              {props.absoluteErrorChopped}
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Percentage Relative Error (Chopped)</div>
              {props.percentageRelativeErrorChopped}%
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  )
}