import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Modal, Input, Alert } from "antd";
import { addProductService, getProducts, deleteProductService, editProductService } from "../service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Product } from "../types/types";

export const Products = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [modalError, setModalError]= useState("");
    const [newProduct, setNewProduct] = useState({name: "", category:"", amount:"", unit:"", companyNumber:""});
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);
    const [editing, setEditing] = useState(false); //for opening modal
    const [adding, setAdding] = useState(false); //for opening modal

    useEffect(() => {
        const fetchData = async () => {
          let data = await getProducts();
          console.log(data);
          if (data?.errorMsg) {
            setError(data.errorMsg);
          }
          else if (data) {
            setProducts(data);
          }
        };
        fetchData();
    },[]);

    const addProduct = async () => {
        if (newProduct.name.trim() === '' || newProduct.category.trim() === '' ||
        newProduct.amount.trim() === ''|| newProduct.unit.trim() === '' || newProduct.companyNumber.trim() === '' ) {
            setModalError("fields can not be empty");
        }
        else {
            let data = await addProductService(newProduct);
            console.log(data);
            if (data?.errorMsg){
                setModalError(data.errorMsg);
            }
            else if (data) {
                setProducts([{...data}, ...products]);
                resetAdding();
            }
        }
    };

    const deleteProduct = async (record: Product) => {
        let data = await deleteProductService(record._id);
        if (data?.errorMsg) {
            setError(data.errorMsg);
        }
        else if (data) {
            setProducts(products.filter((product) => product._id !== data.payload));
        }
    };

    const editProduct = async () => {
        if (editedProduct?.name.trim() === '' || editedProduct?.category.trim() === '' ||
        editedProduct?.amount.trim() === ''|| editedProduct?.unit.trim() === '' ) {
            setModalError("fields can not be empty");
        }
        else if (editedProduct) {
            let data = await editProductService(editedProduct);
            if (data?.errorMsg) {
                setModalError(data.errorMsg); 
            }
            else if (data) {
            setProducts(products.map((product) => {
                if (product._id === data._id) 
                    return data;
                 else 
                    return product;
                }));
                resetEditing();
            };
        };
    };

    const toggleDelete = (record: Product) => {
        Modal.confirm({
            title: "Delete this product?",
            onOk: () => {
                deleteProduct(record)
            }
        })
    };

    const toggleEdit = (record: Product) => {
        console.log(record);
        setEditing(true);
        setEditedProduct({...record});
    };

    const toggleAdd = () => {
        setAdding(true);
    };

    const resetAdding = () => {
        setModalError("");
        setAdding(false);
        setNewProduct({name: "", category:"", amount:"", unit:"", companyNumber:""});
    };

    const resetEditing = () => {
        setModalError("");
        setEditing(false);
        setEditedProduct(null);
    };

    const columns = [ 
        { 
        key: "name", 
        title: "Product Name", 
        dataIndex: "name", 
        }, 
        { 
        key: "category", 
        title: "Category", 
        dataIndex: "category", 
        }, 
        { 
        key: "amount", 
        title: "Amount", 
        dataIndex: "amount", 
        }, 
        {
        key: "unit", 
        title: "Unit", 
        dataIndex: "unit", 
        },
        {
        key: "company", 
        title: "Company Legal Number", 
        dataIndex: ['company', 'legalNumber'],
        },
        {
        key: "company", 
        title: "Company Name", 
        dataIndex: ['company', 'name'],
       
        },
        {
        key: "actions",
        title:"Actions",
        render: (record: Product) => {
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
            <h2>Products</h2>
            <Button style={{marginBottom: 10}} onClick={toggleAdd}>Add New Product</Button>
            <Table dataSource={products} columns={columns} rowKey={record => record._id}/>
            <Modal title="Add New Product" open={adding} onCancel={() => resetAdding()} onOk={() => addProduct()}>
                <Input
                style={{marginTop: 10}}
                value={newProduct.name}
                placeholder="Name"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.category}
                placeholder="Category"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, category: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.amount}
                placeholder="Amount"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, amount: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.unit}
                placeholder="Unit"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, unit: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.companyNumber}
                placeholder="Company Legal Number"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, companyNumber: e.target.value });
                }}
                />
                {modalError && <Alert style={{marginTop: 10}} message={modalError} type="error" />}
            </Modal>
            <Modal title="Edit Product" open={editing} onCancel={() => resetEditing()} onOk={() => editProduct()}>
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.name}
                placeholder="Name"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, name: e.target.value } as Product);
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.category}
                placeholder="Category"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, category: e.target.value } as Product);
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.amount}
                placeholder="Amount"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, amount: e.target.value } as Product);
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.unit}
                placeholder="Unit"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, unit: e.target.value } as Product);
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