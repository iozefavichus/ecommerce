import './sass/main.scss';
import { render } from './components/shared/utilities/render';
import { app } from './components/app/app';
import { isLogin } from './components/shared/api/is-login';

render(isLogin());
app();
