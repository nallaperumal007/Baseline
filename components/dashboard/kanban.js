import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import kanbanHelper from "../../helper/timeMgmt/tsTask";
import userHelper from "../../helper/user";
import styles from './kanban.module.css';
import TsTask from "../../helper/timeMgmt/tsTask";
import Ddhelper from "../../helper/pfmMgmt/pfConstOption";


class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        columns: props.columns,
        tasks: {}
      },
      initialData: {
        columns: props.columns,
        tasks: {}
      },
      newTaskTitle: "",
      arr_kanban: [],
      arr_users: [],
      newTaskDescription: "",
      isAddTaskFormVisible: false,
      activeColumn: "",
      newColumnTitle: "", 
      headerColor: "#000000",
      tnnt_id: 7,
      assigned_to:"",
      priority:""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    const username = global.localStorage.username;
    const tnnt_id = global.localStorage.tnnt_id;

    if (username != null && username !== undefined) {
        this.setState({
            username: username,
            tnnt_id: tnnt_id,
        });

        this.getKanbanBoardDetails();
        this.getUsers();

    }
}

getUsers() {
  const { tnnt_id } = this.state;
  
  const filter = {
      tnnt_id: tnnt_id
  };

  userHelper.getAll(filter)
      .then((data) => {
          const arr_user_data = [];
          for (let i = 0; i < data.length; i++) {
            arr_user_data.push(data[i].account_name);
          }
          this.setState({ arr_users: arr_user_data }); 
      })

}

updateTask({ id, wfs }) {

  TsTask.updateTaskStatus(id+1, wfs)
      .then((data) => {
          console.log(data);
      })
      .catch((err) => {
          console.log(err);
      })
}

