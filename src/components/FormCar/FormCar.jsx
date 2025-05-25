import { ErrorMessage, Field, Form, Formik } from "formik";

import { Slide, toast } from "react-toastify";
import { object, string, date } from "yup";
import s from "./FormCar.module.css";
const RentCarForm = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };
  const validationSchema = object({
    name: string().trim().required("Name is required"),
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    bookingDate: date().required("Booking date is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    toast(`Thank you, ${values.name} our manager will contact you shortly`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
    resetForm();
  };

  return (
    <div className={s.commonFormWrapper}>
      <div className={s.commonFormText}>
        <p className={s.mainHeader}>Book your car now</p>
        <p className={s.description}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.formWrapper}>
          <Field className={s.formField} name="name" placeholder="Name*" />
          <ErrorMessage name="name" component="p" className={s.error} />

          <Field className={s.formField} name="email" placeholder="Email*" />
          <ErrorMessage name="email" component="p" className={s.error} />

          <ErrorMessage name="bookingDate" component="p" className={s.error} />
          <Field className={s.formField} name="comment" placeholder="Comment" />
          <button>sent</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RentCarForm;
