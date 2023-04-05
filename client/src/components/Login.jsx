/***
 * GHU-309
 */
import { message } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Input } from "reactstrap";
import {axiosInstance} from './../helpers/https'

class AssociateScreenLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member: "",
      memberName: "",
      memberOptions: [],
      memberList: []
    };
  }

  async componentDidMount() {
    this.refreshTeamMemberList();
  }

  async refreshTeamMemberList() {
    try {
      axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/data-team`).then((res) => {
        const memberOptions = res.data.map((member) => {
          return { value: member._id, label: member.member_name };
        });

        this.setState({ memberOptions: memberOptions, memberList: res.data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit = async (e) => {
    const newMember = {
      member_name: this.state.memberName,
    };
    try {
      axiosInstance
        .post(`${process.env.REACT_APP_API_URL}/api/data-team`, newMember)
        .then((res) => {
          message.success(`${newMember.member_name} is added`)
          this.refreshTeamMemberList();
          this.setState({ memberName: "" });
        });
    } catch (error) {
    }
  };

  login = async (e) => {
    this.setState({ member: e.value})
  };

  render() {
    return (
      <div>
        <Input
          onChange={(e) => this.setState({ memberName: e.target.value })}
          value={this.state.memberName}
        ></Input>
        <button onClick={this.handleSubmit}>Add Data Team Member</button>
        <Select
          onChange={this.login}
          options={this.state.memberOptions}
        />
        <Link to={`/main/${this.state.member}`} state={{ member: this.state.member }}>
          <button>Login</button>
        </Link>
      </div>
    );
  }
}

export default AssociateScreenLogin;
