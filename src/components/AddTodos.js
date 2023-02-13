import { Modal } from 'antd';

export default function AddTodos(props) {
  return (
    <>
      <div className="container1" onClick={() => props.setOpen(true)}>
        <input
          type="text"
          value="Enter an activity..."
          id="item"
        />

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
        open={props.open}
        onOk={() => props.setOpen(false)}
        onCancel={() => props.setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
}
