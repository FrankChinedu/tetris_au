import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Switch } from 'react-router-dom';
import { routes } from '../routes';
import { SocketProvider } from '../context/socket'
import { UserProvider } from '../context/user'

const App: React.FC= () =>  {
	const [id] = useState(nanoid);

  return (
	<div className=" bg-black min-h-screen">
    <SocketProvider>
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
    </SocketProvider>
	</div>
	)
}

export default App;
