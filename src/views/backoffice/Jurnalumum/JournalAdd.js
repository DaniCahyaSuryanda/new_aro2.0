import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CDataTable,
  CBadge,
  CModalHeader,
} from "@coreui/react";

import getFormattedDate from "utils/utils";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { useForm, Controller } from "react-hook-form";
import LangID from "json/lang/id/Jurnal Umum/add/journaladdcreate.json";
import LangEN from "json/lang/en/Jurnal Umum/add/journaladdcreate.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";
import Input from "component/Input";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const darkMode = configApp.darktheme;

const JenisJurnalAdd = () => {
  const [modal, setModal] = useState(false);
  const [modalEditItem, setModalEditItem] = useState(false);
  const [dataAkun, setDataAkun] = useState([]);
  const [message, setMessage] = useState({});
  const [accNo, setAccNo] = useState(null);
  const [jurnal, setJurnal] = useState(null);
  const [dataSend, setDataSend] = useState(null);
  const [formItem, setFormItem] = useState(false);
  const [editFormItem, setEditFormItem] = useState(false);
  const [indexEdit, setIndexEdit] = useState(false);
  const [optionAcc, setOptionAcc] = useState([]);
  const [optionJurnal, setOptionJurnal] = useState([]);
  const history = useHistory();
  const [JurnalTypeAdd, setJurnalTypeAdd] = useState({});
  const [messageJson, setMessageJson] = useState({});
  const [fields, setField] = useState(null);

  useEffect(() => {
    if (Object.keys(messageJson).length === 0) {
      if (configApp.lang == "id") {
        setMessageJson(messageID);
      } else if (configApp.lang == "en") {
        setMessageJson(messageEN);
      } else {
        setMessageJson(messageID);
      }
    } else {
      if (accNo == null && jurnal == null) {
        getDataJurnal();
        getDataAkun();
      }
    }
  }, [messageJson, accNo, jurnal]);

  // useEffect(() => {
  //   if (accNo == null && jurnal == null) {
  //     getDataJurnal();
  //     getDataAkun();
  //   }
  // }, [accNo, jurnal]);

  useEffect(() => {
    if (JurnalTypeAdd == null || fields == null) {
      if (configApp.lang == "id") {
        setJurnalTypeAdd(LangID);
        setField([
          { key: "action", label: LangID.action_list },
          { key: "detailitem_accno", label: LangID.detailitem_accno },
          {
            key: "detailitem_accname",
            label: LangID.detailitem_accname,
          },
          {
            key: "detailitem_description",
            label: LangID.detailitem_description,
          },
          { key: "detailitem_debit", label: LangID.detailitem_debit },
          { key: "detailitem_credit", label: LangID.detailitem_credit },
        ]);
      } else if (configApp.lang == "en") {
        setJurnalTypeAdd(LangEN);
        setField([
          { key: "action", label: LangEN.action_list },
          { key: "detailitem_accno", label: LangEN.detailitem_accno },
          {
            key: "detailitem_accname",
            label: LangEN.detailitem_accname,
          },
          {
            key: "detailitem_description",
            label: LangEN.detailitem_description,
          },
          { key: "detailitem_debit", label: LangEN.detailitem_debit },
          { key: "detailitem_credit", label: LangEN.detailitem_credit },
        ]);
      } else {
        setJurnalTypeAdd(LangID);
        setField([
          { key: "action", label: LangID.action_list },
          { key: "detailitem_accno", label: LangID.detailitem_accno },
          {
            key: "detailitem_accname",
            label: LangID.detailitem_accname,
          },
          {
            key: "detailitem_description",
            label: LangID.detailitem_description,
          },
          { key: "detailitem_debit", label: LangID.detailitem_debit },
          { key: "detailitem_credit", label: LangID.detailitem_credit },
        ]);
      }
    }
  }, [JurnalTypeAdd, fields]);

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    control: control2,
  } = useForm();
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    control: control3,
  } = useForm();
  const { handleSubmit, register, reset, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let detail = [];
    dataAkun.map((row) => {
      return detail.push({
        accno: row.detailitem_accno,
        description: row.detailitem_description,
        debit: row.detailitem_debit,
        credit: row.detailitem_credit,
        branchid: "",
      });
    });
    let sendData = {
      journaldate: getFormattedDate(data.journaldate),
      reffid: data.reffid,
      journaltype: data.journaltype,
      description: data.description,
      detail: detail,
      validstate: 0,
      lang: JSON.parse(sessionStorage.getItem("config")).lang,
    };
    console.log(sendData);
    setDataSend(sendData);
    setModal(true);
  };

  const confirmSave = () => {
    setMessage({});
    console.log(dataSend);
    //console.log(sendData);
    axios
      .post(
        `${global.config.API_URL}gl/transaction/journal/add/create`,
        dataSend
      )
      .then((res) => {
        if (res.data.rescode === 0) {
          reset();
          setModal(false);
          setDataSend(null);
          setDataAkun([]);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JurnalTypeAdd.message_success,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setModal(false);
          console.log(res.data.errdescription);
          setDataSend(null);
          setDataAkun([]);
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
        setDataSend(null);
        setDataAkun([]);
        console.log(error);
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(error),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  const saveDetail = (param) => {
    let data = [...dataAkun];
    let accname = {};
    if (param.detailitem_accno !== undefined) {
      accname = accNo.find(({ accno }) => {
        return accno === param.detailitem_accno;
      });
    } else {
      accname.accno = "";
      accname.accname = "";
    }
    data.push({
      detailitem_debit: param.detailitem_debit,
      detailitem_description: param.detailitem_description,
      detailitem_accno: accname.accno,
      detailitem_accname: accname.accname,
      detailitem_credit: param.detailitem_credit,
    });
    reset2();
    setFormItem(false);
    setDataAkun(data);
  };

  const saveEditDetail = (param) => {
    let data = [...dataAkun];
    let accnoValue = param.detailitem_accno.value;
    let accname = accNo.find(({ accno }) => {
      return accno === accnoValue;
    });

    data[indexEdit] = {
      detailitem_debit: param.detailitem_debit,
      detailitem_description: param.detailitem_description,
      detailitem_accno: param.detailitem_accno.value,
      detailitem_accname: accname.accname,
      detailitem_credit: param.detailitem_credit,
    };
    setDataAkun(data);
    setModalEditItem(false);
    reset3();
    setEditFormItem(false);
  };

  const deleteItem = (index) => {
    let data = [...dataAkun];
    data.splice(index, 1);
    setDataAkun(data);
  };

  const ubahItem = (param, index) => {
    // setItems(param);
    setModalEditItem(true);
    setEditFormItem(param);
    setIndexEdit(index);
  };

  const getDataJurnal = () => {
    setMessage({});
    axios
      .get(global.config.API_URL + "gl/params/journaltype/list?onlyactive=true")
      .then((res) => {
        let data = [];
        res.data.data.map((jurnal) => {
          return data.push({ value: jurnal.jrtype, label: jurnal.jrtype });
        });
        setJurnal(res.data.data);
        setOptionJurnal(data);
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

  const getDataAkun = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}gl/params/account/list?onlyactive=true`)
      .then((res) => {
        let data = [];
        res.data.data.map((akun) => {
          return data.push({
            value: akun.accno,
            label: akun.accno + " - " + akun.accname,
          });
        });
        setAccNo(res.data.data);
        setOptionAcc(data);
        if (res.data.rescode !== 0) {
          setMessage({
            title: messageJson.messagetype_err,
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

  return (
    <>
      <Toast message={message} />

      {accNo && jurnal && (
        <>
          <CRow>
            <CCol xl="12">
              <CCard>
                <CCardHeader>{JurnalTypeAdd.form}</CCardHeader>
                <CForm
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-horizontal"
                >
                  <CCardBody>
                    <CRow>
                      <Input
                        ref={register}
                        typefield="date"
                        type="date"
                        label={JurnalTypeAdd.journaldate}
                        name="journaldate"
                        defaultValue=""
                        id="journaldate"
                        md="6"
                        lg="6"
                      />
                      <Input
                        ref={register}
                        typefield="text"
                        type="text"
                        label={JurnalTypeAdd.reffid}
                        name="reffid"
                        defaultValue=""
                        id="reffid"
                        md="6"
                        lg="6"
                      />
                    </CRow>
                    <CRow>
                      <Input
                        ref={register}
                        typefield="textarea"
                        label={JurnalTypeAdd.description}
                        name="description"
                        id="description"
                        md="6"
                        lg="6"
                        rows="4"
                        defaultValue={""}
                      />
                      <Input
                        ref={control}
                        typefield="select"
                        label={JurnalTypeAdd.journaltype}
                        name="journaltype"
                        id="journaltype"
                        md="6"
                        lg="6"
                        options={optionJurnal}
                        defaultValue=""
                        // eventSelect={eventSelect}
                      />
                    </CRow>
                    <CRow>
                      <CCol>
                        <CDataTable
                          items={dataAkun}
                          fields={fields}
                          hover
                          striped
                          bordered
                          columnFilter
                          itemsPerPage={5}
                          pagination
                          scopedSlots={{
                            detailitem_isgeneral: (item) =>
                              item.detailitem_isgeneral ? (
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
                            detailitem_isvisible: (item) =>
                              item.detailitem_isvisible ? (
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
                            action: (param, index) => {
                              return (
                                <td>
                                  <div className="btn-group">
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      shape="square"
                                      size="sm"
                                      onClick={() => ubahItem(param, index)}
                                    >
                                      {JurnalTypeAdd.action_button_edit}
                                    </CButton>
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      shape="square"
                                      size="sm"
                                      onClick={() => deleteItem(index)}
                                    >
                                      {JurnalTypeAdd.action_button_delete}
                                    </CButton>
                                  </div>
                                </td>
                              );
                            },
                          }}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="12" md="12">
                        <CButton
                          color="primary"
                          size="sm"
                          onClick={() => setFormItem(true)}
                        >
                          <CIcon name="cil-pencil" />
                          {JurnalTypeAdd.list_new}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton
                      type="reset"
                      size={"sm"}
                      color="warning"
                      onClick={() => history.goBack()}
                    >
                      <CIcon name="cil-chevron-left" /> {JurnalTypeAdd.hide}
                    </CButton>
                    <CButton
                      type="submit"
                      color="primary"
                      size="sm"
                      style={{ float: "right" }}
                      className="m-2"
                    >
                      <CIcon name="cil-save" /> {JurnalTypeAdd.save_button}
                    </CButton>
                    <CButton
                      type="reset"
                      size="sm"
                      color="danger"
                      style={{ float: "right" }}
                      className="m-2"
                      onClick={() => reset()}
                    >
                      <CIcon name="cil-x" /> {JurnalTypeAdd.reset_button}
                    </CButton>
                  </CCardFooter>
                </CForm>
                <CModal show={modal} onClose={setModal}>
                  <CModalBody>
                    <h3>{JurnalTypeAdd.confirm_save}</h3>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      type="submit"
                      onClick={() => confirmSave()}
                      color="primary"
                    >
                      {JurnalTypeAdd.confirm_yes}
                    </CButton>{" "}
                    <CButton color="danger" onClick={() => setModal(false)}>
                      {JurnalTypeAdd.confirm_no}
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCard>
            </CCol>
          </CRow>

          <CModal
            size="lg"
            show={formItem}
            onClose={() => {
              setFormItem(null);
            }}
          >
            <CModalHeader>
              <h6>{JurnalTypeAdd.detailitem_caption}</h6>
            </CModalHeader>
            {formItem && (
              <CModalBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                  onSubmit={handleSubmit2(saveDetail)}
                >
                  <CRow>
                    <Input
                      ref={control2}
                      typefield="select"
                      label={JurnalTypeAdd.detailitem_accno}
                      name="detailitem_accno"
                      id="detailitem_accno"
                      md="6"
                      lg="6"
                      options={optionAcc}
                      defaultValue=""
                      // eventSelect={eventSelect}
                    />
                    <Input
                      ref={register2}
                      typefield="text"
                      type="text"
                      label={JurnalTypeAdd.detailitem_description}
                      name="detailitem_description"
                      defaultValue=""
                      id="detailitem_description"
                      md="6"
                      lg="6"
                    />
                  </CRow>
                  <CRow>
                    <Input
                      ref={register2}
                      typefield="number"
                      type="number"
                      label={JurnalTypeAdd.detailitem_debit}
                      name="detailitem_debit"
                      defaultValue=""
                      id="detailitem_debit"
                      md="6"
                      lg="6"
                    />
                    <Input
                      ref={register2}
                      typefield="number"
                      type="number"
                      label={JurnalTypeAdd.detailitem_credit}
                      name="detailitem_credit"
                      defaultValue=""
                      id="detailitem_credit"
                      md="6"
                      lg="6"
                    />
                  </CRow>
                  <hr></hr>
                  <CRow>
                    <CCol>
                      <CButton
                        size="sm"
                        color="danger"
                        onClick={() => setFormItem(false)}
                        className="mr-3"
                      >
                        <CIcon name="cil-x" /> {JurnalTypeAdd.cancel_button}
                      </CButton>
                      <CButton
                        size="sm"
                        type="submit"
                        className="float-right"
                        color="primary"
                      >
                        <CIcon name="cil-save" /> {JurnalTypeAdd.save_button}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CModalBody>
            )}
          </CModal>
        </>
      )}

      <CModal
        size="lg"
        show={modalEditItem}
        onClose={() => {
          setModalEditItem(false);
          setEditFormItem(null);
        }}
      >
        <CModalHeader>
          <h6>{JurnalTypeAdd.detail_caption}</h6>
        </CModalHeader>

        {editFormItem && (
          <CModalBody>
            <CForm
              encType="multipart/form-data"
              className="form-horizontal"
              color="light"
              onSubmit={handleSubmit3(saveEditDetail)}
            >
              <CRow>
                <CCol lg="6" md="6" sm="12">
                  <CFormGroup row>
                    <CCol>
                      <CLabel htmlFor="text-input">
                        {JurnalTypeAdd.detailitem_accno}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                      <Controller
                        name="detailitem_accno"
                        as={Select}
                        options={optionAcc}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: "4px",
                          colors: {
                            ...theme.colors,
                            neutral0: darkMode
                              ? "#2a2b36"
                              : theme.colors.neutral0,
                            neutral80: darkMode
                              ? "#fff"
                              : theme.colors.neutral80,
                            primary25: darkMode
                              ? theme.colors.primary75
                              : theme.colors.primary25,
                          },
                        })}
                        control={control3}
                        defaultValue={{
                          value: editFormItem.detailitem_accno,
                          label:
                            editFormItem.detailitem_accno +
                            " - " +
                            editFormItem.detailitem_accname,
                        }}
                        id="detailitem_accno"
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol lg="6" md="6" sm="12">
                  <CFormGroup row>
                    <CCol>
                      <CLabel htmlFor="text-input">
                        {JurnalTypeAdd.detailitem_description}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                      <textarea
                        className="form-control"
                        id="detailitem_description"
                        name="detailitem_description"
                        ref={register3}
                        defaultValue={editFormItem.detailitem_description}
                        rows="4"
                      ></textarea>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="6" md="6" sm="12">
                  <CFormGroup row>
                    <CCol>
                      <CLabel htmlFor="text-input">
                        {JurnalTypeAdd.detailitem_debit}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                      <input
                        type="number"
                        className="form-control"
                        id="detailitem_debit"
                        name="detailitem_debit"
                        ref={register3({ valueAsNumber: true })}
                        defaultValue={editFormItem.detailitem_debit}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol lg="6" md="6" sm="12">
                  <CFormGroup row>
                    <CCol>
                      <CLabel htmlFor="text-input">
                        {JurnalTypeAdd.detailitem_credit}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                      <input
                        type="number"
                        className="form-control"
                        id="detailitem_credit"
                        name="detailitem_credit"
                        ref={register3({ valueAsNumber: true })}
                        defaultValue={editFormItem.detailitem_credit}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CButton
                    size="sm"
                    color="danger"
                    style={{ float: "rigth" }}
                    onClick={() => setModalEditItem(false)}
                    className="mr-3"
                  >
                    <CIcon name="cil-scrubber" /> {JurnalTypeAdd.cancel_button}
                  </CButton>
                  <CButton
                    size="sm"
                    type="submit"
                    style={{ float: "rigth" }}
                    color="primary"
                  >
                    <CIcon name="cil-scrubber" /> {JurnalTypeAdd.save_button}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>
        )}
      </CModal>
    </>
  );
};

export default JenisJurnalAdd;