getKanbanBoardDetails() {
  const {
      tnnt_id,
      data,
      initialData,
      assigned_to,
      priority
  } = this.state;

  const filter = {
      tnnt_id: tnnt_id,
      assigned_to: assigned_to,
      prio: priority
  };

  kanbanHelper.getKanbanDet(filter)
      .then((tasksData) => {
          this.setState({ arr_kanban: tasksData });
          const newData = { ...initialData };
          
          Object.values(newData.columns).forEach(column => {
            column.taskIds = [];
          });    

          Object.keys(tasksData).forEach(taskId => {
            const task = tasksData[taskId];
            const columnId = task.wfs.toString(); 
            if (newData.columns[columnId]) {
                newData.columns[columnId].taskIds.push(taskId);
                newData.tasks[taskId] = {
                      id: taskId,
                      name: task.name,
                      descr: task.descr,
                      wfs: task.wfs,
                      assigned_to: task.assigned_to,
                  };
              }
          });
          this.setState({ data: newData });
      })
      .catch((err) => {
          console.log(err);
      });
}

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const { data } = this.state;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      };


      this.updateTask({ id: Number(data.tasks[draggableId].id), wfs:Number(finish.id) });
      this.setState({ data: newData });
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };

      this.updateTask({ id: Number(data.tasks[draggableId].id), wfs:Number(finish.id) });
      this.setState({ data: newData });
    }
  };

  handleColumnTitleChange = (event, columnId) => {
    const { value } = event.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        columns: {
          ...prevState.data.columns,
          [columnId]: {
            ...prevState.data.columns[columnId],
            title: value
          }
        }
      }
    }));
  };

  handleTaskRemoval = (taskId) => {
    this.setState(prevState => {
      const newData = { ...prevState.data };
      const columns = { ...newData.columns };
      Object.keys(columns).forEach(columnId => {
        columns[columnId].taskIds = columns[columnId].taskIds.filter(id => id !== taskId);
      });
      delete newData.tasks[taskId];
      newData.columns = columns;
      return { data: newData };
    });
  };

  handleChange(event){
    const { name, value } = event.target;
    const state = {
      [name]: value
    }
    this.setState(state);
  }

  handleFilterChange = () => {
    this.getKanbanBoardDetails();
  }

  kanbanFilters = () => {
    const { assigned_to, priority, arr_users } = this.state;
    return (
      <div className={styles.mainDiv}>
        <div className={styles.componentDiv}>
        <label className={styles.componentLabelDiv}>
          <p>Assigned To:</p>
          <select name="assigned_to" className={styles.selectFiled} value={assigned_to} onChange={this.handleChange}>
            <option value="">Select...</option>
            {
              arr_users.map((user, index) => <option key={index} value={user}>{user}</option>)
            }
          </select>
        </label>
      </div>
      <div className={styles.componentDiv}>
        <label className={styles.componentLabelDiv}>
          <p>Priority:</p>
          <select name="priority" className={styles.selectFiled} value={priority} onChange={this.handleChange}>
            <option value="">Select...</option>
            <option value="p1">P1</option>
            <option value="p2">P2</option>
            <option value="p3">P3</option>
          </select>
        </label>
      </div>
      <div className={styles.button}>
        <button className={`button`} onClick={this.handleFilterChange}>Submit</button>
        </div>
      </div>
    )
  }

  render() {
    const { data, arr_kanban } = this.state;
    console.log("data",data);
    return (
      <div>
        {this.kanbanFilters()}
        <h1 style={{ textAlign: "center" }}>Kanban Board</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={{ display: "flex" }}>
            {Object.values(data.columns).map((column, columnIndex) => (
              <React.Fragment key={column.id}>
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        flex: 1,
                        margin: "8px",
                        padding: "8px",
                        borderRadius: "4px",
                        backgroundColor: "lightgrey",
                        minWidth: "100px",
                        height: "fit-content",
                        paddingTop:"10px",
                        paddingBottom:"5px",
                        paddingLeft:"18px",
                       
                        
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <input
                          disabled
                          type="text"
                          name={`columnTitle-${column.id}`}
                          value={column.title}
                          onChange={(event) => this.handleColumnTitleChange(event, column.id)}
                          style={{ marginBottom: "8px", minHeight: "40px", width: "90%",marginTop:"0.5px",marginLeft:"5px", padding: "8px", borderRadius: "5px", border: "1px solid #ddd", fontWeight: "bold" ,fontSize:'20px'}}
                        />
                        {/* <span onClick={() => this.cancelColumn(column.id)} style={{ cursor: "pointer", fontSize: "24px" }}>✖</span> */}
                      </div>
                      {column.taskIds.map((taskId, index) => {
                        const task = data.tasks[taskId];
                        return (
                          <Draggable
                            key={task?.id}
                            draggableId={task?.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                             <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: "16px",
                                  marginBottom: "8px",
                                  minHeight: "50px",
                                  backgroundColor: snapshot.isDragging
                                    ? "white"
                                    : "white",
                                  color: "black",
                                  borderRadius: "5px",
                                  ...provided.draggableProps.style
                                }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <div>
                                    <h3>{task?.name}</h3>
                                    <p>{task?.descr}</p>
                                    <p>{task?.assigned_to}</p>

                                  </div>
                                  <span onClick={() => this.handleTaskRemoval(task?.id)} style={{ cursor: "pointer", fontSize: "19px" }}>✖</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </React.Fragment>
            ))}
          </div>
        </DragDropContext>
      </div>
    );
  }
  
}

KanbanBoard.defaultProps = {
  columns: {
    "1": {
      id: "1",
      title: "       Yet to Start ",
      taskIds: [],
      assigned_to: "Assigned To",
    },
    "2": {
      id: "2",
      title: "       In Progress ",
      taskIds: []
    },
    "3": {
      id: "3",
      title: "        For Review",
      taskIds: []
    },
    "4": {
      id: "4",
      title: "         On Hold ",
      taskIds: []
    },
    "5": {
        id: "5",
        title: "         Blocked",
        taskIds: []
      },
      "6": {
        id: "6",
        title: "           Done",
        taskIds: []
      },
      "7": {
        id: "7",
        title: "          Discard",
        taskIds: []
      }
  },
  tasks: {
    "task-1": { id: "task-1", title: "Task 1", description: "Task 1 Description", assigned_to: "Aaaa bbbb" },
    "task-2": { id: "task-2", title: "Task 2", description: "Task 2 Description" , assigned_to: "Aaaa bbbb" },
    "task-3": { id: "task-3", title: "Task 3", description: "Task 3 Description" , assigned_to: "Aaaa bbbb" },
    "task-4": { id: "task-4", title: "Task 4", description: "Task 4 Description", assigned_to: "Aaaa bbbb"  }
  }
};

export default KanbanBoard;
