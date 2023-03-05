import type { I18N } from "@/stores/global"

export const setHtmlPageLang = (locale: I18N) => {
    document.querySelector('html')?.setAttribute('lang', locale)
  }
  