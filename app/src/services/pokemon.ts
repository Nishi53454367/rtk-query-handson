import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../types/Pokemon';

/** ポケモンAPI */
export const pokemonApi = createApi({
  // クエリのベースとなるURLを指定
  baseQuery: fetchBaseQuery({
    // デフォルトとなるURL
    baseUrl: 'https://pokeapi.co/api/v2/'
    // prepareHeadersでヘッダーの指定も可能
  }),
  // storeに登録するときのキー
  reducerPath: 'pokemonApi',
  // サーバーに対して実行する操作(query、mutationの2種類)
  endpoints: (builder) => ({
    // builder.query<レスポンスの型, クエリパラメータの型>
    getPokemonByName: builder.query<Pokemon, string>({
      // クエリパラメータを付与してURLを構築する
      query: (name) => `pokemon/${name}`,
      // queryFnで独自のコールバックを構築することも可能
    }),
  }),
})

// サービス名に基づいてHook関数が自動生成される
// getPokemonByNameでuseQueryを使用する場合、「use + GetPokemonByName + Query」の名前で生成
export const { useGetPokemonByNameQuery } = pokemonApi;

/**
 * 補足: 生成されるHook関数は以下の5種類あるが、標準で使用できるのはuseQury。それ以外は条件あり？みたい
 * useQuery
 * useQuerySubscription
 * useQueryState
 * useLazyQuery
 * useLazyQuerySubscription
 */
