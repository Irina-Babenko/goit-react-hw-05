import { Link } from 'react-router-dom';
import css from './PageNotFoundPage.module.css';

const PageNotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className={css.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFoundPage;
