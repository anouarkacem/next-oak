This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev

```

No need for database this project stores data in-memory

Open [http://localhost:3000/api/graphql](http://localhost:3000/graphql) with your browser to see the result.

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
mutation CreateTask($phaseId: Int!, $createTaskTitle: String!, $done: Boolean) {
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
