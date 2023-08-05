import './sass/main.scss';
import { getProject } from './components/shared/api/clientAPI';

getProject().then((project) => console.log(project));
