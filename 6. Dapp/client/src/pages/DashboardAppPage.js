import { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

// context
import useEth from "../contexts/EthContext/useEth";
// components
import { VerticalLinearStepper } from "../components/VerticalLinearStepper";
// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";

import steps from "../_mock/steps";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const {
    state: { me, currentStep, contract },
  } = useEth();

  const [open, setOpen] = useState(false);

  const changeVotingStatus = async () => {
    console.log("changeVotingStatus", currentStep);
    try {
      switch (currentStep) {
        case "0":
          await contract.methods
            .startProposalsRegistering()
            .send({ from: me.address });
          break;
        case "1":
          await contract.methods
            .endProposalsRegistering()
            .send({ from: me.address });
          break;
        case "2":
          await contract.methods
            .startVotingSession()
            .send({ from: me.address });
          break;
        case "3":
          await contract.methods.endVotingSession().send({ from: me.address });
          break;
        case "4":
          await contract.methods.tallyVotes().send({ from: me.address });
          break;

        default:
          console.error("changeVotingStatus unknowed step");
          break;
      }
    } catch (error) {
      console.error("changeVotingStatus", error);
    }
    setOpen(false);
  };

  const handleClickConfirm = () => {
    changeVotingStatus();
  };
  const handleNext = () => {
    console.log("handleNext", me.isOwner && !!contract);
    if (me.isOwner && !!contract) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Easy Voting DApp </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bienvenue !
        </Typography>
        {!me && (
          <Typography variant="body2" sx={{ mb: 5 }}>
            <span>Connectez votre MetaMask pour utiliser l'application</span>
          </Typography>
        )}
        {me?.isRegistered && (
          <Typography variant="body2" sx={{ mb: 5 }}>
            <span>Vous êtes un votant enregistré</span>
          </Typography>
        )}
        {me?.isOwner && (
          <Typography variant="body2" sx={{ mb: 5 }}>
            <span>Vous êtes l'animateur de ce vote</span>
          </Typography>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Voters"
              total="714000"
              icon={"ant-design:smile-twotone"}
              isOwner={me?.isOwner}
              isRegistered={me?.isRegistered}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Proposals"
              total="1352831"
              color="info"
              icon={"ant-design:comment-outlined"}
              isOwner={me?.isOwner}
              isRegistered={me?.isRegistered}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Votes"
              total="1723315"
              color="warning"
              icon={"ant-design:edit-filled"}
              isOwner={me?.isOwner}
              isRegistered={me?.isRegistered}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Phase"
              total={(parseInt(currentStep) + 1).toString() || "0"}
              color="error"
              icon={"ant-design:file-protect-outlined"}
              isOwner={me?.isOwner}
              isRegistered={me?.isRegistered}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader title="Etapes du vote" />

              <CardContent
                sx={{
                  "& .MuiTimelineItem-missingOppositeContent:before": {
                    display: "none",
                  },
                }}
              >
                <VerticalLinearStepper
                  steps={steps}
                  handleNext={handleNext}
                  isOwner={me?.isOwner}
                  activeStep={parseInt(currentStep || 0)}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Etes-vous sûr·e de vouloir passer à l'étape suivante ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            En confirmant, le vote passera à l'étape suivante et ne pourrez plus
            revenir en arrière.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClickConfirm} autoFocus>
            Je confirme
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
