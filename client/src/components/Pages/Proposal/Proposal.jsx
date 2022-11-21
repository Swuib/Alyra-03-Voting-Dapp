import { useContext, useEffect, useState} from 'react';
import UidContext from '../../../contexts/App/AppContext';
import { useEth } from '../../../contexts/EthContext';
import Card from '../../Layouts/Card/Card';
import Header from '../../Layouts/Header/Header';
import Loader from '../../Layouts/Loader/Loader';
import toast from 'react-hot-toast';
import './Proposal.css'

const Proposal = () => {
    const { state: { contract, accounts } } = useEth();
    const {owner,workflow,winner, userErr, ProposalData, setProposalData, userInfo,setUserInfo, user, RegisteredAdress, setRegisteredAdress} = useContext(UidContext);
    
    const [vote, setVote] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (vote !== undefined) {
            const handleSubmitVote = async () => {
                setLoading(true);
                const voteCountProposal = parseInt(ProposalData[vote].voteCount);
                let UserIndexForRegisteredAdress = null;
                for (let i = 0; i < RegisteredAdress.length; i++) {
                    if(RegisteredAdress[i].address === user) {
                        UserIndexForRegisteredAdress = i;
                    };
                };
                await contract.methods.setVote(vote).send({ from: accounts[0] }).then(res => {
                    const resProposalId = parseInt(res.events.Voted.returnValues.proposalId, 10);
                    const add = res.from;
                    setRegisteredAdress(
                        Object.values({
                        ...RegisteredAdress, [UserIndexForRegisteredAdress]: 
                        {...RegisteredAdress[UserIndexForRegisteredAdress],address:add.toLowerCase(), voteCount: resProposalId }}));
                    setProposalData(
                        Object.values({
                        ...ProposalData, [vote]: 
                        {...ProposalData[vote], voteCount: voteCountProposal +1 }}));
                    setUserInfo({hasVoted:true, isRegistered:userInfo.isRegistered, votedProposalId:`${vote}`});
                    toast(`Vote for proposal n°${resProposalId} recorded !`,
                    {style: { height:'50px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
                    setLoading(false);
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
            handleSubmitVote();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vote])
    

    return (
        <>
            {accounts && (<Header/>)}
            <main>
                {accounts ? (
                    <>
                    {workflow !== 5 ? (
                        <>  
                            {loading ? (
                                <Loader size={"large"}/>
                            ) : (
                                <>
                                    {(ProposalData !== undefined && userInfo !== null) && (
                                        <>
                                            {ProposalData.length > 1  ? (
                                                ProposalData.map((data, key) => {
                                                    return(
                                                        <>
                                                            {key === 0 ?(
                                                                <span key={`proposal-${key}`}></span>
                                                            ) : (
                                                                <Card 
                                                                    key={`proposal-${key}`}
                                                                    workflow={workflow} 
                                                                    proposal={data.description} 
                                                                    proposalId={key}
                                                                    userErr={userErr}
                                                                    voteCount={data.voteCount}
                                                                    userInfo={userInfo}
                                                                    setVote={setVote}
                                                                    owner={owner}
                                                                    user={user}
                                                                />
                                                            )}
                                                        </>
                                                    )
                                                })
                                            ) : (
                                                <div className='no-proposal-container'>
                                                    <p className='no-proposal'>No proposal recorded</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <div className='no-proposal-container'>
                            <p className='no-proposal'>The voting session is over and the winning proposal is the n°{winner} !</p>
                        </div>
                    )}
                    </>
                ) : (
                    <h1>Please connect Metamask</h1>
                )}
            </main>
        </>
    );
};

export default Proposal;