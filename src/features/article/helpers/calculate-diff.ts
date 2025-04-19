import type { TextDiff } from "../entities/text-diff";

export const calculateDiff = (original: string, modified: string) : TextDiff => {

    return {
        added: [],
        removed: [],
        unchanged: []
    }
}