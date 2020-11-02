// 引入路由和storage工具函数
import storage from '@/util/storage'
import router from "@/router/index"

let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
let timeOut = 6 * 1000  // 設定超時時間: 6 秒

window.onload = function () {
  window.document.onmousedown = function () {
    stroage.setItem("lastTime", new Date().getTime())
  }
};

function checkTimeout() {
  currentTime = new Date().getTime()		//更新當前時間
  lastTime = stroage.getItem("lastTime");

  if (currentTime - lastTime > timeOut) { //判斷是否逾時
    // 清除storage的數據(登入訊息和token)
    storage.clear()
    // 跳轉登入頁
    if (router.currentRouter.name == 'login') return // 當前是登入頁面不做跳轉
    router.push({ name: 'login' })
  }
}

export default function () {
  /* 定時器 間格6秒檢查是否長時間為操作頁面 */
  window.setInterval(checkTimeout, 6000);
}
