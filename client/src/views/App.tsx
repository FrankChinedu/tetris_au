import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Switch } from 'react-router-dom';
import { routes } from '../routes';

const App: React.FC= () =>  {
	const [id] = useState(nanoid);

  return (
	<div className="bg-black min-h-screen">
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
	</div>
	)
}

export default App;
