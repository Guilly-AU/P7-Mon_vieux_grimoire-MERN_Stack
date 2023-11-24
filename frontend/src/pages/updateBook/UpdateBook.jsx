import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './UpdateBook.module.css';
import BookForm from '../../components/Books/BookForm/BookForm';
import BackArrow from '../../components/BackArrow/BackArrow';
import { getBook } from '../../lib/common';
import { APP_ROUTES } from '../../utils/constants';
import { useUser } from '../../lib/customHooks';
import bookAdd from '../../images/book_add.jpg';

function UpdateBook() {
  const [book, setBook] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { connectedUser, auth, userLoading } = useUser();
  const [created, setCreated] = useState(false);
  useEffect(() => {
    if (!userLoading) {
      if (!connectedUser || !auth) {
        navigate(APP_ROUTES.SIGN_IN);
      }
    }
  }, [userLoading]);
  useEffect(() => {
    async function getItem() {
      const data = await getBook(params.id);
      if (data) {
        setBook(data);
      }
    }
    getItem();
  }, []);

  return (
    <div className="content-container">
      <BackArrow />
      <div className={styles.Container}>
        {!created ? (
          <>
            <h1>Edit your book</h1>
            <p>You can edit all fields except the given rating</p>
            <BookForm book={book} validate={setCreated} />
          </>
        ) : (
          <div className={styles.Created}>
            <h1>Thanks!</h1>
            <p>Your book has been successfully updated</p>
            <img src={bookAdd} alt="Livre mis à jour" />
            <Link to="/" className="button">Back to the homepage</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateBook;
