import React, { useContext, useState } from 'react';
import UidContext from '../../../contexts/App/AppContext';
import { useEth } from '../../../contexts/EthContext';
import Header from '../../Layouts/Header/Header';
import Loader from '../../Layouts/Loader/Loader';
import './AddProposal.css'
import toast from 'react-hot-toast';

const AddProposal = () => {
    const { state: { contract, accounts } } = useEth();
    const { setProposalID } = useContext(UidContext);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e)  => {
        e.preventDefault(); 
        setLoading(true);
        const proposal = e.target[0].value;
        if (proposal !== "") {
            await contract.methods.addProposal(proposal.toString()).send({ from: accounts[0] }).then(res => {
                setProposalID(prevArray => [...prevArray, {userProposal:res.from ,id:parseInt(res.events.ProposalRegistered.returnValues.proposalId, 10)}]);
                toast(`${res.events.ProposalRegistered.event} !`,
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
        } else {
            toast("You can't create a void proposal !",
            {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
        };
        setLoading(false);
    };

    return (
        <>
            {accounts && (<Header/>)}
            <main>
                {accounts ? (
                    <>
                        <div className="proposal-container">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="proposal">Enter a proposal</label>
                                    <input type="text" name="proposal" id="proposal" className="form-control" required />
                                </div>
                                {loading ? (
                                    <Loader size={"small"}/>
                                ) : (
                                    <button className='myButton' type="submit">Enter a proposal</button>
                                )}
                            </form>
                        </div>
                    </>
                ) : (
                    <h1>Please connect Metamask</h1>
                )}
            </main>
        </>
    );
};

export default AddProposal;