import { useNavigate, useRouteError } from 'react-router-dom';
import ButtonLink from './ButtonLink';

function NotFound() {
  const error=useRouteError()
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message||error.data}</p>
      <ButtonLink to={-1}>&larr; Go back</ButtonLink>
    </div>
  );
}

export default NotFound;
