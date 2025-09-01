# Google Apps Script プロジェクト構成

このドキュメントは、推奨されるGoogle Apps Scriptプロジェクトのファイルとフォルダの構成について概説します。

## プロジェクトルート
プロジェクトのルートディレクトリには、主要な設定ファイルとスクリプトファイルが含まれます。

### config.js
ハードコードされた設定値はトップレベルのconfig.jsに記述してください

### `z_modules/`
このフォルダは、プロジェクトで使用されるすべての **JavaScriptモジュール** を格納するために指定されています。

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
