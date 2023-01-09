import React from "react";
import { useParams } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import useAbortRequest from "../../../hooks/useAbortRequest";
import useHandleClose from "../../../hooks/useHandleClose";
import API from "../../../services/api";
import Dialog from "../../Dialog";
import styles from "./Delete.module.scss";
import Spinner from "../../Spinner";

interface DeleteFormProps {
  onSubmit: (id: number) => void;
}

const INITIAL_VALUES = {};

const DeleteForm: React.FC<DeleteFormProps> = ({ onSubmit }) => {
  const { controller, request } = API.delete;
  useAbortRequest(controller);

  const { id } = useParams();

  const handleClose = useHandleClose();

  const handleSubmit = (_: {}, { setStatus }: FormikHelpers<{}>) =>
    request(Number(id))
      .then(() => {
        onSubmit(Number(id));
        handleClose();
      })
      .catch(() => setStatus(true));

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
