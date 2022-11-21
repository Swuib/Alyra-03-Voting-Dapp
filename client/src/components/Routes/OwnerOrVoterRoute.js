import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UidContext from '../../contexts/App/AppContext';

const OwnerOrVoterRoute =  ({ children }) => {
  const {owner, user, userErr} = useContext(UidContext);
  return (owner === user || (userErr !== "You're not a voter" && userErr === "")) && user !== null ? children : <Navigate to="/" />;
};

export default OwnerOrVoterRoute;