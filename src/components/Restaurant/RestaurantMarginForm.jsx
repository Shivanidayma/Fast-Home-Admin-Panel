import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  TextField,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const styles = {
  scrollableSection: {
    height: "80vh",
    overflowY: "auto",
    paddingRight: "5px",
    paddingLeft: "5px",
  },
  inputField: {
    backgroundColor: "#f0f0f0", // Light grey background
    borderRadius: "8px", // Rounded corners
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
    "& .MuiInputBase-root": {
      padding: "2px", // Adds internal padding for better spacing
    },
    marginBottom: "2px", // Adds space between input fields
  },
};

function RestaurantMarginForm() {
  const { register, watch } = useFormContext();
  const open_hours = watch("restaurant_admin.restaurant.open_hours");

  return (
    <Grid item xs={6} className="p-4 bg-gray-100 rounded-lg shadow-md">
      <Typography variant="h6" gutterBottom className="text-black-1000">
        Margins & Timings
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ fontWeight: "bold", color: "#000" }}>
              Margin From Restaurant (%)
            </FormLabel>
            <TextField
              type="number"
              {...register(`restaurant_admin.restaurant.margins.restaurant_percent`)}
              variant="outlined"
              sx={styles.inputField}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ fontWeight: "bold", color: "#000" }}>
              Margin From Customer (%)
            </FormLabel>
            <TextField
              type="number"
              {...register(`restaurant_admin.restaurant.margins.customer_percent`)}
              variant="outlined"
              sx={styles.inputField}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Typography
        variant="subtitle1"
        sx={{
          mt: 3,
          mb: 2,
          p: 1,
          fontWeight: "bold",
          color: "#000",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        Opening Timings
      </Typography>

      {open_hours.map((day, index) => (
  <Grid container spacing={2} key={day.day} alignItems="center" className="mt-2">
    {/* Day Label */}
    <Grid item xs={2}>
      <Typography className="text-gray-600 font-semibold" sx={styles.inputField}>
        {day.day}
      </Typography>
    </Grid>

    {/* Opening Time */}
    <Grid item xs={2}>
      <TextField
        type="time"
        {...register(`restaurant_admin.restaurant.open_hours.${index}.start_time`)}
        variant="outlined"
        size="small"
        sx={styles.inputField}
      />
    </Grid>

    {/* Closing Time */}
    <Grid item xs={2}>
      <TextField
        type="time"
        {...register(`restaurant_admin.restaurant.open_hours.${index}.end_time`)}
        variant="outlined"
        size="small"
        sx={styles.inputField}
      />
    </Grid>

    {/* Split Hours Section */}
    {day.split_hours.map((split, splitIndex) => (
      <React.Fragment key={`${day.day}-split-${splitIndex}`}>
        <Grid item xs={2}>
          <TextField
            type="time"
            {...register(`restaurant_admin.restaurant.open_hours.${index}.split_hours.${splitIndex}.start_at`)}
            variant="outlined"
            size="small"
            sx={styles.inputField}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="time"
            {...register(`restaurant_admin.restaurant.open_hours.${index}.split_hours.${splitIndex}.end_at`)}
            variant="outlined"
            size="small"
            sx={styles.inputField}
          />
        </Grid>
      </React.Fragment>
    ))}
  </Grid>
))}

      <FormControlLabel
        control={<Checkbox {...register("preventMenu")} />}
        label="Prevent Menu From Updating / Adding"
        className="mt-4 text-gray-700"
      />
    </Grid>
  );
}

export default RestaurantMarginForm;
