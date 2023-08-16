import './sass/main.scss';
import { render } from './components/shared/utilities/render';
import { app } from './components/app/app';
import { isLoginCustomer } from './components/shared/api/server-authorization';

render(isLoginCustomer.isLogin);
app();
