// Reactをimportしないと.tsxは動かない
import React from "react"
// こいつは俺も知らん
import ReactDOM from "react-dom/client"
// スタイルファイル
import "./index.css"
// 知らん
import reportWebVitals from "./reportWebVitals"
// reduxという機能を使うためのもの
// Providerでくくると，その中でreduxという機能が使えるようになる
import { Provider } from "react-redux"
// redux-persistを使うためのもの
import { PersistGate } from "redux-persist/integration/react"

// reduxで使うstoreをstore/store.tsで作成しているため，それをimpoetしている
import { store, persistor } from "./store/store"
// Reactコンポーネント，コンポーネントというのは，Webページの一部（検索フォームとかボタンとか）のこと．
// おれがつくった
import AsyncApp from "./AsyncApp"

// index, AsyncApp.tsx, storeフォルダ内が理解できたら完璧
// 最初は，何がなんだかわからないから，なんでも質問して
// 基礎ではあるけど，初心者がやるようなチュートリアルではないから
// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////
// vscodeのターミナルbashでもなんでもいいが，npm run startでlocalhost:300が立ち上がり動作が見れる
// ///////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////

// 知らん
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // Reactのstrictモードを使うということ
  // こいつでくくるとstrictモードを使うということ，基本的にこれだから，それ以外のモードは知らない
  <React.StrictMode>
    {/* このProviderでくくるとそのなかで，reduxのstoreを使えるようになる
      storeというのは，変数の集まりみたいなもので，function(a, b){}のようにいちいち引数を受け取る方式で関数を書かなくて良くなる
      例えば，function(){ a = useAppSelector(state => state.a)}のようにuseSelectorを使うことで変数を取得できる
    */}
    <Provider store={store}>
      {/* redux-persistを使うためのもの．こいつの理解優先度はかなり低い．無視． */}
      <PersistGate loading={null} persistor={persistor}>
        <AsyncApp />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
