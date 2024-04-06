import { atom } from "recoil";

export const voiceoverScriptState = atom<string>({
    key: 'voiceOverScriptState',
    default: "",
})

export const webpageUrlState = atom<string>({
    key: 'webpageUrlState',
    default: "",
})

export const hostNameState = atom<string>({
    key: 'hostNameState',
    default: "",
})

export const podcastNameState = atom<string>({
    key: 'podcastNameState',
    default: "",
})

export const userSummaryState = atom<string>({
    key: 'userSummaryState',
    default: "",
})