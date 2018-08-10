
/*
* 传参字符串处理，
* 返回对象
* 例如： 传入 '?username=xxx&id=1234'
*       返回 {username: xxx, id: 1234}
* */
export function paraseQuery(query = '') {
  const params = query.replace(/\?/,'');
  const rule = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  const obj = {};
  while (rule.exec(params)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
}

/*
* 给传入的数字添加千分符
* 返回字符串
* 例如： 传入 1233.99
*       返回 '1,233.99'
*
* */
export function comdify(n) {
  const n1 = n.toString();
  const re = /\d{1,3}(?=(\d{3})+$)/g;
  const n2 = n1.replace(/^(\d+)((\.\d+)?)$/,(s,s1,s2) => {return s1.replace(re,"$&,")+s2;});
  return n2;
}

