import React, { forwardRef } from "react";
import { CCol, CFormGroup, CLabel, CInputCheckbox } from "@coreui/react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const darkMode = configApp.darktheme;

const Input = forwardRef(
  (
    {
      sm = "12",
      md = "12",
      lg = "12",
      typefield,
      label,
      options = [],
      selectDefaultValue = {},
      eventSelect = null,
      eventCheckbox = null,
      ...props
    },
    ref
  ) => {
    const selectChange = (data) => {
      if(eventSelect !== null) {
        eventSelect(data)
      }
    };

    const checkBoxChange = (value, checked) => {
      if(eventCheckbox !== null){
        eventCheckbox(value, checked)
      }
    };

    return (
      <>
        {typefield === "text" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <input className="form-control" type="text" ref={ref} {...props} />
              </CCol>
            </CFormGroup>
          </CCol>
        )}

        {typefield === "email" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <input className="form-control" type="email" ref={ref} {...props} />
              </CCol>
            </CFormGroup>
          </CCol>
        )}

        {typefield === "password" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <input className="form-control" type="password" ref={ref} {...props} />
              </CCol>
            </CFormGroup>
          </CCol>
        )}

        {typefield === "date" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <input className="form-control" type="date" ref={ref} {...props} />
              </CCol>
            </CFormGroup>
          </CCol>
        )}

        {typefield === "number" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <input className="form-control" type="number" ref={ref} {...props} />
              </CCol>
            </CFormGroup>
          </CCol>
        )}

        {typefield === "select" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <Controller
                  control={ref}
                  {...props}
                  render={({ onChange }) => (
                    <Select
                      placeholder="..."
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: "4px",
                        colors: {
                          ...theme.colors,
                          neutral0: darkMode
                            ? "#2a2b36"
                            : theme.colors.neutral0,
                          neutral80: darkMode ? "#fff" : theme.colors.neutral80,
                          primary25: darkMode
                            ? theme.colors.primary75
                            : theme.colors.primary25,
                        },
                      })}
                      defaultValue={selectDefaultValue}
                      options={options}
                      onChange={(e) => {
                        onChange(e.value);
                        selectChange(e.value);
                      }}
                    />
                  )}
                />
              </CCol>
            </CFormGroup>
          </CCol>
        )}

        {typefield === "checkbox" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <CFormGroup variant="custom-checkbox" inline>
                  <Controller
                    name="normaldebit"
                    control={ref}
                    {...props}
                    render={(props) => (
                      <CInputCheckbox
                        onChange={(e) => props.onChange(e.target.checked)}
                        onClick={(e) =>
                          checkBoxChange(props.value, e.target.checked)
                        }
                        checked={props.value}
                      />
                    )}
                  />
                </CFormGroup>
              </CCol>
            </CFormGroup>
          </CCol>
        )}

        {typefield === "textarea" && (
          <CCol sm={sm} md={md} lg={lg}>
            <CFormGroup row>
              <CCol>
                <CLabel>{label}</CLabel>
              </CCol>
              <CCol xs="12" xl="12">
                <textarea ref={ref} className="form-control" {...props}>
                </textarea>
              </CCol>
            </CFormGroup>
          </CCol>
        )}
      </>
    );
  }
);

export default Input;
