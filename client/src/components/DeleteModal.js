import {useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author Andy Yang
    @author McKilla Gorilla
*/
function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ modalOpen, setModalOpen ] = useState(true);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
        
    }
    
    function handleDeleteList(event) {  //when confirm is clicked
        store.deleteMarkedList();
        handleCloseModal();
    }
    function handleCloseModal(event) {   //when cancel is clicked
        let newModalOpen = !modalOpen;  //becomes false
        setModalOpen(newModalOpen);
        store.unmarkListForDeletion();
    }

    return (
        <Modal
            className="modal"
            id="delete-modal"
            open ={modalOpen}    
        >   
        <div className="modal-dialog">
        <Box sx={{ marginTop: '15px', display: 'flex', p: 1 }}>  
            <header className="dialog-header">    
                <Typography variant="h6" >
                    Delete the {name} Top 5 List?
                </Typography>
            </header>
            <div id="confirm-cancel-container"> 
            <Button 
            id="dialog-yes-button"
            className="modal-button"
            onClick={handleDeleteList}
            >Confirm</Button>

            <Button 
            id="dialog-no-button"
            className="modal-button"
            onClick={handleCloseModal}>Cancel</Button>  
            </div>  
        </Box>
        </div>
        </Modal>

    );
}

export default DeleteModal;