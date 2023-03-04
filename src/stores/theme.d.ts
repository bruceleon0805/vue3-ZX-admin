

/**
 * 组件大小
 */
export enum componentSize {
    LARGE = 'large',
    DEFAULT = 'default',
    SMALL = 'small'
}





export interface ThemeParams {
    isCollapse: boolean,
    transitionName: string,
    componentSize: componentSize
}