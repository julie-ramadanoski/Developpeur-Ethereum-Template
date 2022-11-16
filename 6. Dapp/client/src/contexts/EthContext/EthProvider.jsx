import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      try {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);

        // get contract Owner and user data
        const owner = await contract.methods
          .owner()
          .call({ from: accounts[0] });
        const getSelfVoter = await contract.methods
          .me()
          .call({ from: accounts[0] });
        const currentStep = await contract.methods
          .workflowStatus()
          .call({ from: accounts[0] });

        // create user  profile
        const me = {
          address: accounts[0],
          isOwner: accounts[0] === owner,
          isRegistered: getSelfVoter.isRegistered,
          hasVoted: getSelfVoter.hasVoted,
          votedProposalId: getSelfVoter.votedProposalId,
        };
        dispatch({
          type: actions.init,
          data: {
            artifact,
            web3,
            accounts,
            networkID,
            contract,
            me,
            currentStep,
          },
        });
      } catch (err) {
        /**
         * when opening the application, if metamask is not connected
         * keep in memory the artifact to connect without reloading the page
         */
        dispatch({
          type: actions.init,
          data: { ...initialState, artifact },
        });
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    if (!!window.ethereum) {
      const events = ["chainChanged", "accountsChanged"];
      const handleChange = () => {
        /**
         * when changing account or chain
         * reset application data
         * keep in memory the artifact to connect without reloading the page
         */
        dispatch({
          type: actions.init,
          data: { ...initialState, artifact: state.artifact },
        });
        init(state.artifact);
      };

      events.forEach((e) => window.ethereum.on(e, handleChange));
      return () => {
        events.forEach((e) => window.ethereum.removeListener(e, handleChange));
      };
    }
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
