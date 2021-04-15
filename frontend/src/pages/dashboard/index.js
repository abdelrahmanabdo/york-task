import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';

export default function Dashboard() {
  const [data, setData] = useState([]);

  /**
   * Get dashboard classrooms
   * 
   * @private
   */
  const getData = async () => {
    await api
      .get(endpoints.classrooms)
      .then(res => setData(res.data));
  }

  useEffect(() => getData(), []);

  return (
    <div className="container dashboard-wrapper">
      <h3>Classrooms</h3>
      {
        data.length ?
        data.map((classroom) => (
          <Link className="classroom-row" to={`/classrooms/${classroom.id}`}>
            {classroom.name}
          </Link>
        ))
        :
        <h4>No Classrooms !!</h4>
      }
    </div>
  )
}
