import React from 'react';
import { faTasks, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import Frame from './Components/Frame';
import Navigation from './Components/Navigator/Navigation';
import Task from './Components/Task';
import Form from './Components/Form';
import taskApi from './api';
import lang from './lang';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
            typeFilter: 'no-concluded'
        };
    };

    getTasks() {
        taskApi.get(tasks => {
            this.setState({ taskList: tasks });
        });
    }

    updateTask(task) {
        task.isConcluded = true;
        taskApi.update(task, this.getTasks.bind(this));
    }


    removeTask(id) {
        taskApi.remove(id, this.getTasks.bind(this));
    }

    createTask(task) {
        taskApi.create(task, this.getTasks.bind(this), alert);
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        return (
            <>
                <Frame />
                <Navigation
                    initRoute="main"
                    screens={[
                        {
                            icon: faTasks,
                            route: 'main',
                            component: (
                                <Task
                                    typeFilter={this.state.typeFilter}
                                    setTypeFilter={(type) => this.setState({ typeFilter: type })}
                                    data={this.state.taskList}
                                    onReload={this.getTasks.bind(this)}
                                    onUpTask={this.updateTask.bind(this)}
                                    onDelete={this.removeTask.bind(this)}
                                    lang={lang[0]}
                                />
                            )
                        },
                        {
                            icon: faPlusCircle,
                            route: 'create-task',
                            component: (
                                <Form 
                                    lang={lang[1]} 
                                    onCreate={this.createTask.bind(this)}
                                />
                            )
                        }
                    ]}
                />
            </>
        );
    };

}