/**
 * ログ出力に関する設定や関数を定義します
 * ログのフォーマット: 2025/03/18 07:29:27	test logging
 * [実行ログ]シートの A列に日時、B列に[INFO, ERROR, WARNING, DEBUG]のいづれか、C列にログ内容を記録
 */

/**
 * ログ管理クラス
 */
class LogManager {
  
  /**
   * ログシステムを初期化
   */
  static initialize() {
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      let logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
      
      // シートがなければ作成
      if (!logSheet) {
        logSheet = spreadsheet.insertSheet(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
        // ヘッダー行を設定
        logSheet.getRange(1, 1, 1, 3).setValues([['実行日時', 'レベル', 'メッセージ']]);
        logSheet.getRange(1, 1, 1, 3).setFontWeight('bold');
        logSheet.setFrozenRows(1);
      }
      
      // ログ行数チェックと整理
      this.checkAndCleanupLogs();
      
    } catch (error) {
      Logger.log(`ログ初期化エラー: ${error.toString()}`);
      throw error;
    }
  }
  
  /**
   * 情報ログを出力
   * @param {string} message - ログメッセージ
   */
  static info(message) {
    this.writeLog('INFO', message);
  }
  
  /**
   * 警告ログを出力
   * @param {string} message - ログメッセージ
   */
  static warning(message) {
    this.writeLog('WARNING', message);
  }
  
  /**
   * エラーログを出力
   * @param {string} message - ログメッセージ
   */
  static error(message) {
    this.writeLog('ERROR', message);
  }
  
  /**
   * デバッグログを出力
   * @param {string} message - ログメッセージ
   */
  static debug(message) {
    if (CONFIG.ENVIRONMENT.DEBUG_MODE) {
      this.writeLog('DEBUG', message);
    }
  }
  
  /**
   * ログを実際にシートに書き込む
   * @param {string} level - ログレベル (INFO, WARNING, ERROR, DEBUG)
   * @param {string} message - ログメッセージ
   */
  static writeLog(level, message) {
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
      
      if (!logSheet) {
        Logger.log('ログシートが見つかりません。初期化してください。');
        return;
      }
      
      // 現在の日時を取得（日本時間）
      const now = new Date();
      const timestamp = Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyy/MM/dd HH:mm:ss');
      
      // 最後の行を取得
      const lastRow = logSheet.getLastRow();
      const nextRow = lastRow + 1;
      
      // ログ行数チェック
      if (nextRow > CONFIG.LOG.MAX_ROWS) {
        this.cleanupOldLogs();
      }
      
      // ログデータを書き込み
      const logData = [timestamp, level, message];
      logSheet.getRange(nextRow, 1, 1, 3).setValues([logData]);
      
      // レベルに応じて色分け
      const range = logSheet.getRange(nextRow, 2);
      switch (level) {
        case 'ERROR':
          range.setBackground('#ffebee');
          range.setFontColor('#c62828');
          break;
        case 'WARNING':
          range.setBackground('#fff3e0');
          range.setFontColor('#ef6c00');
          break;
        case 'DEBUG':
          range.setBackground('#f3e5f5');
          range.setFontColor('#7b1fa2');
          break;
        default: // INFO
          range.setBackground('#e8f5e8');
          range.setFontColor('#2e7d32');
      }
      
      // 標準ログにも出力
      Logger.log(`[${level}] ${message}`);
      
    } catch (error) {
      Logger.log(`ログ書き込みエラー: ${error.toString()}`);
    }
  }
  
  /**
   * ログ行数をチェックし、必要に応じて整理
   */
  static checkAndCleanupLogs() {
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
      
      if (!logSheet) return;
      
      const lastRow = logSheet.getLastRow();
      
      // 最大行数を超えている場合はクリーンアップ
      if (lastRow > CONFIG.LOG.MAX_ROWS) {
        this.cleanupOldLogs();
      }
      
    } catch (error) {
      Logger.log(`ログチェックエラー: ${error.toString()}`);
    }
  }
  
  /**
   * 古いログを削除し、新しい行を追加
   */
  static cleanupOldLogs() {
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
      
      if (!logSheet) return;
      
      const lastRow = logSheet.getLastRow();
      
      // ヘッダー行を除いて古いログを削除
      if (lastRow > 1) {
        const deleteRows = lastRow - CONFIG.LOG.APPEND_ROWS;
        if (deleteRows > 0) {
          logSheet.deleteRows(2, deleteRows);
          Logger.log(`古いログ ${deleteRows} 行を削除しました`);
        }
      }
      
      // 新しい行を末尾に追加
      logSheet.insertRowsAfter(logSheet.getLastRow(), CONFIG.LOG.APPEND_ROWS);
      Logger.log(`新しいログ用に ${CONFIG.LOG.APPEND_ROWS} 行を追加しました`);
      
    } catch (error) {
      Logger.log(`ログクリーンアップエラー: ${error.toString()}`);
    }
  }
  
  /**
   * すべてのログをクリア
   */
  static clearLogs() {
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
      
      if (!logSheet) return;
      
      // ヘッダー行以外をすべて削除
      const lastRow = logSheet.getLastRow();
      if (lastRow > 1) {
        logSheet.deleteRows(2, lastRow - 1);
      }
      
      Logger.log('すべてのログがクリアされました');
      
    } catch (error) {
      Logger.log(`ログクリアエラー: ${error.toString()}`);
    }
  }
  
  /**
   * ログ統計を取得
   * @return {Object} ログ統計情報
   */
  static getLogStats() {
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
      
      if (!logSheet) {
        return { total: 0, info: 0, warning: 0, error: 0, debug: 0 };
      }
      
      const lastRow = logSheet.getLastRow();
      
      if (lastRow <= 1) {
        return { total: 0, info: 0, warning: 0, error: 0, debug: 0 };
      }
      
      // ログレベル列のデータを取得
      const levels = logSheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
      
      const stats = {
        total: levels.length,
        info: levels.filter(level => level === 'INFO').length,
        warning: levels.filter(level => level === 'WARNING').length,
        error: levels.filter(level => level === 'ERROR').length,
        debug: levels.filter(level => level === 'DEBUG').length
      };
      
      return stats;
      
    } catch (error) {
      Logger.log(`ログ統計取得エラー: ${error.toString()}`);
      return { total: 0, info: 0, warning: 0, error: 0, debug: 0 };
    }
  }
  
  /**
   * 指定期間のログを取得
   * @param {Date} startDate - 開始日時
   * @param {Date} endDate - 終了日時
   * @return {Array} ログデータの配列
   */
  static getLogsByDateRange(startDate, endDate) {
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const logSheet = spreadsheet.getSheetByName(CONFIG.SPREADSHEET.LOG_SHEET_NAME);
      
      if (!logSheet) return [];
      
      const lastRow = logSheet.getLastRow();
      if (lastRow <= 1) return [];
      
      const allData = logSheet.getRange(2, 1, lastRow - 1, 3).getValues();
      
      return allData.filter(row => {
        const logDate = new Date(row[0]);
        return logDate >= startDate && logDate <= endDate;
      });
      
    } catch (error) {
      Logger.log(`日付範囲ログ取得エラー: ${error.toString()}`);
      return [];
    }
  }
}