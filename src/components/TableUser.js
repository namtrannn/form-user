import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from '../services/UserSevices'
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';
import {debounce} from 'lodash'
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
import { CSVLink } from "react-csv";
import { toast } from 'react-toastify';
import Papa from 'papaparse'
const TableUser = (props) => {

    const [listUser,setListUser] = useState([])
    const [totalUser, setTotalUser] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowUserAddNew,setIsShowUserAddNew] = useState(false)

    const [isShowUserEdit,setIsShowUserEdit] = useState(false)
    const [dataUserEdit,setDataUserEdit] = useState({})

    const [isShowModalDelete,setIsShowModalDelete] = useState(false)
    const [dataUserDelete,setDataUserDelete] = useState({})

    const [sortBy,setSortBy] = useState("asc")
    const [sortField,setSortField] = useState("id")

    const [dataExport,setDataExport] = useState([])

    useEffect(() => {
        //call api
        getUser(1);
    },[])

    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        if(res && res.data){  
            setTotalUser(res.total)
            setListUser(res.data)
            setTotalPages(res.total_pages)
        }
    }
    
    const handlePageClick = (event) => {
        getUser(+event.selected + 1)
    }

    const handelUpdateTable = (user) => {
        setListUser([user,...listUser])
    }

    const handleClose = () => {
        setIsShowUserAddNew(false)
        setIsShowUserEdit(false)
        setIsShowModalDelete(false)
    }

    const handelEditUser = (user) => {
        setIsShowUserEdit(true)
        setDataUserEdit(user)
    }
    
    const handelEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser)
        let index = listUser.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser)
    }

    const handelDleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handelDleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUser(cloneListUser)
    }

    const handelSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)

        let cloneListUser = _.cloneDeep(listUser)
        cloneListUser = _.orderBy(cloneListUser, [sortField],[sortBy])
        setListUser(cloneListUser)
    }

    const handelSearch = debounce((event) => {
        let term = event.target.value
        if(term) {
            let cloneListUser = _.cloneDeep(listUser)
            cloneListUser = cloneListUser.filter(item => item.email.includes(term))
              setListUser(cloneListUser)
        }else {
            getUser(1)
        }
    },500)
    
    const getUserExport = (event, done) => {
        let result = [];
        if(listUser && listUser.length > 0) {
            listUser.forEach((item,index) => {      
                let userObj = {
                    Id: item.id,
                    Email: item.email,
                    "First Name": item.first_name,
                    "Last Name": item.last_name
                };
                result.push(userObj);
            });
            setDataExport(result);           
            done();
        }
    }

    const handlImportFileCSV = (even) => {
        if(even.target && even.target.files && even.target.files[0]) {
            let file =  even.target.files[0]
            if(file.type !== "text/csv") {
                toast.error("Only accept CSV file ...")
                return
            }
            
            // Papa local CSV file      
            Papa.parse(file, {
                complete : function(results) {  
                    let rawCSV = results.data
                    if( rawCSV.length > 0 ) {
                        
                        if(rawCSV[0] && rawCSV[0].length === 3) {
                            
                            if(rawCSV[0][0] !== "email"  
                               || rawCSV[0][1] !== "first_name" 
                               || rawCSV[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format Header CSV file ...")
                            }else {
                                let result = []
                                rawCSV.forEach((item,index) => {
                                    if(index > 0 && item.length === 3) {
                                        let obj = {}
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]

                                        result.push(obj)
                                    }
                                })
                                setListUser(result)
                            }
                        }else { 
                            toast.error("Wrong format CSV file ...")
                        }
                    }else {
                        toast.error("Not found data CSV file ...")
                    }
                }
            })
        }
        
    }

    return (<>
    <div className='my-3 add-new'>     
        <span><b>List user:</b></span>
        <div className='group-btns'>
            <label htmlFor='import' className='btn btn-warning'>
                <i className="fa-solid fa-file-import"></i>
                Import
            </label>
            <input  
                type='file' id='import' hidden
                onChange = {(even) => handlImportFileCSV(even)}>
            </input>
            <CSVLink 
                filename={"my-file.csv"}
                className="btn btn-primary"
                data={dataExport}
                asyncOnClick={true}
                onClick={getUserExport}
            >   
                <i className="fa-solid fa-download"></i>
                Export
            </CSVLink>  
            <button type="button" class="btn btn-success"
                onClick={() => setIsShowUserAddNew(true)}
            >   
                <i className="fa-solid fa-circle-plus"></i>
                Add new
            </button>
        </div>
       
    </div>
    <div className='col-6 my-3'>
        <input 
            className='form-control' 
            placeholder='Search user by email...'
            onChange={(event) => handelSearch(event)}
        />
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
            <th>
                <div className="sort-header">
                    Id
                    <span>
                        
                        <i  className="fa-solid fa-arrow-down"
                            onClick={() => handelSort("desc","id")}
                        >
                        </i>
                        <i 
                            className="fa-solid fa-arrow-up"
                            onClick={() => handelSort("asc","id")}
                        >
                        
                        </i>
                    </span>
                </div>
            </th>
         
          <th>Email</th>
            <th>
                <div className="sort-header">
                    First Name
                    <span>
                        <i 
                            className="fa-solid fa-arrow-down"
                            onClick={() => handelSort("desc","first_name")}
                        >
                        </i>
                        <i 
                            className="fa-solid fa-arrow-up"
                            onClick={() => handelSort("asc","first_name")}
                        >
                        </i>
                    </span>
                </div>
            </th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listUser && listUser.length > 0 &&
            listUser.map((item, index) => {
                return (
                    <tr key={`user-${index}`}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>
                            <button 
                                className='btn btn-warning mx-3'
                                onClick={() => handelEditUser(item)}
                            >Edit</button>
                            <button className='btn btn-danger'
                                    onClick={() => handelDleteUser(item)}
                            >Delete
                            </button>
                        </td>
                    </tr>
                )
            })
        }
      </tbody>
    </Table>
    
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}

        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"   
        breakClassName="page-link"   
        breakLinkClassName="page-link"   
        containerClassName="pagination"   
        activeClassName="active"   
    />

    <ModalAddNew
        show={isShowUserAddNew}
        handleClose={handleClose}
        handelUpdateTable={handelUpdateTable}
    /> 

    <ModalEditUser 
        show={isShowUserEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handelEditUserFromModal={handelEditUserFromModal}
    /> 

    <ModalConfirm 
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handelDleteUserFromModal={handelDleteUserFromModal}
    />
        
    </>)
}

export default TableUser;