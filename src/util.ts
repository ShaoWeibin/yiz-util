import * as lodash from 'lodash';

function noop() { }

/**
 * 打开新标签页
 * @param link
 * @param filename
 */
function openUrl(link: string, target?: string) {
  var a = document.createElement('a');
  a.setAttribute('href', link);
  a.setAttribute('target', target ? target : '_blank');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a));
}

const filterEmpty = (obj: { [key: string]: string } = {}) => {
  const newObj: { [key: string]: string } = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== '') {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

function isUrl(path: string) {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
  return reg.test(path);
}

export const util = {
  openUrl,
  filterEmpty,
  isUrl,
  ensureFunction(fn: any) {
    return typeof fn === 'function' ? fn : noop;
  },
  ensureArray(arr: any) {
    return Array.isArray(arr) ? arr : [];
  },
  cloneDeep(value: any): any {
    return lodash.cloneDeep(value);
  },
  pick(obj: object, props: string[]) {
    return lodash.pick(obj, props);
  },
  getValue(obj: object, path: string) {
    return lodash.get(obj, path);
  },
  isEqual(value: any, other: any) {
    return lodash.isEqual(value, other);
  },
  isEmpty(value: any) {
    return lodash.isEmpty(value);
  },
  debounce(fn: (...args: any) => any, wait: number) {
    return lodash.debounce(fn, wait);
  },
};