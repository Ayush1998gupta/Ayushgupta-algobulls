import { Input, Table } from 'antd';
import React, { useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useState } from 'react';
import UpdateTodoForm from './UpdateTodoForm';

const TodoTable = ({ todoList, setTodoList }) => {
  const [dataSource, setDataSource] = useState(todoList);
  const [searchText1, setSearchText1] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const [updateTodoDetails, setUpdateTodoDetails] = useState(null);

  useEffect(() => {
    setDataSource(todoList);
  }, [todoList]);

  const deleteTodo = (key) => {
    const newDatasource = todoList.filter((el) => el.key !== key);
    console.log(newDatasource);

    setTodoList(newDatasource);
  };

  const updateFunction = (key) => {
    const todoToBeUpdated = dataSource.find((element) => element.key === key);
    setUpdateTodoDetails(todoToBeUpdated);
  };

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      render: (timestamp) => (
        <div>
          <div>{timestamp.slice(0, 16)}</div>
          <div>{timestamp.slice(18, 30)}</div>
        </div>
      ),
      sorter: (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (_) => <div>{_}</div>,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },

    {
      title: 'Description',
      dataIndex: 'description',
      render: (_) => <div>{_}</div>,
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      sorter: (a, b) => new Date(b.due_date) - new Date(a.due_date),
      render: (due_date) => (due_date ? <div>{due_date}</div> : <div>--</div>),
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      render: (data) => {
        return (
          <ul>
            {data ? (
              data.map((tag, index) => (
                <li key={index}>
                  <span>{tag}</span>
                </li>
              ))
            ) : (
              <li>
                <span>No Tags</span>
              </li>
            )}
          </ul>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Open', value: 'Open' },
        { text: 'Done', value: 'Done' },
        { text: 'Working', value: 'Working' },
        { text: 'Overdue', value: 'Overdue' },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },

    {
      title: 'Options',
      dataIndex: 'key',
      render: (key) => {
        return (
          <div>
            <div title="Delete" onClick={() => deleteTodo(key)}>
              <MdDelete size={15} />
            </div>
            <div
              title="Edit"
              onClick={() => {
                updateFunction(key);
                setOpenModel(true);
              }}
            >
              <MdEdit size={15} />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <main>
      {updateTodoDetails ? (
        <UpdateTodoForm
          setTodoList={setTodoList}
          openModel={openModel}
          setOpenModel={setOpenModel}
          todoList={todoList}
          setUpdateTodoDetails={setUpdateTodoDetails}
          updateTodoDetails={updateTodoDetails}
        />
      ) : (
        <></>
      )}
      <div>
        <Input
          onChange={(e) => {
            setSearchText1(e.target.value);
          }}
          placeholder="Search"
          addonBefore="Search"
          style={{ borderRadius: '0.25rem', padding: '0 1rem' }}
        />
        <div>
          <Table
            pagination={{ position: ['bottomCenter'] }}
            dataSource={dataSource.filter((todo) => {
              if (searchText1 === '') {
                return todo;
              } else if (todo.title.includes(searchText1)) {
                return todo;
              }
            })}
            columns={columns}
          />
        </div>
      </div>
    </main>
  );
};

export default TodoTable;
