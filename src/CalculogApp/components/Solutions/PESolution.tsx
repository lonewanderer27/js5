import ListGroup from 'react-bootstrap/ListGroup';
import { PEAnsprops } from "../../types";

export default function PESolution(props: PEAnsprops) {
  return (
    <div className="col-12 col-lg-6 p-0 p-sm-2">
      <div className="pe p-4">
        <h3>Answer</h3>
        <p>Here is the absolute and percentage relative error of the given true value and approximate value.</p>
        <ListGroup variant="flush" as="ol" numbered>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Absolute Error</div>
              {props.absoluteError}
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Approximated Value</div>
              {props.approxValue}
            </div>
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Percentage Relative Error</div>
              {props.percentageRelativeError}%
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  )
}