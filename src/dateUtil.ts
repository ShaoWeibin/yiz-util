import moment, { Moment } from 'moment';

const FORMAT_MAP: { [key: string]: string } = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
};

export const dateUtil = {
  format(date: number | string | Date, format: string = 'date') {
    if (!date) {
      return date;
    }
    return moment(date).format(FORMAT_MAP[format] || format);
  },

  fromNow(date: string | Date | number) {
    return moment(date).fromNow();
  },

  now() {
    return moment();
  },

  moment(date: number | string | Date) {
    return moment(date);
  },

  min(m1: Moment, m2: Moment) {
    return moment.min(m1, m2);
  },

  /**
   * 仅获取日期部分转换为时间戳
   */
  getDateValue(data: any) {
    return moment(this.format(data, 'date')).valueOf();
  },

  /**
   * dt1 - dt2 as days.
   */
  diffDate(dt1: number, dt2: number) {
    const dt1Val = moment(this.format(dt1, 'date'));
    const dt2Val = moment(this.format(dt2, 'date'));
    return moment.duration(dt1Val.diff(dt2Val)).asDays();
  },

  /**
   * 获取两时间戳之间的时间差
   */
  timeDiff(startStamp: string | Date | number, endStamp: string | Date | number) {
    const start = moment(startStamp);
    const end = moment(endStamp);

    return {
      days: end.diff(start, 'days'),
      hours: end.diff(start, 'hours') % 24,
      minutes: end.diff(start, 'minutes') % 60,
      seconds: end.diff(start, 'seconds') % 60
    };
  },

  /**
   * 获取最近某几年时间区间
   * 近一年
   */
  getNearDateRangeByYear(year: number, startType?: number) {
    const now = new Date();
    const nowYear = now.getFullYear();
    return [moment(`${nowYear - year + 1}-01-01 00:00:00`), moment(`${nowYear}-12-31 23:59:59`)];
  },

  /**
   * 获取最近某几个月时间区间
   * 如近三月
   */
  getNearDateRangeByMonth(month: number, startType?: number) {
    const now = startType
      ? startType > 0
        ? moment().add(startType, 'days')
        : moment().subtract(Math.abs(startType), 'days')
      : new Date();
    const beginDate = moment(now).subtract(month, 'months');

    return [
      moment(`${beginDate.format('YYYY-MM-DD')} 00:00:00`),
      moment(moment(`${moment(now).format('YYYY-MM-DD')} 23:59:59`)),
    ];
  },

  /**
   * 获取最近某几个天时间区间
   * 如近7天，30天
   * 从哪天开始,-1 = t-1, 1=t+1
   */
  getDateRange(day: number, startType?: number) {
    const now = startType
      ? startType > 0
        ? moment().add(startType, 'days')
        : moment().subtract(Math.abs(startType), 'days')
      : new Date();
    const beginDate = moment(now).subtract(day, 'days');

    return [
      moment(`${beginDate.format('YYYY-MM-DD')} 00:00:00`),
      moment(moment(`${moment(now).format('YYYY-MM-DD')} 23:59:59`)),
    ];
  },

  /**
   * 获取最近某几个月时间区间
   */
  getNearDateRangeByType(type: 'year' | 'month' | 'day', dis: number, startType?: number) {
    if (type === 'year') {
      return this.getNearDateRangeByYear(dis);
    }

    if (type === 'day') {
      return this.getDateRange(dis, startType);
    }

    return this.getNearDateRangeByMonth(dis, startType);
  },

  // 获取day天前的日期
  subtract(day: number) {
    return moment().subtract(day, 'days');
  },
};
