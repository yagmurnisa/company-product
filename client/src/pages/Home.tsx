import React, { Fragment, useEffect, useState } from "react";
import { getLastCompanies } from "../service";
import { Table, Alert } from "antd";
import { Company } from "../types/types";

export const Home = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          let data = await getLastCompanies();
          console.log(data);
          if (data?.msg) {
            setError(data.msg);
          }
          else if (data) {
            setCompanies(data);
          }
        };
        fetchData();
    },[]);

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
      }];

    return (
      <div className="container">
        {!error ? (
        <>
        <h2>Lastly added 3 companies</h2>
        <Table dataSource={companies} columns={columns}/>
        </>
        ):
        (<Alert style={{marginTop: 10}} message={error} type="error" />)}
      </div>
    )
}