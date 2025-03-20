import React from "react";
import { useFormContext } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import api from "../../api/api";
import {
  FormControl,
  FormLabel,
  TextField,
  Grid,
  Typography,
} from "@mui/material";

const styles = {
  scrollableSection: {
    height: "80vh",
    overflowY: "auto",
    paddingRight: "5px",
    paddingLeft: "5px",
  },
};

function RestaurantForm() {
  const { register } = useFormContext();
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      // Prepare FormData
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await api.post("/blob_creation", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("File Upload Response:", response.data);
        // setValue("restaurant.blob_id", response.data.blob_id); // Store the uploaded file ID
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const CustomTextField = ({ label, name, type = "text", register }) => (
    <FormControl fullWidth margin="normal">
      <FormLabel sx={{ fontWeight: "bold", color: "#000" }}>{label}</FormLabel>
      <TextField
        type={type}
        {...register(name)}
        variant="outlined"
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
        }}
      />
    </FormControl>
  );

  return (
    <Grid item xs={6} style={{ paddingRight: "10px" }}>
      <div style={styles.scrollableSection}>
        <Typography variant="h6" gutterBottom>
          Restaurant Profile
        </Typography>
        {/* Profile Image Upload */}
        <div className="flex flex-col justify-center items-center w-full h-40">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400 mb-2" />
          )}

          {/* Hidden file input for image upload */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Button to trigger file input */}
          <button
            type="button"
            className="px-4 py-2 text-black rounded-md hover:bg-black-600 transition"
            onClick={() => document.getElementById("profileImage").click()}

          >
            Add Profile Image
          </button>
        </div>

        {/* Restaurant Basic Details */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextField
              label="Restaurant Name"
              name="restaurant_admin.restaurant.name"
              register={register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="Registration Date"
              name="restaurant_admin.restaurant.registration_date"
              type="date"
              register={register}
            />
          </Grid>
        </Grid>

        <CustomTextField
          label="Owner Name"
          name="restaurant_admin.user_name"
          register={register}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextField
              label="Phone Number"
              name="restaurant_admin.restaurant.phone"
              register={register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="Email"
              name="restaurant_admin.email"
              register={register}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextField
              label="Password"
              name="restaurant_admin.password"
              type="password"
              register={register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="Confirm Password"
              name="restaurant_admin.confirm_password"
              type="password"
              register={register}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
      
</Grid>


        {/* Address Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextField
              label="Address"
              name="restaurant_admin.restaurant.restaurant_address.address1"
              register={register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="Country"
              name="restaurant_admin.restaurant.restaurant_address.country"
              register={register}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextField
              label="State"
              name="restaurant_admin.restaurant.restaurant_address.state"
              register={register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="City"
              name="restaurant_admin.restaurant.restaurant_address.city"
              register={register}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextField
              label="Street"
              name="restaurant_admin.restaurant.restaurant_address.street"
              register={register}
            />
            ={" "}
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="Zip Code"
              name="restaurant_admin.restaurant.restaurant_address.zip_code"
              type="number"
              register={register}
            />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default RestaurantForm;
