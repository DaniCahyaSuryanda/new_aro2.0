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
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CForm,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LangID from "json/lang/id/Akun/edit/accounteditcreate.json";
import LangEN from "json/lang/en/Akun/edit/accounteditcreate.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import Input from "component/Input";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const AccountEdit = () => {
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const { handleSubmit, register, control } = useForm();
  const [dataSend, setDataSend] = useState(null);
  const [slide, setSlide] = useState(true);
  const history = useHistory();
  const [itemAccEdit, setitemAccEdit] = useState(null);
  const [messageJson, setMessageJson] = useState(null);
  const [fields, setField] = useState(null);

  useEffect(() => {
    if (itemAccEdit === null || fields === null) {
      if (configApp.lang === "id") {
        setitemAccEdit(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          //  { key: "trxid", label: LangID.list_trxid },
          { key: "accno", label: LangID.list_accno },
          { key: "accname", label: LangID.list_accname },
          { key: "acctype", label: LangID.list_acctype },
          { key: "normaldebit", label: LangID.list_normaldebit },
          { key: "description", label: LangID.list_description },
          { key: "isactive", label: LangID.list_isactive },
        ]);
      } else if (configApp.lang == "en") {
        setitemAccEdit(LangEN);
        setField([
          { key: "action", label: LangEN.list_new },
          // { key: "trxid", label: LangEN.list_trxid },
          { key: "accno", label: LangEN.list_accno },
          { key: "accname", label: LangEN.list_accname },
          { key: "acctype", label: LangEN.list_acctype },
          { key: "normaldebit", label: LangEN.list_normaldebit },
          { key: "description", label: LangEN.list_description },
          { key: "isactive", label: LangEN.list_isactive },
        ]);
      } else {
        setitemAccEdit(LangID);
        setField([
          { key: "action", label: LangID.list_new },
          //  { key: "trxid", label: LangID.list_trxid },
          { key: "accno", label: LangID.list_accno },
          { key: "accname", label: LangID.list_accname },
          { key: "acctype", label: LangID.list_acctype },
          { key: "normaldebit", label: LangID.list_normaldebit },
          { key: "description", label: LangID.list_description },
          { key: "isactive", label: LangID.list_isactive },
        ]);
      }
    }
  }, [itemAccEdit, fields]);

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

  const getDataAddValidasi = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}gl/params/account/list`)
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

  const onSubmit = (data) => {
    // alert(JSON.stringify(data))
    setModal(true);
    setDataSend(data);
  };

  const setujuUbah = (accno) => {
    setMessage({});
    let data = {
      accno: dataSend.accno,
      accname: dataSend.accname,
      acctype: parseInt(dataSend.acctype),
      normaldebit: dataSend.normaldebit,
      description: dataSend.description,
      isactive: dataSend.isactive,
      validstate: 0,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/edit/create`, data)
      .then((res) => {
        if (res.data.rescode === 0) {
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setMessage({
            title: messageJson.toatsheader_success,
            body: itemAccEdit.message_success + res.data.data.trxid,
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
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(error),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  const toggleDetails = (item) => {
    let acctype = itemAccEdit.acctype_list.find(({ value }) => {
      return value === item.acctype;
    });
    let akun = { ...item };
    akun.acctype = acctype;
    setItems(akun);
    setSlide(false);
  };

  const toggleDetails2 = (item) => {
    setItems(false);
    setSlide(true);
  };

  return (
    <>
      <Toast message={message} />

      {items && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h6>{itemAccEdit.detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CRow>
                    <Input
                      ref={register}
                      typefield="text"
                      type="text"
                      label={itemAccEdit.accno}
                      name="accno"
                      defaultValue={items.accno}
                      id="accno"
                      md="6"
                      lg="6"
                      readonly="true"
                    />
                    <Input
                      ref={register}
                      typefield="text"
                      type="text"
                      label={itemAccEdit.accname}
                      name="accname"
                      defaultValue={items.accname}
                      id="accname"
                      md="6"
                      lg="6"
                    />
                  </CRow>
                  <CRow>
                    <Input
                      ref={control}
                      typefield="select"
                      label={itemAccEdit.acctype}
                      name="acctype"
                      id="acctype"
                      md="6"
                      lg="6"
                      options={itemAccEdit.acctype_list}
                      selectDefaultValue={items.acctype}
                    />

                    <Input
                      ref={control}
                      typefield="checkbox"
                      label={itemAccEdit.rmaldebit}
                      name="normaldebit"
                      id="normaldebit"
                      defaultValue={items.normaldebit}
                      md="2"
                      lg="2"
                      value="true"
                    />

                    <Input
                      ref={control}
                      typefield="checkbox"
                      label={itemAccEdit.list_isactive}
                      name="isactive"
                      id="isactive"
                      md="2"
                      lg="2"
                      value={true}
                      defaultValue={items.isactive}
                    />
                  </CRow>
                  <CRow>
                    <Input
                      ref={register}
                      typefield="textarea"
                      label={itemAccEdit.list_description}
                      name="description"
                      id="description"
                      md="12"
                      lg="12"
                      rows="4"
                      defaultValue={items.description}
                    />
                  </CRow>
                  <hr></hr>
                  <CButton
                    size="sm"
                    type="submit"
                    className="float-right"
                    color="primary"
                  >
                    <CIcon name="cil-save" /> {itemAccEdit.save_button}
                  </CButton>
                  <CButton
                    size="sm"
                    onClick={() => toggleDetails2(items)}
                    color="warning"
                    className="float-left"
                  >
                    <CIcon name="cil-chevron-left" /> {itemAccEdit.hide}
                  </CButton>
                </CForm>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{itemAccEdit.confirm_save}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuUbah(items.accno)}
                  >
                    {itemAccEdit.confirm_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {itemAccEdit.confirm_no}
                  </CButton>
                </CModalFooter>
              </CModal>
            </CCard>
          </CCol>
        </CRow>
      )}

      {slide && itemAccEdit && fields && (
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                {itemAccEdit.list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-scrubber" /> {itemAccEdit.list_refresh}
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
                            {itemAccEdit.list_new}
                          </CButton>
                        </td>
                      );
                    },
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
                            ></p>
                          </CBadge>
                        </td>
                      ),
                    acctype: (item) =>
                      item.acctype === 0 ? (
                        <td> {itemAccEdit.acctype_0} </td>
                      ) : (
                        <td> {itemAccEdit.acctype_0} </td>
                      ),
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
                  size="sm"
                  color="warning"
                  onClick={() => history.goBack()}
                >
                  <CIcon name="cil-chevron-left" /> {itemAccEdit.hide}
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default AccountEdit;
