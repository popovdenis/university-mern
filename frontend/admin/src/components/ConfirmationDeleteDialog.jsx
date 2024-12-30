import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

function ConfirmationDialog({ open, title, contentText, onClose, onConfirm, confirmText, cancelText }) {
   return (
       <Dialog open={open} onClose={onClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
             <p>{contentText}</p>
          </DialogContent>
          <DialogActions>
             <Button onClick={onClose} color="inherit">
                {cancelText || "Cancel"}
             </Button>
             <Button onClick={onConfirm} color="error" variant="contained">
                {confirmText || "Delete"}
             </Button>
          </DialogActions>
       </Dialog>
   );
}

export default ConfirmationDialog;