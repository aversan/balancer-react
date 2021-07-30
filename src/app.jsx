import React, { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import AppHero from 'components/heros/app-hero';
import HomePage from './pages/home';
// import TradePage from 'pages/trade';
// import PoolPage from 'pages/pool';
import './index.scss';

const App = () => {
  // useWeb3Watchers();
  // const { isWalletSelectVisible, toggleWalletSelectModal } = useWeb3();
  // const store = useStore();
  // const route = useRoute();
  const route = { path: '/' } // REMOVE

  const isHomePage = useMemo(() => route.path === '/', [route]);

  // onBeforeMount(() => {
  //   store.dispatch('app/init');
  // });

  return (
    <>
      <div className="pb-12">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/trade" component={TradePage} /> */}
            {/* <Route exact path="/pool" component={PoolPage} /> */}
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App;
