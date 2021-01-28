import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CDataTable,
} from "@coreui/react";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import JurnalAddValidasi from "json/lang/id/Jurnal Umum/add/journaladdvalidation.json";
import messageJson from "../../../json/lang/id/Message/message.json";
import Toast from "../../../component/Toast";
import { useHistory } from "react-router-dom";

const fields = [
  JurnalAddValidasi.list_new,
  { key: "trxid", label: JurnalAddValidasi.trxid },
  { key: "journaldate", label: JurnalAddValidasi.journaldate },
  { key: "journaltype", label: JurnalAddValidasi.journaltype },
  { key: "reffid", label: JurnalAddValidasi.reffid },
  { key: "description", label: JurnalAddValidasi.description },
];

const fieldsDetail = [
  { key: "accno", label: JurnalAddValidasi.detailitem_accno },
  { key: "accname", label: JurnalAddValidasi.detailitem_accname },
  {
    key: "description",
    label: JurnalAddValidasi.detailitem_description,
  },
  { key: "debit", label: JurnalAddValidasi.detailitem_debit },
  { key: "credit", label: JurnalAddValidasi.detailitem_credit },
];

const JenisJurnalAdd = () => {
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [message, setMessage] = useState({});
  const [items, setItems] = useState(null);
  const history = useHistory();
  const [slide, setSlide] = useState(true);
  const [accNo, setDataAccountStructure] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (accNo == null) {
      // getDataJurnal();
      SetDataJurnal();
      // console.log(data)
    }
  }, [accNo]);

  const SetDataJurnal = () => {
    axios
      .get(`${global.config.API_URL}gl/transaction/journal/add/list`)
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
          title: messageJson.toatsheader_err,
          body: JSON.stringify(error),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  const toggleDetail = (item) => {
    setItems(item);
    setSlide(false);
    setDetails([]);
    axios
      .get(
        `${global.config.API_URL}gl/transaction/journal/add/load?trxid=${item.trxid}`
      )
      .then((res) => {
        // console.log(res.data.rescode);
        if (res.data.rescode === 0) {
          setDetails(res.data.data.detail);
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
    setMessage({})
    let data = {
      trxid: trxid,
      validstate: 1,
    };
    axios
      .post(
        `${global.config.API_URL}gl/transaction/journal/add/validation`,
        data
      )
      .then((res) => {
        if (res.data.rescode === 0) {
          setModal(false);
          setItems(null);
          setSlide(true);
          SetDataJurnal();
          setMessage({
            title: messageJson.toatsheader_success,
            body: JurnalAddValidasi.message_success_otor,
            type: messageJson.toatscolor_success,
            active: true,
          });
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
    setMessage({})
    let data = {
      trxid: trxid,
      validstate: 2,
    };
    axios
      .post(
        `${global.config.API_URL}gl/transaction/journal/add/validation`,
        data
      )
      .then((res) => {
        if (res.data.rescode === 0) {
          setModal2(false);
          setItems(null);
          setSlide(true);
          SetDataJurnal();
          setMessage({
            title: messageJson.toatsheader_success,
            body: JurnalAddValidasi.message_success_reject,
            type: messageJson.toatscolor_success,
            active: true,
          });
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

  const openModalTolak = () => {
    setModal2(true);
  };

  const closeSlide = () => {
    setItems(null);
    setSlide(true);
  };

  const showModal = () => {
    setModal(true);
  };

  return (
    <>
      <Toast message={message} />
      {slide && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {JurnalAddValidasi.list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    SetDataJurnal();
                  }}
                  className="mr-3 float-right"
                >
                  <CIcon name="cil-scrubber" /> {JurnalAddValidasi.list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={accNo}
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
                            onClick={() => toggleDetail(items)}
                          >
                            Otorisasi
                          </CButton>
                        </td>
                      );
                    },
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
                  <CIcon name="cil-chevron-left" /> {JurnalAddValidasi.hide}
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      )}

      {items && (
        <>
          <CRow>
            <CCol xl="12">
              <CCard>
                <CCardHeader>{JurnalAddValidasi.form}</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JurnalAddValidasi.journaldate}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            defaultValue={items.journaldate}
                            readOnly
                            className="form-control"
                            id="journaldate"
                            name="journaldate"
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JurnalAddValidasi.reffid}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            value={items.reffid}
                            readOnly
                            className="form-control"
                            id="reffid"
                            name="reffid"
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
                            {JurnalAddValidasi.description}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <textarea
                            readOnly
                            className="form-control"
                            name="description"
                            rows="4"
                            value={items.description}
                          ></textarea>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JurnalAddValidasi.journaltype}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            value={items.journaltype}
                            readOnly
                            className="form-control"
                            id="journaltype"
                            name="journaltype"
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
                        itemsPerPage={25}
                        pagination
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    color="primary"
                    style={{ float: "right", margin: "10px" }}
                    onClick={() => showModal()}
                  >
                    <CIcon name="cil-check" /> {JurnalAddValidasi.otor_button}
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => openModalTolak()}
                    style={{ float: "right", margin: "10px" }}
                  >
                    <CIcon name="cil-x" /> {JurnalAddValidasi.reject_button}
                  </CButton>
                  <CButton color="warning" onClick={() => closeSlide()}>
                    <CIcon name="cil-chevron-left" />{" "}
                    {JurnalAddValidasi.cancel_button}
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
          <CModal show={modal} onClose={setModal}>
            <CModalBody>
              <h3>{JurnalAddValidasi.confirm_otor}</h3>
            </CModalBody>
            <CModalFooter>
              <CButton
                onClick={() => setujuOtoritasi(items.trxid)}
                color="primary"
              >
                {JurnalAddValidasi.confirm_otor_yes}
              </CButton>
              <CButton color="danger" onClick={() => setModal(false)}>
                {JurnalAddValidasi.confirm_otor_no}
              </CButton>
            </CModalFooter>
          </CModal>

          <CModal show={modal_no} onClose={setModal2}>
            <CModalBody>
              <h4>{JurnalAddValidasi.confirm_reject}</h4>
            </CModalBody>
            <CModalFooter>
              <CButton
                onClick={() => tolakOtoritasi(items.trxid)}
                color="primary"
              >
                {JurnalAddValidasi.confirm_reject_yes}
              </CButton>
              <CButton color="danger" onClick={() => setModal2(false)}>
                {JurnalAddValidasi.confirm_reject_no}
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
    </>
  );
};

export default JenisJurnalAdd;
