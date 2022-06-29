import React from 'react'
import { CircularProgress, Button, Box } from '@mui/material'
import { observer } from 'mobx-react'
import { useModel } from '../model';

function Empty() {
    const model = useModel()
    const { loading } = model

    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }}>
        <Box sx={{ textAlign: 'center' }}>
            {loading.isLoading && <Box>
                <CircularProgress />
            </Box>}
            <Button autoFocus variant='outlined' color='primary' disabled={loading.isLoading} onClick={model.fetchOnThisDay}>
                Discover happennings on the {model.title}
            </Button>
        </Box>
    </Box>;
}

export default observer(Empty)
