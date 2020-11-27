class ToDo {
    constructor() {
        this.container = document.body
        this.tasks = []
        this.isLoading = true
        this.hasError = null
    }

    init() {
        this.fetchTasks('/data.json')
        this.render()
    }

    fetchTasks(url) {
        return fetchData(url, {
            endCallback: this.endLoadingTasks.bind(this),
            catchCallback: this.loadingTasksFailed.bind(this),
        })
            .then(this.loadTasks.bind(this))
    }

    loadingTasksFailed(error) {
        this.hasError = error
    }

    endLoadingTasks() {
        this.isLoading = false
        this.render()
    }

    loadTasks(data) {
        this.tasks = data.tasks
        this.hasError = null
        this.render()
    }

    renderTasks(){
        const ul = document.createElement('ul')

        this.tasks.forEach((task) => {
            const li = document.createElement('li')

            li.innerText = task.text

            ul.appendChild(li)
        })

        this.container.appendChild(ul)
    }

    renderButtons() {
        const button1 = document.createElement('button')
        button1.innerText = 'Fetch tasks 1 (OK)'
        const button2 = document.createElement('button')
        button2.innerText = 'Fetch tasks 2 (OK)'
        const button3 = document.createElement('button')
        button3.innerText = 'Fetch tasks 3 (empty)'
        const button4 = document.createElement('button')
        button4.innerText = 'Fetch tasks 4 (error)'

        button1.addEventListener('click', () => this.fetchTasks('/data.json'))
        button2.addEventListener('click', () => this.fetchTasks('/data2.json'))
        button3.addEventListener('click', () => this.fetchTasks('/data3.json'))
        button4.addEventListener('click', () => this.fetchTasks('/data4.json'))

        this.container.appendChild(button1)
        this.container.appendChild(button2)
        this.container.appendChild(button3)
        this.container.appendChild(button4)
    }

    renderLoader() {
        const text = document.createElement('p')
        text.innerText = 'Loading...'
        this.container.appendChild(text)
    }

    renderError() {
        const text = document.createElement('p')
        text.innerText = 'Error ocurred! ' + this.hasError.message
        this.container.appendChild(text)
    }

    renderEmptyState() {
        const text = document.createElement('p')
        text.innerText = 'No tasks in fetch data!'
        this.container.appendChild(text)
    }

    render() {
        this.container.innerHTML = ''

        this.renderButtons()

        if (this.hasError) {
            this.renderError()
            return
        }

        if (this.isLoading) {
            this.renderLoader()
            return
        }

        if (!Array.isArray(this.tasks) || this.tasks.length === 0) {
            this.renderEmptyState()
            return
        }

        this.renderTasks()
    }
}

const todo1 = new ToDo()
todo1.init()