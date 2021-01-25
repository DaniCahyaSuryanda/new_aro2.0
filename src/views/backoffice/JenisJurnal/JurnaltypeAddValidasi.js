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
  CToast,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Jsonjurnaladdvalidasi from "../../../gl/params/lang/id/journaltypeaddvalidation.json";

const fields = [
  Jsonjurnaladdvalidasi[0].list_new,
  { key: "trxid", label: Jsonjurnaladdvalidasi[0].list_trxid },
  { key: "jrtype", label: Jsonjurnaladdvalidasi[0].jrtype },
  { key: "description", label: Jsonjurnaladdvalidasi[0].description },
  { key: "isactive", label: Jsonjurnaladdvalidasi[0].isactive },
];

const ReportStrucValidasi = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataJenisJurnal, setDataJenisJurnal] = useState(null);
  // const [details, setDetails] = useState([])
  const [slide, setSlide] = useState(true);
  const [toasts, setToasts] = useState("");

  useEffect(() => {
    if (dataJenisJurnal == null) {
      getDataEditValidasi();
    }
  }, [dataJenisJurnal]);

  const toggleDetails = (item) => {
    // const position = details.indexOf(index)
    setItems(item);
    setSlide(false);
  };

  const toggleDetails2 = (item) => {
    // const position = details.indexOf(index)
    setItems(false);
    setSlide(true);
  };

  const setujuOtoritasi = (trxid) => {
    console.log(trxid);
    let data = {
      trxid: trxid,
      validstate: 1,
    };
    axios
      .post(
        `${global.config.API_URL}gl/params/journaltype/add/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(Jsonjurnaladdvalidasi[0].otor_success);
          setModal(false);
          setSlide(true);
          getDataEditValidasi();
          setItems(null);
          setToasts(Jsonjurnaladdvalidasi[0].otor_success);
          setTimeout(() => {
            setMessType(null);
            setToasts(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setMessType(null);
            setToasts(null);
            setMessage(null);
          }, 5000);
        }
      });
  };

  const getDataEditValidasi = () => {
    axios
      .get(`${global.config.API_URL}gl/params/journaltype/add/list`)
      .then((res) => {
        console.log(res.data.data);
        setDataJenisJurnal(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
        `${global.config.API_URL}gl/params/journaltype/add/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(Jsonjurnaladdvalidasi[0].otor_reject);
          setModal(false);
          setSlide(true);
          setToasts(Jsonjurnaladdvalidasi[0].otor_reject);
          getDataEditValidasi();
          setItems(null);
          setTimeout(() => {
            setMessType(null);
            setToasts(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setMessType(null);
            setToasts(null);
            setMessage(null);
          }, 5000);
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

      {slide && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {Jsonjurnaladdvalidasi[0].list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    getDataEditValidasi();
                  }}
                  style={{ float: "right" }}
                  className="mr-2"
                >
                  <CIcon name="cil-scrubber" />{" "}
                  {Jsonjurnaladdvalidasi[0].list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataJenisJurnal}
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
                            {Jsonjurnaladdvalidasi[0].otor_button}
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
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
      {toasts && (
        <CRow>
          <CCol xl="8">
            <CToaster position="bottom-right">
              <CToastHeader>
                <h6>{toasts}</h6>
              </CToastHeader>
            </CToaster>
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
              <CCardBody className="mb-4" color="light">
                <p className="text-muted">
                  {Jsonjurnaladdvalidasi[0].list_trxid} : {items.trxid}{" "}
                </p>
                <CRow>
                  <CCol xs="12" md="8" xl="8">
                    <CFormGroup row>
                      <CCol>
                        <CLabel htmlFor="text-input">
                          {Jsonjurnaladdvalidasi[0].list_jrtype}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="8">
                        <CInput
                          id="jrtype"
                          name="jrtype"
                          value={items.jrtype}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>

                  <CCol xs="12" md="4" xl="4">
                    <CFormGroup row>
                      <CCol>
                        <CLabel htmlFor="select">
                          {Jsonjurnaladdvalidasi[0].isactive}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="9">
                        <CFormGroup variant="custom-checkbox" inline>
                          <CInputCheckbox
                            custom
                            id="inline-checkbox1"
                            name="isactive"
                            value="true"
                            checked
                          />
                          <CLabel
                            variant="custom-checkbox"
                            htmlFor="inline-checkbox1"
                          ></CLabel>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" xl="12">
                    <CFormGroup row>
                      <CCol md="2">
                        <CLabel htmlFor="textarea-input">
                          {Jsonjurnaladdvalidasi[0].description}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <CTextarea
                          name="description"
                          id="description"
                          rows="4"
                          value={items.description}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <hr />
                </CRow>
                <CButton
                  onClick={() => setModal(!modal)}
                  className={"float-right"}
                  size="sm"
                  color="primary"
                >
                  <CIcon name="cil-check" />{" "}
                  {Jsonjurnaladdvalidasi[0].otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  style={{ float: "right" }}
                  className="mr-3"
                >
                  <CIcon name="cil-ban" />{" "}
                  {Jsonjurnaladdvalidasi[0].reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                  float="left"
                >
                  <CIcon name="cil-chevron-left" />{" "}
                  {Jsonjurnaladdvalidasi[0].hide}{" "}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{Jsonjurnaladdvalidasi[0].confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuOtoritasi(items.trxid)}
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
