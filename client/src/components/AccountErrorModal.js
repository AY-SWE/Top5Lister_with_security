import {useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
/*
    This modal is shown when the a user tries to create a new account or tries to login to an existing account,    
    should they provides inadequate or erroneous information your application should open a Material UI Modal 
    that should contain a Material UI Alert with a warning message and a single Material UI Button to close the modal. 
    You may style the modal as you like but make sure it looks nice.
    
    @author Andy Yang
*/
function AccountErrorModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ modalOpen, setModalOpen ] = useState(true);
    
    function handleCloseModal(event) {   //when close is clicked
        let newModalOpen = !modalOpen;  //becomes false
        setModalOpen(newModalOpen);
    }

    return (
        <Modal
            className="modal"
            id="error-modal"
            open ={modalOpen}    
        >   

<Alert severity="error">
 Warning, inadequate or erroneous information!
            <div id="close-container"> 

            <Button 
            id="dialog-close-button"
            className="modal-button"
            onClick={handleCloseModal}>Close</Button>  
            </div>  

</Alert>


        </Modal>

        
    );
}

export default AccountErrorModal;