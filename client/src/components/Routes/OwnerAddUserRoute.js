import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UidContext from '../../contexts/App/AppContext';

const OwnerAddUserRoute =  ({ children }) => {
  const {owner, user, userErr, workflow} = useContext(UidContext);
  return (((owner === user || (userErr !== "You're not a voter" && userErr === "")) && workflow === 0 && user !== null )) ? children : <Navigate to="/" />;
};

export default OwnerAddUserRoute;