import React, {useState,useEffect} from 'react'
import axios from 'axios'
import "../style/Main.css"
import {Select } from 'antd';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const Main = (props) => {
  const location = useLocation()
  const [s3Image, setS3Image] = useState([])
  const [employee, setEmployee] = useState("")
  const [docType, setDocType] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [s3Key, setS3Key] = useState("")
  const employeeNameItems = []
  const [finalEmployeeNames,setFinalEmployeeNames] = useState([])
  const dockTypeItems = [
    {
      key: '1',
      label: "Government ID",
      value: "governemnt-id"
    },
    {
      key: '2',
      label: "License / Registration / Certificate Renewal Data",
      value: "license-reg-cert",
    },
    {
      key: '3',
      label: "Education / Training",
      value: "education-training",
    },
    {
      key: '4',
      label: "NPDB",
      value: "npdb"
    },
    {
      key: '5',
      label: "DEA",
      value: "dea",
    },
    {
      key: '6',
      label: "BCLS / ACLS",
      value: "blcs-acls",
    },
    {
      key: '7',
      label: "Fitness for Duty",
      value: "fitness-for-duty"
    },
    {
      key: '8',
      label: "TB",
      value: "tb",
    },
    {
      key: '9',
      label: "Immunizations / Exposure Classification",
      value: "immune-expoclass",
    },
    {
      key: '10',
      label: "Privilege List",
      value: "privilege-list",
    },
    {
      key: '11',
      label: "BLS",
      value: "bls"
    },
    {
      key: '12',
      label: "Clinical Copentence/Skills",
      value: "clinical-comp"
    },
    {
      key:'13',
      label: "Other",
      value: "other"
    }
  ]
  const employeeIdMap = {}
  const [s3DocId,setS3DocId] = useState('')
  useEffect(() => {
    console.log(location)
    axios.get("http://localhost:8000/api/s3-provider-docs/one-to-associate")
      .then(res => {
        setS3DocId(res.data._id)
        handleS3Doc(res.data.s3_key)
        console.log(res.data._id)
        // code to not get pdfs that have been pulled in the last 15mins 
        // axios.put(`http://localhost:8000/api/s3-provider-docs/${res.data._id}`, {reviewed:moment().add(15,"minutes").format()})
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err))
      })

    axios.get("https://goshenmedical.naiacorp.net/api/Account/GetAllEmployeesLite")
      .then(res =>{
        handleEmployeeList(res.data)
      })
      .catch(err => console.log(err))
  },[]);

  const handleS3Doc = (tempS3Key) => {
    console.log(tempS3Key)
    setS3Key(tempS3Key)
    const config = {
      headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6InRsZWUiLCJqdGkiOiI1OGI3YzFmNS1jMGIzLTQ1NzYtYWFkNC1hY2FiYTI2MDU5MGUiLCJpc3MiOiJOYWlhQ29ycCIsImF1ZCI6Ikdvc2hlbiBNZWRpY2FsIn0.NAxqEB0maK2Fh2Ch5xyc3r6L-PGEJo4XivKti3k6o8E"}
    }
    const body = {
      file_path: tempS3Key.substring(1),
      s3_bucket: "goshen-provider-documents",
      base64: "true"
    }
    console.log(body.file_path)
    axios.get(`https://30f13p2g7e.execute-api.us-east-1.amazonaws.com/dev/patient/document_download?file_path=${body.file_path}&s3_bucket=${body.s3_bucket}&base64=${body.base64}`,config)
      .then(res => {
        setS3Image(`data:application/pdf;base64,${res.data.data}`)
      })
      .catch(err => console.log(err))
  };
  
  const handleEmployeeList = (data) => {
    for(let x of data){
      let middleName = x['MiddleName'] ? x['MiddleName'].charAt(0) : ""
      let temp = x["FirstName"] + ' ' + middleName + ' ' + x["LastName"]
      if(!employeeNameItems.some(e => e.label === temp)){
        employeeNameItems.push({
            label:temp,
            value:temp
        })
        employeeIdMap[temp] = x['ContactId']
      }
    }
    console.log(employeeNameItems)
    console.log(employeeIdMap)
    setFinalEmployeeNames(employeeNameItems)
  };

  const createProviderDoc = (e) => {
    e.preventDefault()
    const newProviderDoc = {
      employee_id: employeeIdMap[employee],
      document_type: docType,
      s3_key: s3Key,
      expiry_date: expirationDate,
    }
    console.log(newProviderDoc)
    axios.post("http://localhost:8000/api/provider-docs", newProviderDoc)
      .then(res => {
        console.log(res.data);
        console.log("Sucess :)")
        axios.put(`http://localhost:8000/api/s3-provider-docs/${s3DocId}`, {associated : true})
          .then(res =>{
            console.log(`${s3DocId} has been associated`)
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err)
        console.log("Failure ;-;")
      })
    
  };

  const loggit = () => {
    console.log(employeeNameItems)
  }
  return (
    <div className="parent-div">
      <div className="form">
        {s3Key}
        <form onSubmit={createProviderDoc}>
          Employee Name: 
          <Select
            onSelect={(e) => setEmployee(e)}
            showSearch
            placeholder="Select a Employee Name"
            optionFilterProp="children"
            filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={employeeNameItems}
          /> <br/>
          Documnet Type: 
          <Select
            onSelect={(e) => setDocType(e)}
            placeholder="Select a Documnet Type"
            showSearch
            options={dockTypeItems}
            // onChange={(e) => setDocType(e.target.value)} 
            // value={docType}
          /> <br/>
          Expiration Date: <input type="date" onChange={(e) => setExpirationDate(e.target.value)} value={expirationDate}/> <br/>
          <button>Save</button>
        </form>
      </div>
      <embed src={s3Image} type="application/pdf" height="800px" className="pdf"/>
    </div>
  )
};

export default Main