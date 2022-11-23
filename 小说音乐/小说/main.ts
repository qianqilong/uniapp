import App from './App'
import { createSSRApp } from 'vue'
import globalIcon from './components/global/global-icon.vue'
import globalListHeader from './components/global/global-list-header.vue'
import globalPageTitle from './components/global/global-page-title.vue';
import globalPopup from './components/global/global-popup.vue'
import globalLeftList from './components/global/global-left-list.vue'
import store from './store'

declare module 'vue' {
  export interface ComponentCustomProperties {
   $height: number
  }
}

export function createApp() {
  const app = createSSRApp(App)
  app.component('global-icon',globalIcon)
  .component('global-listHeader',globalListHeader)
  .component('global-pageTitle',globalPageTitle)
  .component('global-popup',globalPopup)
  .component('global-leftList',globalLeftList)
  .use(store)
  app.config.globalProperties.$height = uni.getSystemInfoSync().statusBarHeight
  return {
    app
  }
}