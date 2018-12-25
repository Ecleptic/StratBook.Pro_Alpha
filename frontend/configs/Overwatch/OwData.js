import slugify from 'speakingurl'

export const OwHeroes = [
    'Ana',
    'Ashe',
    'Bastion',
    'Brigitte',
    'Doomfist',
    'Dva',
    'Genji',
    'Hanzo',
    'Junkrat',
    'Lucio',
    'McCree',
    'Mei',
    'Mercy',
    'Moira',
    'Orisa',
    'Pharah',
    'Reaper',
    'Reinhardt',
    'Roadhog',
    'Soldier_76',
    'Sombra',
    'Symmetra',
    'Torbjorn',
    'Tracer',
    'Widowmaker',
    'Winston',
    'Wrecking_Ball',
    'Zarya',
    'Zenyatta'
]
export const OwMaps = [
    // 'Ayutthaya',
    // 'Black Forest',
    'Blizzard World',
    'Busan',
    // 'Castillo',
    // 'Château Guillard',
    'Dorado',
    // 'Ecopoint: Antarctica',
    'Eichenwalde',
    'Hanamura',
    'Hollywood',
    'Horizon Lunar Colony',
    'Ilios',
    'Junkertown',
    "King's Row",
    'Lijiang Tower',
    // 'Necropolis',
    'Nepal',
    'Numbani',
    'Oasis',
    'Rialto',
    'Route 66',
    'Temple of Anubis',
    'Volskaya Industries',
    'Watchpoint: Gibraltar'
]
export const OwControlMapsData = [
    {
        mapName: 'Nepal',
        subMaps: ['Village', 'Shrine', 'Sanctum']
    },
    {
        mapName: 'Lijiang_Tower',
        subMaps: ['Night_Market', 'Garden', 'Control_Center']
    },
    {
        mapName: 'Ilios',
        subMaps: ['Lighthouse', 'Ruins', 'Well']
    },
    {
        mapName: 'Oasis',
        subMaps: ['City_Center', 'Gardens', 'University']
    },
    {
        mapName: 'Busan',
        subMaps: ['Downtown', 'Sanctuary', 'MEKA_Base']
    }
]
export const OwMapTypes = {
    'Blizzard World': 'Hybrid',
    Busan: 'Control',
    Dorado: 'Escort',
    Eichenwalde: 'Hybrid',
    Hanamura: 'Assault',
    Hollywood: 'Hybrid',
    'Horizon Lunar Colony': 'Assault',
    Ilios: 'Control',
    Junkertown: 'Escort',
    "King's Row": 'Hybrid',
    'Lijiang Tower': 'Control',
    Nepal: 'Control',
    Numbani: 'Hybrid',
    Oasis: 'Control',
    'Route 66': 'Escort',
    'Temple of Anubis': 'Assault',
    Rialto: 'Escort',
    'Volskaya Industries': 'Assault',
    'Watchpoint: Gibraltar': 'Escort'
}
export const OwMapToEnum = map => {
    return map
    // remove apostrophes, & colons with no space
    .replace(/'|:/, '')
    // replace whitespace (like spaces) with an underscore
    .replace(/\s/, '_')
}
export const OwUrlToMap = url => {
    const mapIndex = OwMaps.map(map => slugify(map)).indexOf(url)
    return OwMaps[mapIndex]
}
export const OwIsMap = url => {
    const contain =
        OwMaps.map(map => slugify(map)).includes(url) || OwMaps.includes(url)
    return contain
}
