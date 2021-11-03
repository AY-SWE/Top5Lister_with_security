import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        console.log("undo clicked");
        store.undo();
    }
    function handleRedo() {
        console.log("redo clicked");
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }

    let enabledButtonClass = "top5-button";
    
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }  
    return (
        <div id="edit-toolbar">
            <Button 
                disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={enabledButtonClass}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                id='redo-button'
                className={enabledButtonClass}
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={enabledButtonClass}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;