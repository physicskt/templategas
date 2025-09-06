# z_modules

このフォルダは、プロジェクトで使用されるすべての **JavaScriptモジュール** を格納するために指定されています。

## 特徴
- 再利用可能な機能をモジュール化
- 特定の機能領域ごとにファイルを分割
- クラスベースの設計を推奨

## モジュール例
```javascript
// 例: DataManager.js
class DataManager {
  constructor(sheetName) {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  }
  
  getData() {
    // データ取得処理
  }
  
  saveData(data) {
    // データ保存処理
  }
}
```

このフォルダに新しいモジュールを追加してください。