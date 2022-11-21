import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UidContext from '../../contexts/App/AppContext';

const RegisterAddProposalRoute =  ({ children }) => {
  const { owner, user,userErr, workflow } = useContext(UidContext);
  return ((userErr !== "You're not a voter" && userErr === "") && workflow === 1 && user !== null && user !== owner) ? children : <Navigate to="/" />;
};

export default RegisterAddProposalRoute;