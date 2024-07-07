import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import AdminMatchmakerNavBar from '../AdminMatchmaker/AdminMatchmakerNavBar';
import ManagerNavBar from '../Manager/ManagerNavBar';
import MarketerNavBar from '../Marketer/MarketerNavBar';

const NavBar = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  const role = user.authorities[0]; // Assuming the first authority is the role

  return (
    <div>
      {(role === 'admin' || role === 'admin') && <AdminMatchmakerNavBar />}
      {role === 'manager' && <ManagerNavBar />}
      {role === 'marketer' && <MarketerNavBar />}
    </div>
  );
};

export default NavBar;
