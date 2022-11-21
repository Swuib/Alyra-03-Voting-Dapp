import Routes from './components/Routes';
import AppContext from './contexts/App/AppContext';
import "./App.css";
import { useCallback, useEffect } from "react";
import { useEth } from "./contexts/EthContext";
import { Toaster } from 'react-hot-toast';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useLocalStorage } from "./components/Utils/Utils";

function App() {
  const { state: { contract, accounts } } = useEth();

  const [owner, setOwner] = useLocalStorage("owner",null);
  const [user, setUser] = useLocalStorage("user", null);
  const [userInfo, setUserInfo] = useLocalStorage("userInfo",null);
  const [userErr, setUserErr] = useLocalStorage("userErr","");
  const [workflow, setWorkFlow] = useLocalStorage("workflow", 0);
  const [proposalId, setProposalID] = useLocalStorage("proposalId",[]);
  const [ProposalData, setProposalData] = useLocalStorage("ProposalData",[]);
  const [RegisteredAdress, setRegisteredAdress] = useLocalStorage("RegisteredAdress",[]);
  const [winner, setWinner] = useLocalStorage("winner",0);

  useEffect(() => {
    if (contract !== null && accounts !== null) {
      if (accounts.length > 0 ) {
        const fetchData = async () => {
          const resOwner = await contract.methods.owner().call({ from: accounts[0] });
          const resWorkflow = await contract.methods.workflowStatus().call({ from: accounts[0] });
          setOwner(resOwner.toLowerCase());
          setUser(accounts[0].toLowerCase());
          setWorkFlow(parseInt(resWorkflow));
        };
        fetchData();
      } else {
        setUser(null);
        setOwner(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, accounts]);

  useEffect(() => {
    if (accounts!== null) {
      if (accounts.length > 0 ) {
        if (user !== null) {
          if (user !== owner) {
            const fetchData = async () => {
              await contract.methods.getVoter(user).call({from: accounts[0] }).then(res => {
                setUserInfo({hasVoted:res.hasVoted, isRegistered:res.isRegistered, votedProposalId:res.votedProposalId});
                setUserErr("");
              }).catch(error => {
                const errorObject = JSON.parse(error.toString().replace("Error: Internal JSON-RPC error.", ""));
                setUserErr(errorObject.message.replace("VM Exception while processing transaction: revert ", ""));
              });
            };
            fetchData();
          };
        };
      };
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  useEffect(() => {
    if (accounts !== null ) {
      if (accounts.length > 0 ) {
        if(proposalId.length > 0 && workflow === 1 && user !== owner) {
          const fetchData = async () => {
            setProposalData([]);
            for (let i = 0; i < proposalId.length; i++) {
              await contract.methods.getOneProposal(i).call({ from: accounts[0] }).then(res => {
                console.log(res);
                if (res[0] === "GENESIS")
                  setProposalData(prevArray => [...prevArray, {userProposal:owner, description:res[0],voteCount:res[1], Id:i}]);
                else 
                  setProposalData(prevArray => [...prevArray, {userProposal:proposalId[i].userProposal, description:res[0],voteCount:res[1], Id:i}]);
              }).catch(error => {
                  console.log("erreur dans getOneProposal setProposalData loop");
                  console.error(error.message);
              });
            };
          };
          fetchData();
        };
      };
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalId]);

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
  }, []);
  
  const contextUid = {
    owner,
    setOwner: setOwner,
    user,
    setUser: setUser,
    userInfo,
    setUserInfo: setUserInfo,
    userErr,
    setUserErr: setUserErr,
    workflow,
    setWorkFlow: setWorkFlow,
    RegisteredAdress,
    setRegisteredAdress: setRegisteredAdress,
    proposalId,
    setProposalID: setProposalID,
    ProposalData,
    setProposalData: setProposalData,
    winner,
    setWinner: setWinner
  };

  return (
    <AppContext.Provider value={contextUid}>
          <Routes />
          <Toaster 
          id="toaster"
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="Toaster-container"
          containerStyle={{zIndex: "999999999999999999999999"}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
        
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 3000,
              theme: {
                primary: 'red',
                secondary: 'black',
              },
            },
          }}/>
          <Particles id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 800
                  }
                },
                color: {
                  value: "#ffffff"
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000"
                  },
                  polygon: {
                    nb_sides: 5
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                  }
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              interactivity: {
                detect_on: "window",
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab"
                  },
                  onclick: {
                    enable: false,
                    mode: "push"
                  },
                  resize: true
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 1
                    }
                  },
                  bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4
                  },
                  push: {
                    particles_nb: 4
                  },
                  remove: {
                    particles_nb: 2
                  }
                }
              },
              retina_detect: true
          }}/>
    </AppContext.Provider>
  );
}

export default App;
