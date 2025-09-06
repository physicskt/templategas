/**
 * Google Apps Script onOpen トリガー関数
 * 
 * 注意: この関数は Google Apps Script のトリガーとして認識される必要があるため、
 * ルートディレクトリに配置する必要があります
 * 実際の実装は z_modules/onOpen.js にあります
 */

/**
 * スプレッドシートが開かれた時に実行される関数
 * z_modules/onOpen.js の実装を呼び出します
 */
function onOpen() {
  try {
    Logger.log('onOpenイベントが実行されました');
    
    // カスタムメニューの作成（z_modules/onOpen.js で定義）
    createCustomMenu();
    
    // アプリケーションの初期化（必要に応じて）
    if (CONFIG.ENVIRONMENT.IS_DEVELOPMENT) {
      Logger.log('開発モードでonOpenが実行されました');
    }
    
  } catch (error) {
    Logger.log(`onOpenでエラーが発生しました: ${error.toString()}`);
  }
}