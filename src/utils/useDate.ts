
type IDate = | Date | string | number | null

function parse(dt: IDate){
    if(!dt || dt === null){
        return null
    }

    const formatedDate = new Date(dt)

    const dateUTC = new Date(formatedDate.getTime() + (formatedDate.getTimezoneOffset() * 60000))
    
    if(!dateUTC || dateUTC <= new Date('1970-01-02')){
        return null
    }else{
        return dateUTC.toISOString().slice(0,10)
    }
}

function dateBr(dt: IDate){
    if(!dt || dt === null){
        return ""
    }

    try{
        const formattedDate = new Date(dt)
        const options:Intl.DateTimeFormatOptions = {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }
    
        const dateUTC = new Date(formattedDate.getTime() + (formattedDate.getTimezoneOffset() * 60000))
        return dateUTC.toLocaleString('pt-BR', options);
    }catch(error){
        console.log(error)
        return ""
    }
}

const useDate = {
        parse,
        dateBr
}


export default useDate