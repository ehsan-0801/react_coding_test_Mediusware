import React, { useReducer, useState } from 'react';

const initialState = [
]
function reducer(state, action) {
    switch (action.type) {
        case "Add":
            return [...state, action.payload]
        default:
            return state;
    }

}

const Problem1 = () => {
    const [show, setShow] = useState('all');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [state, dispatch] = useReducer(reducer, initialState);


    const handleClick = (val) => {
        // console.log(val);
        setShow(val);
        filterTask(val);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setName("");
        setStatus("");
        const task = {
            id: Date.now(),
            name,
            status,
        }

        dispatch({ type: "Add", payload: task })
    }
    const customSort = (a, b) => {
        const statusOrder = { "active": 1, "completed": 2 };
        const statusA = statusOrder[a.status] || 3;
        const statusB = statusOrder[b.status] || 3;
        return statusA - statusB;
    };
    const filterTask = () => {
        switch (show) {
            case 'all':
                return [...state].sort(customSort);
            case 'active':
                return state.filter(task => task.status === 'active'); // Show active tasks only
            case 'completed':
                return state.filter(task => task.status === 'completed'); // Show completed tasks only
            default:
                return state;
        }
    };
    const filteredTasks = filterTask();


    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={ handleSubmit } className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" value={ name } onChange={ (e) => setName(e.target.value) } className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input type="text" value={ status } onChange={ (e) => setStatus(e.target.value.toLowerCase()) } name='status' className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={ `nav-link ${show === 'all' && 'active'}` } type="button" onClick={ () => handleClick('all') }>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={ `nav-link ${show === 'active' && 'active'}` } type="button" onClick={ () => handleClick('active') }>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={ `nav-link ${show === 'completed' && 'active'}` } type="button" onClick={ () => handleClick('completed') }>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filteredTasks.map((task) => (
                                <tr key={ task.id }>
                                    <td>{ task.name }</td>
                                    <td>{ task.status }</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;