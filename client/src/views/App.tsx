import React, { useState, Suspense, useContext, useEffect } from 'react';
import ReactGA from 'react-ga';
import { nanoid } from 'nanoid';
import { Switch } from 'react-router-dom';
import { routes } from '../routes';
import { SocketProvider, SocketContext } from '../context/socket';
import { UserProvider } from '../context/user';
import { SingleGameProvider } from '../context/singleGame';
import PageSpinner from './common/PageSpinner';
import EVENTS from '../utils/constants/socketEvent';

const App: React.FC= () =>  {
    const {socket} = useContext(SocketContext);

	const [id] = useState(nanoid);
    useEffect(() => {
        const ref = setInterval(() => {
            socket.emit(EVENTS.PING, 'ping')
        }, EVENTS.PING_TIME)
        return () => {
            clearInterval(ref);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const url = '/auth/twitter';
    if (window.location.pathname === url) {
        return <div></div>;
    } else {
        return (
          <div className=" bg-black min-h-screen">
          <Suspense fallback={<div className="h-screen flex justify-center items-center"><PageSpinner /></div>}>
            <SocketProvider>
              <SingleGameProvider>
                <UserProvider>
                  <Switch>
                    {routes.map(({path, component, RouteType}) => (
                      <RouteType
                      key={id}
                      path={path}
                      exact
                      component={component}
                    />
                    ))}
                  </Switch>
                </UserProvider>
              </SingleGameProvider>
            </SocketProvider>
          </Suspense>
          </div>
          )
    }

}

export default App;
