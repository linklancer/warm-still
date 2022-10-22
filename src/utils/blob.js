// 数据处理封装函数
export const SolveBlob = (blob) => {
  // 对浏览器进行兼容处理
  const windowUrl = window.URL || window.webkitURL
  // 声明一个接受blob数据的数组,这里采用数组的形式，是因为现在chrom的v8引擎不兼容以前直接传入数据的写法
  const blobData = []
  // 向数组添加数据
  blobData.push(blob)
  // 对文件流数据进行处理
  return windowUrl.createObjectURL(new Blob(blobData))
}
