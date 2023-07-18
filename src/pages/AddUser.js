import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/styles/auth.css";
import { Button, Checkbox, Form, Input, Select } from "antd";

export default function AddUser(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (props.hidden === false) {
      form.setFieldsValue(props.data)
    } else {
      form.setFieldsValue({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    }
  }, [props.hidden]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(formData);
    // login(form)
    //   .then((response) => {
    //     console.log(response);
    //     localStorage.setItem("token", response.data.data.token);
    //     localStorage.setItem("users", JSON.stringify(response.data.data.id));
    //     Swal.fire("", response.data.message, "success");
    //     return navigate("/");
    //   })
    //   .catch((err) => {
    // setErrors(err);
    //   });
    localStorage.setItem("token", "asdasd");
    const path = window.location.pathname;
    console.log(path);
    console.log(path !== "/add/user");
    if (path !== "/add/user") {
      props.setHidden(true);
    }
    navigate("/");
    setIsLoading(false);
  };

  

  return (
    <>
      <section className="" hidden={props.hidden}>
        <div className="">
          <form style={{ width: "100%" }}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: "100%" }}
              initialValues={form}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              // autoComplete="on"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Tolong Masukan Username!" },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setForm({ ...formData, username: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Tolong Masukan Email!" }]}
              >
                <Input
                  onChange={(e) =>
                    setForm({ ...formData, email: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Tolong Masukan Password!" },
                ]}
              >
                <Input.Password
                  onChange={(e) =>
                    setForm({ ...formData, password: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Tolong Masukan Role!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={(e) => setForm({ ...formData, role: e })} //   onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Kepala Desa",
                    },
                    {
                      value: "2",
                      label: "Keuangan",
                    },
                    {
                      value: "3",
                      label: "Perencanaan",
                    },
                    {
                      value: "4",
                      label: "sekertaris",
                    },
                    {
                      value: "5",
                      label: "Pembanguuana",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Simpan
                </Button>
              </Form.Item>
            </Form>

            {errors.length > 0 && (
              <div
                className="alert alert-danger mx-0"
                style={{ width: "100%" }}
              >
                <ul className="m-0">
                  {errors.map((error, index) => (
                    <li key={index}>{error.msg}</li>
                  ))}
                </ul>
              </div>
            )}
            {isLoading ? (
              <button
                className="btn btn-success btn-lg ms-2"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Loading...
              </button>
            ) : (
              " "
              // <Button type="submit" title="Login" />
            )}
          </form>
          {/* <Line title="Login with" />
          <Button type="google" /> */}
        </div>
      </section>
    </>
  );
}
