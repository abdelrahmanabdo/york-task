import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import api from '../../config/api';
import endpoints from '../../config/endpoints';
import './style.scss';
import StudentIImg from '../../assets/icons/student.png';
import Modal from '../../components/modal';

export default function Student() {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  /**
   * Get student.
   * 
   * @private
   */
  const getData = async () => {
    await api
      .get(`${endpoints.students}/${id}`)
      .then(res => setData(res.data));
  }

  /**
   * Get books.
   * 
   * @private
   */
  const getBooks = async () => {
    await api
      .get(endpoints.resources)
      .then(res => setBooks(res.data));
  }

  /**
   * Validate assignment post data
   * @private
   */
  const validate = () => {
    if (!postData.book_id) return NotificationManager.error('Please select book first'), false;
    return true;
  }

  /**
   * When Teacher clicks assign button.
   * 
   * @private
   */
  const onAssign = async () => {
    if (!validate()) return;
    const date = new Date().getTime();
    setPostData({...postData, date});

    setShowModal(false);
    await api
      .post(endpoints.studentAssignBook, {...postData, date, student_id: id})
      .then((res) => NotificationManager.success(res.data.message || 'Added successfully'))
      .catch((error) => NotificationManager.error(error.response.data.message || 'An error happened'))
  }

  useEffect(() => {
    getData();
    getBooks();
  }, []);

  return (
    <div className="container profile-wrapper">
      <img src={data?.avatar ?? StudentIImg} className="student-avatar" />
      <h3>{data?.firstname + ' ' + data?.lastname}</h3>
      <span>{data?.email}</span>
      <button
        className="assign-button"
        onClick={() => setShowModal(!showModal)}
      >
        Assign
      </button>
      {
        showModal &&
        <Modal 
          isVisible={showModal}
          headerTitle={'Assign student Book'}
          submitButtonText={'Confirm'}
          onClose={() => setShowModal(false)}
          onSubmit={onAssign}
        >
          <div className='row'>
            <label className="col col-2 font-weight-bold">Books: </label>
            <DropdownButton 
              onSelect={(value) => setPostData({ book_id: value })}
              title="Select Book" 
              className="col col-9"> 
              {
                books.map((book) => <Dropdown.Item key={book.id} eventKey={book.id} >{book.type}</Dropdown.Item>)
              }
            </DropdownButton>
          </div>
        </Modal>
      }
    </div>
  )
}
