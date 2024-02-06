import { useEffect, useState } from 'react';

import { Outlet, Navigate } from 'react-router-dom';

import { auth } from '../utils/firebase';

const PrivateRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user === null) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/signin/" />;
};

export default PrivateRoutes;

