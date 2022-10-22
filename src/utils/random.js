export const getRandom = () => {
  const x = 1; const y = 10000
  let result = ''
  // Math.round()是对数字进行四舍五入
  // Math.random是获取0到1.0之间的随机数
  result = Math.round(Math.random() * (y - x) + x).toString()

  return result
  // 创建26个字母数组
//     let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//     let idvalue ='';
//     let n = 4;//这个值可以改变的，对应的生成多少个字母，根据自己需求所改
//     for(let i=0;i<n;i++){
//        idvalue += arr[Math.floor(Math.random()*26)];
//     }
//     return idvalue;
}
