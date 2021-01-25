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
  CToaster,
  CToastHeader,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import JsonAccEditValidasi from "../../../gl/params/lang/id/accountaddvalidation.json";
// import usersData from '../../users/DataAkun'

const fields = [
  JsonAccEditValidasi[0].list_new,
  { key: "trxid", label: JsonAccEditValidasi[0].list_trxid },
  { key: "accno", label: JsonAccEditValidasi[0].list_accno },
  { key: "accname", label: JsonAccEditValidasi[0].list_accname },
  { key: "acctype", label: JsonAccEditValidasi[0].list_acctype },
  { key: "normaldebit", label: JsonAccEditValidasi[0].list_normaldebit },
  { key: "description", label: JsonAccEditValidasi[0].list_description },
  { key: "isactive", label: JsonAccEditValidasi[0].list_isactive },
];

const AccAddValidation = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const [slide, setSlide] = useState(true);
  const [toasts, setToasts] = useState("");

  useEffect(() => {
    if (dataAkun == null) {
      getDataEditValidasi();
    }
  }, [dataAkun]);

  const toggleDetails2 = (item) => {
    // console.log(item)
    setSlide(true);
    setItems(false);
  };

  const toggleDetails = (item) => {
    // console.log(item)
    setItems(item);
    setSlide(false);
  };
  const setujuOtoritasi = (trxid) => {
    console.log(trxid);
    let data = {
      trxid: trxid,
      validstate: 1,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/add/validation`, data)
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsonAccEditValidasi[0].otor_success);
          setToasts(JsonAccEditValidasi[0].otor_success);
          setModal(false);
          setSlide(true);
          getDataEditValidasi();
          setItems(null);

          setTimeout(() => {
            setToasts(null);
            setMessType(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setToasts(null);
            setMessType(null);
            setMessage(null);
          }, 5000);
        }
      });
  };

  const getDataEditValidasi = () => {
    axios
      .get(`${global.config.API_URL}gl/params/account/add/list`)
      .then((res) => {
        setDataAkun(res.data.data);
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
      .post(`${global.config.API_URL}gl/params/account/add/validation`, data)
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsonAccEditValidasi[0].otor_reject);
          setToasts(JsonAccEditValidasi[0].otor_reject);
          setModal(false);
          setSlide(true);
          getDataEditValidasi();
          setItems(null);
          setTimeout(() => {
            setToasts(null);
            setMessType(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setToasts(null);
            setMessType(null);
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
                {JsonAccEditValidasi[0].list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    getDataEditValidasi();
                  }}
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-scrubber" />{" "}
                  {JsonAccEditValidasi[0].list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataAkun}
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
                            {JsonAccEditValidasi[0].otor_button}
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
                        <td> {JsonAccEditValidasi[0].acctype_0} </td>
                      ) : (
                        <td> {JsonAccEditValidasi[0].acctype_1} </td>
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
                <h6>{JsonAccEditValidasi[0].detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <p className="text-muted">
                  {JsonAccEditValidasi[0].list_trxid} : {items.trxid}{" "}
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
                            {JsonAccEditValidasi[0].list_accno}
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
                            {JsonAccEditValidasi[0].list_accname}
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
                            {JsonAccEditValidasi[0].list_acctype}
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
                            {JsonAccEditValidasi[0].list_normaldebit}
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
                            {JsonAccEditValidasi[0].list_description}
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
                            {JsonAccEditValidasi[0].list_isactive}
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
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-check" />{" "}
                  {JsonAccEditValidasi[0].otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  style={{ float: "right" }}
                  className="mr-3"
                >
                  <CIcon name="cil-ban" />{" "}
                  {JsonAccEditValidasi[0].reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                >
                  <CIcon name="cil-chevron-left" />{" "}
                  {JsonAccEditValidasi[0].hide}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsonAccEditValidasi[0].confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuOtoritasi(items.trxid)}
                  >
                    {JsonAccEditValidasi[0].confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsonAccEditValidasi[0].confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{JsonAccEditValidasi[0].confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {JsonAccEditValidasi[0].confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {JsonAccEditValidasi[0].confirm_reject_no}
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
