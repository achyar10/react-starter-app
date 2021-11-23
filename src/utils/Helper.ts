import Swal from 'sweetalert2'

export const numberFormat = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const Alert = (msg: string, icon: any = 'error') => {
    Swal.fire({
        title: '',
        text: msg,
        allowOutsideClick: false,
        icon: icon,
        confirmButtonColor: "#DD6B55",
    })
}

export const strToBool = (s: string) => {
    let regex = /^\s*(true|1|on)\s*$/i
    return regex.test(s);
}