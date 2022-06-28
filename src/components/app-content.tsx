import React from 'react'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react'
import { useModel } from '../model'
import OnThisDay from './on-this-day'
import Empty from './empty'
import Error from './error'

function AppContent() {
    const store = useModel()

    return <>
        <Helmet>
            <title>On the {store.title}</title>
        </Helmet>

        <Error />

        {store.dataLoaded
            ? <OnThisDay />
            : <Empty />
        }
    </>
}

export default observer(AppContent)
