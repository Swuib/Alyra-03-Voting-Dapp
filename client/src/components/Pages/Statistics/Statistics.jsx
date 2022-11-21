import React, { useContext } from 'react';
import UidContext from '../../../contexts/App/AppContext';
import { useEth } from '../../../contexts/EthContext';
import Header from '../../Layouts/Header/Header';
import './Statistics.css';

const Statistics = () => {
    const { state: { accounts } } = useEth();
    const { RegisteredAdress,ProposalData } = useContext(UidContext);

    return (
        <>
        {accounts && (<Header/>)}
        <main>
            {accounts ? (
                <div className='stat-container'>
                    <div className="stat-add">
                        <div className='stat-add-container-header'>
                            <div className='th-add-left'><p>Address Registred</p></div>
                            <div className='th-add-rigth'><p>Vote For</p></div>
                        </div>
                        <div  className='stat-add-container-data'>
                            {RegisteredAdress !== undefined && (
                                <>
                                    {RegisteredAdress.length > 0 && (
                                        <>
                                            {RegisteredAdress.map((data, key) => {
                                                return(
                                                    <div className='data-add' key={key}>
                                                        <div className='tr-add-left'><p>{data.address}</p></div>
                                                        <div className='tr-add-rigth'><p>{data.voteCount === "0" ? "no voted" : data.voteCount}</p></div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="stat-proposal">
                        <div className='stat-proposal-container-header'>
                            <div className='th-proposal-left'><p>Address Proposal</p></div>
                            <div className='th-proposal-midle'><p>Description</p></div>
                            <div className='th-proposal-midle'><p>Vote Count</p></div>
                            <div className='th-proposal-rigth'><p>Proposal ID</p></div>
                        </div>
                        <div className='stat-proposal-container-data'>
                            {ProposalData !== undefined && (
                                <>
                                    {ProposalData.length > 0 && (
                                        <>
                                            {ProposalData.map((data, key) => {
                                                return(
                                                    <div className='data-proposal' key={key}>
                                                        <div className='tr-proposal-left'><p>{data.userProposal}</p></div>
                                                        <div className='tr-proposal-midle-left'><p>{data.description}</p></div>
                                                        <div className='tr-proposal-midle'><p>{data.voteCount}</p></div>
                                                        <div className='tr-proposal-rigth'><p>{data.Id}</p></div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Please connect Metamask</h1>
            )}
        </main>
    </>
    );
};

export default Statistics;