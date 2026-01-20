import React from "react";
import OverlayProvider from "../components/overlay/OverlayHost";
import AlertProvider from "./alertDialogPlugin/alertDialogPlugin";
import LoadingProvider from "./commonPlugin/loadingPlugin";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <OverlayProvider>
      <AlertProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </AlertProvider>
    </OverlayProvider>
  );
}

export { AlertProvider, LoadingProvider };
