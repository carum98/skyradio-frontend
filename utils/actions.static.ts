interface IAction {
    name: string
    icon: string
    color: string
}

const AddAction: IAction = {
    name: 'Entrega',
    icon: `<svg width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M6 1a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 1 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5.5 5.293V1.5A.5.5 0 0 1 6 1Zm0 10a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"/></svg>`,
    color: '58, 160, 58'
}

const RemoveAction: IAction = {
    name: 'Devolucion',
    icon: `<svg width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M5.5 6.5a.5.5 0 0 0 1 0V2.707l1.146 1.147a.5.5 0 1 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L5.5 2.707V6.5ZM6 11a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"/></svg>`,
    color: '191, 42, 42'
}

const ChangeAction: IAction = {
    name: 'Cambio',
    icon: `<svg width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M10.28 1.72a.75.75 0 1 0-1.06 1.06L10.44 4H3.75a.75.75 0 0 0 0 1.5h6.69L9.22 6.72a.75.75 0 0 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5Zm-3.5 7.56a.75.75 0 0 0-1.06-1.06l-2.5 2.5a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 0 0 1.06-1.06L5.56 12h6.69a.75.75 0 0 0 0-1.5H5.56l1.22-1.22Z"/></svg>`,
    color: '7, 80, 188'
}

const DeleteAction: IAction = {
    name: 'Eliminar',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6h-4V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2ZM10 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4Zm7 14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8h10Z"/></svg>`,
    color: '191, 42, 42'
}

const UpdateAction: IAction = {
    name: 'Actualizar',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"/></svg>`,
    color: '7, 80, 188'
}

const HistoryAction: IAction = {
    name: 'Historial',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9a9 9 0 0 1-9 9Zm0-16a7 7 0 1 0 7 7a7 7 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5a5 5 0 0 1-5 5Z"/></svg>`,
    color: '7, 80, 188'
}

const DownloadAction: IAction = {
    name: 'Descargar',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14q.425 0 .713.288T20 21q0 .425-.288.713T19 22H5q-.425 0-.712-.288T4 21q0-.425.288-.712T5 20m7-2.625q-.225 0-.437-.1t-.363-.3l-4.95-6.35q-.375-.5-.1-1.062T7.05 9H9V3q0-.425.288-.712T10 2h4q.425 0 .713.288T15 3v6h1.95q.625 0 .9.563t-.1 1.062l-4.95 6.35q-.15.2-.363.3t-.437.1"/></svg>`,
    color: '7, 80, 188'
}

export const ActionsStatic = {
    ADD: AddAction,
    REMOVE: RemoveAction,
    CHANGE: ChangeAction,
    DELETE: DeleteAction,
    UPDATE: UpdateAction,
    HISTORY: HistoryAction,
    DOWNLOAD: DownloadAction
}