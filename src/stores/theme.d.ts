

export enum componentSize {
    'large',
    'default',
    'small'
}


export interface ThemeParams {
    isCollapse: boolean,
    transitionName: string,
    componentSize: componentSize.default
}