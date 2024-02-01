import { Link, useNavigate } from "react-router-dom";

function ButtonLink({ children, to }) {
  const navigate = useNavigate();
  const className = "text-blue-400 hover:text-blue-500 hover:underline ";

  if (to === -1)
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default ButtonLink;
