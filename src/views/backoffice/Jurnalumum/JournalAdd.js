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
  CTextarea,
  CInput,
  CInputCheckbox,
  CLabel,
  CSelect,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
  CDataTable,
  CBadge,
} from "@coreui/react";

import getFormattedDate from "utils/utils";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { useForm, Controller } from "react-hook-form";
import JurnalTypeAdd from "../../../gl/transaction/lang/id/journaladdcreate.json";

// import { cilColorBorder } from '@coreui/icons'

const fields = [
  JurnalTypeAdd.action_list,
  { key: "detailitem_accno", label: JurnalTypeAdd.detailitem_accno },
  { key: "detailitem_accname", label: JurnalTypeAdd.detailitem_accname },
  {
    key: "detailitem_description",
    label: JurnalTypeAdd.detailitem_description,
  },
  { key: "detailitem_debit", label: JurnalTypeAdd.detailitem_debit },
  { key: "detailitem_credit", label: JurnalTypeAdd.detailitem_credit },
];

const JenisJurnalAdd = () => {
  const [startDate, setStartDate] = useState("");
  const [modal, setModal] = useState(false);
  const [dataAkun, setDataAkun] = useState([]);
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [accNo, setAccNo] = useState(null);
  const [jurnal, setJurnal] = useState(null);
  const [items, setItems] = useState(null);
  const [dataSend, setDataSend] = useState(null);
  const [withItemGroup, setWithItemGroup] = useState(false);
  const [formItem, setFormItem] = useState(false);
  const [editFormItem, setEditFormItem] = useState(false);
  const [indexEdit, setIndexEdit] = useState(false);
  const [optionAcc, setOptionAcc] = useState([]);
  const [optionJurnal, setOptionJurnal] = useState([]);
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

  const {
    handleSubmit: handleSubmit,
    register: register,
    reset: reset,
    control: control,
  } = useForm();

  // const changeField = (field, value) => {
  //   const auxData = { ...startDate };
  //   auxData[field] = value;
  //   setStartDate(auxData);
  // };

  // const handleSubmit3 = (e) => {
  //   e.persist();
  //   e.nativeEvent.preventDefault();
  //   const transformedValues = {};
  //   Object.keys(data).forEach((key) => {
  //     transformedValues[key] = formatDateForServer(startDate[key]);
  //   });
  //   console.log(transformedValues);
  // };

  const onSubmit = (data) => {
    // alert(JSON.stringify(data))
    let detail = [];
    dataAkun.map((row) => {
      detail.push({
        accno: row.detailitem_accno,
        accname: row.detailitem_accname,
        description: row.detailitem_description,
        debit: row.detailitem_debit,
        credit: row.detailitem_credit,
        branchid: "",
      });
    });
    let sendData = {
      journaldate: getFormattedDate(data.journaldate),
      reffid: data.reffid,
      journaltype: data.journaltype.value,
      description: data.description,
      detail: detail,
      validstate: 0,
      lang: "id",
    };
    setDataSend(sendData);
    setModal(true);
  };

  const confirmSave = () => {
    console.log(dataSend);
    axios
      .post(
        `${global.config.API_URL}gl/transaction/journal/add/create`,
        dataSend
      )
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage("Jurnal berhasil di simpan");
          reset();
          setModal(false);
          setDataSend(null);
          setItems(null);
          setDataAkun(null);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
          }, 5000);
        } else {
          setModal(false);
          setMessType("danger");
          setMessage(res.data.errdescription);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
          }, 5000);
        }
      })

      .catch(function (error) {
        console.log(error.response.data);
        setModal(false);
        // setMessType("danger");
        // setMessage(error);
      });
  };

  const saveDetail = (param) => {
    // alert(JSON.stringify(data))
    let data = [...dataAkun];
    let accname = accNo.find(({ accno }) => {
      return accno == param.detailitem_accno.value;
    });
    data.push({
      detailitem_debit: param.detailitem_debit,
      detailitem_description: param.detailitem_description,
      detailitem_accno: param.detailitem_accno.value,
      detailitem_accname: accname.accname,
      detailitem_credit: param.detailitem_credit,
    });
    reset2();
    setFormItem(false);
    setDataAkun(data);
    console.log(dataAkun);
  };

  const saveEditDetail = (param) => {
    let data = [...dataAkun];
    let accname = accNo.find(({ accno }) => {
      return accno == param.detailitem_accno.value;
    });
    data[indexEdit] = {
      detailitem_debit: param.detailitem_debit,
      detailitem_description: param.detailitem_description,
      detailitem_accno: param.detailitem_accno.value,
      detailitem_accname: accname.accname,
      detailitem_credit: param.detailitem_credit,
    };
    setDataAkun(data);
    reset3();
    setEditFormItem(false);
  };

  const deleteItem = (index) => {
    console.log(index);
    let data = [...dataAkun];
    data.splice(index, 1);
    console.log(data);
    setDataAkun(data);
    console.log(dataAkun);
  };

  const ubahItem = (items, index) => {
    setItems(items);
    setEditFormItem(true);
    setIndexEdit(index);
  };

  useEffect(() => {
    if (accNo == null && jurnal == null) {
      getDataJurnal();
      getDataAkun();
    }
  }, [accNo, jurnal]);

  const getDataJurnal = () => {
    axios
      .get(global.config.API_URL + "gl/params/journaltype/list?onlyactive=true")
      .then((res) => {
        let data = [];
        res.data.data.map((jurnal) => {
          data.push({ value: jurnal.jrtype, label: jurnal.jrtype });
        });
        console.log(res.data.data);
        setJurnal(res.data.data);
        setOptionJurnal(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataAkun = () => {
    axios
      .get(`${global.config.API_URL}gl/params/account/list?onlyactive=true`)
      .then((res) => {
        let data = [];
        res.data.data.map((akun) => {
          data.push({
            value: akun.accno,
            label: akun.accno + " - " + akun.accname,
          });
        });
        console.log(res.data.data);
        setAccNo(res.data.data);
        setOptionAcc(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const itemGroup = (e) => {
    console.log(e);
    setWithItemGroup(e);
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
      {accNo && jurnal && (
        <CCard color="light">
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
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="text-input">
                              {JurnalTypeAdd.journaldate}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              type="date"
                              className="form-control"
                              id="journaldate"
                              ref={register}
                              name="journaldate"
                              // onChange={(event) =>
                              //   changeField(event.target.value)
                              // }
                              dateformat="dd/MM/yyyy"
                            />
                            {/* <DatePicker
                              ref={register}
                              name="journaldate"
                              className="form-control"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              // showTimeSelect
                              // timeFormat="HH:mm"
                              //timeIntervals={15}
                              // timeCaption="time"
                              dateFormat="yyyy/MM/dd"
                              autoComplete="off"
                            /> */}
                          </CCol>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="text-input">
                              {JurnalTypeAdd.reffid}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              className="form-control"
                              ref={register}
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
                              {JurnalTypeAdd.journaltype}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <Controller
                              name="journaltype"
                              as={Select}
                              options={optionJurnal}
                              control={control}
                              defaultValue=""
                              id="journaltype"
                            />
                            {/* <input
                              type="text"
                              className="form-control"
                              id="journaltype"
                              name="journaltype"
                              ref={register2}
                              defaultValue={""}
                            /> */}
                          </CCol>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="select">
                              {JurnalTypeAdd.description}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <textarea
                              className="form-control"
                              name="description"
                              rows="4"
                              ref={register}
                            ></textarea>
                          </CCol>
                        </CFormGroup>
                      </CCol>
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
                            Aksi: (items, index) => {
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
                          onClick={() => setFormItem(true)}
                          style={{ float: "right" }}
                        >
                          <CIcon name="cil-pencil" />
                          {JurnalTypeAdd.list_new}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="reset" color="danger" className="mr-3">
                      <CIcon name="cil-x" /> {JurnalTypeAdd.cancel_button}
                    </CButton>
                    <CButton type="submit" color="primary">
                      <CIcon name="cil-save" /> {JurnalTypeAdd.save_button}
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
          {formItem && (
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <h6>{JurnalTypeAdd.detailitem_caption}</h6>
                  </CCardHeader>
                  <CCardBody className="mb-4">
                    <CForm
                      encType="multipart/form-data"
                      className="form-horizontal"
                      color="light"
                      onSubmit={handleSubmit2(saveDetail)}
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
                                control={control2}
                                defaultValue=""
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
                              <input
                                className="form-control"
                                id="detailitem_description"
                                name="detailitem_description"
                                ref={register2}
                                defaultValue={""}
                                rows="4"
                              ></input>
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
                                ref={register2({ valueAsNumber: true })}
                                //  defaultValue=""
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
                                ref={register2({ valueAsNumber: true })}
                                //  defaultValue={""}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
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
                            <CIcon name="cil-save" />{" "}
                            {JurnalTypeAdd.save_button}
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
                    <h6>{JurnalTypeAdd.detail_caption}</h6>
                  </CCardHeader>
                  <CCardBody className="mb-4">
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
                                control={control3}
                                defaultValue={{
                                  value: items.detailitem_accno,
                                  label:
                                    items.detailitem_accno +
                                    " - " +
                                    items.detailitem_accname,
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
                                defaultValue={items.detailitem_description}
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
                                defaultValue={items.detailitem_debit}
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
                                defaultValue={items.detailitem_credit}
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
                            onClick={() => setEditFormItem(false)}
                            className="mr-3"
                          >
                            <CIcon name="cil-scrubber" />{" "}
                            {JurnalTypeAdd.cancel_button}
                          </CButton>
                          <CButton
                            size="sm"
                            type="submit"
                            style={{ float: "rigth" }}
                            color="primary"
                          >
                            <CIcon name="cil-scrubber" />{" "}
                            {JurnalTypeAdd.save_button}
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
        </CCard>
      )}
    </>
  );
};

export default JenisJurnalAdd;

const formatDateForServer = (date) => {
  const [year, month, day] = date.split("-");
  return `${year}/${month}/${day}`;
};
