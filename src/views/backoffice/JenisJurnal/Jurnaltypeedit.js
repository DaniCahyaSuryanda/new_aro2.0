import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CBadge,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CForm,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import LangID from "json/lang/id/Tipe Jurnal/edit/journaltypeeditcreate.json";
import LangEN from "json/lang/en/Tipe Jurnal/edit/journaltypeeditcreate.json";
import messageJsonID from "json/lang/id/Message/message.json";
import messageJsonEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import Input from "component/Input";
import { useHistory } from "react-router-dom";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const fieldsID = [
  { key: "action", label: LangID.list_new },
  // { key: "trxid", label: LangEN.list_trxid },
  { key: "jrtype", label: LangID.jrtype },
  { key: "description", label: LangID.description },
  { key: "isactive", label: LangID.isactive },
]

const fieldsEN = [
  { key: "action", label: LangEN.list_new },
  // { key: "trxid", label: LangEN.list_trxid },
  { key: "jrtype", label: LangEN.jrtype },
  { key: "description", label: LangEN.description },
  { key: "isactive", label: LangEN.isactive },
]

const JJEditCreate = () => {
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState(null);
  const [dataPengkinian, setdataPengkinian] = useState(null);
  const {
    handleSubmit,
    register,
    // reset,
    control,
  } = useForm();
  const [dataSend, setDataSend] = useState(null);
  const [slide, setSlide] = useState(true);
  const [JsonjurnalEdit, setJsonjurnalEdit] = useState({});
  const [fields, setField] = useState(null);
  const [messageJson, setMessageJson] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (JsonjurnalEdit === null || fields === null) {
      if (configApp.lang == "id") {
        setJsonjurnalEdit(LangID);
        setField(fieldsID);
      } else if (configApp.lang == "en") {
        setJsonjurnalEdit(LangEN);
        setField(fieldsEN);
      } else {
        setJsonjurnalEdit(LangID);
        setField(fieldsID);
      }
    }
  }, [JsonjurnalEdit, fields]);

  useEffect(() => {
    if (Object.keys(messageJson).length === 0) {
      if (configApp.lang == "id") {
        setMessageJson(messageJsonID);
      } else if (configApp.lang == "en") {
        setMessageJson(messageJsonEN);
      } else {
        setMessageJson(messageJsonID);
      }
    } else {
      if (dataPengkinian == null) {
        getDataAddValidasi();
      }
    }
  }, [messageJson, dataPengkinian]);

  const toggleDetails = (item) => {
    // console.log(item)
    setItems(item);
    setSlide(false);
  };

  const toggleDetails2 = (item) => {
    // console.log(item)
    setSlide(true);
    setItems(false);
  };

  const getDataAddValidasi = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}/gl/params/journaltype/list`)
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

  const onSubmit = (data) => {
    // alert(JSON.stringify(data))
    setModal(true);
    setDataSend(data);
  };

  const setujuUbah = (jrtype) => {
    setMessage({});
    let data = {
      jrtype: dataSend.jrtype,
      description: dataSend.description,
      isactive: dataSend.isactive,
      validstate: 0,
    };
    axios
      .post(`${global.config.API_URL}gl/params/journaltype/edit/create`, data)
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsonjurnalEdit.message_success,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setModal(false);
          setSlide(true);
          setItems(null);
          setMessage({
            title: messageJson.messagetype_err,
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

  return (
    <>
      <Toast message={message} />

      {slide && JsonjurnalEdit && fields && (
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                {JsonjurnalEdit.list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-scrubber" /> {JsonjurnalEdit.list_refresh}
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
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    action: (items, index) => {
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
                            {JsonjurnalEdit.list_new}
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
                  <CIcon name="cil-chevron-left" /> {JsonjurnalEdit.hide}
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
                <h6>{JsonjurnalEdit.detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CRow>
                    <Input
                      ref={register}
                      typefield="text"
                      type="text"
                      label={JsonjurnalEdit.jrtype}
                      name="jrtype"
                      defaultValue={items.jrtype}
                      id="jrtype"
                      md="6"
                      lg="6"
                      readonly="true"
                    />
                    <Input
                      ref={control}
                      typefield="checkbox"
                      label={JsonjurnalEdit.list_isactive}
                      name="isactive"
                      id="isactive"
                      md="2"
                      lg="2"
                      value="true"
                      defaultValue={items.isactive}
                      // eventCheckbox={eventCheckbox}
                    />
                  </CRow>
                  <CRow>
                    <Input
                      ref={register}
                      typefield="textarea"
                      label={JsonjurnalEdit.list_description}
                      name="description"
                      id="description"
                      md="12"
                      lg="12"
                      rows="4"
                      defaultValue={items.description}
                    />
                  </CRow>
                  <hr />
                  <CButton
                    size="sm"
                    color="warning"
                    onClick={() => toggleDetails2(items)}
                    className="mr-3"
                  >
                    <CIcon name="cil-chevron-left" /> {JsonjurnalEdit.hide}
                  </CButton>
                  <CButton
                    size="sm"
                    type="submit"
                    style={{ float: "right" }}
                    color="primary"
                  >
                    <CIcon name="cil-save" /> {JsonjurnalEdit.save_button}
                  </CButton>
                </CForm>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsonjurnalEdit.confirm_save}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuUbah(items.jrtype)}
                  >
                    {JsonjurnalEdit.confirm_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsonjurnalEdit.confirm_no}
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
export default JJEditCreate;
