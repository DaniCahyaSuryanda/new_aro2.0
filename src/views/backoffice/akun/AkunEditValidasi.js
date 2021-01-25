import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CBadge,
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
import JsonAccAddValidasi from "../../../gl/params/lang/id/accounteditvalidation.json";
// import usersData from '../../users/DataAkun'

const fields = [
  "Otorisasi",
  { key: "trxid", label: JsonAccAddValidasi[0].list_trxid },
  { key: "accno", label: JsonAccAddValidasi[0].list_accno },
  { key: "accname", label: JsonAccAddValidasi[0].list_accname },
  { key: "acctype", label: JsonAccAddValidasi[0].list_acctype },
  { key: "normaldebit", label: JsonAccAddValidasi[0].list_normaldebit },
  { key: "description", label: JsonAccAddValidasi[0].list_description },
  { key: "isactive", label: JsonAccAddValidasi[0].list_isactive },
];

const AccAddValidation = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const [slide, setSlide] = useState(true);
  const [toasts, setToasts] = useState(true);

  useEffect(() => {
    if (dataAkun == null) {
      getDataAddValidasi();
    }
  }, [dataAkun]);

  const toggleDetails = (item) => {
    // console.log(item)
    setItems(item);
    setSlide(false);
  };

  const toggleDetails2 = (item) => {
    setItems(false);
    setSlide(true);
  };

  const getDataAddValidasi = () => {
    axios
      .get(`${global.config.API_URL}gl/params/account/edit/list`)
      .then((res) => {
        setDataAkun(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setujuOtoritasi = (trxid) => {
    console.log(trxid);
    let data = {
      trxid: trxid,
      validstate: 1,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/edit/validation`, data)
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsonAccAddValidasi[0].otor_success);
          setModal(false);
          setToasts(JsonAccAddValidasi[0].otor_success);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
            setToasts(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
            setToasts(null);
          }, 5000);
        }
      });
  };

  const tolakOtoritasi = (trxid) => {
    console.log(trxid);
    let data = {
      trxid: trxid,
      validstate: 2,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/edit/validation`, data)
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsonAccAddValidasi[0].otor_reject);
          setToasts(JsonAccAddValidasi[0].otor_reject);
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
            setToasts(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
            setToasts(null);
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

      {toasts && (
        <CRow>
          <CCol xl="6">
            <CToaster position="bottom-right">
              <CToastHeader>
                <h6>{toasts}</h6>
              </CToastHeader>
            </CToaster>
          </CCol>
        </CRow>
      )}

      {slide && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {JsonAccAddValidasi[0].list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    getDataAddValidasi();
                  }}
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-scrubber" />{" "}
                  {JsonAccAddValidasi[0].list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataAkun}
                  fields={fields}
                  hover
                  striped
                  bordered
                  columnFilter
                  size="sm"
                  itemsPerPage={10}
                  pagination
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
                            {JsonAccAddValidasi[0].confirm_otor_yes}
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
                        <td> {JsonAccAddValidasi.acctype_0} </td>
                      ) : (
                        <td> {JsonAccAddValidasi.acctype_1} </td>
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
                <h6>{JsonAccAddValidasi[0].detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <p className="text-muted">
                  {JsonAccAddValidasi[0].list_trxid} : {items.trxid}{" "}
                </p>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                >
                  <CRow>
                    <CCol xs="12" md="6" xl="5">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JsonAccAddValidasi[0].list_accno}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CInput
                            id="accno"
                            name="accno"
                            value={items.accno}
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6" xl="7">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JsonAccAddValidasi[0].list_accname}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CInput
                            id="accname"
                            name="accname"
                            value={items.accname}
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12" md="6" xl="5">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccAddValidasi[0].list_acctype}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CInput
                            id="accname"
                            name="accname"
                            value={
                              items.acctype == 0
                                ? "Akun Neraca"
                                : "Akun No Neraca"
                            }
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6" xl="7">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccAddValidasi[0].list_normaldebit}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CFormGroup variant="custom-checkbox" inline>
                            {items.isactive === true ? (
                              <CInputCheckbox
                                custom
                                id="rmaldebit"
                                name="rmaldebit"
                                value="true"
                                checked
                                disabled
                              />
                            ) : (
                              <CInputCheckbox
                                custom
                                id="rmaldebit"
                                name="rmaldebit"
                                value="false"
                                disabled
                              />
                            )}

                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="rmaldebit"
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
                            {JsonAccAddValidasi[0].list_description}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <CTextarea
                            name="description"
                            id="description"
                            rows="4"
                            value={items.description}
                            disabled
                          >
                            {items.description}
                          </CTextarea>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12" md="6" xl="5">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccAddValidasi[0].list_isactive}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="10">
                          <CFormGroup variant="custom-checkbox" inline>
                            {items.isactive === true ? (
                              <CInputCheckbox
                                custom
                                id="isactive"
                                name="isactive"
                                value="true"
                                disabled
                                checked
                              />
                            ) : (
                              <CInputCheckbox
                                custom
                                id="isactive"
                                name="isactive"
                                value="false"
                                disabled
                              />
                            )}
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="isactive"
                            ></CLabel>
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CForm>
                <CButton
                  onClick={() => setModal(!modal)}
                  size="sm"
                  color="primary"
                  className="float-right"
                >
                  <CIcon name="cil-check" /> {JsonAccAddValidasi[0].otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-ban" /> {JsonAccAddValidasi[0].reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                >
                  <CIcon name="cil-chevron-left" /> {JsonAccAddValidasi[0].hide}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsonAccAddValidasi[0].confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuOtoritasi(items.trxid)}
                  >
                    {JsonAccAddValidasi[0].confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsonAccAddValidasi[0].confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{JsonAccAddValidasi[0].confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {JsonAccAddValidasi[0].confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {JsonAccAddValidasi[0].confirm_reject_no}
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

export default AccAddValidation;
