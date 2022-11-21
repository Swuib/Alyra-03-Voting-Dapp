import { createContext } from 'react';

export const UidContext = createContext({
    owner: null,
    setOwner: (value) => {},
    user: null,
    setUser: (value) => {},
    userInfo: null,
    setUserInfo: (value) => {},
    userErr: null,
    setUserErr: (value) => {},
    workflow: null,
    setWorkFlow: (value) => {},
    RegisteredAdress: null,
    setRegisteredAdress: (value) => {},
    proposalId: null,
    setProposalID: (value) => {},
    ProposalData: null,
    setProposalData: (value) => {},
    winner: null,
    setWinner: (value) => {},
});

export default UidContext;