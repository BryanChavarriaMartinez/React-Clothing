import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { onAuthStateChangeListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import Navigation from './routes/navigation/navigation.component.jsx';
import Home from './routes/home/home.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component.jsx';
import Checkout from './routes/checkout/checkout.component.jsx';
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
