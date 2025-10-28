import { Link } from "react-router-dom";

const NotFound = () => (
  <main>
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <p>
      <Link to="/">Return to the homepage</Link>
    </p>
  </main>
);

export default NotFound;
