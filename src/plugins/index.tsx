import React from "react";
import OverlayProvider from "../components/overlay/OverlayHost";
import ToastProvider from "../components/basic/_common/Toast";
import AlertProvider from "./alertDialogPlugin/alertDialogPlugin";
import LoadingProvider from "./commonPlugin/loadingPlugin";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ToastProvider>
      <OverlayProvider>
        <AlertProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </AlertProvider>
      </OverlayProvider>
    </ToastProvider>
  );
}

export { AlertProvider, LoadingProvider };
