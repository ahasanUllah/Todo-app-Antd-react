import React, { useState } from 'react';
import { Table } from 'antd';

const Todo = () => {
   const [dataSource, setDataSource] = useState([
      {
         id: 1,
         title: 'Google meet',
         description: 'Meeting with Hr in google meet',
      },
   ]);
   const column = [
      {
         key: '1',
         title: 'Timestamp',
         dataIndex: 'id',
      },
      {
         key: '2',
         title: 'Title',
         dataIndex: 'title',
      },
      {
         key: '3',
         title: 'Description',
         dataIndex: 'description',
      },
      {
         key: '4',
         title: 'Due date',
         dataIndex: 'due-date',
      },
      {
         key: '5',
         title: 'Tag',
         dataIndex: 'tag',
      },
   ];
   return (
      <div>
         <header className="App-header">
            <Table columns={column} dataSource={dataSource}></Table>
         </header>
      </div>
   );
};

export default Todo;
