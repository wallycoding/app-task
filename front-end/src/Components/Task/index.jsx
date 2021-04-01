import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faReceipt, faCheckCircle, faSyncAlt, faBolt, faTrash, faIdBadge } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../IconButton';
import CheckBox from '../CheckBox';
import './index.css';

export default props => {

    const [search, setSearch] = useState('');
    const { typeFilter, setTypeFilter } = props;

    const filters = {
        session(tasks) {
            switch (typeFilter) {
                case 'no-concluded':
                    return tasks.filter(task => !task.isConcluded);
                case 'show-all':
                    return tasks;
                case 'only-concluded':
                    return tasks.filter(task => task.isConcluded);
            }
        },
        search(tasks) {
            if (!search.trim()) return tasks;
            return tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
        },
        sort(tasks) {
            return tasks.sort((a, b) => {
                const x = Number(new Date(a.date));
                const y = Number(new Date(b.date));
                return x > y ? -1 : 1;
            });
        }
    }

    const filterList = (tasks, filters) => {
        let modifiedTasks = tasks;
        filters.forEach(filter => {
            modifiedTasks = filter(modifiedTasks);
        });
        return modifiedTasks;
    }

    const { data, lang } = props;

    return (
        <div className="task-container">
            <header>
                <h1>{lang.listOfTask}</h1>
            </header>
            <div className="task-search">
                <div className="task-search-box">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        value={search}
                        onChange={({ target: { value } }) => setSearch(value)}
                        placeholder={lang.search}
                    />
                </div>
            </div>
            <div className="task-tab">
                <div className="task-tab-left">
                    <FontAwesomeIcon icon={faReceipt} />
                    <span>{lang.options}</span>
                </div>
                <div className="task-tab-right">
                    <CheckBox
                        name={lang.noConcluded}
                        checked={typeFilter === 'no-concluded'}
                        onClick={() => setTypeFilter('no-concluded')}
                    />
                    <CheckBox
                        name={lang.showAll}
                        checked={typeFilter === 'show-all'}
                        onClick={() => setTypeFilter('show-all')}
                    />
                    <CheckBox
                        name={lang.onlyConcluded}
                        checked={typeFilter === 'only-concluded'}
                        onClick={() => setTypeFilter('only-concluded')}
                    />
                    <IconButton
                        style={{
                            color: '#b4b8b9',
                            fontSize: 16,
                            margin: '0 5px'
                        }}
                        onPress={props.onReload}
                        icon={faSyncAlt}
                    />
                </div>
            </div>
            <div className="tasks">
                {
                    filterList(data, Object.values(filters)).map((task, i) => {
                        return (
                            <div className="task" key={i}>
                                <div className="task-top">
                                    <div className="task-top-left">
                                        <span>{task.title}</span>
                                    </div>
                                    <div className="task-top-right">
                                        {
                                            task.isConcluded ? (
                                                <FontAwesomeIcon style={{ color: '#46eb34' }} icon={faCheckCircle} />
                                            ) : (
                                                <IconButton
                                                    style={{
                                                        color: '#e54d77',
                                                    }}
                                                    onPress={() => props.onUpTask(task)}
                                                    icon={faBolt}
                                                />
                                            )
                                        }
                                        <IconButton
                                            style={{
                                                color: '#e54d77',
                                                marginLeft: 15
                                            }}
                                            onPress={() => props.onDelete(task._id)}
                                            icon={faTrash}
                                        />
                                    </div>
                                </div>
                                <div className="task-middle">
                                    <p>{task.description}</p>
                                </div>
                                <div className="task-bottom">
                                    <div className="task-bottom-left">
                                        <FontAwesomeIcon icon={faIdBadge} />
                                        <span>{task.author}</span>
                                    </div>
                                    <div className="task-bottom-right">
                                        <span>{new Date(task.date).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );

}