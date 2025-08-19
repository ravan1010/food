// useAuthCheck.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const ADMININFOAuth = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios.get('/api/admininfo', { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  return { user, checking };
};

export default ADMININFOAuth
