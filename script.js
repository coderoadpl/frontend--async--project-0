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
        this.render()
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

    render() {
        this.container.innerHTML = ''

        if (this.isLoading) {
            this.renderLoader()
            return
        }

        if (this.hasError) {
            this.renderError()
            return
        }

        const button1 = document.createElement('button')
        button1.innerText = 'Fetch tasks 1'
        const button2 = document.createElement('button')
        button2.innerText = 'Fetch tasks 2'

        button1.addEventListener('click', () => this.fetchTasks('/data.json'))
        button2.addEventListener('click', () => this.fetchTasks('/data2.json'))

        const ul = document.createElement('ul')

        this.tasks.forEach((task) => {
            const li = document.createElement('li')

            li.innerText = task.text

            ul.appendChild(li)
        })

        this.container.appendChild(button1)
        this.container.appendChild(button2)
        this.container.appendChild(ul)
    }
}

const todo1 = new ToDo()
todo1.init()