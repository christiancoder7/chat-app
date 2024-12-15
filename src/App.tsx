import { useEffect } from 'react';
import './App.scss';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import Login  from './components/login/Login';
import { userAppDispatch, userAppSelector } from './app/hooks';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';


function App() {
  const user = userAppSelector((state) => state.user.user)
 // const user = null;

  const dispatch = userAppDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if(loginUser) {
        dispatch(
          login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayName:loginUser.displayName,
        })
      )  
    } else {
      dispatch(logout())
    }
    })
  }, [dispatch])

  return (
    <div className="App">
      {user ? (
        <>
      {/* sidebar */}
      <Sidebar   />
      {/* chat */}
      <Chat />
        </>
      ) : (
        <>
        <Login />
        </>
      )}
    </div>
  );
}

export default App;
