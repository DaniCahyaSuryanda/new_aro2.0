import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormGroup,
  CLabel,
  CButton,
  CCardFooter,
  CDataTable,
  CModal,
  CModalHeader,
  CModalBody,
  CSelect,
} from "@coreui/react";
import JsonLaporanUmum from "laporan/lang/id/laporanumum.json";
import axios from "axios";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import CIcon from "@coreui/icons-react";

// const fields = [
//   { key: "detail_kategori", label: JsonLaporanUmum.detail_kategori },
//   { key: "detail_name", label: JsonLaporanUmum.detail_name },
//   { key: "detail_startdate", label: JsonLaporanUmum.detail_startdate },
//   { key: "detail_enddate", label: JsonLaporanUmum.detail_enddate },
// ];

const LaporanUmum = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const [dataKategori, setDataKategori] = useState(null);
  const [dataNama, setDataNama] = useState([]);
  const [items, setItems] = useState(false);
  const [dataFilter, setDataFilter] = useState(null);
  const [dataGrid, setDataGrid] = useState(null);
  const [dataButton, setDataButton] = useState(null);

  useEffect(() => {
    if (dataKategori == null) {
      SetDataKategori();
    }
  }, [dataKategori]);

  const SetDataKategori = () => {
    axios
      .post(global.config.API_URL + "general/report/viewer/listcategory")
      .then((res) => {
        let data = [];
        res.data.data.map((row) => {
          data.push({ value: row, label: row });
        });
        setDataKategori(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setOptionNama = (kategori) => {
    let kategory = {
      category: kategori,
    };
    setDataGrid(null);
    setDataFilter(null);
    setDataButton(null);
    axios
      .post(`${global.config.API_URL}general/report/viewer/listname`, kategory)
      .then((res) => {
        let data = [];
        res.data.data.map((row) => {
          data.push({
            value: row,
            label: row,
          });
        });
        setDataNama(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showFilter = handleSubmit((data) => {
    let body = {
      category: data.category,
      name: data.name,
      lang: "id",
    };
    // let kategori = data.category;
    // let nama = data.name;
    // let lang = { lang: "id" };
    setDataGrid(null);
    setDataFilter(null);
    setDataButton(null);
    axios
      .post(`${global.config.API_URL}general/report/viewer/listfilter`, body)
      .then((res) => {
        let dataRes = res.data.data;
        let filter = [];
        dataRes.filter.map((row) => {
          if (row.datatype == "select") {
            let dataSelect = [];
            let idselect = row.selectid;
            let filterData = dataRes.selectvalues.find(({ id }) => {
              return id == idselect;
            });
            filterData.listvalues.map((selectRow) => {
              dataSelect.push({
                value: selectRow.id,
                label: selectRow.caption,
              });
            });
            filter.push({
              name: row.id,
              label: row.caption,
              type: row.datatype,
              values: dataSelect,
            });
          } else {
            filter.push({
              name: row.id,
              label: row.caption,
              type: row.datatype,
              defaultvalue: row.defaultvalue,
            });
          }
        });
        setDataFilter(filter);

        let button = { ...dataRes };
        delete button.filter;
        delete button.selectvalues;
        const objectArray = Object.entries(button);
        button = [];
        objectArray.forEach(([key, value]) => {
          if (value == true) {
            button.push({ disabled: value, name: key, className: "mr-3" });
          } else {
            button.push({
              disabled: value,
              name: key,
              className: "mr-3 d-none",
            });
          }
        });
        setDataButton(button);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const formatingData = (data) => {
    let dataForm = {};
    dataForm.category = data.category;
    dataForm.name = data.name;
    delete data.category;
    delete data.name;
    dataForm.listfilter = data;
    dataForm.lang = "id";

    return dataForm;
  };

  const viewdata = handleSubmit((data) => {
    const result = formatingData(data);
    axios
      .post(`${global.config.API_URL}general/report/viewer/data`, result)
      .then((res) => {
        if (res.data.rescode === 0) {
          let columns = [];
          res.data.data.columns.map((row) => {
            columns.push({ key: row.key, label: row.name });
          });
          let data = {
            columns: columns,
            data: res.data.data.data,
          };
          setDataGrid(data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("View Report");
  });

  const downloadxlsx = handleSubmit((data) => {
    const result = formatingData(data);
    axios
      .post(`${global.config.API_URL}general/report/viewer/downloadcsv`, result)
      .then((res) => {
        if (res.status === 200) {
          let nameFile = res.request
            .getResponseHeader("Content-Disposition")
            .split("filename=")[1]
            .replace(/[^\w\.\-\s]/g, " ");
          const csvCode =
            "data:text/xls;charset=utf-8,SEP=,%0A" +
            encodeURIComponent(res.data);
          const link = document.createElement("a");
          link.href = csvCode;
          link.setAttribute(
            "download",
            nameFile.substr(1, nameFile.length - 5) + "xls"
          );
          document.body.appendChild(link);
          link.click();
          console.log("Downlaod XLSX");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const downloadcsv = handleSubmit((data) => {
    const result = formatingData(data);
    axios
      .post(`${global.config.API_URL}general/report/viewer/downloadcsv`, result)
      .then((res) => {
        if (res.status === 200) {
          let nameFile = res.request
            .getResponseHeader("Content-Disposition")
            .split("filename=")[1]
            .replace(/[^\w\.\-\s]/g, " ");
          const csvCode =
            "data:text/csv;charset=utf-8,SEP=,%0A" +
            encodeURIComponent(res.data);
          const link = document.createElement("a");
          link.href = csvCode;
          link.setAttribute(
            "download",
            nameFile.substr(1, nameFile.length - 2)
          );
          document.body.appendChild(link);
          link.click();
          console.log("Downlaod CVS");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <>
      {/* {items && (
        <CCard>
          <CCardHeader>
            <h6>{JsonLaporanUmum.detail_preview}</h6>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              fields={fields}
              hover
              striped
              bordered
              columnFilter
              itemsPerPage={5}
              pagination
            />
          </CCardBody>
          <CCardFooter>
            <CButton size="sm" color="warning" onClick={() => setItems(false)}>
              <CIcon name="cil-chevron-left" /> {JsonLaporanUmum.back}
            </CButton>
          </CCardFooter>
        </CCard>
      )} */}

      {dataKategori && (
        <CRow>
          <CCol xl="12">
            <CCard>
              <CCardHeader>
                <h6>{JsonLaporanUmum.form}</h6>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">
                          {JsonLaporanUmum.category}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <Controller
                          control={control}
                          name="category"
                          defaultValue={""}
                          id="category"
                          render={({ onChange }) => (
                            <Select
                              onChange={(e) => {
                                onChange(e.value);
                                setOptionNama(e.value);
                              }}
                              options={dataKategori}
                            />
                          )}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">
                          {JsonLaporanUmum.name}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <Controller
                          control={control}
                          name="name"
                          defaultValue={""}
                          id="name"
                          render={({ onChange }) => (
                            <Select
                              onChange={(e) => {
                                onChange(e.value);
                                showFilter();
                              }}
                              options={dataNama}
                            />
                          )}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {dataFilter && dataButton && (
        <CRow>
          <CCol xl="12">
            <CCard>
              <CCardHeader>
                <h6>{JsonLaporanUmum.form_filter}</h6>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  {dataFilter.length == 0 ? (
                    <h5 align="center">{JsonLaporanUmum.filter_empty}</h5>
                  ) : (
                    ""
                  )}
                </CRow>
                <CRow>
                  {dataFilter.map((row, key) => (
                    <CCol md="4" key={key}>
                      <CFormGroup row>
                        <CCol xl="12" xs="12">
                          <CLabel htmlFor="text-input">{row.label}</CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          {row.type == "select" ? (
                            <Controller
                              control={control}
                              name={row.name}
                              defaultValue={""}
                              id={row.name}
                              render={({ onChange }) => (
                                <Select
                                  onChange={(e) => {
                                    onChange(e.value);
                                  }}
                                  options={row.values}
                                />
                              )}
                            />
                          ) : (
                            ""
                          )}
                          {row.type == "number" ? (
                            <input
                              id={row.name}
                              className="form-control"
                              name={row.name}
                              defaultValue={row.defaultvalue}
                              type="number"
                              ref={register}
                            />
                          ) : (
                            ""
                          )}
                          {row.type == "text" ? (
                            <input
                              id={row.name}
                              className="form-control"
                              name={row.name}
                              defaultValue={row.defaultvalue}
                              type="text"
                              ref={register}
                            />
                          ) : (
                            ""
                          )}
                          {row.type == "date" ? (
                            <input
                              id={row.name}
                              className="form-control"
                              name={row.name}
                              type="date"
                              defaultValue={row.defaultvalue}
                              ref={register}
                            />
                          ) : (
                            ""
                          )}
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  ))}
                </CRow>
              </CCardBody>
              <CCardFooter>
                {dataButton.map((row, key) => (
                  <>
                    {row.name == "viewdata" ? (
                      <CButton
                        key="1"
                        size="sm"
                        color={"primary"}
                        className={row.className}
                        style={{ float: "right" }}
                        onClick={() => viewdata()}
                      >
                        <CIcon name="cil-envelope-letter" />
                        {JsonLaporanUmum.button_preview}
                      </CButton>
                    ) : (
                      ""
                    )}

                    {row.name == "downloadxlsx" ? (
                      <CButton
                        size="sm"
                        key="2"
                        color={"success"}
                        className={row.className}
                        style={{ float: "right" }}
                        onClick={() => downloadxlsx()}
                      >
                        <CIcon name="cil-cloud-download" />
                        {JsonLaporanUmum.button_downloadxlsx}
                      </CButton>
                    ) : (
                      ""
                    )}

                    {row.name == "downloadcsv" ? (
                      <CButton
                        size="sm"
                        key="3"
                        color={"success"}
                        className={row.className}
                        style={{ float: "right" }}
                        onClick={() => downloadcsv()}
                      >
                        <CIcon name="cil-cloud-download" />
                        {JsonLaporanUmum.button_downloadcsv}
                      </CButton>
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      )}

      {dataGrid && (
        <CRow>
          <CCol xl="12">
            <CCard>
              <CCardHeader>
                <h6>{JsonLaporanUmum.form_filter}</h6>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataGrid.data}
                  fields={dataGrid.columns}
                  itemsPerPageSelect
                  itemsPerPage={20}
                  columnFilter
                  sorter
                  hover
                  size={"md"}
                  pagination
                  tableFilter
                  cleaner
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default LaporanUmum;
