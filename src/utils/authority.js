// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return (getToken() && 'user') || 'guest';
}

export function setAuthority(authority) {
  return localStorage.setItem('qb-authority', authority);
}

// 获取当前权限
export function getToken() {
  return localStorage.getItem('qb-authority') || '7fcca3720bcd08e9d423';
}
