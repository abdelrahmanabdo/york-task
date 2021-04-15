import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import api from '../../config/api';
import endpoints from '../../config/endpoints';
import './style.scss';
import Student from '../../assets/icons/student.png';
import Modal from '../../components/modal';

export default function Classroom() {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [resources, setResources] = useState([]);
  const [assignmentData, setAssignmentData] = useState({});
  const [showModal, setShowModal] = useState(false);

  /**
   * Validate assignment post data
   * @private
   */
  const validate = () => {
    if (!assignmentData.name) return NotificationManager.error('Please insert assignment name first'), false;
    if (!assignmentData.resources) return NotificationManager.error('Please select assignment first'), false;
    return true;
  }

  /**
   * Get classroom students.
   * 
   * @private
   */
  const getData = async () => {
    await api
      .get(`${endpoints.classrooms}/${id}`)
      .then(res => setData(res.data));
  }

  /**
   * Get classroom students.
   * 
   * @private
   */
  const getResources = async () => {
    await api
      .get(endpoints.resources)
      .then(res => setResources(res.data));
  }

  /**
   * When Teacher clicks assign button.
   * 
   * @private
   */
  const onAssign = async () => {
    if (!validate()) return;
    setShowModal(false);
    const date = new Date().getTime();

    await api
      .post(endpoints.assignment, {...assignmentData, date, students: data})
      .then((res) => NotificationManager.success(res.data.message || 'Added successfully'))
      .catch((error) => NotificationManager.error(error.response.data.message || 'An error happened'))
  }

  useEffect(() => {
    getData();
    getResources();
  }, []);

  return (
    <div className="container classroom-wrapper">
      <h3>Students</h3>
      <button
        className="assign-button"
        onClick={() => setShowModal(true)}
      >
        Assign homework
      </button>
      {
        data.length ?
        data.map((student) => (
          <Link
            key={student.id}
            className="classroom-row" 
            to={`/students/${student.id}`}>
          <img 
            src={student.avatar ?? Student} 
            className="avatar" />  {`${student.firstname} ${student.lastname}`}
          </Link>
        ))
        :
        <h4>No Students !!</h4>
      }
      
      {
        showModal &&
        <Modal 
          isVisible={showModal}
          headerTitle={'Assign Classroom Homework'}
          submitButtonText={'Confirm'}
          onClose={() => setShowModal(false)}
          onSubmit={onAssign}
        >
          <div className='row'>
            <label className="col col-2 font-weight-bold">Homework: </label>
            <DropdownButton 
              onSelect={(value) => setAssignmentData({
                  ...assignmentData,
                  resources: value
                })}
              title="Select Homework" 
              className="col col-9"> 
              {
                resources.map((resource) => <Dropdown.Item key={resource.id} eventKey={resource.id} as="button">{resource.type}</Dropdown.Item>)
              }
            </DropdownButton>
          </div>
          <div className='row mt-4'>
            <label className="col col-2  font-weight-bold">Name: </label>
            <input 
              className="col-9"
              placeholder={'Please enter homework name'}
              onChange = {
                (val) => setAssignmentData({
                  ...assignmentData,
                  name: val.target.value
                })
              }
            />
          </div>
        </Modal>
      }
    </div>
  )
}
