export default function TransformDate(date){
    const DATE=new Date(date)
    const year = DATE.getFullYear()
    const month = String(DATE.getMonth() + 1).padStart(2, '0')
    const day = String(DATE.getDate()).padStart(2, '0')
    return  `${year}-${month}-${day}`
}