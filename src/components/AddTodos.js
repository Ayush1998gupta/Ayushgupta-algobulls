import { useState } from 'react';
import { Input, Select, DatePicker, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import TagInput from './Inputs'

export default function AddTodos({ todoList, setTodoList }) {
  const [formValidity, setFormValidity] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openModelTag, setOpenModelTag] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState();
  const [status, setStatus] = useState('Open');
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
  const onChangeHandlerDate = (dateString) => {
    if (new Date(dateString) < new Date()) {
      setDateError('Enter Valid Date');
      setFormValidity(false);
    } else {
      setDateError('');
      setFormValidity(true);
    }
    setDate(dateString);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formValidity) {
      setTodoList([
        ...todoList,
        {
          timestamp: new Date().toUTCString(),
          title,
          description: desc,
          due_date: date,
          tag: tags,
          status,
        },
      ]);

      setTitle('');
      setDesc('');
      setDate('');
      setTags([]);
      setStatus('Open');
      setOpenModel(false);
    }
  };

  return (
    <>
      <div className="container1" onClick={() => setOpenModel(true)}>
        <input type="text" value="Enter an activity..." id="item" />
        <button id="add" type="">
          <img
            src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
            alt=""
          />
        </button>
      </div>
      <Modal
        title="Add Task"
        centered
        open={openModel}
        onOk={() => setOpenModel(false)}
        onCancel={() => setOpenModel(false)}
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
            <button type="summit">Summit</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
