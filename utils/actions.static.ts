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

const DeleteAction: IAction = {
    key: 'DELETE',
    name: 'Eliminar',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><path d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834c0 .46-.345.833-.771.833H3.52c-.426 0-.771-.373-.771-.833Z"/><path d="M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.487-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112C7.545 22 8.9 22 11.607 22Z" opacity=".5"/></g></svg>`,
    color: '191, 42, 42'
}

const UpdateAction: IAction = {
    key: 'UPDATE',
    name: 'Actualizar',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".5"/><path d="M13.926 14.302c.245-.191.467-.413.912-.858l5.54-5.54c.134-.134.073-.365-.106-.427a6.066 6.066 0 0 1-2.3-1.449a6.066 6.066 0 0 1-1.45-2.3c-.061-.18-.292-.24-.426-.106l-5.54 5.54c-.445.444-.667.667-.858.912a5.045 5.045 0 0 0-.577.932c-.133.28-.233.579-.431 1.175l-.257.77l-.409 1.226l-.382 1.148a.817.817 0 0 0 1.032 1.033l1.15-.383l1.224-.408l.77-.257c.597-.199.895-.298 1.175-.432a5.03 5.03 0 0 0 .933-.576Zm8.187-8.132a3.028 3.028 0 0 0-4.282-4.283l-.179.178a.734.734 0 0 0-.206.651c.027.15.077.37.168.633a4.911 4.911 0 0 0 1.174 1.863a4.91 4.91 0 0 0 1.862 1.174c.263.09.483.141.633.168c.24.043.48-.035.652-.207l.178-.178Z"/></g></svg>`,
    color: '7, 80, 188'
}

export const ActionsStatic = {
    ADD: AddAction,
    REMOVE: RemoveAction,
    CHANGE: ChangeAction,
    DELETE: DeleteAction,
    UPDATE: UpdateAction
}