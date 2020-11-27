class ToDo {
    constructor() {
        this.container = document.body
        this.tasks = []
        this.isLoading = true
        this.hasError = null
    }

    init() {
        fetchData('/data.json', {
            endCallback: this.endLoadingTasks.bind(this)
        })
            .then(this.loadTasks.bind(this))

        this.render()
    }

    endLoadingTasks() {
        this.isLoading = false
        this.render()
    }

    loadTasks(data) {
        this.tasks = this.tasks.concat(data.tasks)
        this.render()
    }

    render() {
        this.container.innerHTML = ''

        if (this.isLoading) {
            const text = document.createElement('p')
            text.innerText = 'Loading...'
            this.container.appendChild(text)

            return
        }

        const ul = document.createElement('ul')

        this.tasks.forEach((task) => {
            const li = document.createElement('li')

            li.innerText = task.text

            ul.appendChild(li)
        })

        this.container.appendChild(ul)
    }
}

const todo1 = new ToDo()
todo1.init()