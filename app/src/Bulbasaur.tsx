import React from 'react';
import { useGetPokemonByNameQuery } from './services/pokemon';
import './App.css';

/** フシギダネ描画 */
const Bulbasaur = () => {
  // データフェッチ
  const { data, error, isError, isUninitialized, isLoading, isFetching, refetch } = useGetPokemonByNameQuery(
    'bulbasaur',              // クエリパラメータ
    {
      skip: false,            // trueにすると実行しない(実行させないためのフラグとして使用できる)
      pollingInterval: 30000, // ポーリング間隔(ミリ秒)
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

  // 描画
  return (
    <>
      {data && (<img src={data.sprites.front_shiny} alt={data.species.name} />)}
      <div>
        <button onClick={() => refetch()}>再取得</button>
      </div>
    </>
  );
}

export default Bulbasaur;
