import { RouteRecordRaw } from "vue-router";

export interface MenuRoutesState {
    menuRoutes: RouteRecordRaw[],
    breadCrumb: {
        breadList: RouteRecordRaw[],
        first_: string
    }
}