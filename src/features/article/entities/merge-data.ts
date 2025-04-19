import type { TextDiff } from "./text-diff"

export type MergeData = {
    baseBranch: string
    targetBranch: string
    baseContent: string
    diff: TextDiff
}