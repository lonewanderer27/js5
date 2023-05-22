import Button from "./Button";
import { GlobalState } from "../PolarisApp";
import { pages } from "../enums";
import { useContext } from "react";

function SideBar() {
  const { page, setPage } = useContext(GlobalState);

  return (
    <div className="sb">
      <div className="sb-inner">
        <div className="sb-i-up">
          <Button variant="secondary" size="sm">
            <i className="bi bi-calculator me-2"></i>Calculator
          </Button>

          <div className="d-flex justify-content-between my-3">
            <h1 className="sb-i-up-title">Polaris</h1>
            <Button variant="secondary" size="sm">
              <i className="bi bi-moon-fill" />
            </Button>
          </div>

          <p className="sb-i-up-desc">
            Polaris is a calculator that will determine the crypto exchange over
            time.
          </p>
        </div>

        <div className="sb-i-middle">
          <div className="d-grid w-100">
            <Button
              variant={page === pages.LAGRANGE ? "primary" : "secondary"}
              onClick={() => setPage(pages.LAGRANGE)}
              className="mb-2"
            >
              Lagrange
            </Button>
            {/* <Button
              variant={page === pages.NEWTON ? "primary" : "secondary"}
              onClick={() => setPage(pages.NEWTON)}
            >
              Newton
            </Button> */}
            <Button variant="disabled">Newton</Button>
          </div>
        </div>
        <div className="sb-i-down">
          <div className="d-grid w-100">
            <Button
              variant={page === pages.ABOUT_US ? "primary" : "secondary"}
              onClick={() => setPage(pages.ABOUT_US)}
            >
              About Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
