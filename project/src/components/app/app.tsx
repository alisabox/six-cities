import MainScreen from '../main/main';

type AppScreenProps = {
  cardsNumber: number;
}

function App({cardsNumber}: AppScreenProps): JSX.Element {
  return <MainScreen cardsNumber={cardsNumber}/>;
}

export default App;
