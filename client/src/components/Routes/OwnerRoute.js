import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UidContext from '../../contexts/App/AppContext';
import { useEth } from '../../contexts/EthContext';

const OwnerRoute =  ({ children }) => {
  const { state: { networkID } } = useEth();
  const {owner, user} = useContext(UidContext);
  return owner === user && user !== null  && networkID === 5 ? children : <Navigate to="/" />;
};

export default OwnerRoute;
