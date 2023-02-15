import React, { useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider, Input, Form, Button, Select, Modal } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const TodoPro = () => {
   const [currentDate, setCurrentDate] = useState(dayjs().format('h:m:a-DD/MM/YY'));
   const [status, setStatus] = useState('open');
   const [isEditing, setIsEditing] = useState(false);
   const [editingTodo, setEditingTodo] = useState(null);

   console.log(currentDate);
   const [dataSource, setDataSource] = useState([
      {
         id: 1,
         timeStamp: currentDate,
         title: 'Google meet',
         description: 'Meeting with Hr in google meet',
         status: status,
      },
   ]);
   const column = [
      {
         key: '1',
         title: 'Timestamp',
         dataIndex: 'timeStamp',
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
         title: 'Status',
         dataIndex: 'status',
      },
      {
         key: '5',
         title: 'Tag',
         dataIndex: 'tag',
      },
      {
         key: '6',
         title: 'Actions',
         render: (record) => {
            return (
               <>
                  <EditOutlined onClick={() => onEditTodo(record)} />
                  <DeleteOutlined onClick={() => deleteTodo(record)} style={{ marginLeft: 12, color: 'red' }} />
               </>
            );
         },
      },
   ];
   const handleStatusChange = (value) => {
      setStatus(value);
   };
   const onFinish = (e) => {
      setCurrentDate(dayjs().format('h:m:a-DD/MM/YY'));
      setStatus(e.status);
      console.log(e.status);
      const reandomId = parseInt(Math.random() * 1000);
      const newTodo = {
         id: reandomId,
         timeStamp: currentDate,
         title: e.title,
         description: e.description,
         status: status,
      };
      setDataSource((pre) => {
         return [...pre, newTodo];
      });
   };
   const deleteTodo = (record) => {
      Modal.confirm({
         title: 'Are you sure, you want to delete this todo record?',
         okText: 'Yes',
         okType: 'danger',
         onOk: () => {
            setDataSource((pre) => {
               return pre.filter((todo) => todo.id !== record.id);
            });
         },
      });
   };
   const onEditTodo = (record) => {
      setIsEditing(true);
      setEditingTodo({ ...record });
   };
   const resetEditing = () => {
      setIsEditing(false);
      setEditingTodo(null);
   };
   return (
      <div>
         <Form
            style={{ maxWidth: '600px' }}
            labelCol={{
               span: 4,
            }}
            onFinish={onFinish}
         >
            <div>
               <Title level={2} style={{ textAlign: 'left', marginLeft: '100px' }}>
                  {' '}
                  Add Todo
               </Title>
            </div>
            <Form.Item label="Title" name="title">
               <Input placeholder="Title"></Input>
            </Form.Item>
            <Form.Item label="Description" name="description">
               <Input placeholder="Description"></Input>
            </Form.Item>
            <Form.Item label="Status" name="status">
               <Select
                  defaultValue="open"
                  onChange={handleStatusChange}
                  options={[
                     {
                        value: 'open',
                        label: 'Open',
                     },
                     {
                        value: 'working',
                        label: 'Working',
                     },
                     {
                        value: 'done',
                        label: 'Done',
                     },
                     {
                        value: 'overdue',
                        label: 'Overdue',
                     },
                  ]}
               />
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  {' '}
                  Add Todo
               </Button>
            </Form.Item>
         </Form>
         <ConfigProvider locale={enUS}>
            <ProTable columns={column} dataSource={dataSource}></ProTable>
         </ConfigProvider>
         <Modal
            title="Edit todo"
            open={isEditing}
            okText="Save"
            onCancel={() => resetEditing()}
            onOk={() => {
               setDataSource((pre) => {
                  return pre.map((todo) => {
                     if (todo.id === editingTodo.id) {
                        return editingTodo;
                     } else {
                        return todo;
                     }
                  });
               });
               resetEditing();
            }}
         >
            <Input
               value={editingTodo?.title}
               onChange={(e) =>
                  setEditingTodo((pre) => {
                     return { ...pre, title: e.target.value };
                  })
               }
            />
            <Input
               value={editingTodo?.description}
               onChange={(e) =>
                  setEditingTodo((pre) => {
                     return { ...pre, description: e.target.value };
                  })
               }
            />
         </Modal>
      </div>
   );
};

export default TodoPro;
