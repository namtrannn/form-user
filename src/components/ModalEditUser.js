import { useEffect, useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {putUpdateUser} from "../services/UserSevices"
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const {show,handleClose,dataUserEdit,handelEditUserFromModal} = props;
    const [name,setName] = useState("")
    const [job,setJob] = useState("")

    const handelEditUser = async () => {
        let res = await putUpdateUser(name,job)
        if(res && res.updatedAt) {
            //success
            handelEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
            handleClose()
            toast.success("Update User Seccess !")
        }   
        
    }
   
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit]);

    return (    
        <>       
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a User</Modal.Title>
                </Modal.Header>

                <Modal.Body className='body-add-new'>
                    <div className='mb-3'>
                        <label className='form-lable'>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={name}
                            onChange={(event) => {setName(event.target.value)}}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-lable'>Job</label>
                        <input
                            type='text'
                            className='form-control'
                            value={job}
                            onChange={(event) => {setJob(event.target.value)}}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handelEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser