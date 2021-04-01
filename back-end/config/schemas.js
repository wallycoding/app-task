module.exports = app => {
    
    const Task = app.mdb.model('Task', {
        title: String,
        description: String,
        date: Date,
        isConcluded: Boolean,
        author: String
    });

    return { Task };
}