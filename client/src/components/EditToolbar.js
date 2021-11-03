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

    let undoButtonClass = true;
    let redoButtonClass = true;
    let closeButtonClass = false;
    if (store.canUndo()) {
    console.log("canundo");
    undoButtonClass = false;
    }
    if (store.canRedo()) redoButtonClass = false;
    //if (store.canClose) closeButtonClass = false;

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

    //let enabledButtonClass = "top5-button";
    
    if (store.isItemEditActive) {  
        closeButtonClass = true;
        undoButtonClass = true;
        redoButtonClass = true;

    }
    return (
        <div id="edit-toolbar">
            <Button 
                disabled={undoButtonClass}
                id='undo-button'
                onClick={handleUndo}
                className={undoButtonClass}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={redoButtonClass}
                id='redo-button'
                className={redoButtonClass}
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={closeButtonClass}
                id='close-button'
                onClick={handleClose}
                className={closeButtonClass}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;