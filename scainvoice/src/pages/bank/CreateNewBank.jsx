import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import axios from "axios";

export default function CreateNewBank() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [kesAcc, setKesAcc] = useState("");
  const [usdAcc, setUsdAccount] = useState("");
  const [poundAcc, setPoundAcc] = useState("");
  const [swift, setSwift] = useState("");

  const onSubmit = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_bank", {
          bankName,
          bankBranch,
          kesAcc,
          usdAcc,
          poundAcc,
          swift,
        });
        alert("Bank added successfully!");
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };

  const handleClearForm = () => {
    // Reset the form fields
    setBankName("");
    setBankBranch("");
    setKesAcc("");
    setUsdAccount("");
    setPoundAcc("");
    setSwift("");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          New Bank
        </h1>
      </div>

      <div>
          <label htmlFor="bankName">Bank Name: </label>
          <input
            type="text"
            id="bankName"
            placeholder="Eneer Bank name"
            {...register("bankName", { required: true })}
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          {errors.bankName && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="bankBranch">Bank Branch: </label>
          <input
            type="text"
            id="bankBranch"
            placeholder="Enter bank branch"
            {...register("bankBranch", { required: true })}
            value={bankBranch}
            onChange={(e) => setBankBranch(e.target.value)}
          />
          {errors.bankBranch && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="kesAcc">KES Account: </label>
          <input
            type="text"
            id="kesAcc"
            placeholder="Enter KES Account"
            {...register("kesAcc", { required: true })}
            value={kesAcc}
            onChange={(e) => setKesAcc(e.target.value)}
          />
          {errors.kesAcc && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="usdAcc">USD Account: </label>
          <input
            type="text"
            id="usdAcc"
            placeholder="Enter USD Account"
            {...register("usdAcc", { required: true })}
            value={usdAcc}
            onChange={(e) => setUsdAccount(e.target.value)}
          />
          {errors.usdAcc && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="poundAcc">Pounds Account: </label>
          <input
            type="text"
            id="poundAcc"
            placeholder="Enter Pound Account"
            {...register("poundAcc", { required: true })}
            value={poundAcc}
            onChange={(e) => setPoundAcc(e.target.value)}
          />
          {errors.poundAcc && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="swift">Swift Code: </label>
          <input
            type="text"
            id="swift"
            placeholder="Enter Swift Code"
            {...register("swift", { required: true })}
            value={swift}
            onChange={(e) => setSwift(e.target.value)}
          />
          {errors.swift && <span>This field is required</span>}
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
              backgroundColor: "green",
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
              backgroundColor: "green",
              color: "white",
              Padding: "6px",
              height: "10%",
              width: "30%",
              borderRadius: "6px",
            }}
            type="button"
            onClick={handleClearForm}
          >
            Clear Form
          </button>
        </div>
      </Box>
    </form>
  );
}
