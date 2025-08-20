// useAuthCheck.js
import { useEffect, useState } from 'react';
import api from '../../../api';

const Admincategoryadminlandmarkauth = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api.get('/api/admincategory', { withCredentials: true })
      .then((res) => setUser(res.data.categoryadminlandmark))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  return { user, checking };
};

export default Admincategoryadminlandmarkauth;
