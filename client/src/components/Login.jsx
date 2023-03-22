import React, {useState, useEffect} from 'react'
import { Select } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = (props) => {
  const [member, setMember] = useState("")
  const [memberName,setMemberName] = useState("")
  useEffect(() => {
    axios.get("http://localhost:8000/api/data-team")
      .then(res => {
        let membersSelect = document.getElementById('members')
        for (let a in membersSelect.options) { membersSelect.options.remove(0)}
        for(let x of res.data){
          membersSelect.options[membersSelect.options.length] = new Option(x.member_name,x.member_name)
        }
        setMemberName(membersSelect.options[ membersSelect.selectedIndex ].value)
      })
      .catch(err => console.log(err))
    
  });

  const handleSubmit = (e) =>{
    console.log(e)
    const newMember = {
      member_name: member
    }
    axios.post("http://localhost:8000/api/data-team", newMember)
      .then(res => {
        console.log(res.data);
        console.log("Sucess :)")
      })
      .catch(err => {
        console.log(err)
        console.log("Failure ;-;")
      })
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMember(e.target.value)} value={member}/>
        <button>Add Data Team Member</button>
      </form>
      <select name="members" id="members">

      </select>
      <Link to={"/main"} state={{member: memberName}} ><button>Login</button></Link>
    </div>
  )
}

export default Login