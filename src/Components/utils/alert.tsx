import { Alert } from "@mui/material";

interface AlertProps {
  message: string;
  severity?: "success" | "info" | "warning" | "error";
}

export const showAlert = (message: string, severity: AlertProps["severity"] = "info") => {
  return (
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  );
};