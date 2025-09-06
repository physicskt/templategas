/**
 * アプリケーション設定ファイル
 * ハードコードされた設定値をここに記述します
 */

// アプリケーション全体で使用する定数値
const CONFIG = {
  // アプリケーション名
  APP_NAME: 'Google Apps Script Template',
  
  // バージョン情報
  VERSION: '1.0.0',
  
  // タイムゾーン設定
  TIMEZONE: 'Asia/Tokyo',
  
  // API関連設定
  API: {
    // API キーやURL などの設定値（実際の値は環境変数やPropertiesServiceを使用することを推奨）
    BASE_URL: '',
    TIMEOUT: 30000
  },
  
  // スプレッドシート関連設定
  SPREADSHEET: {
    // デフォルトシート名
    DEFAULT_SHEET_NAME: 'Sheet1',
    // ログシート名
    LOG_SHEET_NAME: '実行ログ',
    // データシート名
    DATA_SHEET_NAME: 'データ'
  },
  
  // ログ設定
  LOG: {
    // ログレベル
    LEVEL: 'INFO', // DEBUG, INFO, WARNING, ERROR
    // 最大ログ行数
    MAX_ROWS: 20000,
    // 削除後に追加する行数
    APPEND_ROWS: 1000
  },
  
  // 環境設定
  ENVIRONMENT: {
    // 開発環境フラグ
    IS_DEVELOPMENT: true,
    // デバッグモード
    DEBUG_MODE: true
  }
};