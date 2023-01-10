import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import { BaseMovie, FormVariant, Movie } from "../../types";
import { DEFAULT_MOVIE, STATUSES } from "../../utils/constants";
import styles from "./Form.module.scss";
import validate from "./helper";
import Modal from "../Modal";
import Dialog from "../Dialog";
import useHandleClose from "../../hooks/useHandleClose";
import InputForm from "./Input";
import Spinner from "../Spinner";
import EditorTextarea from "./TextArea";
import { MovieListResponse } from "../../types/movie";
import { api } from "../../features/movie/service";
import EditorSelect from "./FormSelect";

type PropsFromRedux = {
  movies: MovieListResponse;
};

type OwnProps = {
  variant: FormVariant;
};

type FormProps = PropsFromRedux & OwnProps;

const { ERROR, SUCCESS, INITIAL } = STATUSES;

const MovieForm: React.FC<FormProps> = ({
  movies,
  variant: { successMessage, legend, apiMethod },
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie: BaseMovie = id
    ? movies?.data.find((item) => item.id === Number(id)) || DEFAULT_MOVIE
    : DEFAULT_MOVIE;

  const handleClose = useHandleClose();

  const [addMovie, { isLoading: isSuccess }] = api.useCreateMovieMutation();
  const [editMovie, { isLoading: isEditSuccess }] =
    api.useUpdateMovieMutation();

  const handleSubmit = React.useCallback(
    (fields: BaseMovie, { setStatus }: FormikHelpers<BaseMovie>) => {
      if (legend === "Add movie") {
        const addMoviePayload = {
          ...fields,
          genres: [fields?.genres],
        };
        addMovie({
          ...addMoviePayload,
        });

        if (isSuccess) {
          setStatus(SUCCESS);
        } else {
          setStatus(ERROR);
        }

        navigate("/search");
        return;
      }

      editMovie({
        ...fields,
      });
      if (isEditSuccess) {
        setStatus(SUCCESS);
      } else {
        setStatus(ERROR);
      }
      navigate("/search");
    },
    [addMovie, editMovie]
  );

  return (
    <React.Fragment>
      <Formik
        initialValues={movie}
        validate={validate}
        onSubmit={handleSubmit}
        initialStatus={INITIAL}
      >
        {({ isValid, isSubmitting, status: { success, error } }) =>
          success ? (
            <Modal message={successMessage} onClose={handleClose} />
          ) : (
            <Dialog onClose={handleClose}>
              <Form className={isSubmitting ? styles.form_blur : styles.form}>
                <fieldset name="movie editor" className={styles.form__fieldset}>
                  <legend className={styles.form__legend}>{legend}</legend>
                  <div className={styles.form__top}>
                    <div className={styles.form__left}>
                      <InputForm
                        type="text"
                        name="title"
                        label="TITLE"
                        placeholder="Title"
                        className={styles.field__textInput}
                      />
                      <InputForm
                        type="text"
                        name="poster_path"
                        label="MOVIE URL"
                        placeholder="https://"
                        className={styles.field__textInput}
                      />
                      <EditorSelect
                        label="GENRE"
                        placeholder="Select Genre"
                        name="genres"
                      />
                    </div>

                    <div className={styles.form__right}>
                      <InputForm
                        type="date"
                        name="release_date"
                        label="RELEASE DATE"
                        className={styles.field__datePicker}
                      />
                      <InputForm
                        type="number"
                        name="vote_average"
                        label="RATING"
                        placeholder="7.8"
                        className={styles.field__number}
                      />
                      <InputForm
                        type="number"
                        name="runtime"
                        label="RUNTIME"
                        placeholder="minutes"
                        className={styles.field__number}
                      />
                    </div>
                  </div>
                  <EditorTextarea
                    cols={30}
                    rows={10}
                    name="overview"
                    label="OVERVIEW"
                    placeholder="Movie description"
                    className={styles.field__textarea}
                  />
                </fieldset>
                <div className={styles.form__buttons}>
                  {error && (
                    <span className={styles.form__error}>
                      Oops! An error occurred. The changes cannot be saved.
                    </span>
                  )}
                  <input
                    type="reset"
                    className={styles.form__resetBtn}
                    value="RESET"
                  />
                  <button
                    type="submit"
                    className={
                      !isValid
                        ? styles.form__submitBtn_disabled
                        : styles.form__submitBtn
                    }
                  >
                    SUBMIT
                  </button>
                </div>
              </Form>
              {isSubmitting && <Spinner fullscreen />}
            </Dialog>
          )
        }
      </Formik>
    </React.Fragment>
  );
};

export default React.memo(MovieForm);
