import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, NavLink, useParams, useHistory} from 'react-router-dom';
import { useState } from "react";

const memberList = ["David", "Micheal", "John"];
const taskAssignToMembersList = [
  {
    id: 1,
    member: "David",
    task: "Task1",
    taskDetails : "Task 1 details"
  },
  {
    id: 2,
    member: "David",
    task: "Task2",
    taskDetails : "Task 2 details"
  },
  {
    id: 3,
    member: "Micheal",
    task: "Task3",
    taskDetails : "Task 3 details"
  },
  {
    id: 4,
    member: "David",
    task: "Task4",
    taskDetails : "Task 4 details"
  }
];

function App() {

  const Header = () => {
    return(<header style={{backgroundColor: "steelblue"}}>
      <div style={{display: "inline-flex"}}>
        <h1 style={{color: "White", marginLeft: "10px"}}>Task Management</h1>
        <div style={{position: "absolute", right: "0"}}>
          <NavLink to="/" activeClassName="is-active" className="button" exact={true}>Home</NavLink>
          <NavLink to="/tasks" activeClassName="is-active" className="button">Tasks</NavLink>
          <NavLink to="/members" activeClassName="is-active" className="button">Members</NavLink>
        </div>
      </div>
    </header>)
  }

  const Home = () => {
    return(
    <div style={{ marginLeft: "50px"}}>
        <h2>Welcome to Task Management System</h2>
        <p>Dummy Text </p>
        <h2>Get Started</h2>
        <Link to='/tasks'><button className="button">Check tasks</button></Link>
        <br></br>
        <Link to='/members'><button className="button">Check members</button></Link>
    </div>
    )
  }
  
  const Members = () => {
    let memberListWithTask = [];
    taskAssignToMembersList.forEach(item => {
      let obj = memberListWithTask.find(obj => obj.member === item.member);
      obj ? obj.taskCount++ : memberListWithTask.push({'member':item.member, 'tasks': item.task, 'taskCount': 1});
    });

    memberList.forEach(item => {
      let member = memberListWithTask.find(member => member.member === item);
      if(!member){
        memberListWithTask.push({member: item, taskCount: 0});
      }
    })

    return(
      <div style={{ marginLeft: "50px"}}>
        <h1>All Members</h1>
        <h2>Here are all members: </h2>
        <Link to='/member/addnew'><button className="button">Add New</button></Link>
        <ul>
          {memberListWithTask.map((val, key) => {
            return(
              <li>
                  <div style={{marginTop: "30px"}}>
                    <div>
                      <Link 
                      to={'/view/member/'+`${val.member}`} 
                      style={{marginLeft: "10px", fontSize: "20px"}}>{val.member}</Link>
                      <span style={{marginLeft: "90px", fontSize: "20px"}}>{val.taskCount}</span>
                    </div>
                  </div>
              </li>
            )})}
        </ul>
      </div>
    )
  }

  const Tasks = () => {
    return(
      <div style={{ marginLeft: "30px"}}>
        <h1>All Tasks</h1>
        <p>All the tasks are here</p>
        <h2>Here are all tasks: </h2>
        <Link to="/task/addnew"><button className="button">Add New</button></Link>
        {taskAssignToMembersList.map((val, key) => {
            return (
              <div style={{marginTop: "30px"}}>
                <div>
                  <Link 
                  to={'/view/task/'+`${val.id}`} 
                  style={{marginLeft: "50px", fontSize: "20px"}}>{val.task}</Link>
                  <Link 
                  to={'/view/member/'+`${val.member}`} 
                  style={{marginLeft: "100px", fontSize: "20px"}}>{val.member}</Link>
                </div>
                </div>
            )})}
      </div>
    )
  }

  const AddNewMember = () => {
    const [newMember, setNewMember] = useState('');
    return(
      <div>
        <h2 style={{ marginLeft: "10px"}}>Add Member</h2>
        <input
          type="text"
          placeholder="Name"
          className="input"
          onChange={(event) => {
            setNewMember(event.target.value);
          }}
        />
        <br></br>
        <Link to="/members">
          <button className="button" style={{backgroundColor: "grey"}}>Cancel</button>
        </Link>
        <Link to="/members">
          <button className="button" onClick={()=>memberList.push(newMember)}>Submit</button>
        </Link>
      </div>
    )
  }

  const AddNewTask = () => {
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');
    const [newTaskDetails, setNewTaskDetails] = useState('');
    return(
      <div style={{ marginLeft: "50px"}}>
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Task"
          className="input"
          onChange={(event) => {
            setNewTaskName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Task Details"
          className="input"
          onChange={(event) => {
            setNewTaskDetails(event.target.value);
          }}
          style={{ padding: "50px"}}
        />
        <br></br>
        <select 
        className="select-css" 
        onChange={(event) => {setNewTaskAssignee(event.target.value)}}>
          {memberList.map((val)=>
          <option value={val}>{val}</option>)}
        </select>
        <Link to="/tasks">
          <button className="button" style={{backgroundColor: "grey"}}>Cancel</button>
        </Link>
        <Link to='/tasks'>
          <button 
          className="button" 
          onClick={
            () => taskAssignToMembersList.push({'id': taskAssignToMembersList.length+1, 
                                                'member': newTaskAssignee, 
                                                'task': newTaskName, 
                                                'taskDetails': newTaskDetails})
          }>Submit</button>
        </Link>
      </div>
    )
  }

  const ViewMembers = () => {
    const {id} = useParams();
    const history = useHistory();
    const tasks = [];
    taskAssignToMembersList.forEach(taskItem => {
      taskItem.member === id ? tasks.push({"id": taskItem.id,"task": taskItem.task}) : tasks.push(null);
    })
    return(
      <div style={{marginLeft: "70px", marginTop: "50px"}}>
        <Link onClick={()=>{history.goBack()}} style={{fontSize: "25px"}}>Back</Link>
        <Link to={'/edit/member/'+`${id}`}>
          <button 
          className="button" 
          style={{backgroundColor: "grey", marginLeft: "800px", marginTop: "10px"}}>Edit</button>
        </Link>
        <button className="button" style={{backgroundColor: "red"}} onClick={ () => {
          if (window.confirm('Are you sure you want to delete?')) {
            const index = memberList.indexOf(id);
            if (index > -1) {
              memberList.splice(index, 1);
            }
            history.goBack();
          }}}>Delete</button>
        <h2 style={{ marginBottom: "20px"}}>{id}</h2>
        <h2 style={{ marginBottom: "20px"}}>Tasks:</h2>
        {tasks.map((val) => {
          if(val){
            return(
              <div style={{marginTop: "30px"}}>
                <div>
                  <Link to={'/view/task/'+`${val.id}`} style={{fontSize: "25px"}}>{val.task}</Link>
                </div>
              </div>
            )
          }
          else{
            return null;
          }
        })}
      </div>
    )
  }

  const ViewTasks = () => {
    const {id} = useParams();
    const history = useHistory();
    const index = taskAssignToMembersList.findIndex(i => parseInt(i.id) === parseInt(id));
    return(
      <div style={{marginLeft: "100px", marginTop: "50px"}}>
        <Link onClick={()=>{history.goBack()}} style={{ fontSize: "25px"}}>Back</Link>
        <Link to={'/edit/task/'+`${id}`}>
          <button 
          className="button" 
          style={{backgroundColor: "grey", marginLeft: "800px", marginTop: "10px"}}>Edit</button>
        </Link>
        <button className="button" style={{backgroundColor: "red"}} onClick={ () => {
          if (window.confirm('Are you sure you want to delete?')) {
            if (index > -1) {
              taskAssignToMembersList.splice(index, 1);
            }
            history.goBack();
          }}}>Delete</button>
        <h2 style={{ marginBottom: "20px"}}>{taskAssignToMembersList[index].task}</h2>
        <p style={{fontSize: "20px"}}>{taskAssignToMembersList[index].taskDetails}</p>
      </div>
    )
  }  

  const EditMember = () => {
    const {id} = useParams();
    var memberIndex = memberList.indexOf(id);
    const [newName, setNewName] = useState(memberList[memberIndex]);
    return(
      <div>
        <h2 style={{ marginLeft: "10px"}}>Update Member</h2>
        <input
          defaultValue={id}
          type="text"
          placeholder="Name"
          className="input"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <br></br>
        <Link to="/members">
          <button className="button" style={{backgroundColor: "grey"}}>Cancel</button>
        </Link>
        <Link to="/members">
          <button 
            className="button" 
            onClick={() => {
              memberList[memberIndex] = newName;
              taskAssignToMembersList.forEach(taskItem => {
                if(taskItem.member === id){
                  taskItem.member=newName;
                }
              })
            } }>Submit
          </button>
        </Link>
      </div>
    )
  }

  const EditTask = () => {
    const {id} = useParams();
    const index = taskAssignToMembersList.findIndex(i => parseInt(i.id) === parseInt(id));
    const [taskName, setTaskName] = useState(taskAssignToMembersList[index].task);
    const [taskAssignee, setTaskAssignee] = useState(taskAssignToMembersList[index].member);
    const [taskDetails, setTaskDetails] = useState(taskAssignToMembersList[index].taskDetails);
    return(
      <div style={{ marginLeft: "50px"}}>
        <h2>Update Task</h2>
        <input
          type="text"
          defaultValue={taskAssignToMembersList[index].task}
          placeholder="Task"
          className="input"
          onChange={(event) => {
            setTaskName(event.target.value);
          }}
        />
        <input
          type="text"
          defaultValue={taskAssignToMembersList[index].taskDetails}
          placeholder="Task Details"
          className="input"
          onChange={(event) => {
            setTaskDetails(event.target.value);
          }}
          style={{ padding: "50px"}}
        />
        <br></br>
        <select className="select-css" onChange={(event) => {setTaskAssignee(event.target.value)}}>{memberList.map((val)=><option value={val}>{val}</option>)}</select>
        <Link to="/tasks">
          <button className="button" style={{backgroundColor: "grey"}}>Cancel</button>
        </Link>
        <Link to="/tasks">
          <button className="button" 
          onClick={() => {
              taskAssignToMembersList[index].task = taskName;
              taskAssignToMembersList[index].taskDetails = taskDetails;
              taskAssignToMembersList[index].member = taskAssignee;
            } 
          }>Submit
          </button>
        </Link>
      </div>
    )
  }

  return (
    <Router>
        <Header />
        <div>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/members"  component={Members}/>
          <Route path="/tasks"  component={Tasks}/>
          <Route path="/member/addnew"  component={AddNewMember}/>
          <Route path="/task/addnew"  component={AddNewTask} />
          <Route path="/view/member/:id" exact component={ViewMembers} />
          <Route path="/edit/member/:id" exact component={EditMember} />
          <Route path="/view/task/:id" component={ViewTasks}/>
          <Route path="/edit/task/:id" exact component={EditTask} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
