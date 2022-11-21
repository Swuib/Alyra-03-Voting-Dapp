import './Card.css'

const Card = ({workflow, proposal, proposalId, userErr, voteCount, userInfo, setVote, owner, user}) => {
    
    const handelvote = () => {
        setVote(proposalId);
    };

    return (
        <div className='card-container'>
            <div className="proposalId">
                <p className='proposal-number'>{proposalId}</p>
                <div className='count-container'>

                    <span className='count'>count :</span>
                    <span>{voteCount}</span>
                </div>
            </div>
            <div className="proposal">{proposal}</div>
            <div className="button-container">
            {(userInfo !== null &&proposalId !== undefined)&& (
                <>
                    {(workflow === 3 && (userErr !== "You're not a voter" && userErr === "") && userInfo.hasVoted === false && user !== owner) && (
                        <button className="myButton" onClick={handelvote}>Vote</button>
                    )}
                </>
            )}
            </div>
        </div>
    );
};

export default Card;