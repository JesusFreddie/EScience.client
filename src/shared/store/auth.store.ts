import type { ProfileDto } from "../api/model";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null as ProfileDto | null
    }),
    actions: {
        setProfile(profile: ProfileDto) {
            this.profile = profile
        }
    }
})