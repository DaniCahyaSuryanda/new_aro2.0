import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CBadge,
  CCollapse,
  CDataTable,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CRow,
  CTextarea,
  CForm,
  CAlert,
  CHeader,
} from "@coreui/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import Jsonjurnaladdvalidasi from "../../../gl/params/lang/id/reportstructureeditcreate";

const fields = [
  Jsonjurnaladdvalidasi[0].list_new,
  { key: "asid", label: Jsonjurnaladdvalidasi[0].list_asid },
  { key: "asname", label: Jsonjurnaladdvalidasi[0].list_asname },
  { key: "isactive", label: Jsonjurnaladdvalidasi[0].isactive },
];

const fieldsDetail = [
  Jsonjurnaladdvalidasi[0].action_list,
  { key: "itemno", label: Jsonjurnaladdvalidasi[0].detailitem_no },
  { key: "itemname", label: Jsonjurnaladdvalidasi[0].detailitem_name },
  { key: "parentno", label: Jsonjurnaladdvalidasi[0].detailitem_parentno },
  { key: "accno", label: Jsonjurnaladdvalidasi[0].detailitem_accno },
  { key: "accname", label: Jsonjurnaladdvalidasi[0].detailitem_accname },
  { key: "isvisible", label: Jsonjurnaladdvalidasi[0].detailitem_isvisible },
];

