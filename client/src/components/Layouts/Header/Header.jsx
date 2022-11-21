import "./Header.css";
import { Link } from 'react-router-dom';
import UidContext from "../../../contexts/App/AppContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useEth } from "../../../contexts/EthContext";
import Loader from "../Loader/Loader";
import toast from 'react-hot-toast';


const Header = () => {
    const { state: { contract, accounts, networkID } } = useEth();
    const { owner, user,RegisteredAdress, userErr, workflow, setWorkFlow, winner, setWinner, setProposalData, setProposalID, setRegisteredAdress } = useContext(UidContext);
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, [user, workflow]);

    const handleTally = async ()  => {
        setLoading(true)
           
        await contract.methods.tallyVotes().send({ from: accounts[0] }).then(res => {
            setWorkFlow(parseInt(res.events.WorkflowStatusChange.returnValues.newStatus));
        }).catch(error => {
            if(error.code === 4001)
                toast(`${error.message}`,
                {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            else {
                const errorObject = JSON.parse(error.message.replace("[ethjs-query] while formatting outputs from RPC '", "").slice(0, -1));
                toast(errorObject.value.data.message.replace("VM Exception while processing transaction:",""),
                {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            }
            setLoading(false);
        });
        await contract.methods.winningProposalID().call({ from: accounts[0] }).then(winningId => {
            setWinner(winningId);
            toast(`The winning proposal is  ${winningId} !! The voting session is over.`,
            {style: { height:'50px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
        }).catch(error => {
            if(error.code === 4001)
                toast(`${error.message}`,
                {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            else {
                const errorObject = JSON.parse(error.message.replace("[ethjs-query] while formatting outputs from RPC '", "").slice(0, -1));
                toast(errorObject.value.data.message.replace("VM Exception while processing transaction:",""),
                {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            }
            setLoading(false);
        });
        setLoading(false);
    };

    const handleRestart = async ()  => {
        setLoading(true);
        let loacaldataArray =[];
        for (let i = 0; i < RegisteredAdress.length; i++) {
            loacaldataArray.push(RegisteredAdress[i].address);
        };
        await contract.methods.resetDataVote(loacaldataArray).send({ from: accounts[0] }).then(res => {
            setWorkFlow(parseInt(res.events.WorkflowStatusChange.returnValues.newStatus));
            setProposalData([]);
            setProposalID([]);
            setRegisteredAdress([]);
            toast(`New WorkflowStatus is ${res.events.WorkflowStatusChange.returnValues.newStatus} : add user is ready !`,
            {style: { height:'50px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
        }).catch(error => {
            if(error.code === 4001)
                toast(`${error.message}`,
                {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            else {
                const errorObject = JSON.parse(error.message.replace("[ethjs-query] while formatting outputs from RPC '", "").slice(0, -1));
                toast(errorObject.value.data.message.replace("VM Exception while processing transaction:",""),
                {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            }
            setLoading(false);
        });
        setLoading(false);
    };
    
    return (
        <header>
            {networkID === 5 && (
                <>
                    {accounts.length > 0 && ((userErr !== "You're not a voter" && userErr === "")|| user === owner)&& (
                        <>
                        <div className="left-header">
                            <Link to='/' className="logo">
                                <img src="./logo.png" alt="logo"width="40%" height="50%" />
                            </Link>
                            <div className="status-container">
                                {workflow === 0 ? (
                                    <p className="status">Register Voters</p>
                                ) : workflow === 1 ? (
                                    <p className="status">Proposal start</p>
                                ) : workflow === 2 ? (
                                    <p className="status">Proposal End</p>
                                ) : workflow === 3 ? (
                                    <p className="status">Voting Start</p>
                                ) : workflow === 4 ? (
                                    <p className="status">Voting End</p>
                                ) : workflow === 5 ? (
                                    <p className="status">{winner === "0" ? "Vote is null" : `Winning proposal ${winner}`}</p>
                                ) : (
                                    <p className="status"></p>
                                )}
                                <progress id="progessbar" max="5" value={workflow}>{(workflow*10)/2}%</progress>
                            </div>
                        </div>
                        <div className="midle-header">
                            
                            {user === owner ? (
                                <>
                                    <Link to='/Proposal'>
                                        <button className="myButton">Proposal</button>
                                    </Link>
                                    { workflow === 0 ? (
                                        <Link to='/addUser'>
                                            <button className="myButton">AddUser</button>
                                        </Link>
                                    ) : (
                                        <button className="myButton" disabled>AddUser</button>
                                    )}
                                    <Link to='/WorkFlow'>
                                        <button className="myButton">WorkFlow</button>
                                    </Link>
                                    {workflow === 4 && loading ? (
                                        <Loader size={"small"}/>
                                    ) : workflow === 4 ? (
                                        <button className="myButton" onClick={handleTally}>Tally vote</button>
                                    ) : (
                                        <button className="myButton" disabled>Tailly vote</button>
                                    )}
                                    {workflow === 5 && loading ? (
                                        <Loader size={"small"}/>
                                    ) : workflow === 5 ? (
                                        <button className="myButton" onClick={handleRestart}>Restart</button>
                                    ) : (
                                        <button className="myButton" disabled>Restart</button>
                                    )}
                                    <Link to='/Statistics'>
                                            <button className="myButton">Statistics</button>
                                    </Link>
                                </>

                            ) : (
                                <>
                                    {(workflow >= 1 && (userErr !== "You're not a voter" && userErr === "")) && (
                                        <Link to='/Proposal'>
                                            <button className="myButton">Proposal</button>
                                        </Link>
                                    )}
                                    {(userErr !== "You're not a voter" && userErr === "") && (
                                        workflow === 1 ? (
                                            <Link to='/addProposal'>
                                                <button className="myButton">Register Proposal</button>
                                            </Link>
                                        ) : ("")
                                    )}
                                </>
                            )}
                        </div>
                        <div className="rigth-header">
                            <div className="add-container">
                                {accounts.length > 0 ? (
                                    <p className="add">{accounts[0].slice(0, -35)}...{accounts[0].slice(-6)}</p>
                                ) : (
                                    <p className="add">Not connected</p>
                                )}
                            </div>
                        </div>
                        </>
                    )}
                </>
            )}
        </header>
    );
};

export default Header;
