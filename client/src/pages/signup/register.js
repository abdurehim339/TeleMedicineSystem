import React from "react";
import "./signup.scss";
import shortid from "shortid";
//import "../styles/RegiserStyles.css";
import { Form, Select,Input, message } from "antd";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../slices/alertSilce";
const { Option } = Select;
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  //const id = id.generated();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:4000/register", values);
      //dispatch(hideLoading());
      if (res.data.success) {
       res.send("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="horizontal"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          
          
          <Form.Item label="firstName" name="firstName">
            <Input type="STRING" required />
          </Form.Item>
          <Form.Item label="lastName" name="lastName">
            <Input type="STRING" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Form.Item label="phone" name="phone">
            <Input type="STRING" min={0} required />
          </Form.Item>
          <Form.Item name="gender" label="Gender" /*rules={[{ required: true }]}*/>
        <Select
          /*placeholder="Select a option"*/
          //onChange={onGenderChange}
          //allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
                 
        <Form.Item label="DOB" name="DOB" style={{  display:"flex",alignItems:"center",justifyContent:"center",marginver:"10"
      }}>
            <Input type="date" required />
          </Form.Item>
          <Form.Item label="address" name="address">
            <Input type="STRING" required />
          </Form.Item>
          <Form.Item label="weight" name="weight">
            <Input type="number" min={0} required />
          </Form.Item>
          <Form.Item label=" bloodGroup" name="bloodGroup">
          <Input type="STRING" required />
        </Form.Item>
        {/*<Form.Item label=" location" name="location">
        <Input type="STRING" required />
      </Form.Item>
        <Form.Item label=" clinicName" name="clinicName">
        <Input type="STRING" required />
  </Form.Item>*/}
          
          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