const ReportStrucValidasi = () => {
  const [modalOtor, setModalOtor] = useState(false);
  const [modalRej, setModalRej] = useState(false);
  const [modalEditItem, setModalEditItem] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAccountStructure, setDataAccountStructure] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [optionAcc, setOptionAcc] = useState(null);
  const [dataSend, setDataSend] = useState(null);
  const [withItemGroup, setWithItemGroup] = useState(false);
  const [formEditItem, setFormEditItem] = useState();
  const [indexEdit, setIndexEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    control: control2,
  } = useForm();
  const { handleSubmit, register, reset, control } = useForm();

  useEffect(() => {
    if (dataAccountStructure == null) {
      getDataValidasi();
    }
    if (optionAcc == null) {
      getOptionAkun();
    }
  }, [dataAccountStructure, optionAcc]);

  const getOptionAkun = () => {
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
        setDataAkun(res.data.data);
        setOptionAcc(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataValidasi = () => {
    axios
      .get(`${global.config.API_URL}gl/params/accountstructure/list`)
      .then((res) => {
        setDataAccountStructure(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const prosesData = (prosesData) => {
    axios
      .get(
        `${global.config.API_URL}gl/params/accountstructure/load?asid=${prosesData.asid}`
      )

      .then((res) => {
        if (res.data.rescode == 0) {
          let dataDetail = prosesData;
          dataDetail.detail = res.data.data.detail;
          setItems(dataDetail);
          console.log(res);
          console.log(dataDetail);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteItem = (index) => {
    console.log(index);
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

  const itemGroup = (e) => {
    setWithItemGroup(e);
  };

  const simpanEditItem = handleSubmit2((data) => {
    console.log(data);

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
        return accno == data.detailitem_accno.value;
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

    console.log(itemsData);
    setItems(itemsData);

    setModalEditItem(false);
    setFormEditItem(null);
    setIndexEdit(null);
    setWithItemGroup(false);
  });

  const onSubmit = (data) => {
    let detail = [];
    items.detail.map((row) => {
      detail.push({
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
      lang: "id",
    };
    setDataSend(sendData);
  };

  const confirmSave = () => {
    axios
      .post(
        `${global.config.API_URL}gl/params/accountstructure/edit/create`,
        dataSend
      )
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(Jsonjurnaladdvalidasi[0].message_success);
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

  return (
    <>
      {message && (
        <CRow>
          <CCol>
            <CAlert color={messType}>{message}</CAlert>
          </CCol>
        </CRow>
      )}

      {!items && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {Jsonjurnaladdvalidasi[0].list_caption}
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
                  {Jsonjurnaladdvalidasi[0].list_refresh}
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
                            {Jsonjurnaladdvalidasi[0].list_new}
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
                      item.acctype == 0 ? (
                        <td> {Jsonjurnaladdvalidasi.acctype_0} </td>
                      ) : (
                        <td> {Jsonjurnaladdvalidasi.acctype_1} </td>
                      ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {items && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h6>{Jsonjurnaladdvalidasi[0].detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CRow>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {Jsonjurnaladdvalidasi[0].asid}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            className="form-control"
                            id="asid"
                            name="asid"
                            defaultValue={items.asid}
                            ref={register}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {Jsonjurnaladdvalidasi[0].asname}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            className="form-control"
                            id="asname"
                            name="asname"
                            defaultValue={items.asname}
                            ref={register}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup variant="custom-checkbox" inline row>
                        <CCol xs="2" xl="2">
                          <CLabel htmlFor="select">
                            {Jsonjurnaladdvalidasi[0].isactive}
                          </CLabel>
                        </CCol>
                        <CCol xs="3" xl="3">
                          <CFormGroup variant="custom-checkbox" inline>
                            <Controller
                              name="isactive"
                              control={control}
                              value={items.isactive}
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
                                    {
                                      Jsonjurnaladdvalidasi[0]
                                        .action_button_edit
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
                                      Jsonjurnaladdvalidasi[0]
                                        .action_button_delete
                                    }
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
                        {Jsonjurnaladdvalidasi[0].hide}
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
                        {Jsonjurnaladdvalidasi[0].save_button}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CModal show={modal} onClose={setModal}>
                  <CModalBody>
                    <h3>{Jsonjurnaladdvalidasi[0].confirm_save}</h3>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      type="submit"
                      onClick={() => confirmSave()}
                      color="primary"
                    >
                      {Jsonjurnaladdvalidasi[0].save_button}
                    </CButton>{" "}
                    <CButton color="danger" onClick={() => setModal(false)}>
                      {Jsonjurnaladdvalidasi[0].confirm_no}
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      <CModal
        size="lg"
        show={modalEditItem}
        onClose={() => {
          setModalEditItem(false);
          setFormEditItem(null);
        }}
      >
        <CModalHeader closeButton>
          <h3>{Jsonjurnaladdvalidasi[0].edit_detail}</h3>
        </CModalHeader>

        {formEditItem && (
          <CModalBody>
            <CRow>
              <CCol lg="6" md="6" sm="12">
                <CFormGroup row>
                  <CCol>
                    <CLabel htmlFor="text-input">
                      {Jsonjurnaladdvalidasi[0].detailitem_no}
                    </CLabel>
                  </CCol>

                  <CCol xs="12" xl="9">
                    <input
                      className="form-control"
                      id="detailitem_no"
                      name="detailitem_no"
                      ref={register2}
                      defaultValue={formEditItem.itemno}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol lg="6" md="6" sm="12">
                <CFormGroup row>
                  <CCol>
                    <CLabel htmlFor="text-input">
                      {Jsonjurnaladdvalidasi[0].detailitem_name}
                    </CLabel>
                  </CCol>
                  <CCol xs="12" xl="9">
                    <input
                      className="form-control"
                      id="detailitem_name"
                      name="detailitem_name"
                      ref={register2}
                      defaultValue={formEditItem.itemname}
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
                      {Jsonjurnaladdvalidasi[0].detailitem_parentno}
                    </CLabel>
                  </CCol>
                  <CCol xs="12" xl="9">
                    <input
                      className="form-control"
                      id="detailitem_parentno"
                      name="detailitem_parentno"
                      ref={register2}
                      defaultValue={formEditItem.parentno}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol lg="6" md="6" sm="12">
                <CFormGroup row>
                  <CCol>
                    <CLabel htmlFor="text-input">
                      {Jsonjurnaladdvalidasi[0].detailitem_isgeneral}
                    </CLabel>
                  </CCol>
                  <CCol xs="12" xl="9" className="m-3">
                    <Controller
                      name="detailitem_isgeneral"
                      control={control2}
                      defaultValue={formEditItem.isgeneral}
                      value={formEditItem.isgeneral}
                      render={(props) => (
                        <CInputCheckbox
                          onChange={(e) => props.onChange(e.target.checked)}
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
                        {Jsonjurnaladdvalidasi[0].detailitem_accno}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                      <Controller
                        name="detailitem_accno"
                        as={Select}
                        options={optionAcc}
                        control={control2}
                        defaultValue={{
                          value: formEditItem.accno,
                          label:
                            formEditItem.accno + " - " + formEditItem.accname,
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
                      {Jsonjurnaladdvalidasi[0].detailitem_isvisible}
                    </CLabel>
                  </CCol>
                  <CCol xs="12" xl="9" className="m-3">
                    <Controller
                      name="detailitem_isvisible"
                      control={control2}
                      defaultValue={formEditItem.isvisible}
                      value={formEditItem.isvisible}
                      render={(props) => (
                        <CInputCheckbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
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
