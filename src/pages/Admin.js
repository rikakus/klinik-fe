import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Checkbox,
  FloatButton,
  Form,
  Input,
  Modal,
  Table,
  Tabs,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DaftarPasien from "../components/Admin/DaftarPasien";
import DaftarDokter from "../components/Admin/DaftarDokter";
import DaftarAntrian from "../components/Admin/DaftarAntrian";
import KoneksiWa from "../components/Admin/KoneksiWa";
import JadwalDokter from "../components/Admin/JadwalDokter";

const { TabPane } = Tabs;

export default function Admin() {

  const dataSource = [
    {
      key: "1",
      username: "ian",
      email: "ianpangestu082@gmail.com",
      role: 1,
      id: 1,
      password: "12",
    },
  ];

  const columns = [
    {
      align: "center",
      title: "Nama",
      dataIndex: "username",
      key: "username",
    },
    {
      align: "center",
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      align: "center",
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      align: "center",
      title: "Menu Aksi",
      dataIndex: "menuAksi",
      key: "menuAksi",
      align: "center",
      render: (text, index) => (
        <div style={{ flexDirection: "row" }}>
          <Button
            // style={{ margin: 5, backgroundColor: "green", color: "white" }}
            type="primary"
            onClick={(e) => {
              // console.log(index);
            }}
          >
            Edit
          </Button>
          <Button
            style={{ margin: 5, backgroundColor: "red", color: "white" }}
            // type="danger"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="">
        <Tabs tabPosition={"left"} size="large">
          <TabPane tab="Daftar Pasien" key="1">
            <DaftarPasien></DaftarPasien>
          </TabPane>
          <TabPane tab="Daftar Dokter" key="2">
            <DaftarDokter></DaftarDokter>
          </TabPane>

          <TabPane tab="Jadwal Dokter" key="4">
          <JadwalDokter></JadwalDokter>
          </TabPane>
          <TabPane tab="Data Antrian" key="5">
            <DaftarAntrian></DaftarAntrian>
          </TabPane>
          <TabPane tab="Koneksi Whatsapp" key="6">
            <KoneksiWa></KoneksiWa>
          </TabPane>
        </Tabs>
      </section>
    </>
  );
}
