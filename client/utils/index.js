// @ts-check
import Link from 'next/link';
import { v4 } from 'uuid';

export const bgColor = {
  light: 'white',
  dark: '#1A202C',
};

export const NextLink = Link;
export const uuidv4 = v4;

/**
 * Set cookie
 *
 * @param {{key: string, value: string, path?: string, secure?: boolean, samesite?: boolean; expires?: number}} opts
 */
export const setCookie = opts => {
  if (typeof window === 'undefined') {
    return false;
  }

  const date = new Date();
  date.setTime(date.getTime() + (opts.expires || 1) * 60 * 60 * 1000);

  const duration = date.toUTCString();

  let cookieString = `${opts.key}=${opts.value};path=${opts.path || '/'};expires=${duration};`;

  opts.secure && (cookieString += 'secure;');
  opts.samesite && (cookieString += 'samesite;');

  document.cookie = cookieString;

  return true;
};

/**
 * Read cookie value from cookies
 *
 * @param {string} key - key to read from cookies
 */
export const getCookie = (key, cookieString = '') => {
  const c = decodeURIComponent(typeof window === 'undefined' ? cookieString : document.cookie);
  let d;

  const e = {};
  if (c.length < 1) {
    return false;
  }
  if (c.indexOf(';') !== -1) {
    d = c.split(';');
  } else {
    d = c;
  }

  if (typeof d === 'string') {
    e[d.split('=')[0].trim()] = d.split('=')[1].trim();
  } else {
    d.map(p => (e[p.split('=')[0].trim()] = p.split('=')[1].trim()));
  }

  if (typeof key !== 'undefined') {
    return e[key];
  }

  return e;
};

/**
 * Delete a cookie from browser cookies
 *
 * @export
 * @param {string} cookie
 * @returns
 */
export function deleteCookie(cookie) {
  return (document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
}

/**
 * Format currency into human readable format
 *
 * @param {{currency: 'USD' |'KSH'| 'UGH'| 'TZS'; value: number}} param0
 */
export const formatCurrency = ({ currency, value }) => Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value || 0);
