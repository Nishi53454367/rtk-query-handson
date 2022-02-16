import React from 'react';
import { useGetPokemonByNameQuery } from './services/pokemon';
import './App.css';

/** ピカチュウ描画 */
const Pikachu = () => {
  // データフェッチ
  const { name, url } = useGetPokemonByNameQuery(
    'pikachu',
    {
      // selectFromResultで取得後に任意のデータに整形も可能
      selectFromResult: ({ data }) => ({ name: data?.species.name, url: data?.sprites.front_shiny }),
      refetchOnMountOrArgChange: 10,  // マウント時の再フェッチ指定。数字指定(秒数)の場合、指定された時間の間はキャッシュを使用する。
      refetchOnFocus: true,           // ウインドウへフォーカスが戻った時の再フェッチ指定(setupListenersがstoreで設定されてないと使用不可)
      refetchOnReconnect: true,       // ネットワーク接続が回復した時の再フェッチ指定(setupListenersがstoreで設定されてないと使用不可)
    }
  );

  // 描画
  return <img src={url} alt={name} />;
}

export default Pikachu;
