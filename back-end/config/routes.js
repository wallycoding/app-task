module.exports = app => {

    app.route('/task')
        .get(app.api.task.get)
        .post(app.api.task.save)
        .put(app.api.task.update)
        .delete(app.api.task.remove);

}