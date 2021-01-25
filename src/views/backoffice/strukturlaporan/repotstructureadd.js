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
import axios from "axios";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { useForm, Controller } from "react-hook-form";
import JsonReportstructureadd from "gl/params/lang/id/reportstructureaddcreate.json";

// export default class Tambahjurnalakun extends React.Component {

const fields = [
  JsonReportstructureadd.action_list,
  { key: "detailitem_no", label: JsonReportstructureadd.detailitem_no },
  { key: "detailitem_name", label: JsonReportstructureadd.detailitem_name },
  {
    key: "detailitem_parentno",
    label: JsonReportstructureadd.detailitem_parentno,
  },
  {
    key: "detailitem_isgeneral",
    label: JsonReportstructureadd.detailitem_isgeneral,
  },
  { key: "detailitem_accno", label: JsonReportstructureadd.detailitem_accno },
  {
    key: "detailitem_accname",
    label: JsonReportstructureadd.detailitem_accname,
  },
  {
    key: "detailitem_isvisible",
    label: JsonReportstructureadd.detailitem_isvisible,
  },
];

const Reportstrucutreadd = () => {
  const [modal, setModal] = useState(false);
  const [dataAkun, setDataAkun] = useState([]);
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [accNo, setAccNo] = useState(null);
  const [items, setItems] = useState(null);
  const [dataSend, setDataSend] = useState(null);
  const [withItemGroup, setWithItemGroup] = useState(false);
  const [formItem, setFormItem] = useState(false);
  const [editFormItem, setEditFormItem] = useState(false);
  const [indexEdit, setIndexEdit] = useState(false);
  const [option, setOption] = useState([]);
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
      detail.push({
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
      lang: "id",
    };
    setDataSend(sendData);
    setModal(true);
  };

  const toggleDetails2 = () => {
    // const position = details.indexOf(index)
    setFormItem(true);
    setAccNo(false);
  };

  const confirmSave = () => {
    axios
      .post(
        `http://117.54.7.227/arov2/api/gl/params/accountstructure/add/create`,
        dataSend
      )
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage("Struktur Laporan Berhasil Disimpan");
          reset();
          setModal(false);
          setDataSend(null);
          setItems(null);
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
        console.log(error);
      });
  };

  const saveDetail = (param) => {
    // alert(JSON.stringify(data))
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
      let accname = accNo.find(({ accno }) => {
        return accno == param.detailitem_accno.value;
      });
      data.push({
        detailitem_no: param.detailitem_no,
        detailitem_name: param.detailitem_name,
        detailitem_parentno: param.detailitem_parentno,
        detailitem_isgeneral: param.detailitem_isgeneral,
        detailitem_accno: param.detailitem_accno.value,
        detailitem_accname: accname.accname,
        detailitem_isvisible: param.detailitem_isvisible,
      });
    }
    reset2();
    setFormItem(false);
    setDataAkun(data);
    console.log(dataAkun);
  };

  const saveEditDetail = (param) => {
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
      let accname = accNo.find(({ accno }) => {
        return accno == param.detailitem_accno.value;
      });
      data[indexEdit] = {
        detailitem_no: param.detailitem_no,
        detailitem_name: param.detailitem_name,
        detailitem_parentno: param.detailitem_parentno,
        detailitem_isgeneral: param.detailitem_isgeneral,
        detailitem_accno: param.detailitem_accno.value,
        detailitem_accname: accname.accname,
        detailitem_isvisible: param.detailitem_isvisible,
      };
    }
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
    if (accNo == null) {
      getDataAkun();
    }
  }, [accNo]);

  const getDataAkun = () => {
    axios
      .get(
        "http://117.54.7.227/arov2/api/gl/params/account/list?onlyactive=true"
      )
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
        setOption(data);
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
      {accNo && (
        <CCard color="light">
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
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="text-input">
                              {JsonReportstructureadd.asid}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              className="form-control"
                              id="asid"
                              ref={register}
                              name="asid"
                            />
                          </CCol>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="text-input">
                              {JsonReportstructureadd.asname}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              className="form-control"
                              ref={register}
                              id="asname"
                              name="asname"
                            />
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol xs="2" xl="2">
                            <CLabel htmlFor="select">
                              {JsonReportstructureadd.isactive}
                            </CLabel>
                          </CCol>
                          <CCol xs="3" xl="3">
                            <CFormGroup variant="custom-checkbox" inline>
                              <Controller
                                name="isactive"
                                control={control}
                                value={true}
                                defaultValue={true}
                                render={(props) => (
                                  <CInputCheckbox
                                    onChange={(e) =>
                                      props.onChange(e.target.checked)
                                    }
                                    checked={props.value}
                                  />
                                )}
                              />
                            </CFormGroup>
                          </CCol>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="text-input">
                              {JsonReportstructureadd.tag}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              className="form-control"
                              ref={register}
                              id="tag"
                              name="tag"
                            />
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
                          onClick={() => setFormItem(true)}
                          style={{ float: "right" }}
                        >
                          <CIcon name="cil-pencil" />
                          {JsonReportstructureadd.list_new}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="reset" color="danger" className="mr-3">
                      <CIcon name="cil-x" />{" "}
                      {JsonReportstructureadd.cancel_button}
                    </CButton>
                    <CButton type="submit" color="primary">
                      <CIcon name="cil-save" />{" "}
                      {JsonReportstructureadd.save_button}
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
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_no}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <input
                                className="form-control"
                                id="detailitem_no"
                                name="detailitem_no"
                                ref={register2}
                                defaultValue={""}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_name}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <input
                                className="form-control"
                                id="detailitem_name"
                                name="detailitem_name"
                                ref={register2}
                                defaultValue={""}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_parentno}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <input
                                className="form-control"
                                id="detailitem_parentno"
                                name="detailitem_parentno"
                                ref={register2}
                                defaultValue={""}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_isgeneral}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <Controller
                                name="detailitem_isgeneral"
                                control={control2}
                                defaultValue={false}
                                value="true"
                                render={(props) => (
                                  <CInputCheckbox
                                    onChange={(e) =>
                                      props.onChange(e.target.checked)
                                    }
                                    onClick={(e) => itemGroup(e.target.checked)}
                                    checked={props.value}
                                  />
                                )}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        {!withItemGroup && (
                          <CCol lg="6" md="6" sm="12">
                            <CFormGroup row>
                              <CCol>
                                <CLabel htmlFor="text-input">
                                  {JsonReportstructureadd.detailitem_accno}
                                </CLabel>
                              </CCol>
                              <CCol xs="12" xl="9">
                                <Controller
                                  name="detailitem_accno"
                                  as={Select}
                                  options={option}
                                  control={control2}
                                  defaultValue=""
                                  id="detailitem_accno"
                                />
                              </CCol>
                            </CFormGroup>
                          </CCol>
                        )}
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_isvisible}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <Controller
                                name="detailitem_isvisible"
                                control={control2}
                                defaultValue={false}
                                value="true"
                                render={(props) => (
                                  <CInputCheckbox
                                    onChange={(e) =>
                                      props.onChange(e.target.checked)
                                    }
                                    checked={props.value}
                                  />
                                )}
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
                            style={{ float: "left" }}
                            onClick={() => setFormItem(false)}
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
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_no}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <input
                                className="form-control"
                                id="detailitem_no"
                                name="detailitem_no"
                                ref={register3}
                                defaultValue={items.detailitem_no}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_name}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <input
                                className="form-control"
                                id="detailitem_name"
                                name="detailitem_name"
                                ref={register3}
                                defaultValue={items.detailitem_name}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_parentno}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <input
                                className="form-control"
                                id="detailitem_parentno"
                                name="detailitem_parentno"
                                ref={register3}
                                defaultValue={items.detailitem_parentno}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_isgeneral}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <Controller
                                name="detailitem_isgeneral"
                                control={control3}
                                defaultValue={items.detailitem_isgeneral}
                                value="true"
                                render={(props) => (
                                  <CInputCheckbox
                                    onChange={(e) =>
                                      props.onChange(e.target.checked)
                                    }
                                    onClick={(e) => itemGroup(e.target.checked)}
                                    checked={props.value}
                                  />
                                )}
                              />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        {!withItemGroup && (
                          <CCol lg="6" md="6" sm="12">
                            <CFormGroup row>
                              <CCol>
                                <CLabel htmlFor="text-input">
                                  {JsonReportstructureadd.detailitem_accno}
                                </CLabel>
                              </CCol>
                              <CCol xs="12" xl="9">
                                <Controller
                                  name="detailitem_accno"
                                  as={Select}
                                  options={option}
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
                        )}
                        <CCol lg="6" md="6" sm="12">
                          <CFormGroup row>
                            <CCol>
                              <CLabel htmlFor="text-input">
                                {JsonReportstructureadd.detailitem_isvisible}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" xl="9">
                              <Controller
                                name="detailitem_isvisible"
                                control={control3}
                                defaultValue={items.detailitem_isvisible}
                                value="true"
                                render={(props) => (
                                  <CInputCheckbox
                                    onChange={(e) =>
                                      props.onChange(e.target.checked)
                                    }
                                    checked={props.value}
                                  />
                                )}
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
        </CCard>
      )}
    </>
  );
};

export default Reportstrucutreadd;
