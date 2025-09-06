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
 * 
 * 注意: この関数は Google Apps Script のトリガーとして認識される必要があるため、
 * ルートディレクトリに配置する必要があります
 * 実際の実装は z_modules/onOpen.js にあります
 */
function onOpen() {
  // z_modules/onOpen.js で定義された createCustomMenu を直接呼び出し
  createCustomMenu();
}