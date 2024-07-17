import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import AdminMatchmakerNavBar from '../AdminMatchmaker/AdminMatchmakerNavBar';
import ManagerNavBar from '../Manager/ManagerNavBar';
import MarketerNavBar from '../Marketer/MarketerNavBar';

const NavBar = ({ onOpenAddModal, onOpenVerifyUsersModal, setViewMode, currentUserRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <div>
      {(currentUserRole === 'admin' || currentUserRole === 'matchmaker') && <AdminMatchmakerNavBar onOpenAddModal={onOpenAddModal} onOpenVerifyUsersModal={onOpenVerifyUsersModal} />}
      {currentUserRole === 'manager' && <ManagerNavBar setViewMode={setViewMode} />}
      {currentUserRole === 'marketer' && <MarketerNavBar setViewMode={setViewMode} />}
    </div>
  );
};

export default NavBar;
