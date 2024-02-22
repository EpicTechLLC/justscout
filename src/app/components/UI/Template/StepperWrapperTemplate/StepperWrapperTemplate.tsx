import { Fragment, useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid";

export type StepperWrapperProps = {
  /**Step Labels */
  stepLabels: Array<string>;
  /**Comp Array */
  componentsArray: ReactNode[];
  /**Function */
  finish: () => unknown;
  valid?: boolean;
  stepUpdate: (e: number) => unknown;
};
export default function StepperWrapperTemplate({
  stepLabels,
  componentsArray,
  finish,
  valid,
  stepUpdate,
}: StepperWrapperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = stepLabels;

  useEffect(() => {
    stepUpdate(activeStep);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 === steps.length) {
        finish();
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item md={9} xs={7} />
            <Grid item xs={2} md={1}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!valid}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <>{componentsArray[activeStep]}</>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
