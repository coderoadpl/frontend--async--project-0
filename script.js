class ToDo {
    constructor() {
        this.container = document.body
        this.tasks = []
    }

    init() {
        this.render()
    }

    render() {
        this.container.innerHTML = ''

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