import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UidContext from '../../contexts/App/AppContext';

const OwnerRoute =  ({ children }) => {
  const {owner, user} = useContext(UidContext);
  return owner === user && user !== null ? children : <Navigate to="/" />;
};

export default OwnerRoute;