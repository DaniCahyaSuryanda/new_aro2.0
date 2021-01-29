import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LangID from "json/lang/id/Akun/edit/accounteditvalidation.json";
import LangEN from "json/lang/en/Akun/edit/accounteditvalidation.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/id/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const AccAddValidation = () => {
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const [slide, setSlide] = useState(true);
  const history = useHistory();
  const [JsonAccAddValidasi, setJsonAccAddValidasi] = useState(null);
  const [fields, setField] = useState(null);
  const [messageJson, setMessageJson] = useState(null);

  useEffect(() => {
    if (JsonAccAddValidasi === null || fields === null) {
      if (configApp.lang === "id") {
        setJsonAccAddValidasi(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          { key: "trxid", label: LangID.list_trxid },
          { key: "accno", label: LangID.list_accno },
          { key: "accname", label: LangID.list_accname },
          { key: "acctype", label: LangID.list_acctype },
          { key: "normaldebit", label: LangID.list_normaldebit },
          { key: "description", label: LangID.list_description },
          { key: "isactive", label: LangID.list_isactive },
        ]);
      } else if (configApp.lang == "en") {
        setJsonAccAddValidasi(LangEN);
        setField([
          { key: "action", label: LangEN.list_new },
          { key: "trxid", label: LangEN.list_trxid },
          { key: "accno", label: LangEN.list_accno },
          { key: "accname", label: LangEN.list_accname },
          { key: "acctype", label: LangEN.list_acctype },
          { key: "normaldebit", label: LangEN.list_normaldebit },
          { key: "description", label: LangEN.list_description },
          { key: "isactive", label: LangEN.list_isactive },
        ]);
      } else {
        setJsonAccAddValidasi(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          { key: "trxid", label: LangID.list_trxid },
          { key: "accno", label: LangID.list_accno },
          { key: "accname", label: LangID.list_accname },
          { key: "acctype", label: LangID.list_acctype },
          { key: "normaldebit", label: LangID.list_normaldebit },
          { key: "description", label: LangID.list_description },
          { key: "isactive", label: LangID.list_isactive },
        ]);
      }
    }
  }, [JsonAccAddValidasi, fields]);

  useEffect(() => {
    if (messageJson === null) {
      if (configApp.lang === "id") {
        setMessageJson(messageID);
      } else if (configApp.lang == "en") {
        setMessageJson(messageEN);
      } else {
        setMessageJson(messageID);
      }
    }
  }, [messageJson]);

  useEffect(() => {
    if (dataAkun === null) {
      getDataAddValidasi();
    }
  }, [dataAkun]);

  const toggleDetails = (item) => {
    setItems(item);
    setSlide(false);
  };

  const toggleDetails2 = (item) => {
    setItems(false);
    setSlide(true);
  };

  const getDataAddValidasi = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}gl/params/account/edit/list`)
      .then((res) => {
        setDataAkun(res.data.data);
      })
      .catch((err) => {
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(err),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  const setujuOtoritasi = (trxid) => {
    setMessage({});
    let data = {
      trxid: trxid,
      validstate: 1,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/edit/validation`, data)
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setModal(false);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsonAccAddValidasi.otor_success,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setMessage({
            title: messageJson.messagetype_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
            active: true,
          });
          setModal(false);
        }
      })
      .catch((err) => {
        setModal(false);
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(err),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  const tolakOtoritasi = (trxid) => {
    setMessage({});
    let data = {
      trxid: trxid,
      validstate: 2,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/edit/validation`, data)
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setModal2(false);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsonAccAddValidasi.otor_reject,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setMessage({
            title: messageJson.messagetype_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
            active: true,
          });
          setModal2(false);
        }
      })
      .catch((err) => {
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(err),
          type: messageJson.toatscolor_err,
          active: true,
        });
        setModal2(false);
      });
  };

  return (
    <>
      <Toast message={message} />

      {slide && JsonAccAddValidasi && fields && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {JsonAccAddValidasi.list_caption}
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
                  {JsonAccAddValidasi.list_refresh}
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
                    action: (items) => {
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
                            {JsonAccAddValidasi.confirm_otor_yes}
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
                      item.acctype === 0 ? (
                        <td> {JsonAccAddValidasi.acctype_0} </td>
                      ) : (
                        <td> {JsonAccAddValidasi.acctype_1} </td>
                      ),
                  }}
                />
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="reset"
                  size="sm"
                  color="warning"
                  onClick={() => history.goBack()}
                >
                  <CIcon name="cil-chevron-left" /> {JsonAccAddValidasi.hide}
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      )}

      {items && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h6>{JsonAccAddValidasi.detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <p className="text-muted">
                  {JsonAccAddValidasi.list_trxid} : {items.trxid}{" "}
                </p>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                >
                  <CRow>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JsonAccAddValidasi.list_accno}
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

                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JsonAccAddValidasi.list_accname}
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
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccAddValidasi.list_acctype}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CInput
                            id="accname"
                            name="accname"
                            value={
                              items.acctype === 0
                                ? "Akun Neraca"
                                : "Akun No Neraca"
                            }
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="2" xl="2">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccAddValidasi.list_normaldebit}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
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

                    <CCol xs="12" md="2" xl="2">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccAddValidasi.list_isactive}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
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
                  <CRow>
                    <CCol xs="12" xl="12">
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="textarea-input">
                            {JsonAccAddValidasi.list_description}
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
                </CForm>
                <CButton
                  onClick={() => setModal(!modal)}
                  size="sm"
                  color="primary"
                  className="float-right"
                >
                  <CIcon name="cil-check" /> {JsonAccAddValidasi.otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-ban" /> {JsonAccAddValidasi.reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                >
                  <CIcon name="cil-chevron-left" /> {JsonAccAddValidasi.hide}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsonAccAddValidasi.confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuOtoritasi(items.trxid)}
                  >
                    {JsonAccAddValidasi.confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsonAccAddValidasi.confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{JsonAccAddValidasi.confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {JsonAccAddValidasi.confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {JsonAccAddValidasi.confirm_reject_no}
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
