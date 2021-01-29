import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CDataTable,
  CBadge,
} from "@coreui/react";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { useForm } from "react-hook-form";
import LangID from "json/lang/id/Struktur Laporan/add/reportstructureaddcreate.json";
import LangEN from "json/lang/en/Struktur Laporan/add/reportstructureaddcreate.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";
import Input from "component/Input";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const Reportstrucutreadd = () => {
  const [modal, setModal] = useState(false);
  const [dataAkun, setDataAkun] = useState([]);
  const [message, setMessage] = useState({});
  const [accNo, setAccNo] = useState(null);
  const [items, setItems] = useState(null);
  const [dataSend, setDataSend] = useState(null);
  const [withItemGroup, setWithItemGroup] = useState(false);
  const [formItem, setFormItem] = useState(false);
  const [editFormItem, setEditFormItem] = useState(false);
  const [indexEdit, setIndexEdit] = useState(false);
  const [option, setOption] = useState([]);
  const [JsonReportstructureadd, setJsonReportstructureadd] = useState(null);
  const [messageJson, setMessageJson] = useState(null);
  const [fields, setField] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (JsonReportstructureadd === null || fields === null) {
      if (configApp.lang === "id") {
        setJsonReportstructureadd(LangID);
        setField([
          { key: "action", label: LangID.action_list },
          { key: "detailitem_no", label: LangID.detailitem_no },
          {
            key: "detailitem_name",
            label: LangID.detailitem_name,
          },
          {
            key: "detailitem_parentno",
            label: LangID.detailitem_parentno,
          },
          {
            key: "detailitem_isgeneral",
            label: LangID.detailitem_isgeneral,
          },
          {
            key: "detailitem_accno",
            label: LangID.detailitem_accno,
          },
          {
            key: "detailitem_accname",
            label: LangID.detailitem_accname,
          },
          {
            key: "detailitem_isvisible",
            label: LangID.detailitem_isvisible,
          },
        ]);
      } else if (configApp.lang == "en") {
        setJsonReportstructureadd(LangEN);
        setField([
          { key: "action", label: LangEN.action_list },
          { key: "detailitem_no", label: LangEN.detailitem_no },
          {
            key: "detailitem_name",
            label: LangEN.detailitem_name,
          },
          {
            key: "detailitem_parentno",
            label: LangEN.detailitem_parentno,
          },
          {
            key: "detailitem_isgeneral",
            label: LangEN.detailitem_isgeneral,
          },
          {
            key: "detailitem_accno",
            label: LangEN.detailitem_accno,
          },
          {
            key: "detailitem_accname",
            label: LangEN.detailitem_accname,
          },
          {
            key: "detailitem_isvisible",
            label: LangEN.detailitem_isvisible,
          },
        ]);
      } else {
        setJsonReportstructureadd(LangID);
        setField([
          { key: "action", label: LangID.action_list },
          { key: "detailitem_no", label: LangID.detailitem_no },
          {
            key: "detailitem_name",
            label: LangID.detailitem_name,
          },
          {
            key: "detailitem_parentno",
            label: LangID.detailitem_parentno,
          },
          {
            key: "detailitem_isgeneral",
            label: LangID.detailitem_isgeneral,
          },
          {
            key: "detailitem_accno",
            label: LangID.detailitem_accno,
          },
          {
            key: "detailitem_accname",
            label: LangID.detailitem_accname,
          },
          {
            key: "detailitem_isvisible",
            label: LangID.detailitem_isvisible,
          },
        ]);
      }
    }
  }, [JsonReportstructureadd, fields]);

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
    // alert(JSON.stringify(data))
    let detail = [];
    dataAkun.map((row) => {
      return detail.push({
        itemno: row.detailitem_no,
        itemname: row.detailitem_name,
        parentno: row.detailitem_parentno,
        isgeneral: row.detailitem_isgeneral,
        accno: row.detailitem_accno,
        isvisible: row.detailitem_isvisible,
      });
    });
    let sendData = {
      asid: data.asid,
      asname: data.asname,
      isactive: data.isactive,
      tag: data.tag,
      detail: detail,
      validstate: 0,
      lang: JSON.parse(sessionStorage.getItem("config")).lang,
    };
    // alert(JSON.stringify(sendData))
    setDataSend(sendData);
    setModal(true);
  };

  const confirmSave = () => {
    setMessage({});
    axios
      .post(
        `http://117.54.7.227/arov2/api/gl/params/accountstructure/add/create`,
        dataSend
      )
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          reset();
          setModal(false);
          setDataSend(null);
          setItems(null);
          setDataAkun([]);
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsonReportstructureadd.setmessage_done,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
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

  const saveDetail = (param) => {
    // alert(JSON.stringify(param))
    let data = [...dataAkun];
    if (param.detailitem_isgeneral) {
      data.push({
        detailitem_no: param.detailitem_no,
        detailitem_name: param.detailitem_name,
        detailitem_parentno: param.detailitem_parentno,
        detailitem_isgeneral: param.detailitem_isgeneral,
        detailitem_accno: "",
        detailitem_accname: "",
        detailitem_isvisible: param.detailitem_isvisible,
      });
    } else {
      let accname = {};
      if (param.detailitem_accno !== "") {
        accname = accNo.find(({ accno }) => {
          return accno === param.detailitem_accno;
        });
      } else {
        accname.accno = "";
        accname.accname = "";
      }
      data.push({
        detailitem_no: param.detailitem_no,
        detailitem_name: param.detailitem_name,
        detailitem_parentno: param.detailitem_parentno,
        detailitem_isgeneral: param.detailitem_isgeneral,
        detailitem_accno: accname.accno,
        detailitem_accname: accname.accname,
        detailitem_isvisible: param.detailitem_isvisible,
      });
    }
    reset2();
    setFormItem(false);
    setWithItemGroup(false);
    setDataAkun(data);
  };

  const saveEditDetail = (param) => {
    // console.log(param)
    let data = [...dataAkun];
    if (param.detailitem_isgeneral) {
      data[indexEdit] = {
        detailitem_no: param.detailitem_no,
        detailitem_name: param.detailitem_name,
        detailitem_parentno: param.detailitem_parentno,
        detailitem_isgeneral: param.detailitem_isgeneral,
        detailitem_accno: "",
        detailitem_accname: "",
        detailitem_isvisible: param.detailitem_isvisible,
      };
    } else {
      let accname = {};
      if (param.detailitem_accno !== undefined) {
        accname = accNo.find(({ accno }) => {
          return accno === param.detailitem_accno;
        });
      } else {
        accname.accno = "";
        accname.accname = "";
      }
      data[indexEdit] = {
        detailitem_no: param.detailitem_no,
        detailitem_name: param.detailitem_name,
        detailitem_parentno: param.detailitem_parentno,
        detailitem_isgeneral: param.detailitem_isgeneral,
        detailitem_accno: accname.accno,
        detailitem_accname: accname.accname,
        detailitem_isvisible: param.detailitem_isvisible,
      };
    }
    setDataAkun(data);
    reset3();
    setEditFormItem(false);
  };

  const deleteItem = (index) => {
    let data = [...dataAkun];
    data.splice(index, 1);
    setDataAkun(data);
  };

  const ubahItem = (items, index) => {
    setItems(items);
    setWithItemGroup(items.detailitem_isgeneral);
    setEditFormItem(true);
    setIndexEdit(index);
  };

  useEffect(() => {
    if (accNo === null) {
      getDataAkun();
    }
  }, [accNo]);

  const getDataAkun = () => {
    setMessage({});
    axios
      .get(
        "http://117.54.7.227/arov2/api/gl/params/account/list?onlyactive=true"
      )
      .then((res) => {
        let data = [];
        res.data.data.map((akun) => {
          return data.push({
            value: akun.accno,
            label: akun.accno + " - " + akun.accname,
          });
        });
        // console.log(res.data.data);
        setAccNo(res.data.data);
        setOption(data);
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

  const itemGroup = (value, checked) => {
    // console.log(e);
    setWithItemGroup(checked);
  };

  return (
    <>
      <Toast message={message} />

      {accNo && JsonReportstructureadd && fields && (
        <>
          <CRow>
            <CCol xl="12">
              <CCard>
                <CCardHeader>{JsonReportstructureadd.form}</CCardHeader>
                <CForm
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-horizontal"
                >
                  <CCardBody>
                    <CRow>
                      <Input
                        ref={register}
                        typefield="text"
                        type="text"
                        label={JsonReportstructureadd.asid}
                        name="asid"
                        defaultValue=""
                        id="asid"
                        md="6"
                        lg="6"
                      />

                      <Input
                        ref={register}
                        typefield="text"
                        type="text"
                        label={JsonReportstructureadd.asname}
                        name="asname"
                        defaultValue=""
                        id="asname"
                        md="6"
                        lg="6"
                      />
                    </CRow>
                    <CRow>
                      <Input
                        ref={register}
                        typefield="text"
                        type="text"
                        label={JsonReportstructureadd.tag}
                        name="tag"
                        defaultValue=""
                        id="tag"
                        md="6"
                        lg="6"
                      />

                      <Input
                        ref={control}
                        typefield="checkbox"
                        label={JsonReportstructureadd.isactive}
                        name="isactive"
                        id="isactive"
                        md="2"
                        lg="2"
                        value={true}
                        defaultValue={false}
                        // eventCheckbox={eventCheckbox}
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
                          itemsPerPage={50}
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
                            action: (items, index) => {
                              return (
                                <td>
                                  <div className="btn-group">
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      shape="square"
                                      size="sm"
                                      onClick={() => ubahItem(items, index)}
                                    >
                                      {
                                        JsonReportstructureadd.action_button_edit
                                      }
                                    </CButton>
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      shape="square"
                                      size="sm"
                                      onClick={() => deleteItem(index)}
                                    >
                                      {
                                        JsonReportstructureadd.action_button_delete
                                      }
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
                          {JsonReportstructureadd.list_new}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton
                      type="reset"
                      size="sm"
                      color="warning"
                      onClick={() => history.goBack()}
                    >
                      <CIcon name="cil-chevron-left" />{" "}
                      {JsonReportstructureadd.hide}
                    </CButton>
                    <CButton
                      type="submit"
                      color="primary"
                      size="sm"
                      className={"m-3 float-right"}
                    >
                      <CIcon name="cil-save" />{" "}
                      {JsonReportstructureadd.save_button}
                    </CButton>

                    <CButton
                      type="reset"
                      color="danger"
                      size="sm"
                      className={"m-3 float-right"}
                      onClick={() => setDataAkun([])}
                    >
                      <CIcon name="cil-x" />{" "}
                      {JsonReportstructureadd.cancel_button}
                    </CButton>
                  </CCardFooter>
                </CForm>
                <CModal show={modal} onClose={setModal}>
                  <CModalBody>
                    <h3>{JsonReportstructureadd.confirm_save}</h3>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      type="submit"
                      onClick={() => confirmSave()}
                      color="primary"
                    >
                      {JsonReportstructureadd.confirm_yes}
                    </CButton>{" "}
                    <CButton color="danger" onClick={() => setModal(false)}>
                      {JsonReportstructureadd.confirm_no}
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCard>
            </CCol>
          </CRow>

          {formItem && (
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <h6>{JsonReportstructureadd.detail_caption}</h6>
                  </CCardHeader>
                  <CCardBody className="mb-4">
                    <CForm
                      encType="multipart/form-data"
                      className="form-horizontal"
                      color="light"
                      onSubmit={handleSubmit2(saveDetail)}
                    >
                      <CRow>
                        <Input
                          ref={register2}
                          typefield="text"
                          type="text"
                          label={JsonReportstructureadd.detailitem_no}
                          name="detailitem_no"
                          defaultValue=""
                          id="detailitem_no"
                          md="4"
                          lg="4"
                        />
                        <Input
                          ref={register2}
                          typefield="text"
                          type="text"
                          label={JsonReportstructureadd.detailitem_name}
                          name="detailitem_name"
                          defaultValue=""
                          id="detailitem_name"
                          md="4"
                          lg="4"
                        />
                        <Input
                          ref={register2}
                          typefield="text"
                          type="text"
                          label={JsonReportstructureadd.detailitem_parentno}
                          name="detailitem_parentno"
                          defaultValue=""
                          id="detailitem_parentno"
                          md="4"
                          lg="4"
                        />
                      </CRow>
                      <CRow>
                        <Input
                          ref={control2}
                          typefield="checkbox"
                          label={JsonReportstructureadd.detailitem_isvisible}
                          name="detailitem_isvisible"
                          id="detailitem_isvisible"
                          md="2"
                          lg="2"
                          value={true}
                          defaultValue={false}
                        />
                        <Input
                          ref={control2}
                          typefield="checkbox"
                          label={JsonReportstructureadd.detailitem_isgeneral}
                          name="detailitem_isgeneral"
                          id="detailitem_isgeneral"
                          md="2"
                          lg="2"
                          value={true}
                          defaultValue={false}
                          eventCheckbox={itemGroup}
                        />
                        {!withItemGroup && (
                          <Input
                            ref={control2}
                            typefield="select"
                            label={JsonReportstructureadd.detailitem_accno}
                            name="detailitem_accno"
                            id="detailitem_accno"
                            md="4"
                            lg="4"
                            options={option}
                            defaultValue=""
                            selectDefaultValue={option[0]}
                            // eventSelect={eventSelect}
                          />
                        )}
                      </CRow>
                      <hr></hr>
                      <CRow>
                        <CCol>
                          <CButton
                            size="sm"
                            color="danger"
                            style={{ float: "left" }}
                            onClick={() => {
                              setFormItem(false);
                              setWithItemGroup(false);
                            }}
                            className="mr-3"
                          >
                            <CIcon name="cil-x" />{" "}
                            {JsonReportstructureadd.cancel_button}
                          </CButton>
                          <CButton
                            size="sm"
                            type="submit"
                            style={{ float: "right" }}
                            color="primary"
                          >
                            <CIcon name="cil-save" />{" "}
                            {JsonReportstructureadd.save_button}
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}

          {editFormItem && (
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <h6>{JsonReportstructureadd.detail_caption}</h6>
                  </CCardHeader>
                  <CCardBody className="mb-4">
                    <CForm
                      encType="multipart/form-data"
                      className="form-horizontal"
                      color="light"
                      onSubmit={handleSubmit3(saveEditDetail)}
                    >
                      <CRow>
                        <Input
                          ref={register3}
                          typefield="text"
                          type="text"
                          label={JsonReportstructureadd.detailitem_no}
                          name="detailitem_no"
                          defaultValue={items.detailitem_no}
                          id="detailitem_no"
                          md="4"
                          lg="4"
                        />
                        <Input
                          ref={register3}
                          typefield="text"
                          type="text"
                          label={JsonReportstructureadd.detailitem_name}
                          name="detailitem_name"
                          defaultValue={items.detailitem_name}
                          id="detailitem_name"
                          md="4"
                          lg="4"
                        />
                        <Input
                          ref={register3}
                          typefield="text"
                          type="text"
                          label={JsonReportstructureadd.detailitem_parentno}
                          name="detailitem_parentno"
                          defaultValue={items.detailitem_parentno}
                          id="detailitem_parentno"
                          md="4"
                          lg="4"
                        />
                      </CRow>
                      <CRow>
                        <Input
                          ref={control3}
                          typefield="checkbox"
                          label={JsonReportstructureadd.detailitem_isvisible}
                          name="detailitem_isvisible"
                          id="detailitem_isvisible"
                          md="2"
                          lg="2"
                          value={true}
                          defaultValue={items.detailitem_isvisible}
                        />
                        <Input
                          ref={control3}
                          typefield="checkbox"
                          label={JsonReportstructureadd.detailitem_isgeneral}
                          name="detailitem_isgeneral"
                          id="detailitem_isgeneral"
                          md="2"
                          lg="2"
                          value={true}
                          defaultValue={items.detailitem_isgeneral}
                          eventCheckbox={itemGroup}
                        />
                        {!withItemGroup && (
                          <Input
                            ref={control3}
                            typefield="select"
                            label={JsonReportstructureadd.detailitem_accno}
                            name="detailitem_accno"
                            id="detailitem_accno"
                            md="4"
                            lg="4"
                            options={option}
                            selectDefaultValue={{
                              value: items.detailitem_accno,
                              label:
                                items.detailitem_accno +
                                " - " +
                                items.detailitem_accname,
                            }}
                          />
                        )}
                      </CRow>
                      <CRow>
                        <CCol>
                          <CButton
                            size="sm"
                            color="danger"
                            style={{ float: "left" }}
                            onClick={() => setEditFormItem(false)}
                            className="mr-3"
                          >
                            <CIcon name="cil-x" />{" "}
                            {JsonReportstructureadd.cancel_button}
                          </CButton>
                          <CButton
                            size="sm"
                            type="submit"
                            style={{ float: "right" }}
                            color="primary"
                          >
                            <CIcon name="cil-save" />{" "}
                            {JsonReportstructureadd.save_button}
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
        </>
      )}
    </>
  );
};

export default Reportstrucutreadd;
