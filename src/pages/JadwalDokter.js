import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AxiosRequest from "../helper/AxiosRequest";

export default function JadwalDokter() {
  const [isLoading, setIsLoading] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getJadwal();
  }, []);

  const getJadwal = () => {
    setIsLoading(true);
    AxiosRequest.GetAxiosRequest("/jadwal")
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.data);
          setDataSource(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const columns = [
    {
      align: "center",
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      align: "center",
      title: "Jadwal",
      dataIndex: "masuk",
      key: "masuk",
      render: (text, index) => (
        <div>
          Jam : {moment(index.masuk, "HH:mm:ss").format("HH:mm")} -{" "}
          {moment(index.keluar, "HH:mm:ss").format("HH:mm")}
        </div>
      ),
    },
    {
      align: "center",
      title: "Kehadiran",
      dataIndex: "hadir",
      key: "hadir",
      render: (text, index) => (text === true ? "Hadir" : "Tidak Hadir"),
    },
  ];
  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <Table
        dataSource={isLoading ? [] : dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
