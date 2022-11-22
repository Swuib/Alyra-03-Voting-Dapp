import "./Home.css"
import { useEth } from "../../../contexts/EthContext";
import Header from '../../Layouts/Header/Header';
import { useContext } from "react";
import UidContext from "../../../contexts/App/AppContext";

const Home = () => {
    const { state: { networkID, accounts  } } = useEth();
    const { owner, user, userErr, workflow, winner } = useContext(UidContext);

    const connect = () => {
        window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    return (
        <>  
            {accounts !== null && (
                <>
                    {accounts.length > 0 && ((userErr !== "You're not a voter" && userErr === "")|| user === owner) && (<Header/>)}
                    <main>
                        {networkID === 5 ? (
                        <>
                            {accounts.length > 0 ? (
                                <div className="home-container">
                                    { ((userErr !== "You're not a voter" && userErr === "") || user === owner) && workflow === 0 ? (
                                        <>
                                            {user === owner ? (
                                                <h1>Welcome Administrator !</h1>
                                            ) : (
                                                <h1>Welcome the voting session has not started yet, come back soon !</h1>
                                            )}
                                        </>
                                    ) : ((userErr !== "You're not a voter" && userErr === "") || user === owner) &&  workflow === 1  ? (
                                        <h1>Proposal recording is started !</h1>
                                    ) : ((userErr !== "You're not a voter" && userErr === "") || user === owner) &&  workflow === 2 ? (
                                        <h1>the registration of the proposals is finished, the voting session will start soon !</h1>
                                    ) : ((userErr !== "You're not a voter" && userErr === "") || user === owner) &&  workflow === 3 ? (
                                        <h1>The votes are open, what will be your choice?</h1>
                                    ) : ((userErr !== "You're not a voter" && userErr === "") || user === owner) &&  workflow === 4 ? (
                                        <h1>The votes are closed, please wait before knowing the result !</h1>
                                    ) : ((userErr !== "You're not a voter" && userErr === "") || user === owner) &&  workflow === 5 ? (
                                        <h1>The voting session is over and the winning proposal is the n°{winner} !</h1>
                                    ) : (
                                        <>
                                            {workflow === 0 ? (
                                                <h1>The voting session is being prepared, maybe you will be selected, come back soon!</h1>
                                            ) : (
                                                <h1>Sorry you were not selected for this voting session !</h1>
                                            )}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <button className="myButton" onClick={connect}>Connect MetaMask</button>
                            )}
                        </>
                        ) : (
                            <h1>Please connect with the Göerli network.</h1>
                        )}
                    </main>
                </>
            )}
        </>
    );
};

export default Home;