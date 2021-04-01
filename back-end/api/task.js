module.exports = app => {

    const { errorFilter, exists } = app.api.test;
    const { Task } = app.config.schemas;

    const save = (req, res) => {

        const task = { ...req.body };

        try {
            errorFilter(
                [task.title, task.description, task.author],
                'Invalid or undefined parameters.',
                exists
            );
        } catch (error) {
            return res.status(400).send(error);
        }

        const currentTask = new Task({
            title: task.title,
            description: task.description,
            date: new Date(),
            isConcluded: false,
            author: task.author
        });

        currentTask.save()
            .then(() => res.status(204).send());

    }

    const get = async (_, res) => {

        const tasks = await Task.find().catch(error => {
            console.log('\x1b[41m%s\x1b[37mERRO: ', error, '\x1b[0m');
            return [];
        });

        res.json(tasks);

    }

    const update = async (req, res) => {

        const task = { ...req.body };

        try {
            errorFilter(
                [
                    task.id, task.title,
                    task.description,
                    task.author
                ],
                'Invalid or undefined parameters.',
                exists
            );

            if (task.isConcluded !== true && task.isConcluded !== false) {
                throw 'Invalid or undefined parameters.';
            }

            const taskData = {
                title: task.title,
                description: task.description,
                date: new Date(),
                isConcluded: task.isConcluded,
                author: task.author
            }

            await Task.updateOne(
                { _id: task.id },
                { $set: { ...taskData } }
            );

        } catch (error) {
            return res.status(400).send(error);
        }

        res.status(204).send();

    };

    const remove = async (req, res) => {
        const id = req.query.id;

        try {
            errorFilter(
                [id],
                'Invalid or undefined parameters.',
                exists
            );
            await Task.deleteOne({ _id: id });
        } catch (error) {
            return res.status(400).send(error);
        }
        res.status(204).send();
    }

    return { save, get, update, remove };

}