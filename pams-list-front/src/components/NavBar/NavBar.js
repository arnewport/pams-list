import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import AdminMatchmakerNavBar from '../AdminMatchmaker/AdminMatchmakerNavBar';
import ManagerNavBar from '../Manager/ManagerNavBar';
import MarketerNavBar from '../Marketer/MarketerNavBar';

const NavBar = ({ onOpenAddModal, onOpenVerifyUsersModal, setViewMode }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  const role = user.authorities[0]; // Assuming the first authority is the role

  return (
    <div>
      {(role === 'admin' || role === 'matchmaker') && <AdminMatchmakerNavBar onOpenAddModal={onOpenAddModal} onOpenVerifyUsersModal={onOpenVerifyUsersModal} />}
      {role === 'manager' && <ManagerNavBar onOpenAddModal={onOpenAddModal} setViewMode={setViewMode} />}
      {role === 'marketer' && <MarketerNavBar setViewMode={setViewMode} />}
    </div>
  );
};

export default NavBar;
