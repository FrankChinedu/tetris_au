import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Switch } from 'react-router-dom';
import { routes } from '../routes';
import {SocketContext, SocketProvider} from '../context/socket'

const App: React.FC= () =>  {
	const [id] = useState(nanoid);

  return (
	<div className=" bg-black min-h-screen">
    <SocketProvider>
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
    </SocketProvider>
	</div>
	)
}

export default App;
