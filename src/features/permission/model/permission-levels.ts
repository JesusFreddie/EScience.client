import { ArticlePermissionLevel } from "~/src/shared/api/model";

export const permissionLevelsLang = [
    {
        value: ArticlePermissionLevel.NUMBER_1,
        label: "PERMISSION.VIEWER"
    },
    {
        value: ArticlePermissionLevel.NUMBER_2,
        label: "PERMISSION.EDITOR_BRANCHES"
    },
    {
        value: ArticlePermissionLevel.NUMBER_3,
        label: "PERMISSION.EDITOR"
    },
]