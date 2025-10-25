/**
 * 汎用的な日付フォーマット関数
 * @param {Date|string|number} date - フォーマットする日付
 * @param {string} format - フォーマット文字列
 * @returns {string} フォーマットされた日付文字列
 */

export const formatDate = (date, format='YYYY-MM-DD') => {
  // Date オブジェクトに変換
  const d = new Date(date);
  
  // 不正な日付の場合はエラー
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  // 日付データを取得
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 0ベースなので+1
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  
  // 曜日の配列
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekDay = weekDays[d.getDay()];
  
  const weekDaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDayEn = weekDaysEn[d.getDay()];
  
  // 月名（英語）
  const monthNamesEn = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthNameEn = monthNamesEn[d.getMonth()];
  
  // フォーマットのマッピング
  const formatMap = {
    // 年
    'YYYY': year.toString(),
    'YY': year.toString().slice(-2),
    
    // 月
    'MM': month.toString().padStart(2, '0'),
    'M': month.toString(),
    'MMM': monthNameEn,
    
    // 日
    'DD': day.toString().padStart(2, '0'),
    'D': day.toString(),
    
    // 曜日
    'ddd': weekDayEn,
    'dd': weekDay,
    
    // 時間
    'HH': hours.toString().padStart(2, '0'),
    'H': hours.toString(),
    'hh': (hours % 12 || 12).toString().padStart(2, '0'),
    'h': (hours % 12 || 12).toString(),
    
    // 分
    'mm': minutes.toString().padStart(2, '0'),
    'm': minutes.toString(),
    
    // 秒
    'ss': seconds.toString().padStart(2, '0'),
    's': seconds.toString(),
    
    // AM/PM
    'A': hours >= 12 ? 'PM' : 'AM',
    'a': hours >= 12 ? 'pm' : 'am'
  };

  // フォーマット文字列を置換
  let result = format;
  
  // 長いパターンから先に処理（例：YYYY の前に YY が処理されないように）
  const sortedKeys = Object.keys(formatMap).sort((a, b) => b.length - a.length);
  
  sortedKeys.forEach(key => {
    result = result.replace(new RegExp(key, 'g'), formatMap[key]);
  });
  
  return result;
}


// フォーマット一覧
/*
    // 基本的な形式
    console.log(formatDate(testDate, 'YYYY-MM-DD')); // 2025-09-03
    console.log(formatDate(testDate, 'YYYY/MM/DD')); // 2025/09/03
    console.log(formatDate(testDate, 'M月D日(dd)')); // 9月3日(水)

    // より詳細な形式
    console.log(formatDate(testDate, 'YYYY年MM月DD日(dd) HH:mm:ss')); // 2025年09月03日(水) 14:30:45
    console.log(formatDate(testDate, 'MMM D, YYYY')); // Sep 3, 2025
    console.log(formatDate(testDate, 'ddd, MMM D YYYY')); // Wed, Sep 3 2025
    console.log(formatDate(testDate, 'h:mm A')); // 2:30 PM
    console.log(formatDate(testDate, 'YY/M/D')); // 25/9/3
*/