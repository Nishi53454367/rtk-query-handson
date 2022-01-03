import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { useGetPokemonByNameQuery } from './services/pokemon';
import './App.css';

function App() {
  // データフェッチ(フシギダネ)
  const { data, error, isError, isUninitialized, isLoading, isFetching, refetch } = useGetPokemonByNameQuery(
    'bulbasaur',              // クエリパラメータ
    {
      skip: false,            // trueにすると実行しない(実行させないためのフラグとして使用できる)
      pollingInterval: 30000, // ポーリング間隔(ミリ秒)
    }
  );
  // データフェッチ(ピカチュウ)
  const { name, url } = useGetPokemonByNameQuery(
    'pikachu',
    {
      // 取得後にデータ整形
      selectFromResult: ({ data }) => ({ name: data?.species.name, url: data?.sprites.front_shiny }),
      refetchOnMountOrArgChange: false,  // マウント時の再フェッチ指定
      refetchOnFocus: true,              // ウインドウへフォーカスが戻った時の再フェッチ指定(setupListenersで呼び出されていないと使用不可)
      refetchOnReconnect: true,          // ネットワーク接続が回復した時の再フェッチ指定(setupListenersで呼び出されていないと使用不可)
    }
  );

  // エラー時
  if (isError) return <div>Oh no, there was an error {error}</div>;

  // 実行前
  if (isUninitialized) {
    console.log('Uninitialized');
    return <div>Uninitialized...</div>;
  }

  // 処理中(初回のみ)
  if (isLoading) {
    console.log('Loading');
    return <div>Loading...</div>;
  };

  // 処理中(ポーリングごと)
  if (isFetching) {
    console.log('ReFetching');
    return <div>ReFetching...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <div>
        <button onClick={() => refetch()}>フシギダネrefetch</button>
      </div>
      {data && (<img src={data.sprites.front_shiny} alt={data.species.name} />)}
      <img src={url} alt={name} />
    </div>
  );
}

export default App;
