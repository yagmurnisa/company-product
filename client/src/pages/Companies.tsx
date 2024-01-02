import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Modal, Input, Alert } from "antd";
import { addCompanyService, getCompanies, deleteCompanyService, editCompanyService } from "../service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Company } from "../types/types";

export const Companies = () => {
    
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, setError] = useState('');
    const [modalError, setModalError]= useState('');
    const [newCompany, setNewCompany] = useState({legalNumber: "", name: "", country: "", website: ""});
    const [editedCompany, setEditedCompany] = useState<Company | null>(null);
    const [editing, setEditing] = useState(false); //for opening modal
    const [adding, setAdding] = useState(false); //for opening modal

    useEffect(() => {
        const fetchData = async () => {
          let data = await getCompanies();
          console.log(data);
          if (data?.errorMsg) {
            setError(data.errorMsg);
          }
          else if (data) {
            setCompanies(data);
          }
        };
        fetchData();
    },[]);

    const addCompany = async () => {
        if (newCompany.legalNumber.trim() === '' || newCompany.name.trim() === '' ||
        newCompany.country.trim() === ''|| newCompany.website.trim() === '') {
            setModalError("fields can not be empty");
        }
        else {
        let data = await addCompanyService(newCompany);
        console.log(data);
        if (data?.errorMsg){
            setModalError(data.errorMsg);
        }
        else if (data) {
            setCompanies([{...data}, ...companies]);
            resetAdding();
        }
        };
    };
    
    const deleteCompany = async (record: Company) => {
        let data = await deleteCompanyService(record._id);
        if (data?.errorMsg) {
            setError(data.errorMsg);
        }
        else if (data) {
            setCompanies(companies.filter((comp) => comp._id !== data.payload));
        }
    };

    const editCompany = async () => {
        if (editedCompany) {
            if (editedCompany.name.trim() === '' || editedCompany.country.trim() === '' || 
            editedCompany.website.trim() === '') {
                setModalError("fields can not be empty");
            }
            else {
                let data = await editCompanyService(editedCompany);
                if (data?.errorMsg) {
                    setModalError(data.errorMsg);
                }
                else if (data) {
                    setCompanies(companies.map((comp) => {
                    if (comp._id === data._id) 
                        return data;
                    else 
                        return comp;
                    }));
                    resetEditing();
                };
            }
        }
    };

    const toggleDelete = (record: Company) => {
        Modal.confirm({
            title: "Delete this company?",
            onOk: () => {
                deleteCompany(record)
            }
        })
    };
    
    const toggleEdit = (record: Company) => {
        setEditedCompany({...record});
        setEditing(true);  
    };

    const toggleAdd = () => {
        setAdding(true);
    };

    const resetAdding = () => {
        setModalError('');
        setAdding(false);
        setNewCompany({legalNumber: "", name: "", country: "", website: ""});
    };
    
    const resetEditing = () => {
        setModalError('');
        setEditing(false);
        setEditedCompany(null);
    };

    const columns = [ 
        { 
        key: "name", 
        title: "Name", 
        dataIndex: "name", 
        }, 
        { 
        key: "legalNumber", 
        title: "Legal Number", 
        dataIndex: "legalNumber", 
        }, 
        { 
        key: "country", 
        title: "Country", 
        dataIndex: "country", 
        }, 
        {
        key: "website", 
        title: "Website", 
        dataIndex: "website", 
        },
        {
        key: "actions",
        title:"Actions",
        render: (record: Company) => {
            return (
                <>
                <EditOutlined onClick={() => toggleEdit(record)}/>
                <DeleteOutlined onClick={() => toggleDelete(record)} style={{color: "red", marginLeft: 10}}/>
                </>
            )
        }
        }]

    return (
        <div className="container">
            {!error ? (
            <>
            <h2>Companies</h2>
            <p>{companies.length} companies in total</p>
            <Button style={{marginBottom: 10}} onClick={toggleAdd}>Add New Company</Button>
            <Table dataSource={companies} columns={columns} rowKey={record => record._id}/>
            <Modal title="Add New Company" open={adding} onCancel={() => resetAdding()} onOk={() => addCompany()}>
                <Input
                style={{marginTop: 10}}
                value={newCompany.legalNumber}
                placeholder="Legal Number"
                onChange={(e) => {
                    setNewCompany({ ...newCompany, legalNumber: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newCompany.name}
                placeholder="Name"
                onChange={(e) => {
                    setNewCompany({ ...newCompany, name: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newCompany.country}
                placeholder="Country"
                onChange={(e) => {
                    setNewCompany({ ...newCompany, country: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newCompany.website}
                placeholder="Website"
                onChange={(e) => {
                    setNewCompany({ ...newCompany, website: e.target.value });
                }}
                />
                {modalError && <Alert style={{marginTop: 10}} message={modalError} type="error" />}
            </Modal>
            <Modal title="Edit Company" open={editing} onCancel={() => resetEditing()} onOk={() => editCompany()}>
                <Input
                style={{marginTop: 10}}
                value={editedCompany?.name}
                placeholder="Name"
                onChange={(e) => {
                    setEditedCompany({ ...editedCompany, name: e.target.value } as Company);
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedCompany?.country}
                placeholder="Country"
                onChange={(e) => {
                    setEditedCompany({ ...editedCompany, country: e.target.value } as Company);
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedCompany?.website}
                placeholder="Website"
                onChange={(e) => {
                    setEditedCompany({ ...editedCompany, website: e.target.value } as Company);
                }}
                />
                 {modalError && <Alert style={{marginTop: 10}} message={modalError} type="error" />}
            </Modal>
            </>
            ) : (
                <Alert style={{marginTop: 10}} message={error} type="error" />
            )}
        </div>
    )
}