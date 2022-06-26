import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import './auth.scss';
import logo from '../../assets/logoMovie2.png';
import { db, auth } from '../../api/firebase';
import Context from '../../store/Context';
import { setUserInfo, setUserStatus } from '../../store/actions';
import GuestPage from '../../components/guest-page/GuestPage';
import { default as MyButton } from '../../components/button/Button';

const Auth = props => {

  const [state, dispatch] = useContext(Context);
  const { userEmail, userInfo, userStatus } = state;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const [open, setOpen] = useState(true);
  const [openSignin, setOpenSignin] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState('');

  const [error, setError] = useState(false);


  const setSignIn = () => {
    setOpenSignin(true);
    setOpen(false);
    setError(false);
  }

  const setSignUp = () => {
    setOpen(true);
    setOpenSignin(false);
    setError(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch(setUserInfo(username || email));
        setError(false);
        setOpenSignin(false);
        // ...
      })
      .catch((error) => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const signUp = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch(setUserInfo(username || email));
        setError(false);
        setOpen(false);
        // ...
      })
      .catch((error) => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        setUser(authUser);
        dispatch(setUserStatus(true));
      } else {
        // user logged out
        setUser(null);
        dispatch(setUserStatus(false));
      }
    });

    return () => {
      unsubcribe();
    }
  }, [user])

  return (
    <div className="auth" >
      <GuestPage path="/" msg="Please go back main page!" type="Home" />
      {/* MODAL LOG IN */}
      <Modal
        open={openSignin}
        onClose={() => setOpenSignin(false)}
      >
        <Box sx={style}>
          <form className="auth__signup">
            <center>
              <img
                className="auth__headerImage"
                src={logo}
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {
              error
                ? <h4 style={{ color: "red" }}>Your email or password is incorrect!</h4>
                : ''
            }
            <div className="auth__btns">
              <Button className="small btn" onClick={signIn}>Sign In</Button>
              <MyButton className="small btn" onClick={setSignUp}>Sign Up</MyButton>
            </div>
          </form>
        </Box>
      </Modal>
      {/* MODAL SIGN UP */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form className="auth__signup">
            <center>
              <img
                className="auth__headerImage"
                src={logo}
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {
              error
                ? <h4 style={{ color: "red" }}>Your name, email or password is invalid!</h4>
                : ''
            }
            <div className="auth__btns">
              <Button className="small btn" onClick={signUp}>Sign Up</Button>
              <MyButton className="small btn" onClick={setSignIn}>Sign In</MyButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div >
  )
};

export default Auth;