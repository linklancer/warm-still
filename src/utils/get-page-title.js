// 此页面用于得到页面标签的
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'warm-still后台管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
