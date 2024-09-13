import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.error}>Something went wrong. Please try again.</div>
  );
};

export default ErrorMessage;
