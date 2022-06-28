import React from 'react'
import { Helmet } from 'react-helmet'
import { CircularProgress, Typography, Button, IconButton, Box, Tabs, Tab, useTheme, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { action, computed, makeObservable, observable } from 'mobx'
import { WikiEvent, useWikiClient, WikiClient, OnThisDayResponse } from './wiki'
import { observer } from 'mobx-react'
import LinkIcon from '@mui/icons-material/Link'
import ErrorIcon from '@mui/icons-material/Error'

export function Empty() {
    const store = useStore()

    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }}>
        <Box sx={{ textAlign: 'center' }}>
            {store.loading.isLoading && <Box>
                <CircularProgress />
            </Box> }
            <Button autoFocus variant='outlined' color='primary' disabled={store.loading.isLoading} onClick={store.fetchArticles}>
                Discover happennings on the {store.title}
            </Button>
        </Box>
    </Box>
}

const EmptyObserved = observer(Empty)

export class LoadingViewModel {
    constructor() {
        makeObservable(this)
    }

    @observable isLoading = false

    @action start = () => this.isLoading = true
    @action stop = () => this.isLoading = false
}

export class MainViewModel {
    constructor(private readonly wiki: WikiClient) {
        makeObservable(this)
    }

    readonly loading = new LoadingViewModel()
    readonly onThisDay = new OnThisDayViewModel();

    @observable day = new Date()

    @computed get title() {
        return `day ${this.day.getDate()} of ${this.day.toLocaleString('default', { month: 'long' })}`
    }

    @observable dataLoaded = false
    @observable lastError: string = null

    @computed get showError() {
        return !!this.lastError
    }

    readonly selected = observable<WikiEvent>([])
    readonly births = observable<WikiEvent>([])
    readonly deaths = observable<WikiEvent>([])
    readonly events = observable<WikiEvent>([])
    readonly holidays = observable<WikiEvent>([])

    readonly fetchArticles = async () => {
        this.loading.start()

        const m = this.day.getMonth() + 1;
        const d = this.day.getDate();

        try {
            const daily = await this.wiki.fetchDailyArticles(m, d)
            this.acceptDailyArticles(daily)
        }
        catch (err) {
            this.setError((err as Error).message)
        }
        finally {
            this.loading.stop()
        }
    }

    @action readonly dismissError = () => this.lastError = null
    @action readonly setError = (error: string) => this.lastError = error

    @action readonly acceptDailyArticles = ({ selected, births, deaths, events, holidays }: OnThisDayResponse) => {
        this.selected.replace(selected)
        this.births.replace(births)
        this.deaths.replace(deaths)
        this.events.replace(events)
        this.holidays.replace(holidays)

        this.dataLoaded = true
    }
}

const storeContext = React.createContext<MainViewModel>(null)

export function useStore() {
    const ctx = React.useContext(storeContext)
    return ctx
}

export interface StoreProviderProps {
    store?: MainViewModel
    children: React.ReactNode
}

export function StoreProvider({ store, children }: StoreProviderProps) {
    const wiki = useWikiClient()
    const [defaultStore] = React.useState(() => new MainViewModel(wiki))

    return <storeContext.Provider value={store ?? defaultStore}>
        {children}
    </storeContext.Provider>
}


export type OnThisDayTabName = keyof OnThisDayResponse;

export class OnThisDayViewModel {
    constructor() {
        makeObservable(this)
    }

    @observable currentTab: OnThisDayTabName = 'selected'

    @action readonly open = (event: React.SyntheticEvent<Element, Event>, tab: OnThisDayTabName) => this.currentTab = tab
}

interface TabDefinition {
    name: OnThisDayTabName
    body: React.ReactNode
}

interface TabSelectorProps {
    activeTab: OnThisDayTabName
    children: TabDefinition[]
}

export function TabSelector({ activeTab, children }: TabSelectorProps) {
    const tab = children.find(x => x.name === activeTab)
    return tab
        ? <>{tab.body}</>
        : null
}

export function OnThisDay() {
    const store = useStore()
    const { onThisDay } = store

    return <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'white'
        }}>
            <Container>
                <Box>
                    <Typography variant='h5'>On this day</Typography>
                </Box>
                <Tabs value={onThisDay.currentTab} onChange={onThisDay.open}>
                    <Tab label='Selected' value='selected' />
                    <Tab label='births' value='births' />
                    <Tab label='deaths' value='deaths' />
                    <Tab label='events' value='events' />
                    <Tab label='holidays' value='holidays' />
                </Tabs>
            </Container>
        </Box>

        <Box sx={{
            flex: 1,
            minHeight: 0
        }}>
            <Box sx={{
                height: '100%',
                overflow: 'auto'
            }}>
                <Container sx={{ p: 2 }}>
                    <TabSelector activeTab={onThisDay.currentTab}>
                        {[
                            { name: 'selected', body: <WikiEvents items={store.selected} /> },
                            { name: 'births', body: <WikiEvents items={store.births} /> },
                            { name: 'deaths', body: <WikiEvents items={store.deaths} /> },
                            { name: 'events', body: <WikiEvents items={store.events} /> },
                            { name: 'holidays', body: <WikiEvents items={store.holidays} /> },
                        ]}
                    </TabSelector>
                </Container>
            </Box>
        </Box>
    </Box>
}
const OnThisDayObserved = observer(OnThisDay)

export interface WikiEventItemProps {
    item: WikiEvent
}

export function WikiEventItem({ item }: WikiEventItemProps) {
    const page = item.pages?.length ? item.pages[0] : null

    return <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ':hover': {
            bgcolor: 'ButtonHighlight'
        }
    }}>
        <Box sx={{ flex: 1, display: 'flex' }}>
            { !!page?.thumbnail?.source
                ? <Box sx={{ width: '120px', height: '120px', backgroundImage: `url(${page.thumbnail.source})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                : <Box sx={{ width: '120px', height: '120px' }} />
            }
            <Box sx={{ flex: 1, p: 2}}>
                { !!item.year && <Typography variant='caption'>{item.year}</Typography> }
                <Typography>{item.text}</Typography>
            </Box>
        </Box>
        { !!page && <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mr: 2
            }}>
                <IconButton component='a' target='_blank' href={`https://en.wikipedia.org/wiki/${page.title}`}>
                    <LinkIcon />
                </IconButton>
            </Box> }
    </Box>
}

export interface WikiEventsProps {
    items: WikiEvent[]
}

export function WikiEvents({ items }: WikiEventsProps) {
    const { spacing } = useTheme()

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(1)
    }}>
        {items.map((x, i) => <WikiEventItem key={i} item={x} />)}
    </Box>
}

function AppContent() {
    const { spacing } = useTheme()
    const store = useStore()

    const handleDialogClose = store.dismissError

    return <>
        <Helmet>
            <title>On the {store.title}</title>
        </Helmet>
        <Dialog open={store.showError} onClose={handleDialogClose}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: spacing(1) }}>
                <ErrorIcon color='error' />
                <span>Error</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{store.lastError}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} autoFocus>Close</Button>
            </DialogActions>
        </Dialog>

        {store.dataLoaded
            ? <OnThisDayObserved />
            : <EmptyObserved />
        }
    </>
}

const AppContentObserved = observer(AppContent)

export default function App() {
    return <StoreProvider>
        <AppContentObserved />
    </StoreProvider>
}
