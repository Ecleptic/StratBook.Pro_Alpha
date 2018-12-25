// import { OwHeroes, OwMaps } from "./configData"

export const OwHeroToEnum = hero => {
    return hero
        .toLowerCase()
        .replace(/\s/g, "_")
        .replace(".", "")
        .replace(":", "")
        .replace(/^\w/g, chr => chr.toUpperCase())
        .replace(/(_[a-zA-Z])/g, chr => chr.toUpperCase())
}
export const OwMapToEnum = map => {
    return map
        .replace(/\s/g, "_")
        .replace(".", "")
        .replace(":", "")
        .replace(/^\w/g, chr => chr.toUpperCase())
        .replace(/(_[a-zA-Z])/g, chr => chr.toUpperCase())
}
