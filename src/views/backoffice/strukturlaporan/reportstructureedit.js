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
  CModalHeader,
  CModalBody,
  CModalFooter,
  CRow,
  CForm,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Jsonjurnaladdvalidasi from "json/lang/id/Struktur Laporan/edit/reportstructureeditcreate.json";
import messageJson from "json/lang/id/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";
import Input from "component/Input";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const darkMode = configApp.darktheme;

const fields = [
  Jsonjurnaladdvalidasi.list_new,
  { key: "asid", label: Jsonjurnaladdvalidasi.list_asid },
  { key: "asname", label: Jsonjurnaladdvalidasi.list_asname },
  { key: "isactive", label: Jsonjurnaladdvalidasi.isactive },
];

const fieldsDetail = [
  Jsonjurnaladdvalidasi.action_list,
  { key: "itemno", label: Jsonjurnaladdvalidasi.detailitem_no },
  { key: "itemname", label: Jsonjurnaladdvalidasi.detailitem_name },
  { key: "parentno", label: Jsonjurnaladdvalidasi.detailitem_parentno },
  { key: "accno", label: Jsonjurnaladdvalidasi.detailitem_accno },
  { key: "accname", label: Jsonjurnaladdvalidasi.detailitem_accname },
  { key: "isvisible", label: Jsonjurnaladdvalidasi.detailitem_isvisible },
];

