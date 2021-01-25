import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
  CAlert,
  CBadge,
  CForm,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import JsoneditValidasi from "../../../gl/params/lang/id/journaltypeeditvalidation.json";

const fields = [
  "Otorisasi",
  { key: "trxid", label: JsoneditValidasi[0].list_trxid },
  { key: "jrtype", label: JsoneditValidasi[0].list_jrtype },
  { key: "description", label: JsoneditValidasi[0].list_description },
  { key: "isactive", label: JsoneditValidasi[0].list_isactive },
  // {key: 'normaldebit', label: JsonAccAddValidasi[0].list_normaldebit},
  // {key: 'description', label: JsonAccAddValidasi[0].list_description},
  // {key: 'isactive', label: JsonAccAddValidasi[0].list_isactive},
];

const JurnalEditValidasi = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataPengkinian, setdataPengkinian] = useState(null);
  const [slide, setSlide] = useState(true);
  const [toasts, setToasts] = useState("");

  useEffect(() => {
    if (dataPengkinian == null) {
      getDataAddValidasi();
    }
  }, [dataPengkinian]);

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
    axios
      .get(`${global.config.API_URL}gl/params/journaltype/edit/list`)
      .then((res) => {
        setdataPengkinian(res.data.data);
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
      .post(
        `${global.config.API_URL}gl/params/journaltype/edit/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsoneditValidasi[0].otor_success);
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setToasts(JsoneditValidasi[0].otor_success);
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

  const tolakOtoritasi = (trxid) => {
    console.log(trxid);
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
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsoneditValidasi[0].otor_reject);
          setToasts(JsoneditValidasi[0].otor_reject);
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
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

      {slide && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {JsoneditValidasi[0].list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    getDataAddValidasi();
                  }}
                  style={{ float: "right" }}
                  className="mr-3"
                >
                  <CIcon name="cil-scrubber" />{" "}
                  {JsoneditValidasi[0].list_refresh}
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
                            {JsoneditValidasi[0].otor_button}
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
                <h6>{JsoneditValidasi[0].detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <p className="text-muted">
                  {JsoneditValidasi[0].list_trxid} : {items.trxid}{" "}
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
                            {JsoneditValidasi[0].list_jrtype}
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

                    <CCol xs="12" md="6" xl="7">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsoneditValidasi[0].list_isactive}
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
                            {JsoneditValidasi[0].list_description}
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
                  <CIcon name="cil-check" /> {JsoneditValidasi[0].otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-ban" /> {JsoneditValidasi[0].reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                  float="left"
                >
                  <CIcon name="cil-chevron-left" /> {JsoneditValidasi[0].hide}{" "}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsoneditValidasi[0].confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuOtoritasi(items.trxid)}
                  >
                    {JsoneditValidasi[0].confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsoneditValidasi[0].confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{JsoneditValidasi[0].confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {JsoneditValidasi[0].confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {JsoneditValidasi[0].confirm_reject_no}
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
