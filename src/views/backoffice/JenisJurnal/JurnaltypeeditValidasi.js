import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
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
  CBadge,
  CForm,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LangID from "json/lang/id/Tipe Jurnal/edit/journaltypeeditvalidation.json";
import LangEN from "json/lang/en/Tipe Jurnal/edit/journaltypeeditvalidation.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";

const JurnalEditValidasi = () => {
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataPengkinian, setdataPengkinian] = useState(null);
  const [slide, setSlide] = useState(true);
  const history = useHistory();
  const [JsoneditValidasi, setJsoneditValidasi] = useState({});
  const [messageJson, setMessageJson] = useState({});
  const [fields, setField] = useState([]);
  const configApp = JSON.parse(sessionStorage.getItem("config"));

  useEffect(() => {
    if (dataPengkinian == null) {
      getDataAddValidasi();
    }
  }, [dataPengkinian]);

  useEffect(() => {
    if (configApp.lang === "id") {
      setJsoneditValidasi(LangID);
      setField([
        { key: "action", label: LangID.list_new },
        { key: "trxid", label: LangID.list_trxid },
        { key: "jrtype", label: LangID.jrtype },
        { key: "description", label: LangID.description },
        { key: "isactive", label: LangID.isactive },
      ]);
    } else if (configApp.lang == "en") {
      setJsoneditValidasi(LangEN);
      setField([
        { key: "action", label: LangEN.list_new },
        { key: "trxid", label: LangEN.list_trxid },
        { key: "jrtype", label: LangEN.jrtype },
        { key: "description", label: LangEN.description },
        { key: "isactive", label: LangEN.isactive },
      ]);
    } else {
      setJsoneditValidasi(LangID);
      setField([
        { key: "action", label: LangID.list_new },
        { key: "trxid", label: LangID.list_trxid },
        { key: "jrtype", label: LangID.jrtype },
        { key: "description", label: LangID.description },
        { key: "isactive", label: LangID.isactive },
      ]);
    }
  });

  useEffect(() => {
    if (configApp.lang == "id") {
      setMessageJson(messageID);
    } else if (configApp.lang == "en") {
      setMessageJson(messageEN);
    } else {
      setMessageJson(messageID);
    }
  }, [messageJson]);

  const toggleDetails = (item) => {
    // console.log(item)
    setItems(item);
    setSlide(false);
  };

  const toggleDetails2 = () => {
    // console.log(item)
    setItems(false);
    setSlide(true);
  };

  const getDataAddValidasi = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}gl/params/journaltype/edit/list`)
      .then((res) => {
        setdataPengkinian(res.data.data);
      })
      .catch(function (error) {
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(error),
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
      .post(
        `${global.config.API_URL}gl/params/journaltype/edit/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsoneditValidasi.otor_success,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setModal(false);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsoneditValidasi.message_success,
            type: messageJson.toatscolor_success,
            active: true,
          });
        }
      })
      .catch(function (error) {
        setModal(false);
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(error),
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
      .post(
        `${global.config.API_URL}gl/params/journaltype/edit/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        // console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setModal2(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsoneditValidasi.otor_reject,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setModal2(false);
          setMessage({
            title: messageJson.toatsheader_success,
            body: res.data.errdescription,
            type: messageJson.toatscolor_success,
            active: true,
          });
        }
      })
      .catch(function (error) {
        setModal2(false);
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(error),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  return (
    <>
      <Toast message={message} />
      {slide && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {JsoneditValidasi.list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    getDataAddValidasi();
                  }}
                  style={{ float: "right" }}
                  className="mr-3"
                >
                  <CIcon name="cil-scrubber" /> {JsoneditValidasi.list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataPengkinian}
                  fields={fields}
                  hover
                  striped
                  bordered
                  columnFilter
                  size="sm"
                  itemsPerPage={50}
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
                            {JsoneditValidasi.otor_button}
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
              <CCardFooter>
                <CButton
                  type="reset"
                  size={"sm"}
                  color="warning"
                  onClick={() => history.goBack()}
                >
                  <CIcon name="cil-chevron-left" /> {JsoneditValidasi.hide}
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
                <h6>{JsoneditValidasi.detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <p className="text-muted">
                  {JsoneditValidasi.list_trxid} : {items.trxid}{" "}
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
                            {JsoneditValidasi.list_jrtype}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CInput
                            id="jrtype"
                            name="jrtype"
                            value={items.jrtype}
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="2" xl="2">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsoneditValidasi.list_isactive}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CFormGroup variant="custom-checkbox" inline>
                            {items.isactive === true ? (
                              <CInputCheckbox
                                custom
                                id="isactive"
                                name="isactive"
                                value="true"
                                checked
                                disabled
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
                            {JsoneditValidasi.list_description}
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
                <hr />
                <CButton
                  onClick={() => setModal(!modal)}
                  className={"float-right"}
                  size="sm"
                  color="primary"
                >
                  <CIcon name="cil-check" /> {JsoneditValidasi.otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-ban" /> {JsoneditValidasi.reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                  float="left"
                >
                  <CIcon name="cil-chevron-left" /> {JsoneditValidasi.hide}{" "}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsoneditValidasi.confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuOtoritasi(items.trxid)}
                  >
                    {JsoneditValidasi.confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsoneditValidasi.confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{JsoneditValidasi.confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {JsoneditValidasi.confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {JsoneditValidasi.confirm_reject_no}
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

export default JurnalEditValidasi;
