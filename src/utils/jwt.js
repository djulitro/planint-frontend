import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (session) => {
  if (!session) {
    return false;
  }
  const currentTime = new Date();
  const expiredAt = new Date(session.expiredAt)

  return expiredAt > currentTime;
};

const setSession = (accessToken, userData, expiredAt) => {
  if (accessToken) {
    const session = {
      accessToken,
      expiredAt,
      userData
    };

    localStorage.setItem('authSession', JSON.stringify(session));
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  } else {
    localStorage.removeItem('authSession');
    delete axios.defaults.headers.common.Authorization;
  }
};

const getSession = () => {
  const session = localStorage.getItem('authSession');

  return JSON.parse(session);
};

export { isValidToken, setSession, getSession };
