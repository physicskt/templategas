# test

このフォルダには、**テスト目的** で書かれたすべてのJavaScriptファイルが格納されます。

## 内容
- 単体テスト関数の定義
- テストデータの管理
- モックオブジェクトの作成

## テスト例
```javascript
// 例: test_main.js
function testMainFunction() {
  try {
    // テストコード
    Logger.log('テスト成功');
  } catch (error) {
    Logger.log(`テスト失敗: ${error.toString()}`);
  }
}
```

このフォルダにテストファイルを追加してください。