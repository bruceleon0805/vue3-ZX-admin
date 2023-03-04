
export enum I18N {
    ZHCN = 'zh-cn',
    EN = 'en'
}

export interface GlobalState{
    isBackEndRoutes:boolean
    i18n: I18N
}