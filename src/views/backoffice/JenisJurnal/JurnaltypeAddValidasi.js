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
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LangID from "json/lang/id/Tipe Jurnal/add/journaltypeaddvalidation.json";
import LangEN from "json/lang/en/Tipe Jurnal/add/journaltypeaddvalidation.json";
// import messageJson from "json/lang/id/Message/message.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";

const ReportStrucValidasi = () => {
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataJenisJurnal, setDataJenisJurnal] = useState(null);
  const [slide, setSlide] = useState(true);
  const [itemCreate, setItemCreate] = useState({});
  const [fields, setField] = useState([]);
  const [messageJson, setMessageJson] = useState({});
  const history = useHistory();
  const configApp = JSON.parse(sessionStorage.getItem("config"));

  useEffect(() => {
    if (dataJenisJurnal == null) {
      getDataEditValidasi();
    }
  }, [dataJenisJurnal]);

  useEffect(() => {
    if (configApp.lang == "id") {
      setMessageJson(messageID);
    } else if (configApp.lang == "en") {
      setMessageJson(messageEN);
    } else {
      setMessageJson(messageID);
    }
  }, [messageJson]);

  useEffect(
    () => {
      if (configApp.lang == "id") {
        setItemCreate(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          { key: "trxid", label: LangID.list_trxid },
          { key: "jrtype", label: LangID.jrtype },
          { key: "description", label: LangID.description },
          { key: "isactive", label: LangID.isactive },
        ]);
      } else if (configApp.lang == "en") {
        setItemCreate(LangEN);
        setField([
          { key: "action", label: LangEN.list_new },
          { key: "trxid", label: LangEN.list_trxid },
          { key: "jrtype", label: LangEN.jrtype },
          { key: "description", label: LangEN.description },
          { key: "isactive", label: LangEN.isactive },
        ]);
      } else {
        setItemCreate(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          { key: "trxid", label: LangID.list_trxid },
          { key: "jrtype", label: LangID.jrtype },
          { key: "description", label: LangID.description },
          { key: "isactive", label: LangID.isactive },
        ]);
      }
    },
    [itemCreate],
    [fields]
  );

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
    setMessage({});
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
        if (res.data.rescode === 0) {
          setModal(false);
          setSlide(true);
          getDataEditValidasi();
          setItems(null);
          setMessage({
            title: messageJson.toatsheader_success,
            body: itemCreate.otor_success,
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

  const getDataEditValidasi = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}gl/params/journaltype/add/list`)
      .then((res) => {
        setDataJenisJurnal(res.data.data);
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

  const tolakOtoritasi = (trxid) => {
    setMessage({});
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
        if (res.data.rescode === 0) {
          setModal2(false);
          setSlide(true);
          getDataEditValidasi();
          setItems(null);
          setMessage({
            title: messageJson.toatsheader_success,
            body: itemCreate.otor_reject,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setModal2(false);
          setMessage({
            title: messageJson.messagetype_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
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

      {slide && itemCreate && fields && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {itemCreate.list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    getDataEditValidasi();
                  }}
                  style={{ float: "right" }}
                  className="mr-2"
                >
                  <CIcon name="cil-scrubber" /> {itemCreate.list_refresh}
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
                  itemsPerPage={30}
                  pagination
                  columnFilter
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
                            {itemCreate.list_new}
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
                            ></p>
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
                  <CIcon name="cil-chevron-left" /> {itemCreate.hide}
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
                <h6>{itemCreate.detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <p className="text-muted">
                  {itemCreate.list_trxid} : {items.trxid}{" "}
                </p>
                <CRow>
                  <CCol xs="12" md="6" xl="6">
                    <CFormGroup row>
                      <CCol>
                        <CLabel htmlFor="text-input">
                          {itemCreate.list_jrtype}
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

                  <CCol xs="12" md="2" xl="2">
                    <CFormGroup row>
                      <CCol>
                        <CLabel htmlFor="select">{itemCreate.isactive}</CLabel>
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
                          {itemCreate.description}
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
                  <CIcon name="cil-check" /> {itemCreate.otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  style={{ float: "right" }}
                  className="mr-3"
                >
                  <CIcon name="cil-ban" /> {itemCreate.reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                  float="left"
                >
                  <CIcon name="cil-chevron-left" /> {itemCreate.hide}{" "}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{itemCreate.confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuOtoritasi(items.trxid)}
                  >
                    {itemCreate.confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {itemCreate.confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{itemCreate.confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {itemCreate.confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {itemCreate.confirm_reject_no}
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
