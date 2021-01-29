import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CCardFooter,
  CDataTable,
} from "@coreui/react";
import LangID from "json/lang/id/Laporan Umum/laporanumum.json";
import LangEN from "json/lang/en/Laporan Umum/laporanumum.json";
import axios from "axios";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import moment from "moment";
import Input from "component/Input";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const LaporanUmum = () => {
  const { handleSubmit, register, control } = useForm();
  const [dataKategori, setDataKategori] = useState(null);
  const [dataNama, setDataNama] = useState([]);
  const [dataFilter, setDataFilter] = useState(null);
  const [message, setMessage] = useState({});
  const [dataGrid, setDataGrid] = useState(null);
  const [dataButton, setDataButton] = useState(null);
  const [JsonLaporanUmum, setJsonLaporanUmum] = useState(null);
  const [messageJson, setMessageJson] = useState({});

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
        if (dataKategori === null) {
          SetDataKategori();
        }
      }
    }, [messageJson, dataKategori]);

  useEffect(() => {
    if (JsonLaporanUmum == null) {
      if (configApp.lang === "id") {
        setJsonLaporanUmum(LangID);
      } else if (configApp.lang === "en") {
        setJsonLaporanUmum(LangEN);
      } else {
        setJsonLaporanUmum(LangID);
      }
    }
  }, [JsonLaporanUmum]);

  const SetDataKategori = () => {
    setMessage({});
    axios
      .post(global.config.API_URL + "general/report/viewer/listcategory")
      .then((res) => {
        let data = [];
        res.data.data.map((row) => {
          return data.push({ value: row, label: row });
        });
        setDataKategori(data);
        if (res.data.rescode !== 0) {
          setMessage({
            title: messageJson.toatsheader_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
            active: true,
          });
        }
      })
      .catch((error) => {
        setMessage({
          title: messageJson.toatsheader_err,
          body: JSON.stringify(error),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  const setOptionNama = (kategori) => {
    setMessage({});

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
          return data.push({
            value: row,
            label: row,
          });
        });
        setDataNama(data);
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

  const showFilter = handleSubmit((data) => {
    setMessage({});
    let body = {
      category: data.category,
      name: data.name,
      lang: JSON.parse(sessionStorage.getItem("config")).lang,
    };
    setDataGrid(null);
    setDataFilter(null);
    setDataButton(null);
    axios
      .post(`${global.config.API_URL}general/report/viewer/listfilter`, body)
      .then((res) => {
        let dataRes = res.data.data;
        let filter = [];
        dataRes.filter.map((row) => {
          if (row.datatype === "select") {
            let dataSelect = [];
            let idselect = row.selectid;
            let filterData = dataRes.selectvalues.find(({ id }) => {
              return id === idselect;
            });
            filterData.listvalues.map((selectRow) => {
              return dataSelect.push({
                value: selectRow.id,
                label: selectRow.caption,
              });
            });
            return filter.push({
              name: row.id,
              label: row.caption,
              type: row.datatype,
              values: dataSelect,
            });
          } else if (row.datatype === "date") {
            let defaultValue = moment(row.defaultvalue).format("yyyy-MM-DD");
            return filter.push({
              name: row.id,
              label: row.caption,
              type: row.datatype,
              defaultvalue: defaultValue,
            });
          } else {
            return filter.push({
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
          if (value === true) {
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
  });

  const formatingData = (data) => {
    let dataForm = {};
    dataForm.category = data.category;
    dataForm.name = data.name;
    delete data.category;
    delete data.name;
    dataForm.listfilter = data;
    dataForm.lang = JSON.parse(sessionStorage.getItem("config")).lang;

    return dataForm;
  };

  const viewdata = handleSubmit((data) => {
    setMessage({});
    const result = formatingData(data);
    axios
      .post(`${global.config.API_URL}general/report/viewer/data`, result)
      .then((res) => {
        if (res.data.rescode === 0) {
          let columns = [];
          let gridData = [...res.data.data.data];
          res.data.data.columns.map((row) => {
            gridData.map((grid) => {
              if (row.columntype === "bool") {
                return (grid[row.key] =
                  grid[row.key] === true
                    ? JsonLaporanUmum.column_type_bool_true
                    : JsonLaporanUmum.column_type_bool_true);
              } else if (row.columntype === "money") {
                return (grid[row.key] =
                  configApp.formatData.money.prefix +
                  parseInt(grid[row.key])
                    .toFixed(configApp.formatData.money.decimal)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
              } else if (row.columntype === "date") {
                return (grid[row.key] = moment(
                  grid[row.key],
                  configApp.formatData.date
                ));
              } else if (row.columntype === "number") {
                return (grid[row.key] = parseInt(grid[row.key])
                  .toFixed(0)
                  .replace(
                    `/(\d)(?=(\d{${configApp.formatData.number.split}})+(?!\d))/g`,
                    "$1,"
                  ));
              }
            });
            return columns.push({ key: row.key, label: row.name });
          });
          let data = {
            columns: columns,
            data: res.data.data.data,
          };
          setDataGrid(data);
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
    console.log("View Report");
  });

  const downloadxlsx = handleSubmit((data) => {
    setMessage({});
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
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsonLaporanUmum.message_downloadxlsx,
            type: messageJson.toatscolor_success,
            active: true,
          });
          console.log("Downlaod XLSX");
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
  });

  const downloadcsv = handleSubmit((data) => {
    setMessage({});
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
          setMessage({
            title: messageJson.toatsheader_success,
            body: JsonLaporanUmum.message_downloadcsv,
            type: messageJson.toatscolor_success,
            active: true,
          });
          link.click();
          console.log("Downlaod CVS");
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
  });

  return (
    <>
      <Toast message={message} />

      {dataKategori && JsonLaporanUmum && (
        <CRow>
          <CCol xl="12">
            <CCard>
              <CCardHeader>
                <h6>{JsonLaporanUmum.form}</h6>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <Input
                    ref={control}
                    typefield="select"
                    label={JsonLaporanUmum.category}
                    name="category"
                    id="category"
                    md="6"
                    lg="6"
                    options={dataKategori}
                    defaultValue=""
                    eventSelect={setOptionNama}
                  />
                  <Input
                    ref={control}
                    typefield="select"
                    label={JsonLaporanUmum.name}
                    name="name"
                    id="name"
                    md="6"
                    lg="6"
                    options={dataNama}
                    defaultValue=""
                    eventSelect={showFilter}
                  />
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
                  <CCol>
                    {dataFilter.length === 0 ? (
                      <h5 align="center">{JsonLaporanUmum.filter_empty}</h5>
                    ) : (
                      ""
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  {dataFilter.map((row, key) => (
                    <>
                      {row.type === "select" ? (
                        <Input
                          ref={control}
                          typefield="select"
                          label={row.label}
                          name={row.name}
                          id={row.name}
                          md="4"
                          lg="4"
                          options={row.values}
                          defaultValue=""
                        />
                      ) : (
                        ""
                      )}
                      {row.type === "number" ? (
                        <Input
                          ref={register}
                          typefield="number"
                          type="number"
                          label={row.label}
                          name={row.name}
                          defaultValue={row.defaultvalue}
                          id={row.name}
                          md="4"
                          lg="4"
                        />
                      ) : (
                        ""
                      )}
                      {row.type === "text" ? (
                        <Input
                          ref={register}
                          typefield="text"
                          type="text"
                          label={row.label}
                          name={row.name}
                          defaultValue={row.defaultvalue}
                          id={row.name}
                          md="4"
                          lg="4"
                        />
                      ) : (
                        ""
                      )}
                      {row.type === "date" ? (
                        <Input
                          ref={register}
                          typefield="date"
                          type="date"
                          label={row.label}
                          name={row.name}
                          defaultValue={row.defaultvalue}
                          id="journaldate"
                          md="4"
                          lg="4"
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </CRow>
              </CCardBody>
              <CCardFooter>
                {dataButton.map((row, key) => (
                  <>
                    {row.name === "viewdata" ? (
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

                    {row.name === "downloadxlsx" ? (
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

                    {row.name === "downloadcsv" ? (
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
                  itemsPerPage={50}
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
