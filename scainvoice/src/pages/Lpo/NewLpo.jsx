import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Box, Paper, Typography } from "@mui/material";

export default function CreateInvoice() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          height: 400,
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Create New LPO
          </h1>
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                Padding: "6px",
                height: "10%",
                width: "20%",
                borderRadius: "6px",
              }}
              type="submit"
            >
              Submit
            </button>
          </div>
          <div
            style={{
              width: "50%",
            }}
          >
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                Padding: "6px",
                height: "10%",
                width: "30%",
                borderRadius: "6px",
              }}
              type="button"
            >
              Clear Form
            </button>
          </div>
        </Box>
      </form>
    </Box>
  );
}
