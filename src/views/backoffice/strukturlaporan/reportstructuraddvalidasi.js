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
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CForm,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LangID from "json/lang/id/Struktur Laporan/add/reportstructureaddvalidation.json";
import LangEN from "json/lang/en/Struktur Laporan/add/reportstructureaddvalidation.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const ReportStrucValidasi = () => {
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const history = useHistory();
  const [dataAccountStructure, setDataAccountStructure] = useState(null);
  const [details, setDetails] = useState([]);
  const [Jsonjurnaladdvalidasi, setJsonjurnaladdvalidasi] = useState(null);
  const [messageJson, setMessageJson] = useState(null);
  const [fields, setField] = useState(null);
  const [fieldsDetail, setFieldsDetail] = useState(null);

  useEffect(() => {
    if (
      Jsonjurnaladdvalidasi === null ||
      fields === null ||
      fieldsDetail === null
    ) {
      if (configApp.lang === "id") {
        setJsonjurnaladdvalidasi(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          { key: "asid", label: LangID.list_asid },
          { key: "asname", label: LangID.list_asname },
          { key: "isactive", label: LangID.isactive },
        ]);

        setFieldsDetail([
          { key: "itemno", label: LangID.detailitem_no },
          { key: "itemname", label: LangID.detailitem_name },
          { key: "parentno", label: LangID.detailitem_parentno },
          { key: "accno", label: LangID.detailitem_accno },
          { key: "accname", label: LangID.detailitem_accname },
          { key: "isvisible", label: LangID.detailitem_isvisible },
        ]);
      } else if (configApp.lang == "en") {
        setJsonjurnaladdvalidasi(LangEN);
        setField([
          { key: "action", label: LangEN.list_new },
          { key: "asid", label: LangEN.list_asid },
          { key: "asname", label: LangEN.list_asname },
          { key: "isactive", label: LangEN.isactive },
        ]);

        setFieldsDetail([
          { key: "itemno", label: LangEN.detailitem_no },
          { key: "itemname", label: LangEN.detailitem_name },
          { key: "parentno", label: LangEN.detailitem_parentno },
          { key: "accno", label: LangEN.detailitem_accno },
          { key: "accname", label: LangEN.detailitem_accname },
          { key: "isvisible", label: LangEN.detailitem_isvisible },
        ]);
      } else {
        setJsonjurnaladdvalidasi(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          { key: "asid", label: LangID.list_asid },
          { key: "asname", label: LangID.list_asname },
          { key: "isactive", label: LangID.isactive },
        ]);

        setFieldsDetail([
          { key: "itemno", label: LangID.detailitem_no },
          { key: "itemname", label: LangID.detailitem_name },
          { key: "parentno", label: LangID.detailitem_parentno },
          { key: "accno", label: LangID.detailitem_accno },
          { key: "accname", label: LangID.detailitem_accname },
          { key: "isvisible", label: LangID.detailitem_isvisible },
        ]);
      }
    }
  }, [Jsonjurnaladdvalidasi, fields, fieldsDetail]);

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
    if (dataAccountStructure === null) {
      getDataValidasi();
    }
  }, [dataAccountStructure]);

  const toggleDetails = (item) => {
    setMessage({});
    setItems(item);
    axios
      .get(
        `${global.config.API_URL}gl/params/accountstructure/add/load?trxid=${item.trxid}`
      )
      .then((res) => {
        console.log(res.data.rescode);
        if (res.data.rescode === 0) {
          setDetails(res.data.data.detail);
          // console.log(res.data.data.detail);
        } else {
          setMessage({
            title: messageJson.toatsheader_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
            active: true,
          });
        }
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
        `${global.config.API_URL}gl/params/accountstructure/add/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        if (res.data.rescode === 0) {
          setModal(false);
          setItems(null);
          getDataValidasi();
          setMessage({
            title: messageJson.toatsheader_success,
            body: Jsonjurnaladdvalidasi.message_otor,
            type: messageJson.toatscolor_success,
            active: true,
          });
          setDetails([]);
        } else {
          window.scrollTo(0, 0);
          setModal(false);
          setMessage({
            title: messageJson.toatsheader_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
            active: true,
          });
        }
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

  const getDataValidasi = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}gl/params/accountstructure/add/list`)
      .then((res) => {
        setDataAccountStructure(res.data.data);
        if (res.data.rescode !== 0) {
          setMessage({
            title: messageJson.toatsheader_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
            active: true,
          });
        }
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
        `${global.config.API_URL}gl/params/accountstructure/add/validation`,
        data
      )
      .then((res) => {
        if (res.data.rescode === 0) {
          setModal2(false);
          setItems(null);
          getDataValidasi();
          setMessage({
            title: messageJson.toatsheader_success,
            body: Jsonjurnaladdvalidasi.message_reject,
            type: messageJson.toatscolor_success,
            active: true,
          });
          setDetails([]);
        } else {
          setModal2(false);
          setMessage({
            title: messageJson.toatsheader_err,
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

      {!items && Jsonjurnaladdvalidasi && fields && fieldsDetail && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {Jsonjurnaladdvalidasi.list_caption}
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
                  {Jsonjurnaladdvalidasi.list_refresh}
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
                      item.acctype === 0 ? (
                        <td> Akun Neraca </td>
                      ) : (
                        <td> Akun Non Neraca </td>
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
                  <CIcon name="cil-chevron-left" /> {Jsonjurnaladdvalidasi.hide}
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
                <h6>{Jsonjurnaladdvalidasi.detail_caption}</h6>
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
                            {Jsonjurnaladdvalidasi.asid}
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
                            {Jsonjurnaladdvalidasi.asname}
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
                            {Jsonjurnaladdvalidasi.isactive}
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
                            {Jsonjurnaladdvalidasi.tag}
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
                        {Jsonjurnaladdvalidasi.hide}
                      </CButton>
                      <CButton
                        onClick={() => setModal(!modal)}
                        style={{ float: "right" }}
                        size="sm"
                        color="primary"
                      >
                        <CIcon name="cil-check" />{" "}
                        {Jsonjurnaladdvalidasi.otor_button}
                      </CButton>
                      <CButton
                        onClick={() => setModal2(!modal_no)}
                        style={{ float: "right" }}
                        className="mr-3"
                        size="sm"
                        color="danger"
                      >
                        <CIcon name="cil-ban" />{" "}
                        {Jsonjurnaladdvalidasi.reject_button}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h3>{Jsonjurnaladdvalidasi.confirm_otor}</h3>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => setujuOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {Jsonjurnaladdvalidasi.confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {Jsonjurnaladdvalidasi.confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>
              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{Jsonjurnaladdvalidasi.confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {Jsonjurnaladdvalidasi.confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {Jsonjurnaladdvalidasi.confirm_reject_no}
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
