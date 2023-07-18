import React, { useEffect, useState } from "react";
import "../assets/styles/beranda.css";
import { Card, Col, Row, Button, Modal } from "antd";
import JadwalDokter from "./JadwalDokter";
import AxiosRequest from "../helper/AxiosRequest";
import Swal from "sweetalert2";
import Periksa from "../components/Akun/form/Periksa";
import { useNavigate } from "react-router-dom";

export default function Beranda() {
  const navigate = useNavigate();

  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setRole(token.role);
    }
    console.log(token);
  }, []);

  const kirimWa = (formData) => {
    AxiosRequest.PostAxiosRequest("/send", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAntrian = () => {
    const id = JSON.parse(localStorage.getItem("token")).id;
    AxiosRequest.GetAxiosRequest("/antrian/" + id)
      .then((res) => {
        if (res.data.status === "failed") {
          // setErrors([{ msg: res.data.error }]);
        } else if (res.data.status === "success") {
          Swal.fire({
            title: "Berhasil Mendapatkan Antrian",
            text: "No Antrian Anda No " + res.data.data.antrian,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#066A19",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              kirimWa({
                nomor: JSON.parse(localStorage.getItem("token")).noHp,
                pesan: 
                `Kami dari Klinik Asna
Mau Menginfokan No Antrian Anda No ${res.data.data.antrian}
Terima Kasih`,
              });
            }
          });
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="section">
      <div>
        <Row className="beranda">
          <Col span={16} style={{ color: "white", textAlign: "center" }}>
            <h3>Sekarang semua bisa</h3>
            <h3>di lakukan secara online!</h3>
            <h5>Dari antri hingga periksa bisa online!</h5>

            <Row>
              <Col span={12}></Col>
              <Col span={6}>
                {" "}
                <Button
                  loading={isLoading}
                  onClick={(e) => {
                    if (role === null) {
                      navigate("/login");
                    } else if (role === 0) {
                      Swal.fire({
                        title: "Tidak Dapat Mengambil No Antrian",
                        text: `Anda Menggunakan Akun Admin, Silahkan Login Ke Akun Pasien Untuk Mengambil No Antrian!`,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#066A19",
                        confirmButtonText: "Oke",
                      }).then((result) => {
                        if (result.isConfirmed) {
                        }
                      });
                    } else if (role === 1) {
                      Swal.fire({
                        title: "Tidak Dapat Mengambil No Antrian",
                        text: `Anda Menggunakan Akun Dokter, Silahkan Login Ke Akun Pasien Untuk Mengambil No Antrian!`,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#066A19",
                        confirmButtonText: "Oke",
                      }).then((result) => {
                        if (result.isConfirmed) {
                        }
                      });
                    } else {
                      getAntrian();
                    }
                  }}
                >
                  Antri
                </Button>{" "}
                <Button
                  onClick={(e) => {
                    if (role === null) {
                      navigate("/login");
                    } else if (role === 0) {
                      Swal.fire({
                        title: "Tidak Dapat Mengambil No Antrian",
                        text: `Anda Menggunakan Akun Admin, Silahkan Login Ke Akun Pasien Untuk Mengambil No Antrian!`,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#066A19",
                        confirmButtonText: "Oke",
                      }).then((result) => {
                        if (result.isConfirmed) {
                        }
                      });
                    } else if (role === 1) {
                      Swal.fire({
                        title: "Tidak Dapat Mengambil No Antrian",
                        text: `Anda Menggunakan Akun Dokter, Silahkan Login Ke Akun Pasien Untuk Mengambil No Antrian!`,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#066A19",
                        confirmButtonText: "Oke",
                      }).then((result) => {
                        if (result.isConfirmed) {
                        }
                      });
                    } else {
                      setHidden(false);
                    }
                  }}
                >
                  Periksa
                </Button>
              </Col>
              <Col span={6}></Col>
            </Row>
          </Col>
          <Col span={8}>
            <Card style={{ width: "80%" }}>
              <JadwalDokter />
            </Card>
          </Col>
        </Row>
        <Modal
          width={"50%"}
          title={"Periksa"}
          open={!hidden}
          // // onOk={(e) => setHidden(false)}
          onCancel={(e) => setHidden(true)}
          footer={[]}
        >
          <Periksa hidden={(e) => setHidden(true)} isHidden={hidden} />
        </Modal>
      </div>
    </section>
  );
}
