import React, { Suspense, useState } from 'react';
import { nanoid } from 'nanoid';
import { Switch } from 'react-router-dom';
import { routes } from '../routes';
import PageSpinner from './common/PageSpinner';

const App: React.FC= () =>  {
	const [id] = useState(nanoid);

  return (
	<div className="bg-black min-h-screen">
		<Suspense fallback={PageSpinner}>
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
		</Suspense>
	</div>
	)
}

export default App;
