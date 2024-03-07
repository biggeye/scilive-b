import { atom } from "recoil";

export const voiceoverScriptState = atom<string[][] | null>({
    key: 'voiceOverScriptState',
    default: null,
})

export const webpageUrlState = atom<string | null>({
    key: 'webpageUrlState',
    default: null,
})

export const hostNameState = atom<string | null>({
    key: 'hostNameState',
    default: null,
})

export const podcastNameState = atom<string | null>({
    key: 'podcastNameState',
    default: null,
})