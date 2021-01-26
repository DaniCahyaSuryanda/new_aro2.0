import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CBadge,
  CCollapse,
  CDataTable,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CTextarea,
  CForm,
  CAlert,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Jsonjurnaladdvalidasi from "../../../gl/params/lang/id/reportstructureaddvalidation";

const fields = [
  Jsonjurnaladdvalidasi[0].list_new,
  { key: "asid", label: Jsonjurnaladdvalidasi[0].list_asid },
  { key: "asname", label: Jsonjurnaladdvalidasi[0].list_asname },
  { key: "isactive", label: Jsonjurnaladdvalidasi[0].isactive },
];

const fieldsDetail = [
  { key: "itemno", label: Jsonjurnaladdvalidasi[0].detailitem_no },
  { key: "itemname", label: Jsonjurnaladdvalidasi[0].detailitem_name },
  { key: "parentno", label: Jsonjurnaladdvalidasi[0].detailitem_parentno },
  { key: "accno", label: Jsonjurnaladdvalidasi[0].detailitem_accno },
  { key: "accname", label: Jsonjurnaladdvalidasi[0].detailitem_accname },
  { key: "isvisible", label: Jsonjurnaladdvalidasi[0].detailitem_isvisible },
];

const ReportStrucValidasi = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  // const [dataJenisJurnal, setDataAccountStructure] = useState(null)

  const [dataAccountStructure, setDataAccountStructure] = useState(null);
  const [details, setDetails] = useState([]);
  //const [items, setItems] = useState(usersData)

  useEffect(() => {
    if (dataAccountStructure == null) {
      getDataValidasi();
    }
  }, [dataAccountStructure]);

  // const SetDataStruture = () => {
  //   setDataAccountStructure(data)
  //       console.log(data)
  // }

  const toggleDetails = (item) => {
    // const position = details.indexOf(index)
    console.log(item);
    setItems(item);

    axios
      .get(
        `${global.config.API_URL}gl/params/accountstructure/add/load?trxid=${item.trxid}`
      )
      .then((res) => {
        console.log(res.data.rescode);
        if (res.data.rescode == 0) {
          setDetails(res.data.data.detail);
          console.log(res.data.data.detail);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const setujuOtoritasi = (trxid) => {
    console.log("test", trxid);
    let data = {
      trxid: trxid,
      validstate: 1,
    };
    axios
      .post(
        `${global.config.API_URL}gl/params/accountstructure/add/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(
            "Data dengan Transaksi id " + trxid + " berhasil di otorisasi"
          );
          setModal(false);
          setItems(null);
          getDataValidasi();
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          window.scrollTo(0, 0);
          setMessage(res.data.errdescription);
          setModal(false);
        }
      });
  };

  const getDataValidasi = () => {
    axios
      .get(`${global.config.API_URL}gl/params/accountstructure/add/list`)
      .then((res) => {
        setDataAccountStructure(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const tolakOtoritasi = (trxid) => {
    console.log(trxid);
    let data = {
      trxid: trxid,
      validstate: 2,
    };
    axios
      .post(
        `${global.config.API_URL}gl/params/accountstructure/add/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(
            "Data dengan Transaksi id " + trxid + " berhasil di tolak"
          );
          setModal(false);
          setItems(null);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setModal(false);
        }
      });
  };

  return (
    <>
      {message && (
        <CRow>
          <CCol>
            <CAlert color={messType}>{message}</CAlert>
          </CCol>
        </CRow>
      )}
      {items == null && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {Jsonjurnaladdvalidasi[0].list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    getDataValidasi();
                  }}
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-scrubber" />{" "}
                  {Jsonjurnaladdvalidasi[0].list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataAccountStructure}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  columnFilter
                  scopedSlots={{
                    Otorisasi: (items) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(items);
                            }}
                          >
                            Otorisasi
                          </CButton>
                        </td>
                      );
                    },
                    isactive: (item) =>
                      item.isactive ? (
                        <td>
                          <CBadge color={"success"}>
                            <CIcon size={"lg"} name={"cilCheck"} />
                          </CBadge>
                        </td>
                      ) : (
                        <td>
                          <CBadge color={"warning"}>
                            <p
                              style={{
                                fontSize: "1.25rem",
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "#fff",
                                margin: "0px",
                                padding: "0px",
                              }}
                            >
                              i
                            </p>
                          </CBadge>
                        </td>
                      ),
                    normaldebit: (item) =>
                      item.normaldebit ? (
                        <td>
                          <CBadge color={"success"}>
                            <CIcon size={"lg"} name={"cilCheck"} />
                          </CBadge>
                        </td>
                      ) : (
                        <td>
                          <CBadge color={"warning"}>
                            <p
                              style={{
                                fontSize: "1.25rem",
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "#fff",
                                margin: "0px",
                                padding: "0px",
                              }}
                            >
                              i
                            </p>
                          </CBadge>
                        </td>
                      ),
                    acctype: (item) =>
                      item.acctype == 0 ? (
                        <td> Akun Neraca </td>
                      ) : (
                        <td> Akun Non Neraca </td>
                      ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
      {items && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h6>{Jsonjurnaladdvalidasi[0].detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                >
                  <CRow>
                    <CCol lg="6" md="6" sm="12">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {Jsonjurnaladdvalidasi[0].asid}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            className="form-control"
                            readOnly
                            id="asid"
                            name="asid"
                            defaultValue={items.asid}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol lg="6" md="6" sm="12">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {Jsonjurnaladdvalidasi[0].asname}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            className="form-control"
                            readOnly
                            id="asname"
                            name="asname"
                            defaultValue={items.asname}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="6" md="6" sm="12">
                      <CFormGroup variant="custom-checkbox" inline row>
                        <CCol xs="2" xl="2">
                          <CLabel htmlFor="select">
                            {Jsonjurnaladdvalidasi[0].isactive}
                          </CLabel>
                        </CCol>
                        <CCol xs="3" xl="3">
                          <CFormGroup variant="custom-checkbox" inline>
                            {items.isactive === true ? (
                              <CInputCheckbox checked disabled />
                            ) : (
                              <CInputCheckbox disabled />
                            )}
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol lg="6" md="6" sm="12">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {Jsonjurnaladdvalidasi[0].tag}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            className="form-control"
                            readOnly
                            id="tag"
                            name="tag"
                            defaultValue={items.tag}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CDataTable
                        items={details}
                        fields={fieldsDetail}
                        hover
                        striped
                        bordered
                        columnFilter
                        itemsPerPage={5}
                        pagination
                        scopedSlots={{
                          isvisible: (item) =>
                            item.isvisible ? (
                              <td>
                                <CBadge color={"success"}>
                                  <CIcon size={"lg"} name={"cilCheck"} />
                                </CBadge>
                              </td>
                            ) : (
                              <td>
                                <CBadge color={"warning"}>
                                  <p
                                    style={{
                                      fontSize: "1.25rem",
                                      width: "1.25rem",
                                      height: "1.25rem",
                                      color: "#fff",
                                      margin: "0px",
                                      padding: "0px",
                                    }}
                                  >
                                    i
                                  </p>
                                </CBadge>
                              </td>
                            ),
                        }}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CButton
                        onClick={() => setItems(null)}
                        size="sm"
                        color="warning"
                      >
                        <CIcon name="cil-chevron-left" />{" "}
                        {Jsonjurnaladdvalidasi[0].hide}
                      </CButton>
                      <CButton
                        onClick={() => setModal(!modal)}
                        style={{ float: "right" }}
                        size="sm"
                        color="primary"
                      >
                        <CIcon name="cil-check" />{" "}
                        {Jsonjurnaladdvalidasi[0].otor_button}
                      </CButton>
                      <CButton
                        onClick={() => setModal2(!modal_no)}
                        style={{ float: "right" }}
                        className="mr-3"
                        size="sm"
                        color="danger"
                      >
                        <CIcon name="cil-ban" />{" "}
                        {Jsonjurnaladdvalidasi[0].reject_button}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h3>{Jsonjurnaladdvalidasi[0].confirm_otor}</h3>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => setujuOtoritasi(items.asid)}
                    color="primary"
                  >
                    {Jsonjurnaladdvalidasi[0].confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {Jsonjurnaladdvalidasi[0].confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>
              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{Jsonjurnaladdvalidasi[0].confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {Jsonjurnaladdvalidasi[0].confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {Jsonjurnaladdvalidasi[0].confirm_reject_no}
                  </CButton>
                </CModalFooter>
              </CModal>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default ReportStrucValidasi;
