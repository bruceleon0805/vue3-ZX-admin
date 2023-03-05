
export enum I18N {
    ZHCN = 'zh-CN',
    EN = 'en'
}

export interface Language {
    name: string,
    el: Record
}


export interface GlobalState {
    isBackEndRoutes: boolean
    local: I18N,
    elLocal: Language
}