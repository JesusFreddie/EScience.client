import { ArticlePermissionLevel } from "~/src/shared/api/model"
import { permissionLevelsLang } from "../../permission/model/permission-levels"

export function usePermissionLevels() {
    const { t } = useI18n()

    const permission = computed(() => {
        return permissionLevelsLang.map((item) => {
            return {
                value: item.value,
                label: t(item.label)
            }
        })
    })

    return { permission }
}