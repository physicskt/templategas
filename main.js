/**
 * メインエントリーポイント
 * アプリケーションの主要な処理フローを定義します
 */

/**
 * アプリケーションの初期化処理
 */
function initializeApp() {
  try {
    Logger.log('アプリケーションの初期化を開始します');
    
    // 設定の読み込み
    const config = CONFIG;
    Logger.log(`アプリケーション名: ${config.APP_NAME} v${config.VERSION}`);
    
    // 必要なシートの確認・作成
    setupSheets();
    
    // ログシステムの初期化
    LogManager.initialize();
    LogManager.info('アプリケーションが正常に初期化されました');
    
    Logger.log('アプリケーションの初期化が完了しました');
    
  } catch (error) {
    Logger.log(`初期化エラー: ${error.toString()}`);
    throw error;
  }
}

/**
 * 必要なシートの確認・作成
 */
function setupSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // ログシートの確認・作成
  let logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
  if (!logSheet) {
    logSheet = spreadsheet.insertSheet(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
    // ヘッダー行を設定
    logSheet.getRange(1, 1, 1, 3).setValues([['実行日時', 'レベル', 'メッセージ']]);
    Logger.log(`${CONFIG.SPREADSHEET.LOG_SHEET_NAME}シートを作成しました`);
  }
}

/**
 * メイン処理実行
 * 外部トリガーから呼び出される主要な処理
 */
function runMainProcess() {
  try {
    LogManager.info('メイン処理を開始します');
    
    // ここにメインの処理ロジックを記述
    // 例: データ処理、API呼び出し、レポート生成など
    
    LogManager.info('メイン処理が正常に完了しました');
    
  } catch (error) {
    LogManager.error(`メイン処理でエラーが発生しました: ${error.toString()}`);
    throw error;
  }
}

/**
 * 手動実行用の関数
 * スクリプトエディタから直接実行できます
 */
function testRun() {
  try {
    initializeApp();
    runMainProcess();
    Logger.log('テスト実行が完了しました');
  } catch (error) {
    Logger.log(`テスト実行でエラーが発生しました: ${error.toString()}`);
  }
}

/**
 * タイマートリガー用の関数
 * 定期実行される処理
 */
function onTimerTrigger() {
  try {
    LogManager.info('タイマートリガーが実行されました');
    runMainProcess();
  } catch (error) {
    LogManager.error(`タイマートリガーでエラーが発生しました: ${error.toString()}`);
  }
}