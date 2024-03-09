import {Modal, Button} from 'react-bootstrap';
import { deleteUser } from '../services/UserSevices';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const {show,handleClose,dataUserDelete,handelDleteUserFromModal} = props;
  
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);  
        
        if(res && +res.statusCode === 204) {
            toast.success("Delete User Success !")
            handleClose();
            handelDleteUserFromModal(dataUserDelete)
        }else {
            toast.error("Error Delete User !")
        }
    }
    return (    
        <>       
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete A User</Modal.Title>
                </Modal.Header>

                <Modal.Body className='body-add-new'>
                    Do you want delete this user !
                    <br />  
                    <b>Email = {dataUserDelete.email}</b>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm