import React, { useContext, useState } from 'react';
import UidContext from '../../../contexts/App/AppContext';
import { useEth } from "../../../contexts/EthContext";
import Header from '../../Layouts/Header/Header';
import { disable } from '../../Utils/Utils';
import toast from 'react-hot-toast';
import './WorkFlow.css';
import Loader from '../../Layouts/Loader/Loader';

const WorkFlow = () => {
    const { state: { contract, accounts } } = useEth();
    const { workflow, setWorkFlow, setProposalID } = useContext(UidContext);

    const [loadingStartProposal, setLoadingStartProposal] = useState(false);
    const [loadingEndProposal, setLoadingEndProposal] = useState(false);
    const [loadingStartVoting, setLoadingStartVoting] = useState(false);
    const [loadingEndVoting, setLoadingEndVoting] = useState(false);

    const handleStartProposal = async () => {
        setLoadingStartProposal(true);
            await contract.methods.startProposalsRegistering().send({ from: accounts[0] }).then(res => {
                setWorkFlow(parseInt(res.events.WorkflowStatusChange.returnValues.newStatus));
                setProposalID(prevArray => [...prevArray, {userProposal:accounts[0] ,id:0}]);
                toast(`New WorkflowStatus is ${res.events.WorkflowStatusChange.returnValues.newStatus} : Proposal strated !`,
                {style: { height:'50px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
            }).catch(error => {
                if(error.code === 4001)
                    toast(`${error.message}`,
                    {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
                else
                    toast("Transaction reverted",
                    {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            });
        setLoadingStartProposal(false);
    };

    const handleEndProposal = async () => {
        setLoadingEndProposal(true);
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] }).then(res => {
            setWorkFlow(parseInt(res.events.WorkflowStatusChange.returnValues.newStatus));
            toast(`New WorkflowStatus is ${res.events.WorkflowStatusChange.returnValues.newStatus} : Proposal end !`,
            {style: { height:'50px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
        }).catch(error => {
            if(error.code === 4001)
                toast(`${error.message}`,
                {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            else
                toast("Transaction reverted",
                {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
        });
        setLoadingEndProposal(false);
    };

    const handleStartVoting = async () => {
        setLoadingStartVoting(true);
        await contract.methods.startVotingSession().send({ from: accounts[0] }).then(res => {
            setWorkFlow(parseInt(res.events.WorkflowStatusChange.returnValues.newStatus));
            toast(`New WorkflowStatus is ${res.events.WorkflowStatusChange.returnValues.newStatus} : Vote strated !`,
            {style: { height:'50px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
        }).catch(error => {
            if(error.code === 4001)
                toast(`${error.message}`,
                {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            else
                toast("Transaction reverted",
                {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
        });
        setLoadingStartVoting(false);
    };

    const handleEndVoting = async () => {
        setLoadingEndVoting(true);
        await contract.methods.endVotingSession().send({ from: accounts[0] }).then(res => {
            setWorkFlow(parseInt(res.events.WorkflowStatusChange.returnValues.newStatus));
            toast(`New WorkflowStatus is ${res.events.WorkflowStatusChange.returnValues.newStatus} : Vote ended !`,
            {style: { height:'50px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
        }).catch(error => {
            if(error.code === 4001)
                toast(`${error.message}`,
                {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            else
                toast("Transaction reverted",
                {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
        });
        setLoadingEndVoting(false);
    };

    return (
        <>
        {accounts && (<Header/>)}
        <main>
            {accounts ? (
                <div className='workflow-container'>
                    <div>
                        {loadingStartProposal ? (
                            <Loader size={"small"}/>
                        ):(
                            <button className="myButton" disabled={disable(workflow, 0)} onClick={handleStartProposal} >Start Proposal</button> 
                        )}
                    </div> 
                    <div>
                        {loadingEndProposal ? (
                            <Loader size={"small"}/>
                        ):(
                            <button className="myButton" disabled={disable(workflow, 1)} onClick={handleEndProposal} >End Proposal</button>  
                        )}
                    </div> 
                    
                    <div className="btn-group">
                        {loadingStartVoting ? (
                            <Loader size={"small"}/>
                        ):(
                            <button className="myButton" disabled={disable(workflow,2)} onClick={handleStartVoting} >Start Voting</button>  
                        )}
                    </div> 
                    <div className="btn-group">
                        {loadingEndVoting ? (
                            <Loader size={"small"}/>
                        ):(
                            <button className="myButton" disabled={disable(workflow,3)} onClick={handleEndVoting} >End Voting</button>
                        )}
                    </div>
                </div>
            ) : (
                <h1>Please connect Metamask</h1>
            )}
        </main>
    </>
    );
};

export default WorkFlow;