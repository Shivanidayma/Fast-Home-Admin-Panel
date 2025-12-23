import React from "react";
import { Button, Grid, Typography, Paper,} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RestaurantForm from "./RestaurantForm";
import RestaurantMarginForm from "./RestaurantMarginForm";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { handleRestaurantCreation } from "../../slice/createRestaurantSlice";
import { Database } from "lucide-react";

const CreateRestaurant = () => {
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: {
      restaurant_admin: {
        email: "",
        user_name: "",
        password: "",
        restaurant: {
          name: "",
          registration_date: "",
          phone: "",
          lock_menu: false,
          blob_id: "",
          restaurant_address: {
            street: "",
            address1: "",
            address2: "",
            zip_code: "",
            state: "",
            city: "",
            state_code: "",
          },
          margins: {
            restaurant_percent: "",
            customer_percent: "",
          },
          open_hours: [
            { day: "Sunday", start_time: "", end_time: "", split_hours: [{ start_at: "", end_at: "" }] },
            { day: "Monday", start_time: "", end_time: "", split_hours: [{ start_at: "", end_at: "" }] },
            { day: "Tuesday", start_time: "", end_time: "", split_hours: [{ start_at: "", end_at: "" }] },
            { day: "Wednesday", start_time: "", end_time: "", split_hours: [{ start_at: "", end_at: "" }] },
            { day: "Thursday", start_time: "", end_time: "", split_hours: [{ start_at: "", end_at: "" }] },
            { day: "Friday", start_time: "", end_time: "", split_hours: [{ start_at: "", end_at: "" }] },
            { day: "Saturday", start_time: "", end_time: "", split_hours: [{ start_at: "", end_at: "" }] }
          ],
        },
      },
    },
  });

  const { handleSubmit } = methods; 
  const onSubmit = async (data) => {
    dispatch(handleRestaurantCreation({ data, selectedDocuments }));
  };

  const styles = {
    paper: {
      padding: "20px",
      width: "100%",
      height: "95vh",
      margin: "auto",
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
    },
    form: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "16px",
    },
  };
  return (
      <FormProvider {...methods}>
      <Typography variant="h5" gutterBottom>
        Create Restaurant
      </Typography>
      <Paper elevation={3} style={styles.paper}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <Grid container spacing={2} style={{ flexGrow: 1, overflow: "hidden" }}>
            {/* Left Section - Restaurant Info */}
            <RestaurantForm selectedDocuments={selectedDocuments} setSelectedDocuments={setSelectedDocuments} />
            {/* Right Section - Margins & Timings */}
            <RestaurantMarginForm />
          </Grid>

          {/* Buttons */}
          <div style={styles.buttonContainer}>
            <Button type="button" variant="contained" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </div>
        </form>
        </Paper>
        </FormProvider>
  );
};

export default CreateRestaurant;
