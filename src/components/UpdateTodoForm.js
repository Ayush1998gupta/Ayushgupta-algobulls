import { Input, Select, DatePicker, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import TagInput from './Inputs';
import { useState } from 'react';



const UpdateTodoForm = ({
  setUpdateTodoDetails,
  updateTodoDetails,
  todoList,
  setTodoList,
  openModel,
  setOpenModel,
}) => {
  const [formValidity, setFormValidity] = useState(true);
  const [openModelTag, setOpenModelTag] = useState(false);
  const [title, setTitle] = useState(updateTodoDetails.title);
  const [desc, setDesc] = useState(updateTodoDetails.description);
  const [date, setDate] = useState(updateTodoDetails.due_date);
  const [tags, setTags] = useState();
  const [status, setStatus] = useState(updateTodoDetails.status);

  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');
  const [dateError, setDateError] = useState('');


  const onChangeHandlerTitle = (e) => {
    if (e.target.value.length > 100 || e.target.value.length === 0) {
      setFormValidity(false);
      setTitleError('Enter Valid Title');
    } else {
      setTitleError('');
      setFormValidity(true);
    }
    setTitle(e.target.value);
  };
  const onChangeHandlerDesc = (e) => {
    if (e.target.value.length > 100 || e.target.value.length === 0) {
      setFormValidity(false);
      setDescError('Enter Valid Description');
    } else {
      setDescError('');
      setFormValidity(true);
    }
    setDesc(e.target.value);
  };
  const onChangeHandlerDate = (date, dateString) => {
    if (new Date(dateString) < new Date()) {
      setDateError('Enter Valid Date');
      setFormValidity(false);
    } else {
      setDateError('');
      setFormValidity(true);
    }
    setDate(dateString);
  };
  const onclick = () => {
    setUpdateTodoDetails(null);
  };

  const submitHandler = () => {
    if (formValidity) {
      const index = todoList.findIndex(
        (element) => element.key === updateTodoDetails.key
      );

      todoList[index].title = title;
      todoList[index].due_date = date;
      todoList[index].tag = tags;
      todoList[index].status = status;
      todoList[index].description = desc;

      setTodoList(
        todoList.map((todo) => {
          if (todo.key === updateTodoDetails.key) {
            return {
              ...todo,
              title: title,
              due_date: date,
              tag: tags,
              status: status,
              description: desc,
            };
          }

          return todo;
        })
      );

      onclick();
    }
  };

  return (
    <Modal
      title="Edit Task"
      centered
      closable={false}
      open={openModel}
      destroyOnClose={true}
      onOk={() => setOpenModel(false)}
      footer={null}
      width="400px"
    >
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <div>Title</div>
            <Input
              value={title}
              onChange={onChangeHandlerTitle}
              max={100}
              placeholder="Title"
            />
            <div>{titleError}</div>
          </div>
          <div>
            <div>Discription</div>
            <TextArea
              value={desc}
              onChange={onChangeHandlerDesc}
              rows={4}
              max={100}
              placeholder="Discription"
            />
            <div>{descError}</div>
          </div>
          <div>
            <div>Due Date</div>
            <DatePicker
              onChange={onChangeHandlerDate}
              renderExtraFooter={() => 'extra footer'}
            />
            <div>{dateError}</div>
          </div>
          <div>
            <div onClick={() => setOpenModelTag(true)}>Add Tags</div>
            <TagInput
              setOpenModelTag={setOpenModelTag}
              openModelTag={openModelTag}
              setTags={setTags}
              tags={tags}
            />
          </div>
          <div>
            <div>Status</div>
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              defaultValue="Open"
            >
              <Select.Option value="Open">Open</Select.Option>
              <Select.Option value="Working">Working</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
              <Select.Option value="Overdue">Overdue</Select.Option>
            </Select>
          </div>
          <button type="summit">Edit</button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateTodoForm;
