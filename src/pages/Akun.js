import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import Riwayat from "../components/Akun/Riwayat";
import AkunDetail from "../components/Akun/Akun";

export default function Akun() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <Row>
        <Col span={6}>
          <Card style={{height:"100%"}}> 
            <AkunDetail />
          </Card>
        </Col>

        <Col span={18}>
          <Riwayat />
        </Col>
      </Row>
    </>
  );
}
