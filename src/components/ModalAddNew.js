import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {postCreateUser} from '../services/UserSevices'
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const {show,handleClose,handelUpdateTable} = props;
    const [name,setName] = useState("")
    const [job,setJob] = useState("")

    const handelSaveUser = async () => {
        let res = await postCreateUser(name,job)

        if(res && res.id) {
            //success
            handleClose()
            setJob('')
            setJob('')
            toast.success("A user is created succeed")
            handelUpdateTable({first_name: name, id: res.id})
        }else{
            //error
            toast.error("An error")
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
                    <Modal.Title>Add New User</Modal.Title>
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
                    <Button variant="primary" onClick={() => handelSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew