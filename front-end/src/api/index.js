import axios from 'axios';
const baseURL = 'http://localhost:4444/task';

const config = {};

export const get = (callback) => {
    axios.get(baseURL, config)
        .then(result => {
            callback(result.data);
        }).catch(console.error);
}

export const update = (task, done) => {
    const id = task._id;
    delete task._id;
    task.id = id;
    axios.put(baseURL, task, config).then(_ => {
        done();
    }).catch(console.error);
}

export const remove = (id, done) => {
    axios.delete(`${baseURL}/?id=${id}`, config).then(_ => {
        done();
    }).catch(console.error);
}

export const create = (task, done, error) => {
    axios.post(baseURL, task, config).then(_ => {
        done();
    }).catch(err => {
        error(String(err));
    });
}

export default { get, update, remove, create };