interface IAction {
    key: string
    name: string
    icon: string
    color: string
}

const AddAction: IAction = {
    key: 'ADD',
    name: 'Entrega',
    icon: `<svg width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M6 1a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 1 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5.5 5.293V1.5A.5.5 0 0 1 6 1Zm0 10a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"/></svg>`,
    color: '58, 160, 58'
}

const RemoveAction: IAction = {
    key: 'REMOVE',
    name: 'Devolucion',
    icon: `<svg width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M5.5 6.5a.5.5 0 0 0 1 0V2.707l1.146 1.147a.5.5 0 1 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L5.5 2.707V6.5ZM6 11a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"/></svg>`,
    color: '191, 42, 42'
}

const ChangeAction: IAction = {
    key: 'CHANGE',
    name: 'Cambio',
    icon: `<svg width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M10.28 1.72a.75.75 0 1 0-1.06 1.06L10.44 4H3.75a.75.75 0 0 0 0 1.5h6.69L9.22 6.72a.75.75 0 0 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5Zm-3.5 7.56a.75.75 0 0 0-1.06-1.06l-2.5 2.5a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 0 0 1.06-1.06L5.56 12h6.69a.75.75 0 0 0 0-1.5H5.56l1.22-1.22Z"/></svg>`,
    color: '7, 80, 188'
}

export const ActionsStatic = {
    ADD: AddAction,
    REMOVE: RemoveAction,
    CHANGE: ChangeAction
}