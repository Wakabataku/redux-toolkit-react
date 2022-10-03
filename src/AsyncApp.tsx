// .tsxでは，Reactを必ず読み込む
import React from "react"
// storeで作成したuseAppSelectorとuseAppDIspatchをimport
// ここら辺は，redux selectorとかdispatchでググると出てくる
import { AppDispatch, useAppSelector } from "./store/store"
import { useDispatch } from "react-redux"
// reduxでは，actionをdispatchする
// dispatchすることで，store内で変数を使えるようになる
// index.tsxでくくったProvider内で使えるともいう
// AAsyncAppはそこに含まれているので，useAppSelectorでstoreにアクセスできる
import { addition, subtraction } from "./store/counterSlice"
// このBoxは気にしなくていい
import { Box } from "@mui/material"

// 非同期のaction
// reduxでは，非同期で変数をセットするためのactionをdispatchできる
// 何度も書くけど，actionをdispatchすることで，store内で変数を使える
// a=1でも，新たにa=2をactionとして，dispatchすることで，
// 次回からは，selectorを使って，a=2を取得できる
import { twoAsyncCount } from "./store/asyncCounterSlice"
// resux-persistの話．優先度低い
import { persistor } from "./store/store"
// reduxでは，配列もdispatchできる
// 配列のdispatch方法は工夫が必要なので，arrayCoutnerのcreateSlice内，arrayAdditionを参照
import { arrayAddition } from "./store/arrayCounter"

// typescriptでは，返り値に型を指定できる
// 1とか2はnumber型，あいうえお，abcはstring型とtypescript上で定められている．変数のとなりにコロン(:)があれば，型を意味している
// 今回のAsyncAppはReact.FC型．Reactをつくっている人が新たに型を宣言して，作ってくれたんだね
// また，jsvascriptやtypescriptでは，アロー関数という書き方をすることが多い．ぶっちゃけ好み
//function minus(a, b) {return a-b}は，const minus = (a, b) => {return a-b}と同じ意味．習うより慣れろ感すごい
const AsyncApp: React.FC = () => {
  // これがselector
  // state.counter.countOneという変数にアクセスしている
  // 別にAsyncAppは何も引数とっていないのに，グローバル変数みたいに使えるなんて，便利
  // グローバル変数と違って，selectorを使わなければ，読み込まれないから軽い
  const count = useAppSelector((state) => state.counter.countOne)
  const twoCount = useAppSelector((state) => state.twoCounter)
  const arrayCount = useAppSelector((state) => state.arrayCounter.arrayCount)
  // dispatchするための関数
  const dispatch: AppDispatch = useDispatch()

  // redux-persistの話
  // 無視
  const onClickPurge = () => {
    console.log("localdataをpurge")
    persistor.purge()
  }

  return (
    // これらの<></>はhtmltの書き方．html, cssを知っていると楽
    <div className="App">
      <Box sx={{ m: 2 }}>
        <h1>Count: {count}</h1>
        {/* ボタンコンポーネント onClickでタッチしたりクリックしたときの挙動を定義している
          () => 何とか~    となっているのは，クリックされたら引数をとらない関数で，「何とか」という処理をしてねという意味
          今回は，dispatchしてねということ
          何を？addition(~)を中身は1です
          つまり，additionという動作をしてね．そのときに使う変数は1だよということ
          今回のadditionはプラスなので+1となる．counterSlicew参照
        */}
        <button onClick={() => dispatch(addition(1))}>Up</button>
        <button onClick={() => dispatch(subtraction(1))}>Down</button>
        <button onClick={() => onClickPurge()}>Purge</button>
      </Box>
      <Box sx={{ m: 3 }}>
        <h1>Async Count: {twoCount.count}</h1>
        <h1>Async Message: {twoCount.message}</h1>
        {/* とりあえずここまで，後は随時追加していく */}
        <button
          onClick={() =>
            dispatch(
              twoAsyncCount({
                count: 2,
                message: "2 Up!",
              })
            )
          }
        >
          Up
        </button>
        <button
          onClick={() =>
            dispatch(
              twoAsyncCount({
                count: -2,
                message: "2 Down!",
              })
            )
          }
        >
          Down
        </button>
        <button onClick={() => onClickPurge()}>Purge</button>
      </Box>
      <Box sx={{ m: 2 }}>
        <h1>ArrayCount: {arrayCount}</h1>
        <button onClick={() => dispatch(arrayAddition([1, 2, 3]))}>
          [1,2, 3]
        </button>
        <button onClick={() => dispatch(arrayAddition([1, 2]))}>[1,2]</button>
      </Box>
    </div>
  )
}

export default AsyncApp
