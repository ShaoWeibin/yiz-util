import numeral from 'numeral';

export const numberUtil = {
  numberFormat(value: any) {
    if (isNaN(Number(value))) {
      return value;
    }
  
    // 如果是小数则默认保留两位小数
    if (/^\d+\.\d+$/.test(value)) {
      return numeral(value).format('0,0.00');
    }
  
    return numeral(value).format('0,0');
  },
  
  /**
   * 对数字进行千分位处理
   * 正则替换方法
   */
  formatNumber(number: number) {
    if (!number) return 0;
    return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  
  /**
   * 获取数字的转换因子
   * unit 单位
   * scale 换算因子
   */
  getNumFactor (num: number) {
    if (num > 100000000) {
      return {
        unit: '亿',
        scale: 100000000
      };
    }
    if (num > 1000000) {
      return {
        unit: '百万',
        scale: 1000000
      };
    }
    if (num > 10000) {
      return {
        unit: '万',
        scale: 10000
      };
    }
    return {
      unit: '',
      scale: 1
    };
  }
};