const ReportStrucValidasi = () => {
  const [modalEditItem, setModalEditItem] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAccountStructure, setDataAccountStructure] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const [message, setMessage] = useState({});
  const [optionAcc, setOptionAcc] = useState(null);
  const [dataSend, setDataSend] = useState(null);
  const [withItemGroup, setWithItemGroup] = useState(false);
  const [formEditItem, setFormEditItem] = useState();
  const [indexEdit, setIndexEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useHistory();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    control: control2,
  } = useForm();
  const { handleSubmit, register, reset, control } = useForm();

  useEffect(() => {
    if (dataAccountStructure === null) {
      getDataValidasi();
    }
    if (optionAcc === null) {
      getOptionAkun();
    }
  }, [dataAccountStructure, optionAcc]);

  const getOptionAkun = () => {
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
        setDataAkun(res.data.data);
        setOptionAcc(data);
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

  const getDataValidasi = () => {
    setMessage({});
    axios
      .get(`${global.config.API_URL}gl/params/accountstructure/list`)
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

  const prosesData = (prosesData) => {
    setMessage({});
    axios
      .get(
        `${global.config.API_URL}gl/params/accountstructure/load?asid=${prosesData.asid}`
      )
      .then((res) => {
        if (res.data.rescode === 0) {
          let dataDetail = prosesData;
          dataDetail.detail = res.data.data.detail;
          setItems(dataDetail);
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

  const deleteItem = (index) => {
    let data = { ...items };
    data.detail.splice(index, 1);
    setItems(data);
  };

  const ubahItem = (param, index) => {
    setModalEditItem(true);
    setFormEditItem(param);
    setIndexEdit(index);
    setWithItemGroup(param.isgeneral);
  };

  const itemGroup = (value, checked) => {
    setWithItemGroup(checked);
  };

  const simpanEditItem = handleSubmit2((data) => {
    let itemsData = { ...items };
    let accname = undefined;

    if (data.detailitem_isgeneral) {
      itemsData.detail[indexEdit] = {
        itemno: data.detailitem_no,
        itemname: data.detailitem_name,
        parentno: data.detailitem_parentno,
        isgeneral: data.detailitem_isgeneral,
        accno: " ",
        accname: " ",
        isvisible: data.detailitem_isvisible,
      };
    } else {
      accname = dataAkun.find(({ accno }) => {
        return accno === data.detailitem_accno.value;
      });

      accname = accname.accname;

      itemsData.detail[indexEdit] = {
        itemno: data.detailitem_no,
        itemname: data.detailitem_name,
        parentno: data.detailitem_parentno,
        isgeneral: data.detailitem_isgeneral,
        accno: data.detailitem_accno.value,
        accname: accname,
        isvisible: data.detailitem_isvisible,
      };
    }

    reset2();

    // console.log(itemsData);
    setItems(itemsData);

    setModalEditItem(false);
    setFormEditItem(null);
    setIndexEdit(null);
    setWithItemGroup(false);
  });

  const onSubmit = (data) => {
    let detail = [];
    items.detail.map((row) => {
      return detail.push({
        itemno: row.itemno,
        itemname: row.itemname,
        parentno: row.parentno,
        isgeneral: row.isgeneral,
        accno: row.accno,
        isvisible: row.isvisible,
      });
    });
    let sendData = {
      asid: data.asid,
      asname: data.asname,
      isactive: data.isactive,
      detail: detail,
      validstate: 0,
      lang: JSON.parse(sessionStorage.getItem("config")).lang,
    };
    setDataSend(sendData);
  };

  const confirmSave = () => {
    setMessage({});
    axios
      .post(
        `${global.config.API_URL}gl/params/accountstructure/edit/create`,
        dataSend
      )
      .then((res) => {
        if (res.data.rescode === 0) {
          reset();
          setModal(false);
          setDataSend(null);
          setItems(null);
          setMessage({
            title: messageJson.toatsheader_success,
            body: Jsonjurnaladdvalidasi.message_success,
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

  return (
    <>
      <Toast message={message} />

      {!items && (
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
                  itemsPerPage={15}
                  pagination
                  columnFilter
                  scopedSlots={{
                    Edit: (rowData) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              prosesData(rowData);
                            }}
                          >
                            {Jsonjurnaladdvalidasi.list_new}
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
                        <td> {Jsonjurnaladdvalidasi.acctype_0} </td>
                      ) : (
                        <td> {Jsonjurnaladdvalidasi.acctype_1} </td>
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
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CRow>
                    <Input
                      ref={register}
                      typefield="text"
                      type="text"
                      label={Jsonjurnaladdvalidasi.asid}
                      name="asid"
                      defaultValue={items.asid}
                      id="asid"
                      md="4"
                      lg="4"
                    />
                    <Input
                      ref={register}
                      typefield="text"
                      type="text"
                      label={Jsonjurnaladdvalidasi.asname}
                      name="asname"
                      defaultValue={items.asname}
                      id="asname"
                      md="4"
                      lg="4"
                    />
                    <Input
                      ref={control}
                      typefield="checkbox"
                      label={Jsonjurnaladdvalidasi.isactive}
                      name="isactive"
                      id="isactive"
                      md="2"
                      lg="2"
                      value={true}
                      defaultValue={items.isactive}
                      // eventCheckbox={eventCheckbox}
                    />
                  </CRow>
                  <CRow>
                    <CCol>
                      <CDataTable
                        items={items.detail}
                        fields={fieldsDetail}
                        hover
                        striped
                        bordered
                        columnFilter
                        itemsPerPage={5}
                        pagination
                        scopedSlots={{
                          Aksi: (rowData, index) => {
                            return (
                              <td>
                                <div className="btn-group">
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => ubahItem(rowData, index)}
                                  >
                                    {Jsonjurnaladdvalidasi.action_button_edit}
                                  </CButton>
                                  <CButton
                                    color="danger"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => deleteItem(index)}
                                  >
                                    {Jsonjurnaladdvalidasi.action_button_delete}
                                  </CButton>
                                </div>
                              </td>
                            );
                          },

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
                        onClick={() => setModal(true)}
                        type="submit"
                        style={{ float: "right" }}
                        size="sm"
                        color="primary"
                      >
                        <CIcon name="cil-save" />
                        {""}
                        {Jsonjurnaladdvalidasi.save_button}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CModal show={modal} onClose={setModal}>
                  <CModalBody>
                    <h3>{Jsonjurnaladdvalidasi.confirm_save}</h3>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      type="submit"
                      onClick={() => confirmSave()}
                      color="primary"
                    >
                      {Jsonjurnaladdvalidasi.save_button}
                    </CButton>{" "}
                    <CButton color="danger" onClick={() => setModal(false)}>
                      {Jsonjurnaladdvalidasi.confirm_no}
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      <CModal
        size="xl"
        show={modalEditItem}
        onClose={() => {
          setModalEditItem(false);
          setFormEditItem(null);
        }}
      >
        <CModalHeader closeButton>
          <h3>{Jsonjurnaladdvalidasi.edit_detail}</h3>
        </CModalHeader>

        {formEditItem && (
          <CModalBody>
            <CRow>
              <Input
                ref={register2}
                typefield="text"
                type="text"
                label={Jsonjurnaladdvalidasi.detailitem_no}
                name="detailitem_no"
                defaultValue={formEditItem.itemno}
                id="detailitem_no"
                md="4"
                lg="4"
              />
              <Input
                ref={register2}
                typefield="text"
                type="text"
                label={Jsonjurnaladdvalidasi.detailitem_name}
                name="detailitem_name"
                defaultValue={formEditItem.itemname}
                id="detailitem_name"
                md="4"
                lg="4"
              />
              <Input
                ref={register2}
                typefield="text"
                type="text"
                label={Jsonjurnaladdvalidasi.detailitem_parentno}
                name="detailitem_parentno"
                defaultValue={formEditItem.parentno}
                id="detailitem_parentno"
                md="4"
                lg="4"
              />
            </CRow>
            <CRow>
              <Input
                ref={control2}
                typefield="checkbox"
                label={Jsonjurnaladdvalidasi.detailitem_isvisible}
                name="detailitem_isvisible"
                id="detailitem_isvisible"
                md="2"
                lg="2"
                value={true}
                defaultValue={formEditItem.isvisible}
              />
              <Input
                ref={control2}
                typefield="checkbox"
                label={Jsonjurnaladdvalidasi.detailitem_isgeneral}
                name="detailitem_isgeneral"
                id="detailitem_isgeneral"
                md="2"
                lg="2"
                value={true}
                defaultValue={formEditItem.isgeneral}
                eventCheckbox={itemGroup}
              />
              {!withItemGroup && (
                <Input
                  ref={control2}
                  typefield="select"
                  label={Jsonjurnaladdvalidasi.detailitem_accno}
                  name="detailitem_accno"
                  id="detailitem_accno"
                  md="4"
                  lg="4"
                  options={optionAcc}
                  selectDefaultValue={{
                    value: formEditItem.accno,
                    label: formEditItem.accno + " - " + formEditItem.accname,
                  }}
                  // eventSelect={eventSelect}
                />
              )}
            </CRow>
          </CModalBody>
        )}

        <CModalFooter>
          <CButton
            type="submit"
            color="primary"
            onClick={() => simpanEditItem()}
          >
            Simpan
          </CButton>{" "}
          <CButton
            color="danger"
            onClick={() => {
              setModalEditItem(false);
              setFormEditItem(null);
            }}
          >
            Batal
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ReportStrucValidasi;
