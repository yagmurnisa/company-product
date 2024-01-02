import axios from './axios';
import setAuthToken from './setAuthToken';
import { Company } from './types/types';
import { Product } from './types/types';
import { NewCompany } from './types/types';
import { NewProduct } from './types/types';

export const login = async (data: {name: string, password: string}) => {
  try {
    const res = await axios.post(`/user/login`, data);
    console.log(res.data);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      return {status: "success"};
    }
  } catch (err: any) {
    console.log(err.message);
    if(err.response?.status==400){
      return {errorMsg: err.response.data.msg};
    }
    return {errorMsg: "An error occured"};
  }
};

export const register = async (data: {name: string, email: string,
    password: string, password2: string}) => {
    try {
      const res = await axios.post(`/user/register`, data);
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setAuthToken(res.data.token);
        return {status: "success"};
      }
      
    } catch (err: any) {
        console.log(err.message);
        if(err.response?.status==400){
          return {errorMsg: err.response.data.msg};
        }
      }
      return {errorMsg: "An error occured"};
};

export const getCompanies = async () => {
  try {
    const res = await axios.get(`/company`);
    return res.data;
  } catch (err) {
    console.log(err);
    return {errorMsg:"An error occured"};
  }
};

export const getLastCompanies = async () => {
  try {
    const res = await axios.get(`/company/last`);
    return res.data;
  } catch (err) {
    console.log(err);
    return {errorMsg:"An error occured"};
  }
};

export const addCompanyService = async (data: NewCompany) => {
  console.log(data);
  try {
    const res = await axios.post(`/company/add`, data);
    return res.data;
  } catch (err: any) {
    console.log(err.message);
    if(err.response?.status==400){
      return {errorMsg: err.response.data.msg};
    }
    return {errorMsg: "An error occured"};
  }
};

export const deleteCompanyService = async (id: string) => {
  console.log(id);
  try {
    await axios.delete(`/company/${id}`);
    console.log("deleted");
    return {payload: id};
  }
  catch (err: any) {
    console.log(err.message);
    if(err.response?.status==400){
      return {errorMsg: err.response.data.msg};
    }
      return {errorMsg: "An error occured"};
    }
};

export const editCompanyService = async (data: Company) => {
  const id= data._id;
  console.log(data);
  try {
    const res = await axios.post(`/company/edit/${id}`, data);
    return res.data;
  }
  catch (err: any) {
    console.log(err.message);
    if(err.response?.status==400){
      return {errorMsg: err.response.data.msg};
    }
    return {errorMsg: "An error occured"};
  }
};

export const getProducts = async () => {
  try {
    const res = await axios.get(`/product`);
    return res.data;
  } catch (err) {
    return {errorMsg:"An error occured"}; 
  }
};

export const addProductService = async (data: NewProduct) => {
  console.log(data);
  try {
    const res = await axios.post(`/product/add`, data);
    return res.data;
  } catch (err: any) {
    console.log(err.message);
    if(err.response?.status==400){
      return {errorMsg: err.response.data.msg};
    }
    return {errorMsg: "An error occured"};
  }
};

export const deleteProductService = async (id: string) => {
  console.log(id);
  try {
    const res = await axios.delete(`/product/${id}`);
    console.log("deleted");
    return {payload: id}
  
  }
  catch (err: any) {
    console.log(err.message);
    if(err.response?.status==400){
      return {errorMsg: err.response.data.msg};
    }
      return {errorMsg: "An error occured"};
  }
};

export const editProductService = async (data: Product) => {
  const id= data._id;
  console.log(data);
  try {
    const res = await axios.post(`/product/edit/${id}`, data);
    return res.data;
  }
  catch (err: any) {
    console.log(err.message);
    if(err.response?.status==400){
      return {errorMsg: err.response.data.msg};
    }
    return {errorMsg: "An error occured"};
  }
};
