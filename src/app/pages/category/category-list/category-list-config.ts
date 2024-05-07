import { ListTableMenu } from './../../../commons/list-table-menu.interface';
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Category } from "src/app/responses/category/category.response";
import icCategory from "@iconify/icons-ic/twotone-category";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline"
import iclabel from "@iconify/icons-ic/twotone-label"
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today"
import { GenericValidators } from '@shared/validators/generic-validators';

const searchOptions = [
    {
        label: "Nombre",
        value: 1,
        placeholder: "Buscar por nombre",
        validation: [GenericValidators.defaultName],
        validaton_desc: "soo se permite letras en esta busqueda.",
        min_length: 2
    },
    {
        label: "Descripcion",
        value: 2,
        placeholder: "Buscar por descripcion",
        validation: [GenericValidators.defaultDescription],
        validaton_desc: "soo se permite letras y numeros en esta busqueda",
        min_length: 2
    },
]
const menuItems: ListTableMenu[] = [
    {
        type: 'link',
        id: 'all',
        icon: icViewHeadline,
        label: "Todos"
    },
    {
        type: 'link',
        id: 'Activo',
        value: 1,
        icon: iclabel,
        label: "Activo",
        classes: {
            icon: "text-green"
        }
    },
    {
        type: 'link',
        id: 'Inactivo',
        value: 0,
        icon: iclabel,
        label: "Inactivo",
        classes: {
            icon: "text-gray"
        }
    }
]

const tableColumns : TableColumn<Category>[] = [
    {
        label: 'Nombre',
        property: "name",
        type: 'text',
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: 'Descripcion',
        property: "description",
        type: 'textTruncate',
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: 'F. creacion',
        property: "auditCreateDate",
        type: 'datetime',
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: 'Estado',
        property: "stateCategory",
        type: 'badge',
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: '',
        property: 'menu',
        type: "buttonGroup",
        buttonItems: [{
            buttonLabel: 'Editar',
            buttonAction: 'edit',
            buttonCondition: null,
            disable: false
        },{
            buttonLabel: 'Eliminar',
            buttonAction: 'remove',
            buttonCondition: null,
            disable: false
        }],
        cssClasses: ['font-medium','w-10']
    }
]

const inputs = {
    numFilter: 0,
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null
}

const filters = {
    numFilter: 0,
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null
}


export const componentSettings = {
    //ICONS
    icCategory: icCategory,
    icCalendarMonth: icCalendarMonth,
    //LAYAUT SETTINGS
    menuOpen: false,
    //Table setting
    tableColumns: tableColumns,
    initialSort: "Id",
    initialSortDir: 'desc',
    getInputs: inputs,
    buttonLabel: "EDITAR",
    buttonLabel2: "ELIMINAR",
    //SEARCH FILTROS
    menuItems: menuItems,
    //filtro
    searchOptions: searchOptions,
    filters: filters,
    filters_dates_active: false,
    datesFilterArray: ['Fecha de Creacion'],
    columnsFilter: tableColumns.map(
        (column) => {return {label: column.label, property: column.property, type: column.type}})
}