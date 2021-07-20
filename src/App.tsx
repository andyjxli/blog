import { renderRoutes } from 'react-router-config';
import routes from '@/router/index';
import '@/styles/base.less';

function App() {
  return renderRoutes(routes);
}

export default App;
