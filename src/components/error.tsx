import React from 'react'
import { Button, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { observer } from 'mobx-react'
import ErrorIcon from '@mui/icons-material/Error'
import { useModel } from '../model'

export interface ErrorProps {
    closeButtonTestId?: string
}

function Error({ closeButtonTestId }: ErrorProps) {
    const { spacing } = useTheme()
    const { error } = useModel()

    const handleDialogClose = error.dismiss

    return <Dialog open={error.visible} onClose={handleDialogClose}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: spacing(1) }}>
            <ErrorIcon color='error' />
            <span>Error</span>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>{error.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDialogClose} autoFocus data-testid={closeButtonTestId}>Close</Button>
        </DialogActions>
    </Dialog>
}

export default observer(Error)
