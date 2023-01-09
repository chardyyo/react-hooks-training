import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import useHandleClose from "../../../hooks/useHandleClose";
import Dialog from "../../Dialog";
import styles from "./Delete.module.scss";
import Spinner from "../../Spinner";
import { api } from "../../../features/movie/service";

const INITIAL_VALUES = {};

const DeleteForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = useHandleClose();

  const [deleteMovie, { isSuccess }] = api.useDeleteMovieMutation();

  const handleSubmit = (_: {}, { setStatus }: FormikHelpers<{}>) => {
    deleteMovie(id as string);
    if (isSuccess) {
      setStatus(true);
    }
    navigate("/search");
  };

  return (
    <Dialog onClose={handleClose}>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        {({ isSubmitting, status: error }) => (
          <>
            <div
              className={
                isSubmitting
                  ? styles.deleteFormWrap_blur
                  : styles.deleteFormWrap
              }
            >
              <h1 className={styles.deleteFormTitle}>DELETE MOVIE</h1>
              <Form className={styles.deleteForm}>
                <span className={styles.deleteForm__prompt}>
                  Are you sure you want to delete this movie?
                </span>
                {error && (
                  <span className={styles.deleteForm__error}>
                    Oops! An error occurred. The movie was not deleted.
                  </span>
                )}
                <button type="submit" className={styles.submitBtn}>
                  CONFIRM
                </button>
              </Form>
            </div>
            {isSubmitting && <Spinner fullscreen />}
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default DeleteForm;
