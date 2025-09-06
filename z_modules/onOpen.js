/**
 * onOpenモジュール
 * スプレッドシートが開かれた時に自動実行されるonOpenイベントによるメニュー生成関数を定義します
 * 注意: このモジュールはclass化する必要はありません（関数ベースで実装）
 */

/**
 * カスタムメニューを作成する関数
 * ルートのonOpen.jsから呼び出されます
 */
function createCustomMenu() {
  try {
    Logger.log('onOpenイベントが実行されました');
    
    const ui = SpreadsheetApp.getUi();
    
    // メインメニューの作成
    const mainMenu = ui.createMenu(CONFIG.APP_NAME);
    
    // メニュー項目の追加
    mainMenu.addItem('🚀 アプリケーション初期化', 'initializeApp');
    mainMenu.addItem('▶️ メイン処理実行', 'runMainProcess');
    mainMenu.addSeparator();
    
    // 設定サブメニュー
    const settingsMenu = ui.createMenu('⚙️ 設定');
    settingsMenu.addItem('📊 ログ表示', 'showLogSheet');
    settingsMenu.addItem('🗑️ ログクリア', 'clearLogs');
    settingsMenu.addItem('ℹ️ アプリケーション情報', 'showAppInfo');
    
    mainMenu.addSubMenu(settingsMenu);
    mainMenu.addSeparator();
    
    // テスト・デバッグメニュー（開発モード時のみ）
    if (CONFIG.ENVIRONMENT.DEBUG_MODE) {
      const debugMenu = ui.createMenu('🔧 デバッグ');
      debugMenu.addItem('🧪 テスト実行', 'testRun');
      debugMenu.addItem('📝 設定確認', 'showConfig');
      debugMenu.addItem('💾 シート設定', 'setupSheets');
      
      mainMenu.addSubMenu(debugMenu);
    }
    
    // ヘルプメニュー
    mainMenu.addSeparator();
    mainMenu.addItem('❓ ヘルプ', 'showHelp');
    
    // メニューをスプレッドシートに追加
    mainMenu.addToUi();
    
    // アプリケーションの初期化（必要に応じて）
    if (CONFIG.ENVIRONMENT.IS_DEVELOPMENT) {
      Logger.log('開発モードでonOpenが実行されました');
    }
    
    Logger.log('カスタムメニューが作成されました');
    
  } catch (error) {
    Logger.log(`onOpenでエラーが発生しました: ${error.toString()}`);
  }
}

/**
 * ログシートを表示する関数
 */
function showLogSheet() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
    
    if (logSheet) {
      spreadsheet.setActiveSheet(logSheet);
      SpreadsheetApp.getUi().alert('ログシート', 'ログシートを表示しました', SpreadsheetApp.getUi().ButtonSet.OK);
    } else {
      SpreadsheetApp.getUi().alert('エラー', 'ログシートが見つかりません。先にアプリケーションを初期化してください。', SpreadsheetApp.getUi().ButtonSet.OK);
    }
  } catch (error) {
    SpreadsheetApp.getUi().alert('エラー', `ログシートの表示でエラーが発生しました: ${error.toString()}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * ログをクリアする関数
 */
function clearLogs() {
  try {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert('確認', 'ログをクリアしますか？この操作は元に戻せません。', ui.ButtonSet.YES_NO);
    
    if (response === ui.Button.YES) {
      LogManager.clearLogs();
      ui.alert('完了', 'ログがクリアされました', ui.ButtonSet.OK);
    }
  } catch (error) {
    SpreadsheetApp.getUi().alert('エラー', `ログクリアでエラーが発生しました: ${error.toString()}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * アプリケーション情報を表示する関数
 */
function showAppInfo() {
  try {
    const info = `
アプリケーション名: ${CONFIG.APP_NAME}
バージョン: ${CONFIG.VERSION}
タイムゾーン: ${CONFIG.TIMEZONE}
開発モード: ${CONFIG.ENVIRONMENT.IS_DEVELOPMENT ? 'ON' : 'OFF'}
デバッグモード: ${CONFIG.ENVIRONMENT.DEBUG_MODE ? 'ON' : 'OFF'}
    `.trim();
    
    SpreadsheetApp.getUi().alert('アプリケーション情報', info, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (error) {
    SpreadsheetApp.getUi().alert('エラー', `アプリケーション情報の表示でエラーが発生しました: ${error.toString()}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * 設定情報を表示する関数（デバッグ用）
 */
function showConfig() {
  try {
    const configStr = JSON.stringify(CONFIG, null, 2);
    Logger.log('現在の設定:');
    Logger.log(configStr);
    SpreadsheetApp.getUi().alert('設定確認', '設定情報をログに出力しました。実行ログを確認してください。', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (error) {
    SpreadsheetApp.getUi().alert('エラー', `設定確認でエラーが発生しました: ${error.toString()}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * ヘルプを表示する関数
 */
function showHelp() {
  try {
    const helpText = `
${CONFIG.APP_NAME} v${CONFIG.VERSION}

基本的な使い方:
1. 「アプリケーション初期化」でアプリを初期化
2. 「メイン処理実行」でメイン処理を実行
3. 「設定」→「ログ表示」でログを確認

詳細なドキュメントは README.md をご確認ください。
    `.trim();
    
    SpreadsheetApp.getUi().alert('ヘルプ', helpText, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (error) {
    SpreadsheetApp.getUi().alert('エラー', `ヘルプ表示でエラーが発生しました: ${error.toString()}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}