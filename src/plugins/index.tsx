import React from "react";
import AlertProvider from "./alertDialogPlugin/alertDialogPlugin";
import LoadingProvider from "./commonPlugin/loadingPlugin";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AlertProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </AlertProvider>
  );
}

export { AlertProvider, LoadingProvider };
