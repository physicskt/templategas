# Google Apps Script プロジェクト構成

このドキュメントは、推奨されるGoogle Apps Scriptプロジェクトのファイルとフォルダの構成について概説します。

## プロジェクトルート
プロジェクトのルートディレクトリには、主要な設定ファイルとスクリプトファイルが含まれます。

### config.js
ハードコードされた設定値はトップレベルのconfig.jsに記述してください

### main.js


### `z_modules/`
このフォルダは、プロジェクトで使用されるすべての **JavaScriptモジュール** を格納するために指定されています。

### onOpen.js
onOpenモジュールは、スプレッドシートが開かれた時に自動実行される処理を定義します。
- カスタムメニューの追加
- 初期化処理の実行
- スプレッドシートの基本設定
- ユーザーインターフェースの準備

### log.js
- ログ出力に関する設定や関数を定義します。
- ログのフォーマットは 2025/03/18 07:29:27	test logging のような形で、[実行ログ]シートの A列に日時、B列に[INFO, ERROR, WARNING, DEBUG]のいづれか、 C列にログ内容を記録する。
- シートがなければ自動で作成される。２行目からログが追加される。
- ログの最大行数は20000行。
- 最大行数を超えたら古いログを削除。そのあとシート末尾に1000行追加する。
- ログとしては、情報ログ、警告ログ、エラーログの3種類を出力。

### `test/`
このフォルダには、**テスト目的** で書かれたすべてのJavaScriptファイルが格納されます。

### mdフォルダについて
mdフォルダはMarkdownファイルを管理するためのディレクトリです。ドキュメントや説明書、仕様書などのMarkdown形式のファイルを格納します。

## モジュールの設計原則

### カプセル化の推奨
全体的なモジュールに関して、以下の設計原則を推奨します：

- **クラスベースの設計**: 機能をクラスとしてカプセル化し、関連するプロパティとメソッドをまとめる
- **名前空間の管理**: グローバルスコープの汚染を避け、適切な名前空間を使用する
- **単一責任の原則**: 各クラス・モジュールは単一の責任を持つよう設計する
- **依存関係の明確化**: モジュール間の依存関係を明確にし、疎結合を保つ
- **再利用性の向上**: 汎用的なクラス設計により、コードの再利用性を高める

```javascript
// 例: カプセル化されたモジュール設計
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

## ファイルの内容テンプレート

### `.clasp.json`
```json
{
  "scriptId": "GAS script ID",
  "rootDir": "",
  "scriptExtensions": [
    ".js",
    ".gs"
  ],
  "htmlExtensions": [
    ".html"
  ],
  "jsonExtensions": [
    ".json"
  ],
  "filePushOrder": [],
  "skipSubdirectories": false,
  "sps1": "スプレッドシートURL",
  "sps2": "スプレッドシートURL",
  "sps3": "スプレッドシートURL"
}
```

### `.appsscript.json`
```json

{
  "timeZone": "Asia/Tokyo",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "access": "ANYONE",
    "executeAs": "USER_DEPLOYING"
  }
}
```
