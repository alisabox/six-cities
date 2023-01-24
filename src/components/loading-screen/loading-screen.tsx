import style from './styles.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={style.loader}>
      <div className="visually-hidden">The page is loading</div>
    </div>
  );
}

export default LoadingScreen;
