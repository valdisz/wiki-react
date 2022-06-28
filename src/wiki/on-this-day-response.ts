export interface OnThisDayResponse {
    selected: WikiEvent[]
    births: WikiEvent[]
    deaths: WikiEvent[]
    events: WikiEvent[]
    holidays: WikiEvent[]
}

export interface WikiEvent {
    text: string
    pages: WikiPage[]
    year?: number
}

export interface WikiPage {
    type: string
    title: string
    displaytitle: string
    namespace: WikiNamespace
    wikibase_item: string
    titles: WikiTitles
    pageid: number
    thumbnail: WikiThumbnail
    originalimage: WikiOriginalimage
    lang: string
    dir: string
    revision: string
    tid: string
    timestamp: Date
    description: string
    description_source: string
    content_urls: WikiContentUrls
    extract: string
    extract_html: string
    normalizedtitle: string
    coordinates: WikiCoordinates
}

export interface WikiNamespace {
    id: number
    text: string
}

export interface WikiTitles {
    canonical: string
    normalized: string
    display: string
}

export interface WikiThumbnail {
    source: string
    width: number
    height: number
}

export interface WikiOriginalimage {
    source: string
    width: number
    height: number
}

export interface WikiDesktop {
    page: string
    revisions: string
    edit: string
    talk: string
}

export interface WikiMobile {
    page: string
    revisions: string
    edit: string
    talk: string
}

export interface WikiContentUrls {
    desktop: WikiDesktop
    mobile: WikiMobile
}

export interface WikiCoordinates {
    lat: number
    lon: number
}
