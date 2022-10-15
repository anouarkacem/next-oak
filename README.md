This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev

```
Node version: 14.15.1
NPM version: 8.14.0

No need for database this project stores data in-memory

Open [http://localhost:3000/api/graphql](http://localhost:3000/graphql) with your browser to see the result.

## STEPS

- Create a phase and get its ID (id:1)

- Create a task with phase ID & title example (phaseId: 1, title: task 1)

- Query tasks and check the result (id:1, phaseId:1, done:false, title: task 1)

- Query Phase to check it (id:1, title:Phase 1, done: false, tasks:[{id:1, phaseId:1, done:false, title: task 1}])

- Confirm Task id:1 => done: true if no previous task, if previous check if its confirmed

- Undo Task id:5 checks if there is next tasks and undo them if they are done

- Phases are marked as done when all the tasks under that phase are marked as done

## Create Phase Mutation

```
mutation CreatePhase($title: String!) {
  createPhase(title: $title) {
    id
    title
    done
    tasks {
      id
      phaseId
      done
      title
    }
  }
}
```

## Get Phases Query

```
query Phases {
  phases {
    id
    title
    done
    tasks {
      id
      title
      phaseId
      done
    }
  }
}
```

## Create Task Mutation

```
mutation CreateTask($phaseId: Int!, $createTaskTitle: String!) {
  createTask(phaseId: $phaseId, title: $createTaskTitle) {
    id
    title
    done
    phaseId
  }
}
```

## Get Tasks Query

```
query Tasks {
  tasks {
    id
    title
    done
    phaseId
  }
}
```

## Confirm Task Mutation

```
mutation ConfirmTask($confirmTasksId: Int!) {
  confirmTask(id: $confirmTasksId) {
    id
    title
    done
    phaseId
  }
}
```

## Undo Task Mutation

```
mutation UndoTask($undoTaskId: Int!) {
  undoTask(id: $undoTaskId) {
    id
    title
    done
    phaseId
  }
}
```
