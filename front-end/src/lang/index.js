module.exports = (() => {

    switch (process.env.LANG) {
        case 'pt_BR.UTF-8':
            return [
                {
                    listOfTask: 'Lista de tarefas',
                    search: 'Buscar...',
                    options: 'Opções',
                    noConcluded: 'Não Concluido',
                    showAll: 'Mostrar Tudo',
                    onlyConcluded: 'Apenas Concluido'
                },
                {
                    createTask: 'Criar Tarefa',
                    useYourComputerUsername: 'Use o nome de usuário do seu computador',
                    author: 'Criador...',
                    title: 'Título...',
                    description: 'Descrição...',
                    create: 'Criar'
                }
            ]
        default:
            return [
                {
                    listOfTask: 'List Of Task',
                    search: 'Search...',
                    options: 'Options',
                    noConcluded: 'No Concluded',
                    showAll: 'Show All',
                    onlyConcluded: 'Only Concluded'
                },
                {
                    createTask: 'Create Task',
                    useYourComputerUsername: 'Use your computer username',
                    author: 'Author...',
                    title: 'Title...',
                    description: 'Description...',
                    create: 'Create'
                }
            ];
    }

})();