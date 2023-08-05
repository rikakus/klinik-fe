import {
  Button,
  Card,
  Checkbox,
  FloatButton,
  Form,
  Input,
  Modal,
  Table,
  Tabs,
} from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import AxiosRequest from "../helper/AxiosRequest";
import PeriksaDokter from "../components/Akun/form/PeriksaDokter";

export default function Periksa() {
  const [hidden, setHidden] = useState(true);
  const id = JSON.parse(localStorage.getItem("token")).id;

  const [isLoading, setIsLoading] = useState(false);
  const [dataSourcePeriksa, setDataSourcePeriksa] = useState([]);
  const [data, setData] = useState({});

  const getPeriksa = () => {
    setIsLoading(true);
    AxiosRequest.GetAxiosRequest("/periksa")
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.data);
          setDataSourcePeriksa(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPeriksa();
  }, []);

  const columns = [
    [
      {
        align: "center",
        title: "Nama",
        dataIndex: "nama",
        key: "nama",
        render: (text, index) => (text !== "null" ? (text ? text : "-") : "-"),
      },
      {
        align: "center",
        title: "Keluhan",
        dataIndex: "keluhan",
        key: "keluhan",
        render: (text, index) => (text !== "null" ? (text ? text : "-") : "-"),
      },

      {
        align: "center",
        title: "Nasihat",
        dataIndex: "nasihat",
        key: "nasihat",
        render: (text, index) => (text !== "null" ? (text ? text : "-") : "-"),
      },

      {
        align: "center",
        title: "Diagnosa",
        dataIndex: "diagnosa",
        key: "diagnosa",
        render: (text, index) => (text !== "null" ? (text ? text : "-") : "-"),
      },

      {
        align: "center",
        title: "Resep Dokter",
        dataIndex: "resepDokter",
        key: "resepDokter",
        render: (text, index) => (text !== "null" ? (text ? text : "-") : "-"),
      },

      {
        align: "center",
        title: "Nama Dokter",
        dataIndex: "namaDokter",
        key: "namaDokter",
        render: (text, index) => (text !== "null" ? (text ? text : "-") : "-"),
      },

      {
        align: "center",
        title: "Proses",
        dataIndex: "sudahSelesai",
        key: "sudahSelesai",
        render: (text, index) =>
          text !== "null"
            ? text === 1
              ? "Sudah Diperiksa"
              : "Belum Diperiksa"
            : "-",
      },
      {
        align: "center",
        title: "Dibuat",
        dataIndex: "create",
        key: "create",
        render: (text, index) => (
          <div>
            Tanggal : {moment(text).format("DD-MM-YYYY")} Jam :{" "}
            {moment(text).format("HH:mm")}
          </div>
        ),
      },
      {
        align: "center",
        title: "Menu Aksi",
        dataIndex: "menuAksi",
        key: "menuAksi",
        render: (text, index) => (
          <div style={{ flexDirection: "row" }}>
            <Button
              // style={{ margin: 5, backgroundColor: "green", color: "white" }}
              type="primary"
              disabled={index.sudahSelesai === 1}
              onClick={(e) => {
                setHidden(false);
                setData(index);
              }}
            >
              Periksa
            </Button>
            {/* <Button
            style={{ margin: 5, backgroundColor: "red", color: "white" }}
            // type="danger"
          >
            Delete
          </Button> */}
          </div>
        ),
      },
    ],
  ];
  return (
    <>
      <Card>
        <Table
          loading={isLoading}
          dataSource={dataSourcePeriksa}
          columns={columns[0]}
          pagination={{ pageSize: 5 }}
        />
      </Card>
      <Modal
        width={"50%"}
        title={"Periksa"}
        open={!hidden}
        // // onOk={(e) => setHidden(false)}
        onCancel={(e) => {
          setHidden(true);
          getPeriksa();
        }}
        footer={[]}
      >
        <PeriksaDokter
          hidden={(e) => {
            setHidden(true);
            getPeriksa();
          }}
          data={data}
          isHidden={hidden}
        />
      </Modal>
    </>
  );
}
