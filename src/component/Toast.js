import React from "react";
import { CToast, CToastBody, CToastHeader, CToaster } from "@coreui/react";

let toasts = [{ position: "top-right", autohide: 3000 }];

let toasters = (() => {
  return toasts.reduce((toasters, toast) => {
    toasters[toast.position] = toasters[toast.position] || [];
    toasters[toast.position].push(toast);
    return toasters;
  }, {});
})();

const Toats = (message) => {
  return (
    <>
      {Object.keys(toasters).map((toasterKey) => (
        <CToaster position={toasterKey} key={"toaster" + toasterKey}>
          {toasters[toasterKey].map((toast, key) => {
            return (
              <CToast
                key={"toast" + key}
                show={message.message.active}
                autohide={toast.autohide}
                fade={toast.fade}
              >
                <CToastHeader
                  className={message.message.type}
                  closeButton={toast.closeButton}
                >
                  {message.message.title}
                </CToastHeader>
                <CToastBody>{message.message.body}</CToastBody>
              </CToast>
            );
          })}
        </CToaster>
      ))}
    </>
  );
};

export default Toats;
