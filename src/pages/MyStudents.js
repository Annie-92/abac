import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import { Table } from 'antd';
import axios from 'axios';
import withProtectedPage from '../withProtectedPage';
import { API_URL } from '../constants/apiConstants';


const Students = (props) => {
  const [studentsData, setStudentsData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL + "GetStudents.php", {
          headers: {
            token: `${token}`
          }
        });
        setStudentsData(response.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (redirect to login page, display error message, etc.)
      }
    };

    fetchStudentsData();
  }, []); // Empty dependency array means this runs once on mount

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Student Ranking',
      dataIndex: 'ranking',
      key: 'ranking',
      sorter: (a, b) => a.ranking - b.ranking,
    },
    {
      title: 'Quiz Average',
      dataIndex: 'quizAverage',
      key: 'quizAverage',
      sorter: (a, b) => a.quizAverage - b.quizAverage,
    },
    {
      title: '# Of Quiz Taken',
      dataIndex: 'quizNbr',
      key: 'quizNbr',
      sorter: (a, b) => a.quizNbr - b.quizNbr,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar setLoggedIn={props.setLoggedIn} />
      </div>
      <div className="dashboard__content">
        <div className="db_content">
          <h2>My Students</h2>
          <div className="sep"></div>

          <Table
            columns={columns}
            dataSource={studentsData} // Use the fetched data here
            onChange={onChange}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 10,
              total: studentsData.length, // Update total to reflect fetched data
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            showSorterTooltip={{
              target: 'sorter-icon',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withProtectedPage(Students);