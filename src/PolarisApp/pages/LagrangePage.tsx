import "katex/dist/katex.min.css";

import * as Form from "@radix-ui/react-form";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Switch from "@radix-ui/react-switch";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import {
  PMlabels,
  PMlineChartTitle,
  PMs_html,
  PMs_string,
  PMs_tex,
  PMwholeFormula,
  PMxVars,
  PMyVars,
} from "../constants";
import React, { useContext, useState } from "react";
import { lagrangeVerifyReasons, lagrangeVerifyReturns } from "../interfaces";
import solve, { useXes } from "../calculators/lagrange";

import Button from "../components/Button";
import { GlobalState } from "../PolarisApp";
import { Line } from "react-chartjs-2";
import TeX from "@matejmazur/react-katex";
import { modes } from "../enums";
import { verify } from "../verifiers/lagrange";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LagrangePage() {
  const {
    xVars,
    setXVars,
    yVars,
    setYVars,
    n,
    setN,
    setPVars,
    pVars,
    setP,
    p,
    mode,
    setMode,
    lagrangeSolveReturns,
    setLagrangeSolveReturns,
  } = useContext(GlobalState);

  console.log("lagrangeSolveReturns");
  console.table(lagrangeSolveReturns);

  const [showP, setShowP] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorReasons, setErrorReasons] = useState<lagrangeVerifyReasons>({
    n: [],
    x: [],
    y: [],
    p: [],
    pVars: [],
  });

  const toggleShowP = () => {
    // setShowError(false);

    // const lagrangeVerifyReturns: lagrangeVerifyReturns = verify(
    //   n,
    //   xVars,
    //   yVars,
    //   pVars
    // );
    // if (lagrangeVerifyReturns.success === false) {
    //   setErrorReasons(lagrangeVerifyReturns.reasons);
    //   setShowError(true);
    // } else {
    //   setLagrangeSolveReturns(() => solve(n, xVars, yVars, pVars));
    //   setShowP((prev) => !prev);
    // }
    // if (mode === modes.PREDEFINED) {
    //   let pxAnswers = useXes(PMs_string, pVars);
    //   setLagrangeSolveReturns({
    //     wholeFormula: PMwholeFormula,
    //     s_string: PMs_string,
    //     s_tex: PMs_tex,
    //     s_html: PMs_html,
    //     pxAnswers: pxAnswers,
    //   });
    // } else {
    //   setLagrangeSolveReturns(solve(n, xVars, yVars, pVars));
    // }
    setLagrangeSolveReturns(solve(n, xVars, yVars, pVars));
    setShowP((prev) => !prev);
  };

  const addP = () => {
    setP((prev) => prev + 1);
    setPVars((prev) => [...prev, "0"]);
  };

  const minusP = () => {
    setP((prev) => prev - 1);
    setPVars((prev) => prev.slice(0, prev.length - 1));
  };

  const handlePnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newN = Number.parseInt(e.target.value);
    setPVars((prev) => {
      let newVal = prev;
      if (newN > p) {
        newVal = [...prev, "0"];
      } else {
        newVal = prev.slice(0, newN);
      }

      console.log("pVars:");
      console.table(newVal);
      return newVal;
    });
    setP(newN);
  };

  const handlePVarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const varType = e.target.name.split("-")[0];
    const index = Number.parseInt(e.target.name.split("-")[1]);

    console.log("varType: " + varType);
    console.log("index: " + index);
    console.log("value: " + e.target.value);

    setPVars((prev) => {
      let newVal = [...prev];
      newVal[index] = e.target.value;
      return newVal;
    });
  };

  const handleVarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const varType = e.target.name.split("-")[0];
    const index = Number.parseInt(e.target.name.split("-")[1]);

    console.log("varType: " + varType);
    console.log("index: " + index);
    console.log("value: " + e.target.value);

    switch (varType) {
      case "x":
        setXVars((prev) => {
          let newVal = [...prev];
          newVal[index] = e.target.value;
          return newVal;
        });
        break;
      case "y":
        setYVars((prev) => {
          let newVal = [...prev];
          newVal[index] = e.target.value;
          return newVal;
        });
        break;
    }
  };

  const addN = () => {
    setN((prev) => prev + 1);
    modifyXVars(n + 1);
    modifyYVars(n + 1);
  };

  const minusN = () => {
    setN((prev) => prev - 1);
    modifyXVars(n - 1);
    modifyYVars(n - 1);
  };

  const modifyXVars = (newN: number) => {
    setXVars((prev) => {
      let newVal = prev;
      if (newN > n) {
        newVal = [...prev, ...Array(newN - n).fill("0")];
      } else {
        newVal = prev.slice(0, newN);
      }

      console.log("xVars:");
      console.table(newVal);
      return newVal;
    });
  };

  const modifyYVars = (newN: number) => {
    setYVars((prev) => {
      let newVal = prev;
      if (newN > n) {
        newVal = [...prev, ...Array(newN - n).fill("0")];
      } else {
        newVal = prev.slice(0, newN);
      }

      console.log("yVars:");
      console.table(newVal);
      return newVal;
    });
  };

  const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newN = Number.parseInt(e.target.value);
    modifyXVars(newN);
    modifyYVars(newN);
    setN(newN);
  };

  const handleModeChange = () => {
    setMode((prev) => {
      if (prev === modes.PREDEFINED) {
        // setXVars(() => ["0", "0"]);
        // setYVars(() => ["0", "0"]);
        // setN(2);
        // setP(1);
        // setPVars(["0"]);
        return modes.USER_DEFINED;
      }
      setXVars(() => PMxVars);
      setYVars(() => PMyVars);
      setN(10);
      setP(1);
      setPVars(["2"]);
      return modes.PREDEFINED;
    });
  };

  return (
    <div className="sb">
      <div className="sb-inner">
        <div className="sb-i-main h-100">
          <div className="grid grid-cols-2">
            <h1 className="sb-i-up-title">Lagrange Method</h1>
            <div
              className="flex items-center justify-end"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label
                className="text-white text-[15px] leading-none pr-[15px]"
                htmlFor="airplane-mode"
              >
                {mode === modes.PREDEFINED
                  ? "Predefined Mode"
                  : "User Defined Mode"}
              </label>
              <Switch.Root
                className="w-[42px] h-[25px] bg-[#232325] rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-gray outline-none cursor-default"
                id="airplane-mode"
                disabled={showP}
                onCheckedChange={() => handleModeChange()}
                checked={mode === modes.USER_DEFINED ? true : false}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>
          </div>
          <ScrollArea.Root className="max-w-[100%] h-[85%] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 mt-8">
            <ScrollArea.Viewport className="w-full h-full rounded">
              <div className="grid grid-cols-3">
                <Form.Root
                  className="w-[260px]"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Form.Field className="grid mb-[10px]" name="n">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        n
                      </Form.Label>
                    </div>
                    <div className="grid grid-cols-3">
                      <Form.Control asChild>
                        <input
                          className="box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-slateA"
                          type="number"
                          onChange={handleNChange}
                          value={n}
                          min={2}
                          disabled={showP || mode === modes.PREDEFINED}
                          title={
                            showP
                              ? "Click the Change Values button enable this button"
                              : "Click to add coordinate"
                          }
                          required
                        />
                      </Form.Control>
                      <Button
                        variant={
                          showP || mode === modes.PREDEFINED
                            ? "disabled"
                            : "secondary"
                        }
                        onClick={
                          showP || mode === modes.PREDEFINED
                            ? undefined
                            : () => addN()
                        }
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Change Values button enable this button"
                            : "Click to add coordinate"
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant={
                          showP || mode === modes.PREDEFINED || n <= 2
                            ? "disabled"
                            : "secondary"
                        }
                        onClick={
                          showP || mode === modes.PREDEFINED || n <= 2
                            ? undefined
                            : () => minusN()
                        }
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Change Values button enable this button"
                            : "Click to add coordinate"
                        }
                      >
                        -
                      </Button>
                    </div>
                  </Form.Field>

                  <Form.Field className="grid mb-[10px]" name="coordinates">
                    <div className="grid grid-cols-2">
                      <div>
                        <span className="w-full flex justify-center mb-1">
                          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                            x-axis
                          </Form.Label>
                        </span>
                        {xVars.map((i, index) => {
                          return (
                            <Form.Control asChild>
                              <input
                                className="leading-[35px] box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 mr-1 mb-1"
                                type="number"
                                value={i}
                                name={`x-${index}`}
                                onChange={handleVarChange}
                                disabled={showP || mode === modes.PREDEFINED}
                                title={
                                  showP
                                    ? "Click the Change Values button modify this value"
                                    : ""
                                }
                                required
                              />
                            </Form.Control>
                          );
                        })}
                      </div>

                      <div>
                        <span className="w-full flex justify-center mb-1">
                          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                            y-axis
                          </Form.Label>
                        </span>
                        {yVars.map((i, index) => (
                          <Form.Control asChild>
                            <input
                              className="leading-[35px] box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 ml-1 mb-1"
                              type="number"
                              min={1}
                              value={i}
                              name={`y-${index}`}
                              onChange={handleVarChange}
                              disabled={showP || mode === modes.PREDEFINED}
                              title={
                                showP
                                  ? "Click the Change Values button modify this value"
                                  : ""
                              }
                              required
                            />
                          </Form.Control>
                        ))}
                      </div>
                    </div>
                  </Form.Field>
                </Form.Root>

                <Form.Root
                  className="w-[260px]"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Form.Field className="grid mb-[10px]" name="P(x)">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        Amount of P(x) variables
                      </Form.Label>
                    </div>
                    <div className="grid grid-cols-3">
                      <Form.Control asChild>
                        <input
                          className="box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-slateA"
                          type="number"
                          onChange={handlePnChange}
                          value={p}
                          min={1}
                          title={
                            showP
                              ? "Click the Change Values button modify this value"
                              : ""
                          }
                          required
                        />
                      </Form.Control>
                      <Button
                        disabled={showP}
                        variant={showP ? "disabled" : "secondary"}
                        onClick={showP ? undefined : () => addP()}
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Change Values button enable this button"
                            : "Click to add P(x) variable"
                        }
                      >
                        +
                      </Button>
                      <Button
                        disabled={showP || p == 1}
                        variant={showP || p == 1 ? "disabled" : "secondary"}
                        onClick={showP || p == 1 ? undefined : () => minusP()}
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Change Values button enable this button"
                            : "Click to add P(x) variable"
                        }
                      >
                        -
                      </Button>
                    </div>
                  </Form.Field>

                  <Form.Field className="grid mb-[10px]" name="P(x) variables">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        P(x) variables
                      </Form.Label>
                    </div>
                    {pVars.map((i, index) => {
                      return (
                        <Form.Control asChild>
                          <input
                            className="leading-[35px] box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 mb-1"
                            type="number"
                            value={i}
                            name={`p-${index}`}
                            onChange={handlePVarChange}
                            disabled={showP}
                            title={
                              showP
                                ? "Click the Change Values button modify this value"
                                : ""
                            }
                            required
                          />
                        </Form.Control>
                      );
                    })}
                  </Form.Field>
                  <Button
                    className="mt-3"
                    variant={showP ? "secondary" : "primary"}
                    size="sm"
                    onClick={toggleShowP}
                  >
                    {showP ? "Change values" : "Solve"}
                  </Button>
                </Form.Root>

                {showP && (
                  <div>
                    <p className="text-[15px] font-medium leading-[35px] sb-i-up-desc underline">
                      P(x) results
                    </p>
                    <div>
                      {lagrangeSolveReturns!.pxAnswers.map((PxAns) => {
                        return (
                          <div>
                            <p>
                              {Object.keys(PxAns).toString()} ={" "}
                              {Object.values(PxAns).toString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* the answers only show if there's no error */}
              {showP && (
                <div className="my-3">
                  <p className="sb-i-up-desc">
                    {n <= 7 && (
                      <>
                        <span className="text-[15px] font-medium leading-[35px] underline">
                          Polynomial / Expression
                        </span>{" "}
                        <span>(scroll to see the whole part)</span>
                      </>
                    )}
                    {n > 7 && (
                      <>
                        <span className="text-[15px] font-medium leading-[35px] underline">
                          Lagrange Formula
                          <br />
                          (Simplified polynomial not shown due to technical
                          limitation)
                        </span>
                      </>
                    )}
                  </p>
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: lagrangeSolveReturns!.s_html,
                    }}
                  ></p> */}
                  <TeX math={lagrangeSolveReturns!.s_tex}></TeX>
                </div>
              )}
              {showP && (
                <>
                  <p className="sb-i-up-desc mt-5">
                    <span className="text-[15px] font-medium leading-[35px] underline">
                      Line Graph
                    </span>{" "}
                    (scroll to see the whole part)
                  </p>
                  <ScrollArea.Root className="max-w-[100%] h-[500px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 mt-8">
                    <ScrollArea.Viewport className="w-full h-full rounded">
                      <Line
                        width={700}
                        height={500}
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: "top" as const,
                            },
                            title: {
                              display: true,
                              text:
                                mode === modes.PREDEFINED
                                  ? PMlineChartTitle
                                  : "Line Chart",
                            },
                          },
                        }}
                        data={{
                          labels: mode === modes.PREDEFINED ? PMlabels : xVars,
                          datasets: [
                            {
                              label: "y",
                              data: yVars,
                              borderColor: "green",
                            },
                          ],
                        }}
                      />
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                      className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                      orientation="vertical"
                    >
                      <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
                  {mode === modes.PREDEFINED && (
                    <p className="text-[15px] leading-[35px]">
                      Source:{" "}
                      <a
                        className="underline"
                        href="https://coinmarketcap.com/currencies/dogecoin/"
                        target="_blank"
                        title="Click to open in new tab"
                      >
                        https://coinmarketcap.com/currencies/dogecoin/
                      </a>
                    </p>
                  )}
                </>
              )}
              {showError && (
                <ScrollArea.Root className="w-[100%] max-h-[300px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 mt-8">
                  <ScrollArea.Viewport className="w-full h-full rounded">
                    {errorReasons.n.length > 1 && (
                      <div className="grid grid-cols-2 mb-4">
                        <p className="sb-i-up-desc">n Error</p>
                        <div>
                          {errorReasons.n.map((reason) => {
                            return <p>{reason}</p>;
                          })}
                        </div>
                      </div>
                    )}
                    {errorReasons.x.length > 1 && (
                      <div className="grid grid-cols-2 mb-4">
                        <p className="sb-i-up-desc">x Error</p>
                        <div>
                          {errorReasons.x.map((reason) => {
                            return <p>{reason}</p>;
                          })}
                        </div>
                      </div>
                    )}
                    {errorReasons.y.length > 1 && (
                      <div className="grid grid-cols-2 mb-4">
                        <p className="sb-i-up-desc">y Error</p>
                        <div>
                          {errorReasons.y.map((reason) => {
                            return <p>{reason}</p>;
                          })}
                        </div>
                      </div>
                    )}
                    {errorReasons.p.length > 1 && (
                      <div className="grid grid-cols-2 mb-4">
                        <p className="sb-i-up-desc">P(x) Error</p>
                        <div>
                          {errorReasons.p.map((reason) => {
                            return <p>{reason}</p>;
                          })}
                        </div>
                      </div>
                    )}
                  </ScrollArea.Viewport>
                </ScrollArea.Root>
              )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </div>
    </div>
  );
}

export default LagrangePage;
